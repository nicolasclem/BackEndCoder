const fs = require('fs');
const {lastId , readJson,writeJson}=require('./controller/helpers')

class ProductsController{
    constructor(FileName) {
            this.FileName = FileName;
            //this.products = []
        }
        getAll = async () => {
            const exists = fs.existsSync(`./${this.FileName}.json`)
            if (exists) {
                try {
                    const allProducts = await readJson( this.FileName)
                    return allProducts
                  
                } catch (error) {
                    console.log(error);
                }
    
    
        }
    }

    getByID= async (id)=>{
    try {
        
        const allProducts = await readJson( this.FileName)
        const foundProduct = allProducts.find(elem => elem.id == id)
        if (foundProduct != undefined) {
            return foundProduct
        } else{
            console.log("No se encontro el producto");
        }

    } catch (error) {
        console.log(error);
    }
}
storage = async(req,res)=>{

const allProducts = await readJson( this.FileName)

const newProduct={
    id:lastId(allProducts)+1,
    name: req.body.name,
    price:req.body.price,
    thumbnail:req.file.filename
}
try {

    allProducts.push(newProduct)
    await writeJson(this.FileName,allProducts)
    //await fs.promises.writeFile(`./${this.FileName}.json`,JSON.stringify(allProducts, null, '\t'))
    res.redirect('/')
    
} catch (error) {
    console.log(error)

}
}
update= async (req,res,id)=>{
    try{
        
    const allProducts = await readJson( this.FileName)
     
    const foundProduct = allProducts.find(elem => elem.id == id)
    if (foundProduct != undefined) {
      const editProduct={
            ...foundProduct,
            name:req.body.name,
            price:req.body.price,
            thumbnail:req.file.filename
            
        }
        const editIndex = allProducts.indexOf(foundProduct)
        allProducts[editIndex]=editProduct
        await writeJson(this.FileName,allProducts)
        //await fs.promises.writeFile(`./${this.FileName}.json`,JSON.stringify(allProducts, null, '\t'))
        res.send(allProducts)
    }
}
catch (error) {
    console.log(error);

}
}

delete= async (req,res,id)=>{
   
    const allProducts = await readJson( this.FileName)
    const productsById = allProducts.filter(X => X.id != id)
    if (productsById.length != allProducts.length) {
        await writeJson(this.FileName,productsById)
        //await fs.promises.writeFile(`./${this.FileName}.json`, JSON.stringify(productsById, null, '\t'))
        res.send('producto borrado' )
    } else res.status(400).json({
        error:404,
        msg:"no esta"
    })

}
}

const prueba = new ProductsController("db")

module.exports= prueba
        



