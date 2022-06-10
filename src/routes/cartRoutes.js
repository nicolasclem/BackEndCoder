const express = require('express')
const router = express.Router()

const {
    isUser,
    isAdmin
} = require('../middleware/authUser')
const controladorCart = require('../controller/cartController')

/***rutas get */
router.get('/', async (req, res) => {
    res.send(await controladorCart.getAll(req, res))
})

router.get('/:id', async (req, res) => {
    res.send(await controladorCart.getByID(req, res, req.params.id))
})

router.get('/:id/productos', async (req, res) => {
    res.send(await controladorCart.getProductoInCart(req, res, req.params.id))
})

/*rutas post*/
router.post('/', async (req, res) => {
    res.send(await controladorCart.storage(req, res))
})

router.post('/:id/:producto', async (req, res) => {
    res.send(await controladorCart.saveProduct(req, res, req.params.id, req.params.producto))
})

/*rutas delete*/

router.delete('/:id', isUser, isAdmin, async (req, res) => {

    res.send(await controladorCart.delete(req, res, req.params.id))


})

router.delete('/:id/productos/:idP', isUser, isAdmin, async (req, res) => {

    res.send(await controladorCart.deleteProductInCart(req, res, req.params.id, req.params.idP))


})


module.exports = router