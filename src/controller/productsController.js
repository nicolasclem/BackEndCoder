const fs = require('fs');
const {
    lastId,
    readJson,
    writeJson
} = require('../helpers/helpersJSON')

class ProductsController {
    constructor(FileName) {
        this.FileName = FileName;

    }

    getAll = async (req, res) => {
        const exists = fs.existsSync(`./${this.FileName}.json`)
        if (exists) {
            try {
                const allProducts = await readJson(this.FileName)
                if (allProducts.length > 0) {
                    res.status(200).json({
                        data: allProducts,
                        status: 200
                    })
                } else {
                    res.status(200).json({
                        msg: "no se encuentran productos cargados",
                        status: 200
                    })
                }
            } catch (error) {
                res.status(400).json({
                    error: 404,
                    msg: error
                })
            }


        }
    }

    getByID = async (req, res, id) => {
        try {

            const allProducts = await readJson(this.FileName)
            const foundProduct = allProducts.find(elem => elem.id == id)
            if (foundProduct != undefined) {
                res.status(200).json({
                    data: foundProduct,
                    status: 200
                })
            } else {
                res.status(400).json({
                    error: 404,
                    msg: "no se encuentra el producto"
                })
            }

        } catch (error) {
            console.log(error);
        }
    }
    storage = async (req, res) => {

        const allProducts = await readJson(this.FileName)

        const newProduct = {
            id: lastId(allProducts) + 1,
            timestamp: new Date(),
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            thumbnail: req.body.img,
            price: req.body.price,
            stock: req.body.stock

        }
        try {

            allProducts.push(newProduct)
            await writeJson(this.FileName, allProducts)

            res.status(200).json({
                data: allProducts,
                status: 200
            })

        } catch (error) {
            res.status(400).json({
                error: 404,
                msg: error
            })

        }
    }
    update = async (req, res, id) => {

        try {

            const allProducts = await readJson(this.FileName)

            const foundProduct = allProducts.find(elem => elem.id == id)
            if (foundProduct != undefined) {

                const editProduct = {
                    ...foundProduct,
                    name: req.body.name != undefined ? req.body.name : foundProduct.name,
                    thumbnail: req.body.img != undefined ? req.body.img : foundProduct.thumbnail,
                    description: req.body.description != undefined ? req.body.description : foundProduct.description,
                    code: req.body.code != undefined ? req.body.code : foundProduct.code,
                    stock: req.body.stock != undefined ? req.body.stock : foundProduct.stock,
                    price: req.body.price != undefined ? req.body.price : foundProduct.price,

                }

                const editIndex = allProducts.indexOf(foundProduct)
                allProducts[editIndex] = editProduct
                await writeJson(this.FileName, allProducts)

                res.status(200).json({
                    data: allProducts,
                    status: 200
                })
            } else {
                res.status(400).json({
                    error: 404,
                    msg: "no se encuentra el producto"
                })
            }
        } catch (error) {
            res.status(400).json({
                error: 404,
                msg: "soy el catch ",
                error
            })

        }
    }

    delete = async (req, res, id) => {

        const allProducts = await readJson(this.FileName)
        const productsById = allProducts.filter(X => X.id != id)
        if (productsById.length != allProducts.length) {
            await writeJson(this.FileName, productsById)

            res.status(200).json({
                data: productsById,
                status: 200
            })
        } else res.status(400).json({
            error: 404,
            msg: "no se encuentra el producto"
        })

    }
}

const controladorProducto = new ProductsController("db")

module.exports = controladorProducto