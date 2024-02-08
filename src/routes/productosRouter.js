// const { Router } = require('express')
// const routerP = Router()
// const productosJSON = require('../json/productos.json')
// const fs = require('fs')
// const path = require('path')
// let ruta = path.join(__dirname, '..', 'json', 'productos.json')
// import productosJSON from '../json/productos.json' assert { type: "json" }
// import { serverSockets } from '../app.js'
// import { productsModelo } from '../dao/models/products.model.js'
// import mongoose from 'mongoose'

import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import __dirname from '../utils.js'
import { ProductosController } from '../controllers/productos.controller.js'

const routerP = Router()
let ruta = path.join(__dirname, 'json', 'productos.json')



function saveProducts(productos) {
    fs.writeFileSync(ruta, JSON.stringify(productos, null, 5))
}



routerP.get('/', ProductosController.getProductos)

routerP.get('/:id', ProductosController.getProductoById)


// POST

routerP.post('/', ProductosController.postProducto)

// UPDATE

routerP.put('/:id', ProductosController.putProducto)


// DELETE 

routerP.delete('/:id', ProductosController.deleteProducto)

export default routerP