import { Router } from "express";
export const router = Router();
import { VistasController } from "../controllers/vistas.controller.js";

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
// ------------ AUTH ------------

// ------------ PRODUCTOS ------------
router.get("/realtimeproducts", VistasController.realTimeProducts);

router.get(
  "/realtimeproducts/:pid",
  auth,
  VistasController.realTimeProductsById
);
// ------------ PRODUCTOS ------------

//  ------------ CHAT ------------

router.get("/chat", auth, (req, res) => {
  res.status(200).render("chat");
});
//  ------------ CHAT ------------

// ------------ CARRITOS ------------
router.get("/carts", auth, VistasController.carts);

router.get("/carts/:cid", auth, VistasController.cartsbyId);

// ------------ CARRITO ------------

//  ------------ AGREGAR AL CARRITO ------------
router.post(
  "/carts/:cid/products/:pid",
  auth,
  VistasController.agregarAlCarrito
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
