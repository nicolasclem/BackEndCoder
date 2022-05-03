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
            } catch (error) {
                console.log(error);
            }
        } else {
            const allProducts = await this.getAlldev()
            const indexID = allProducts[allProducts.length - 1].id
            product = {
                ...product,
                id: indexID + 1
            }
            allProducts.push(product)

            try {
                await fs.promises.writeFile(`./${this.FileName}.txt`, JSON.stringify(allProducts, null, '\t'))
            } catch (error) {
                console.log(error);
            }
        }
    }



    getById = async (id) => {
        const exists = fs.existsSync(`./${this.FileName}.txt`)
        if (exists) {
            const products = await this.getAlldev()
            const productsById = products.filter(X => X.id == id)
            console.log(productsById);
        } else console.log(`No  existe el archivo : ./${this.FileName}.txt`);


    }

    getAll = async () => {
        const exists = fs.existsSync(`./${this.FileName}.txt`)
        if (exists) {
            try {
                const products = await fs.promises.readFile(`./${this.FileName}.txt`, "utf-8")
                const allProducts = JSON.parse(products);
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
            const borrar = products.find(elem => elem.id == id)
            if (borrar) {
                const productsById = products.filter(X => X.id != id)
                await fs.promises.writeFile(`./${this.FileName}.txt`, JSON.stringify(productsById, null, '\t'))
            } else console.log(`no se encuentra el producto con id : ${id}`);
        } else console.log(`No  existe el archivo : ./${this.FileName}.txt`);
    }


    /********Detele ALL *****/
    deleteAll = async () => {
        const exists = fs.existsSync(`./${this.FileName}.txt`)
        if (exists) {
            try {
                await fs.promises.writeFile(`./${this.FileName}.txt`, '')
            } catch (error) {
                console.log(error);
            }
        } else console.log(`No  existe el archivo : ./${this.FileName}.txt`);
    }


}
productExample1 = {
    title: "prueba1",
    price: 1,
    thumbnail: "https://source.unsplash.com/random"
}

productExample2 = {
    title: "prueba2",
    price: 2,
    thumbnail: "https://source.unsplash.com/random"
}

productExample3 = {
    title: "prueba3",
    price: 3,
    thumbnail: "https://source.unsplash.com/random"
}




const prueba = new contenedor("productos")


// prueba.save(productExample1)
// prueba.save(productExample2)
// prueba.save(productExample3)

//prueba.getAll()


//prueba.getById(4)

//prueba.deleteById(7)


//prueba.deleteAll()