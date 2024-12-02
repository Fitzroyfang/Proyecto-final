const express = require('express');
const app = express();
const port = 3001;
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "Proyecto_final",
    connectionLimit: 5,
  });

const fs = require('fs');
const path = require('path');

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON
const cors = require('cors');
app.use(cors())

//para generar las claves viene con node.js
const crypto = require('crypto');

app.use("/cart", (req, res, next) =>{
    try {
        const decoded = jwt.verify(req.headers["access-token"], publicKey, {algorithm: 'RS256'});
        console.log(decoded);
        next();
    } catch (err) {
        res.status(401).json({message: "Usuario no autorizado"});
    }
})

const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

// Generar un par de claves RSA
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki', // Estándar de la clave pública
        format: 'pem', // Formato de la clave pública
    },
    privateKeyEncoding: {
        type: 'pkcs8', // Estándar de la clave privada
        format: 'pem', // Formato de la clave privada
    },
});

// Guardar claves
fs.writeFileSync('private.key', privateKey);
fs.writeFileSync('public.key', publicKey);
console.log('Claves generadas y guardadas correctamente');


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


app.post('/login', (req, res) => {
    const user = req.body; 
    let response = {
        message: '',
        User: user,
        Token: null
    };

    console.log('Usuario recibido:', user);

    // Validación de datos
    if (!user.Mail || user.Mail.trim() === "") {
        response.message = "Por favor, ingrese un correo electrónico válido";
        return res.status(400).send(response);
    }

    if (!user.Pass || user.Pass.trim() === "") {
        response.message = "Por favor, ingrese una contraseña válida";
        return res.status(400).send(response);
    }

    try {
        // Leer la clave privada para generar el token
        const privateKey = fs.readFileSync('private.key', 'utf8');
        console.log('Clave privada:', privateKey);

        // Generación del token usando la clave privada
        const token = jwt.sign({ email: user.Mail }, privateKey, {
            algorithm: 'RS256',
            expiresIn: "1h" 
        });

        // Preparar la respuesta con el token generado
        response.message = "Usuario autenticado con éxito";
        response.Token = token;
        response.status=200
        return res.status(200).send(response);
    } catch (error) {
        console.error('Error generando el token:', error);
        response.message = "Error interno del servidor";
        return res.status(500).send(response);
    }
});

app.post("/cart", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO cart(user, item_id, quantity) VALUES(?, ?, ?)`,
        [req.body.user, req.body.item_id, req.body.quantity]
      );
  
      res.json({...req.body });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error de servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
  });

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
