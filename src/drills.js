require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchByProductName(searchTerm) {
  knexInstance('shopping_list')
    .select('*')
    .where('product_name', 'ILIKE', `%${searchTerm}%`)
    .then(res => console.log(res));
}

searchByProductName('fish');

function paginateProducts(pageNumber) {
  const limit = 6;
  const offset = limit * (pageNumber - 1);
  knexInstance('shopping_list')
    .select('*')
    .limit(limit)
    .offset(offset)
    .then(res => {
      console.log('Paginate Products', { pageNumber });
      console.log(res);
    })
}

paginateProducts(6);

function productsAddedDaysAgo(daysAgo) {
  knexInstance('shopping_list')
    .select('*')
    .where('date_added', '>', knexInstance.raw(`now() -'?? days'::INTERVAL`, daysAgo))
    .then(res => {
      console.log('Products added days ago');
      console.log(res)
    });

productsAddedDaysAgo(3);

function totalPriceByCategory() {
  knexInstance('shopping_list')
    .select('category')
    .sum('price as total')
    .groupBy('category')
    .then(res => {
      console.log('Price by Category');
      console.log(res);
    });
}

totalPriceByCategory();