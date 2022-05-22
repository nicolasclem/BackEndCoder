const fs = require('fs');
const {
    lastId,
    readJson,
    writeJson
} = require('./controller/helpers')

class ProductsController {
    constructor(FileName) {
        this.FileName = FileName;

    }
    getAll = async (req,res) => {
        const exists = fs.existsSync(`./${this.FileName}.json`)
        if (exists) {
            try {
                const allProducts = await readJson(this.FileName)
               res.status(200).json({
                   data:allProducts,
                   status:200
               })

            } catch (error) {
                res.status(400).json({
                    error: 404,
                    msg: error
                })
            }


        }
    }

    getByID = async (req,res,id) => {
        try {

            const allProducts = await readJson(this.FileName)
            const foundProduct = allProducts.find(elem => elem.id == id)
            if (foundProduct != undefined) {
                res.status(200).json({
                    data:foundProduct,
                    status:200
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
            name: req.body.name,
            price: req.body.price,
           // thumbnail: req.file.filename,
            imgURL:req.body.imgURL
        }
        try {

            allProducts.push(newProduct)
            await writeJson(this.FileName, allProducts)

            res.status(200).json({
                data:allProducts,
                status:200
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
                    price: req.body.price != undefined ? req.body.price : foundProduct.price,
                   // thumbnail: req.file != undefined? req.file.filename :foundProduct.thumbnail,
                    imgUrl:req.body.imgUrl != undefined ? req.body.imgUrl : foundProduct.imgUrl,
                    
                }
               
                const editIndex = allProducts.indexOf(foundProduct)
                allProducts[editIndex] = editProduct
                await writeJson(this.FileName, allProducts)

                res.status(200).json({
                    data:allProducts,
                    status:200
                })
            }
            else{
                res.status(400).json({
                    error: 404,
                    msg: "no se encuentra el producto"
                })
            }
        } catch (error) {
            res.status(400).json({
                error: 404,
                msg: "soy el catch " , error
            })

        }
    }

    delete = async (req, res, id) => {

        const allProducts = await readJson(this.FileName)
        const productsById = allProducts.filter(X => X.id != id)
        if (productsById.length != allProducts.length) {
            await writeJson(this.FileName, productsById)

            res.status(200).json({
                data:productsById,
                status:200
            })
        } else res.status(400).json({
            error: 404,
            msg: "no se encuentra el producto"
        })

    }
}

const prueba = new ProductsController("db")

module.exports = prueba
