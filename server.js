const express=require('express')

const app=express()
const PORT = 8080;


app.listen(PORT,()=>(console.log(`servidor corriendo en puerto ${PORT}`)))

app.get('/',(req,res)=>res.send("HOME "))

app.get('/productos',(req,res)=>{
    res.send("productos")
})