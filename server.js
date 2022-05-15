const express=require('express')
const path = require('path')
const app=express()
const PORT = 8080;


const routersProducts = require('./routes/ProductRoute')


express.static(path.resolve(__dirname, './public'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname, './public/index.html'))
})


app.use('/api/productos',routersProducts)


app.listen(PORT,()=>(console.log(`servidor corriendo en puerto ${PORT}`)))

