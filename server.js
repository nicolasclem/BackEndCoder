const express=require('express')
const path = require('path')
const app=express()
const PORT = 8080;


const routersProducts = require('./routes/ProductRoute')
const routersMain = require('./routes/MainRoute')


express.static(path.resolve(__dirname, './public'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/',routersMain)


app.use('/api/productos',routersProducts)


app.listen(PORT,()=>(console.log(`servidor corriendo en puerto ${PORT}`)))

