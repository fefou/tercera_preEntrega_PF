import { CustomError } from "../utils/customErrors.js";
import { STATUS_CODES } from "../utils/errorStatusCodes.js";
import { errorLogin } from "../utils/errores.js";


export function authRoles(permisos = []) {
    return function (req, res, next) {
        if (!req.session.usuario || req.session.usuario == undefined) {
            throw CustomError.CustomError("Error de login", "Debes loguearte para acceder", STATUS_CODES.ERROR_AUTENTICACION, errorLogin())
        }
        if (req.user.rol == permisos[0]) {
            return next()
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(403).json("No tiene permisos necesarios")
        }

    }

}