const express = require('express');
const app = express();
const router = require('./src/router/index.js');
const port = 8080;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api', router);

app.use((req, res) => {
        res.json({
            error: '-2', 
            description: `ruta ${req.originalUrl} metodo ${req.method} no implementada`
        });
    });


app.listen(8080, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
});
