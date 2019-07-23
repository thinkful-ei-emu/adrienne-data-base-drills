require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

console.log('connection successful');

// const searchTerm = 'holo';

// function searchByProduceName(searchTerm) {
//   knexInstance('amazong_products')
//     .select('product_id', 'name', 'price', 'category')
//     .where('name', 'ILIKE', `%${searchTerm}%`)
//     .then(res => console.log(res));

// }

// searchByProduceName('holo');

// function paginateProducts(page) {
//   const productsPerPage = 10;
//   const offset = productsPerPage * (page - 1);
//   knexInstance('amazong_products')
//     .select('product_id', 'name', 'price', 'category')
//     .limit(productsPerPage)
//     .offset(offset)
//     .then(res => console.log(res));
// }

// paginateProducts(2);

// function getProductsWithImages() {
//   knexInstance('amazong_products')
//     .select('product_id', 'name', 'price', 'category', 'image')
//     .whereNotNull('image')
//     .then(res => console.log(res));
// }

// getProductsWithImages();

function mostPopularVideosForDays(days) {
  knexInstance('whopipe_video_views')
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where('date_viewed', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, days))
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' }
    ])
    .then(res => console.log(res));
}

mostPopularVideosForDays(30);