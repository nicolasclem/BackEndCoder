const fs = require('fs');
const { stringify } = require('querystring');


class contenedor{
    constructor(FileName){
        this.FileName=FileName;
        this.products=[]
        this.id=0
        
    }
    
    save= async (product)=>{
        this.id=this.id +1
        product= {
            ...product,
            id:this.id
        }
        this.products.push(product)
        try{
          
            await fs.promises.writeFile(`./${this.FileName}.txt`,JSON.stringify(this.products, null, '\t'))
            
        }
        catch(error){
            console.log(error);
        }
    }
    getById= async(id)=>{

    }
    getAll= async()=>{

    }
    deleteById= async(id)=>{

    }
    deleteAll= async()=>{

    }

}


productExample={
    title:"prueba",
    price:100,
    thumbnail:"https://source.unsplash.com/random"
}



const prueba = new contenedor("prueba1")

prueba.save(productExample)






