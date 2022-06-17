const Knex = require('knex').default;




const optionsMySql = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'ecommerce'
    }
};

const knex = Knex(optionsMySql);


const executeMySql = async () => {
    try {
        await knex.schema.dropTableIfExists("products");
        await knex.schema.createTable("products", (table) => {
            table.increments("id").primary().notNullable();
            table.string("title", 15).notNullable();
            table.integer("price");            
            table.string("imgURL", 60);
        })
        await knex("products").insert([
            {title: "Prod 1", price: 10, imgURL: "https://picsum.photos/200/300"  },
            {title: "Prod 2", price: 10, imgURL: "https://picsum.photos/200/300" },
            {title: "Prod 3", price: 10, imgURL: "https://picsum.photos/200/300"}
        ]);
        const res = await knex.from("products").select("*")
        console.log(res);
    }
    catch(err) {
        console.log(err)
    }
}

module.exports= {executeMySql}