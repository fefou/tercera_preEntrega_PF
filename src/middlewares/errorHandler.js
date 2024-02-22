
export const errorHandler = (error, req, res, next) => {

    if (error) {
        if (error.code) {
            console.log(`Error:${error.name}-code:${error.code} Detalle:${error.descripcion}`)
            res.setHeader('Content-Type', 'application/json')
            res.status(error.code).json({ error: `${error.name},${error.message}` })
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(500).json({ ERROR: 'Error inesperado, intente mas tarde' })
        }
    }
    next()
}

