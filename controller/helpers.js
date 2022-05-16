const path = require('path');
const fs = require('fs');

const helpers = {
    
    readJson:  async (archivoJson)=>{ 
    let productsFilePath = await fs.promises.readFile(`./${archivoJson}.json`, "utf-8")
        return JSON.parse(productsFilePath);
    },

    writeJson: async (archivoJson,products)=>{
        
        await fs.promises.writeFile(`./${archivoJson}.json`, JSON.stringify(products, null, '\t'))
    },

    lastId:  (archivoJson) => {
        let ultimo = 0;
        archivoJson.forEach(element => {
            if (ultimo < element.id) {
                ultimo = element.id;
            };
        });
    return ultimo;
    }



}
module.exports = helpers;