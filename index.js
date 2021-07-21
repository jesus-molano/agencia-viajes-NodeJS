import express from "express";
import router from "./routes/index.js"
import db from './config/db.js'
import dotenv from 'dotenv';


dotenv.config({ path: 'variables.env' });

// Asignar ejecucion de express
const app = express();

// Conectar la db
db.authenticate()
  .then(() => console.log('DB conectada'))
  .catch(error => console.log(error));

// Definir puerto y HOST
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

// Habilitar PUG (View Engine)
app.set('view engine', 'pug')

// middleware propio
// Obtener agno actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";
  next();
})

// Agregar body parser para leer datos del form
app.use(express.urlencoded({ extended: true }));

// Definir public
app.use(express.static('public'));

// Agregar router
app.use('/', router);

// Arrancar servidor
app.listen(port, host, () => {
  console.log(`Port: ${port} | Host: ${host}`);
})