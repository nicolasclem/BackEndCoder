const fs = require('fs');
const { findSourceMap } = require('module');

class contenedor{
    constructor(FileName){
        this.FileName=FileName;
        this.products=[]
        
       
        
    }    
    save= async (product)=>{       

        const exists =fs.existsSync(`./${this.FileName}.txt`)

        if(!exists){
            product={
                ...product,
                id: 1
            }

            this.products.push(product)

        try{
            await fs.promises.writeFile(`./${this.FileName}.txt`,JSON.stringify(this.products,null,'\t'))
        }
        catch(error){
            console.log(error);
        }  
        }
        else {
            const allProducts= await this.getAlldev()
            const indexID = allProducts[allProducts.length-1].id
            product={
                ...product,
                id: indexID +1
            }
            allProducts.push(product)
         
            try{
                await fs.promises.writeFile(`./${this.FileName}.txt`,JSON.stringify(allProducts,null,'\t'))
            }
            catch(error){
                console.log(error);
            } 
            
            

        }

    

    }


    getById= async(id)=>{

        const products= await this.getAlldev()
        const productsById=products.filter(X=> X.id==id)
        console.log(productsById);


    }
    
    getAll= async()=>{
        try{
            const products = await fs.promises.readFile(`./${this.FileName}.txt`,"utf-8")
            const allProducts= JSON.parse(products);   
            console.log(allProducts);
            return allProducts
        }
            catch(error){
            console.log(error);
            }   
        }

    getAlldev= async()=>{
        try{
                const products = await fs.promises.readFile(`./${this.FileName}.txt`,"utf-8")
                const allProducts= JSON.parse(products);   
                return allProducts
            }
                catch(error){
                console.log(error);
                }   
            }

    deleteById= async(id)=>{
        
        const products= await this.getAlldev()
        const productsById=products.filter(X=> X.id !=id)
        console.log(productsById);
            
        
      
     
        

    }
    deleteAll= async()=>{
        try{
            await fs.promises.writeFile(`./${this.FileName}.txt`,'')
           }
                catch(error){
                console.log(error);
            }   
    }

}


productExample1={
    title:"prueba1",
    price:1,
    thumbnail:"https://source.unsplash.com/random"
}

productExample2={
    title:"prueba2",
    price:2,
    thumbnail:"https://source.unsplash.com/random"
}

productExample3={
    title:"prueba3",
    price:3,
    thumbnail:"https://source.unsplash.com/random"
}


const prueba = new contenedor("productos")


//prueba.save(productExample1)
//prueba.save(productExample2)
// prueba.save(productExample3)

//prueba.getAll()


//prueba.getById(4)

prueba.deleteById(8)


//prueba.deleteAll()



