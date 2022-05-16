const express= require('express')
const fs=require('fs')
const router = express.Router()

const {lastId}=require('../controller/helpers')
//const productController = require('../controller/ProductController')
const upload =require('../middleware/multer')
const prueba = require('../products')
router.get('/', async (req, res) => {
    // try {
    //     const products = await fs.promises.readFile(`./db.json`, "utf-8")
    //     const allProducts = JSON.parse(products);

    //     res.send(allProducts)
    // } catch (error) {
    //     console.log(error);
    // }

    res.send(await prueba.getAll())

})

router.get('/:id', async (req, res) => {
    //  try {
    //     const products = await fs.promises.readFile(`./db.json`, "utf-8")
    //     const allProducts = JSON.parse(products);
    //     const foundProduct = allProducts.find(elem => elem.id == req.params.id)
    //     if (foundProduct != undefined) {
    //          res.send(foundProduct)
    //     } else res.status(400).json({
    //         error:404,
    //         msg:"no esta"
    //     })

    // } catch (error) {
    //     console.log(error);
    // }
    res.send(await  prueba.getByID(req.params.id))

})



router.post('/',upload.single("image") ,async(req,res)=>{
    // const products = await fs.promises.readFile(`./db.json`, "utf-8")
    // const allProducts = JSON.parse(products);

    // const newProduct={
    //     id:lastId(allProducts)+1,
    //     name: req.body.name,
    //     price:req.body.price,
    //     thumbnail:req.file.filename
    // }
    // try {

    //     allProducts.push(newProduct)
    //     await fs.promises.writeFile('./db.json',JSON.stringify(allProducts, null, '\t'))

    //     res.redirect('/')
    // } catch (error) {
    //     res.send(error)

    // }

    res.send(await prueba.storage(req,res))
    
})


router.put('/:id',upload.single("image"),async (req,res)=>{
    //     try{
    //         const products = await fs.promises.readFile(`./db.json`, "utf-8")
    //     const allProducts = JSON.parse(products);
         
    //     const foundProduct = allProducts.find(elem => elem.id == req.params.id)
    //     if (foundProduct != undefined) {
    //       editProduct={
    //             ...foundProduct,
    //             name:req.body.name,
    //             price:req.body.price,
    //             thumbnail:req.file.filename
                
    //         }
    //         const editIndex = allProducts.indexOf(foundProduct)
    //         allProducts[editIndex]=editProduct

    //         await fs.promises.writeFile('./db.json',JSON.stringify(allProducts, null, '\t'))
    //         res.send(allProducts)
    //     }
    // }
    // catch (error) {
    //     res.send(error)

    // }
    res.send(await prueba.update(req,res,req.params.id))

    })

router.delete('/:id',async (req,res)=>{
    // const products = await fs.promises.readFile(`./db.json`, "utf-8")
    //     const allProducts = JSON.parse(products);
    //     const productsById = allProducts.filter(X => X.id != req.params.id)
    //     if (productsById.length != allProducts.length) {
    //         await fs.promises.writeFile(`./db.json`, JSON.stringify(productsById, null, '\t'))
    //         res.send('producto borrado' )
    //     } else res.status(400).json({
    //         error:404,
    //         msg:"no esta"
    //     })
    res.send(await prueba.delete(req,res,req.params.id))


})

module.exports= router