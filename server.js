const express=require('express')
const prueba = require('./products')
const getIDRandom = require( './helper')

const app=express()
const PORT = 8080;

app.listen(PORT,()=>(console.log(`servidor corriendo en puerto ${PORT}`)))

app.get('/',(req,res)=>res.send("HOME "))

app.get('/productos',async (req,res)=>{
    res.send(await prueba.getAll())
})

app.get('/productoRandom',async(req,res)=>{
    const max =( await prueba.getAll())
    res.send(await prueba.getById(getIDRandom(1, max.length)))
})