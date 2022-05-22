const express=require('express')
const path = require('path')
const app=express()
const PORT = 8080;
const handlebars = require('express-handlebars')



const routersProducts = require('./routes/ProductRoute')
const routersMain = require('./routes/MainRoute');
const {readJson} = require('./controller/helpers');
const plantilla="ejs"

express.static(path.resolve(__dirname, './public'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));



switch (plantilla) {
    case "hbs":
        //plantilla hbs
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
        
        app.get('/productos',async (req,res)=>{
            const productos=    await readJson('db')    
            res.render('main',{productos})
        })
        break;
    case "ejs":
        //   ejs
app.set('view engine','ejs');
app.set('views','./views')

app.get('/productos',async (req,res)=>{
    const productos=    await readJson('db')    
    console.log(productos);
    res.render('main',{productos})
})
    default:
        break;
}





app.use('/',routersMain)






app.use('/api/productos',routersProducts)


app.listen(PORT,()=>(console.log(`servidor corriendo en puerto ${PORT}`)))

