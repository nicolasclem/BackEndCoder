const Knex = require('knex');

class knexController {

    constructor(options, table) {
        this.knex = Knex(options);
        this.table = table;
    }

    async save(object){
        try {
            await this.knex(this.table).insert({object});
        }
        catch(err) {
            console.log(err);
        }
    }
    
   

    async getAll() {
        try {
            const response = await this.knex.from(this.table).select("*");
            return response;
        }
        catch(err) {
            console.log(err);
        }
    }


}

module.exports = knexController;