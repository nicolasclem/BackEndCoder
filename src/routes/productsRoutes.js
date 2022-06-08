const express = require('express')
const router = express.Router()

const upload = require('../middleware/multer')
const prueba = require('../controller/productsController')


router.get('/', async (req, res) => {
    res.send(await prueba.getAll(req,res))

})

router.get('/:id', async (req, res) => {

    res.send(await prueba.getByID(req,res,req.params.id))

})



router.post('/', upload.single("image"), async (req, res) => {


    res.send(await prueba.storage(req, res))

})


router.put('/:id', upload.single("image"), async (req, res) => {

    res.send(await prueba.update(req, res, req.params.id))

})

router.delete('/:id', async (req, res) => {

    res.send(await prueba.delete(req, res, req.params.id))


})

module.exports = router