const knex = require('knex');
const uuidv4 = require('uuid').v4;
const { config } = require('../dataBase/mysql/config');
class Product {
  constructor() {
    this.nameTable = 'PRODUCTS';
    this.database = knex(config);
  }
  
  async save(product) {
    try {
      if (!product || typeof product !== 'object') {
        throw Error('You should add an object');
      }
      if (Object.keys(product).length === 0) {
        throw Error("You can't add an empty object");
      }
      const newProduct = {
        id: uuidv4(),
        ...product,
      };
      await this.database.from(this.nameTable).insert(newProduct);
      return newProduct;
    } catch (error) {
      throw Error(error.message);
    }
  }



  async getAll() {
    try {
      let data = await this.database.from(this.nameTable).select('*');
      data = JSON.parse(JSON.stringify(data));
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }

}

module.exports = Product;
