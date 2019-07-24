/* global expect*/
const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List Service object', function() {
  let db;

  let testItems = [
    {
      product_name: 'Fish tricks',
      price: '13.10', 
      category: 'Main',
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      product_name: 'Not Dogs',
      price: '4.99', 
      category: 'Snack',
      date_added: new Date('2100-05-22T16:28:32.615Z')
    },
    {
      product_name: 'Bluffalo Wings',
      price: '5.50', 
      category: 'Snack',
      date_added: new Date('1919-12-22T16:28:32.615Z')
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
  })

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context('Given "shopping_list" has data', () => {

    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems);
    })

    it('getAllItems() resolves from "shopping_list" table', () => {
      const expectedItems = testItems.map(item => ({
        ...item,
        checked: false,
      }))
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
        })
    })

    it('getById() resolves an article by id from "shopping_list" table', () => {
      const idToGet = 3;
      const thirdItem = testItems[idToGet - 1];
      return ShoppingListService.getById(db, idToGet)
        .then(actual => {
          expect(actual).to.eql({
            id: idToGet,
            product_name: thirdItem.name,
            price: thirdItem.price,
            category: thirdItem.category,
            checked: false,
            date_added: thirdItem.date_added,
          })
        })
    })

    it('deleteItem() removes an article by id from "shopping_list" table', () => {
      const articleId = 3;
      return ShoppingListService.deleteItem(db, articleId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          const expected = testItems
            .filter(article => article.id !== articleId)
            .map(item => ({
              ...item,
              checked: false,
            }));
            expect(allItems).to.eql(expected);
        })
    })

    it('updateItem() updates an article from the "shopping_list" table', () => {
      const idOfItemToUpdate = 3;
      const newItemData = {
        product_name: 'updated title',
        price: '99.99',
        checked: true,
        date_added: new Date(),
      };
      const originalItem = testItems[idOfItemToUpdate - 1];
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(article => {
          expect(article).to.eql({
            id: idOfItemToUpdate,
            ...originalItem,
            ...newItemData,
          })
        })
    })
  });

  context('Given "shopping_list" has no data', () => {

    it('getAllItems() resolves an empty arrary', () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })

    it('insertItem() inserts an article and resolves the article with an "id"', () => {
      const newItem = {
        product_name: 'Test new name',
        price: '5.05',
        category: 'Lunch',
        checked: true,
        date_added: new Date('2020-01-01T00:00:00.000Z'),
      }
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            product_name: newItem.name,
            price: newItem.price,
            category: newItem.category,
            checked: newItem.checked,
            date_added: newItem.date_added,
          })
        })
    })

  });

});