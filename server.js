const express = require('express')
const handlebars = require('express-handlebars');
const {Server:HttpServer}=require('http')
const {Server: IOServer}=require('socket.io')

const messages =[]

const app = express()
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine(
    "hbs",
    handlebars.engine({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir:__dirname+'/views/layouts'
    })

)

app.set('view engine','hbs');
app.set('views','./views')

app.get('/chat', (req, res) => {
    res.render('main');
  });


ioServer.on('connection',(socket)=>{
    
    socket.emit('messages',messages)
    
    socket.on('new_message',(mensaje)=>{
        messages.push(mensaje)
        ioServer.sockets.emit('messages',messages)
    })
    
});

httpServer.listen(3000, ()=>console.log("servidor corriendo en puerto 3000"))