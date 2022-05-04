const fs = require('fs');


class contenedor {
    constructor(FileName) {
        this.FileName = FileName;
        this.products = []
    }
    save = async (product) => {

        const exists = fs.existsSync(`./${this.FileName}.txt`)

        if (!exists) {
            product = {
                ...product,
                id: 1
            }

            this.products.push(product)

            try {
                await fs.promises.writeFile(`./${this.FileName}.txt`, JSON.stringify(this.products, null, '\t'))
                console.log(`archivo creado : ${ this.FileName}  \n producto creado con id : ${product.id} \n name : ${product.title}`);
            } catch (error) {
                console.log(error);
            }
        } else {
            const allProducts = await this.getAlldev()
            if (allProducts) {
                const indexID = allProducts[allProducts.length - 1].id
                product = {
                    ...product,
                    id: indexID + 1
                }
                allProducts.push(product)

                try {
                    await fs.promises.writeFile(`./${this.FileName}.txt`, JSON.stringify(allProducts, null, '\t'))
                    console.log(`producto creado con id : ${product.id} name : ${product.title}`);

                    return product.id 

                } catch (error) {
                    console.log(error);
                }
            } else {
                product = {
                    ...product,
                    id: 1
                }

                this.products.push(product)

                try {
                    await fs.promises.writeFile(`./${this.FileName}.txt`, JSON.stringify(this.products, null, '\t'))
                    console.log(`producto creado con id : ${product.id} \n name : ${product.title}`);

                    return product.id 
                } catch (error) {
                    console.log(error);
                }

            }
        }
    }



    getById = async (id) => {
        const exists = fs.existsSync(`./${this.FileName}.txt`)
        if (exists) {
            const products = await this.getAlldev()
            const foundProduct = products.find(elem => elem.id == id)
            if (foundProduct != undefined) {
                console.log(` le producto seleccionado es: `);
                console.log(foundProduct);
                return(foundProduct)
            } else console.log("no encontramos el producto seleccionado")
        } else console.log(`No  existe el archivo : ./${this.FileName}.txt`);


    }

    getAll = async () => {
        const exists = fs.existsSync(`./${this.FileName}.txt`)
        if (exists) {
            try {
                const products = await fs.promises.readFile(`./${this.FileName}.txt`, "utf-8")
                const allProducts = JSON.parse(products);
                console.log(`Todos nuestros productos: `);
                console.log(allProducts);
                return allProducts
            } catch (error) {
                console.log(error);
            }
        } else console.log(`No  existe el archivo : ./${this.FileName}.txt`);


    }
    /********Detele GET  DEV *****/
    getAlldev = async () => {
        try {
            const products = await fs.promises.readFile(`./${this.FileName}.txt`, "utf-8")
            const allProducts = JSON.parse(products);
            return allProducts
        } catch (error) {
            console.log(error);
        }
    }

    /********Detele id *****/
    deleteById = async (id) => {
        const exists = fs.existsSync(`./${this.FileName}.txt`)
        if (exists) {
            const products = await this.getAlldev()
            const productsById = products.filter(X => X.id != id)
            if (productsById.length > 0) {
                await fs.promises.writeFile(`./${this.FileName}.txt`, JSON.stringify(productsById, null, '\t'))
                console.log(` producto borrado id : ${id}`);
            } else console.log(`no se encuentra el producto con id : ${id}`);
        } else console.log(`No  existe el archivo : ./${this.FileName}.txt`);
    }


    /********Detele ALL *****/
    deleteAll = async () => {
        const exists = fs.existsSync(`./${this.FileName}.txt`)
        if (exists) {
            try {
                await fs.promises.writeFile(`./${this.FileName}.txt`, '')
                console.log(` todos los productos fueron borrados`);

            } catch (error) {
                console.log(error);
            }
        } else console.log(`No  existe el archivo : ./${this.FileName}.txt`);
    }

    deleteFile = async () => {
        const exists = fs.existsSync(`./${this.FileName}.txt`)
        if (exists) {
            await fs.promises.unlink(`./${this.FileName}.txt`)
            console.log(`archivo eliminado : ${this.FileName}`);
        }
    }

}
async function main() {
    console.log("*************Save***************");
    await prueba.save(productExample1)
    console.log("*******************************\n\n");
    console.log("*******************************\n\n");
    console.log("*************Save***************");
    await prueba.save(productExample2)
    await prueba.save(productExample3)
    console.log("*******************************\n\n");

    console.log("================= GET ALL=======");
    await prueba.getAll()
    console.log("*******************************\n\n");
    console.log("===============================");
    console.log("++++++++++GET BY ID++++++++++++");
    await prueba.getById(2)
    console.log("*******************************\n\n");
    console.log("++++++++++GET BY ID++++++++++++");
    await prueba.getById(99)
    console.log("*******************************\n\n");

    console.log("************DELETE BY ID*******");
    await prueba.deleteById(2)
    console.log("*******************************\n\n");
    console.log("************DELETE BY ID*******");
    await prueba.deleteById(99)
    console.log("*******************************\n\n");


    console.log("********BORRAMOS TODO**********");
    // para borrar  todos los datos y dejar el archivo  vacio ejecutar el siguiente metodo  
    // await prueba.deleteAll()


    console.log("********BORRAMOS Archivo**********");
    // para borrar   el archivo ejecutar el siguiente metodo  
    // await prueba.deleteFile()


}

productExample1 = {
    title: "Producto UNO",
    price: 1,
    thumbnail: "https://source.unsplash.com/random"
}

productExample2 = {
    title: "Producto DOS",
    price: 2,
    thumbnail: "https://source.unsplash.com/random"
}

productExample3 = {
    title: "Producto TRES",
    price: 3,
    thumbnail: "https://source.unsplash.com/random"
}




const prueba = new contenedor("productos")



main()
//prueba.deleteFile()