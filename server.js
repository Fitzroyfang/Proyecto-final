const express = require('express');
const app = express();
const port = 3001;

const fs = require('fs');
const path = require('path');

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON


// Función para leer todos los archivos JSON de una carpeta
function leerArchivosJson(carpeta) {
    const rutaCompletaCarpeta = path.join(__dirname, carpeta);
    const archivos = fs.readdirSync(rutaCompletaCarpeta);
    const datosArchivos = [];

    archivos.forEach(archivo => {
        if (path.extname(archivo) === '.json') {
            const rutaCompletaArchivo = path.join(rutaCompletaCarpeta, archivo);
            const datos = fs.readFileSync(rutaCompletaArchivo, 'utf8');
            datosArchivos.push(JSON.parse(datos));
        }
    });

    return datosArchivos;
}


app.get('/', (req, res) => {
  res.send('Hola desde el servidor');
});

app.get('/cart', (req, res) => {
    const cart = require("./emercado-api-main/cart/buy.json");
    res.json(cart); // Enviamos todo el array
})

app.get('/cats', (req, res) => {
    const cats = require("./emercado-api-main/cats/cat.json");
    res.json(cats);
})

app.get('/cats_products', (req, res) => {
    const cats_products = leerArchivosJson('emercado-api-main/cats_products');
    res.json(cats_products);
});

app.get('/products', (req, res) => {
    const products = leerArchivosJson('emercado-api-main/products');
    res.json(products);
});

app.get('/products_comments', (req, res) => {
    const products_comments = leerArchivosJson('emercado-api-main/products_comments');
    res.json(products_comments);
})

app.get('/sell', (req, res) => {
    const sell = require("./emercado-api-main/sell/publish.json");
    res.json(sell);
})

app.get('/user_cart', (req, res) => {
    const user_cart = require("./emercado-api-main/user_cart/25801.json");
    res.json(user_cart);
})


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
