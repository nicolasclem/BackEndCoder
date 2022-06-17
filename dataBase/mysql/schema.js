const {config} = require('./config');
const knex = require('knex')(config);
const { products } = require('./products');

const createTableProducts = async () =>{
    try {
        console.log('⚙ Configuring MYSQL');
        const existTableProducts = await knex.schema.hasTable('products');
        if(existTableProducts){
            await knex.schema.dropTable('products');
        }
        await knex.schema.createTable('products',(table) =>{
            table.string('id');
            table.string('name', 30);
            table.integer('price');
            table.string('url', 300);
        });
        await knex('products').insert(products);
        await knex.destroy();
    } catch (err) {
        console.log(err);
    }
}


createTableProducts()