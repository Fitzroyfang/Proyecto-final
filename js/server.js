const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON



app.get('/', (req, res) => {
    // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send('Hola desde el servidor');
});

app.get('/cart', (req, res) => {
    res.json(cart); // Enviamos todo el array
})

app.get('/cats', (req, res) => {
    res.json(cats);
})

app.get('/cats_products', (req, res) => {
    res.json(cats_products);
})

app.get('/products', (req, res) => {
    res.json(products);
})

app.get('/products_comments', (req, res) => {
    res.json(products_comments);
})

app.get('/sell', (req, res) => {
    res.json(sell);
})

app.get('/user_cart', (req, res) => {
    res.json(user_cart);
})


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
