const express = require('express')
const router = express.Router()

//const upload = require('../middleware/multer')
const {
    isUser,
    isAdmin
} = require('../middleware/authUser')
const controladorProducto = require('../controller/productsController')


router.get('/', async (req, res) => {
    res.send(await controladorProducto.getAll(req, res))

})

router.get('/:id', async (req, res) => {

    res.send(await controladorProducto.getByID(req, res, req.params.id))

})



router.post('/', isUser, isAdmin, async (req, res) => {


    res.send(await controladorProducto.storage(req, res))

})


router.put('/:id', isUser, isAdmin, async (req, res) => {

    res.send(await controladorProducto.update(req, res, req.params.id))

})

router.delete('/:id', isUser, isAdmin, async (req, res) => {

    res.send(await controladorProducto.delete(req, res, req.params.id))


})

module.exports = router