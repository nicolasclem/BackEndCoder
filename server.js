const express = require('express')
const handlebars = require('express-handlebars');
const {Server:HttpServer}=require('http')
const {Server: IOServer}=require('socket.io')
const knexController = require('./controller/knexController')
const {executeMySql}= require('./schema')



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


const optionsSqlite3 = {
    client: 'sqlite3',
    connection: {
      filename: './db/ecommerce.db'
    }
};

const optionsMySql = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'ecommerce'
    }
};

const knexProducts= new knexController('optionsMySql','products')
const knexMessage= new knexController('optionsSqlite3','messages')


app.get('/chat', (req, res) => {
    res.render('main');
  });


app.get('/', (req, res) => {
    const products = products.getAll();
    res.render('table', { products });
  })



/*webSOCKET*/

ioServer.on('connection', async (socket) => {
  socket.emit('products', knexProducts.getAll());
  socket.emit('messages', await knexMessage.getAll());

  socket.on('new_product', (product) => {
    knexProducts.save(product);
    let products = knexProducts.getAll();
    ioServer.sockets.emit('products', products);
  });

  socket.on('new_message', async (message) => {
    try{
      await knexMessage.save(message);
      let messages = await knexMessage.getAll();
      ioServer.sockets.emit('messages', messages);
    }
    catch(err){
      console.log(`error: ${err}`);
    }
  });

});

executeMySql()
httpServer.listen(3000, ()=>console.log("servidor corriendo en puerto 3000"))