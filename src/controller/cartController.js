const fs = require('fs');
const {
    lastId,
    readJson,
    writeJson
} = require('../helpers/helpersJSON')


class CartController {
    constructor(FileName) {
        this.FileName = FileName;

    }
    /* metodos get  CARRITO */
    getAll = async (req, res) => {
        const exists = fs.existsSync(`./${this.FileName}.json`)
        if (exists) {

            try {
                const allCart = await readJson(this.FileName)
                if (allCart.length > 0) {
                    res.status(200).json({
                        data: allCart,
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

            const allCart = await readJson(this.FileName)
            const foundCart = allCart.find(elem => elem.id == id)
            if (foundCart != undefined) {
                res.status(200).json({
                    data: foundCart,
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
    getProductoInCart = async (req, res, id) => {
        try {
            const allCart = await readJson(this.FileName)
            const foundCart = allCart.find(elem => elem.id == id)
            if (foundCart != undefined) {
                if (foundCart.products.length > 0) {
                    res.status(200).json({
                        data: foundCart.products,
                        status: 200
                    })
                } else {
                    res.status(200).json({
                        msg: `el carrito con id ${id} no tiene productos`,
                        status: 200
                    })

                }
            } else {
                res.status(400).json({
                    error: 404,
                    msg: `no se encuentra el carrito con id : ${id}`
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    /* metodos post  CARRITO */
    storage = async (req, res) => {

        const allCart = await readJson(this.FileName)
        const newCart = {
            id: lastId(allCart) + 1,
            timestamp: new Date(),
            products: []

        }
        try {

            allCart.push(newCart)
            await writeJson(this.FileName, allCart)

            res.status(200).json({
                data: allCart,
                status: 200
            })

        } catch (error) {
            res.status(400).json({
                error: 404,
                msg: error
            })

        }
    }
    saveProduct = async (req, res, id, idProducto) => {
        const allCart = await readJson(this.FileName)
        const allProducts = await readJson("db")

        const cartById = allCart.find(X => X.id == parseInt(id))
        if (cartById) {

            const producto = allProducts.find(X => X.id == parseInt(idProducto))
            if (producto) {

                cartById.products.push(producto)
                await writeJson(this.FileName, allCart)
                res.status(200).json({
                    data: allCart,
                    status: 200
                })
            } else {

                res.status(400).json({
                    msg: `no se encuentra el producto con id :  ${idProducto}`,
                    status: 400
                })

            }

        } else {
            res.status(400).json({
                msg: `no se encuentra el carrito con id :  ${id}`,
                status: 400
            })


        }

    }
    /* metodos delete CARRITO*/

    delete = async (req, res, id) => {

        const allCart = await readJson(this.FileName)
        const cartById = allCart.filter(X => X.id != id)
        if (cartById.length != allCart.length) {
            await writeJson(this.FileName, cartById)

            res.status(200).json({
                data: cartById,
                status: 200
            })
        } else res.status(400).json({
            error: 404,
            msg: "no se encuentra el carrito"
        })

    }
    deleteProductInCart = async (req, res, id, idP) => {

        const allCart = await readJson(this.FileName)
        const cartById = allCart.find(X => X.id == parseInt(id))
        if (cartById) {
            const newCart = cartById.products.filter(x => x.id != idP)
            if (newCart.length != cartById.length && newCart > 0) {
                cartById.products = newCart
                await writeJson(this.FileName, allCart)
                res.status(200).json({
                    data: allCart,
                    status: 200
                })
            } else {
                res.status(400).json({
                    error: 404,
                    msg: `no se encuentra el producto con id : ${idP} en el carrito con id ${id}`
                })

            }
        } else {
            res.status(400).json({
                error: 404,
                msg: "no se encuentra el carrito"
            })
        }

    }






}



const controladorCart = new CartController("cart")

module.exports = controladorCart