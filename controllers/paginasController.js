import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js'

const paginaInicio = async (req, res) => {
  // Consultar tres viajes del modelo viajes
  // Y tres testimoniales del modelo testimoniales
  const promiseDB = [];
  promiseDB.push(Viaje.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({limit: 3}));
  try {
    const resultado = await Promise.all(promiseDB);
    res.render('inicio', {
      tituloPagina: "Inicio",
      clase: 'home',
      viajes: resultado[0],
      testimoniales: resultado[1],
    })
  } catch (error) {
    console.log(error);
  }
}
const paginaNosotros = (req, res) => {
  res.render('nosotros', {
    tituloPagina: "Nosotros"
  })
}
const paginaViajes = async (req, res) => {
  // Consultar DB
  try {
    const viajes = await Viaje.findAll();
    res.render('viajes', {
      tituloPagina: "Próximos Viajes",
      viajes,
    })
  } catch (error) {
    console.log(error);
  }
  
}
const paginaTestimoniales = async (req, res) => {
  try {
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales', {
      tituloPagina: "Testimoniales",
      testimoniales,
    })
  } catch (error) {
    console.log(error);
  }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;
  try {
    const viaje = await Viaje.findOne({ where: { slug } });
    res.render('infoViaje', {
      tituloPagina: 'Información Viaje',
      viaje,
    })
  } catch (error) {
    console.log(error);
  }
}



export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje
}