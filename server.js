const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 8080;

express.static(path.resolve(__dirname, './public'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


const routesProducts = require('./src/routes/productsRoutes')
//const routesCart = require('./src/routes/cartRoutes')



app.use('/api/productos',routesProducts)
//app.use('/api/carrito',routesCart)

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
