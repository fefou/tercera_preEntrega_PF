import { Router } from "express";
export const router = Router();
import { VistasController } from "../controllers/vistas.controller.js";
import { CarritoController } from "../controllers/carrito.controller.js";

console.log('Registrando las rutas de vistas...');

router.get("/", (req, res) => {
  res.status(200).render("Home");
});


// ------------ AUTH ------------
const auth = (req, res, next) => {
  if (!req.session.usuario) {
    res.redirect("/login");
  }
  next();
};

const authAdmin = (req, res, next) => {
  if (!req.session.usuario || req.session.usuario.rol !== "admin") {
    // mostrar un mensaje que diga que para entrar debes ser admin

    res.redirect("/login");
  }
  next();
};

const authUser = (req, res, next) => {
  if (!req.session.usuario || req.session.usuario.rol !== "user") {
    // mostrar un mensaje que diga que para entrar debes ser user

    res.redirect("/login");
  }
  next();
};
// ------------ AUTH ------------

// ------------ PRODUCTOS ------------
router.get("/realtimeproducts", auth, VistasController.realTimeProducts);

router.get("/realtimeproducts/:pid", auth, VistasController.realTimeProductsById);
// ------------ PRODUCTOS ------------

//  ------------ CHAT ------------

router.get("/chat", authUser, (req, res) => {
  res.status(200).render("chat");
});
//  ------------ CHAT ------------

// ------------ CARRITOS ------------
router.get("/carts", authUser, VistasController.carts);

router.get("/carts/:cid", authUser, VistasController.cartsbyId);

router.post("/:cid/purchase", authUser, CarritoController.comprarCarrito);

// ------------ CARRITO ------------

//  ------------ AGREGAR AL CARRITO ------------
router.post("/carts/:cid/products/:pid", authUser, VistasController.agregarAlCarrito
);

// ------------ AGREGAR AL CARRITO ------------

// ------------ LOGIN ------------
router.get("/login", (req, res) => {
  let { error, mensaje } = req.query;

  res.setHeader("Content-Type", "text/html");
  res.status(200).render("login", { error, mensaje });
});
// ------------ LOGIN ------------

// ------------ REGISTRO ------------
router.get("/register", (req, res) => {
  let { error } = req.query;

  res.setHeader("Content-Type", "text/html");
  res.status(200).render("register", { error });
});
// ------------ REGISTRO ------------

// ------------ PERFIL ------------
router.get("/perfil", auth, (req, res) => {
  let usuario = req.session.usuario;

  res.setHeader("Content-Type", "text/html");
  res.status(200).render("perfil", { usuario });
});
// ------------ PERFIL ------------


// ------------ CARGA PRODUCTOS ------------
router.get("/cargaProductos", authAdmin, VistasController.cargaProductos)


// ------------ CARGA PRODUCTOS ------------
