import passport from 'passport'
import local from 'passport-local'
import { usuariosModelo } from '../dao/models/users.model.js'
import { creaHash } from '../utils.js'
import { validaPassword } from '../utils.js'
import github from 'passport-github2'
import { cartsModelo } from '../dao/models/carts.model.js'

export const inicializarPassport = () => {

    passport.use('registro', new local.Strategy(
        {
            passReqToCallback: true, usernameField: 'email' //, passwordField: 'clave'
        },
        async (req, username, password, done) => {
            try {
                console.log("estrategia local registro de passport")
                let { first_name, email, age, last_name } = req.body
                if (!first_name || !last_name  || !email || !password || !age) {
                    // return res.redirect('/register?error=Complete todos los datos')
                    return done(null, false)
                }

                let existe = await usuariosModelo.findOne({ email })
                if (existe) {
                    // return res.redirect(`/register?error=El usuario con email ${email} ya existe`)

                    return done(null, false)
                }

                password = creaHash(password)

                let usuario
                try {
                    const newCart = await cartsModelo.create({ products: [] })
                    const cartId = newCart._id
                    usuario = await usuariosModelo.create({ first_name, last_name, age, email, password, cartId })
                    // res.redirect(`/login?mensaje=Usuario ${email}registrado correctamente`)
                    return done(null, usuario)
                } catch (error) {
                    // res.redirect(`/register?error=Error inesperado. Reintente en unos minutos`)
                    return done(null, false)
                }


            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('login', new local.Strategy(
        {
            usernameField: 'email'
        },
        async (username, password, done) => {
            try {
               

                if (!username || !password) {
                    // return res.redirect('/login?error=Complete todos los datos')
                    return done(null, false)
                }

                let usuario = await usuariosModelo.findOne({ email: username }).lean()
                if (!usuario) {
                    // return res.redirect(`/login?error=usuario incorrecto`)

                    return done(null, false)
                }
                if (!validaPassword(usuario, password)) {
                    // return res.redirect(`/login?error=password incorrecta`)
                    return done(null, false)

                }
                delete usuario.password
                return done(null, usuario)

            } catch (error) {
                return done(error, null)
            }

        }))


    passport.use('github', new github.Strategy(
        {
            clientID: "Iv1.c0a7875e10a1f075",
            clientSecret: "9ae228d6554c6c3ba9a79a2df25ce6ff053d988a",
            callbackURL: 'http://localhost:3000/api/sessions/callbackGithub'

        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log(profile)

                let usuario = await usuariosModelo.findOne({ email: profile._json.email })

                if (!usuario) {
                    let nuevoUsuario = {
                        first_name: profile._json.name,
                        email: profile._json.email,
                        profile,
                        rol: 'user'
                    }
                    usuario = await usuariosModelo.create(nuevoUsuario)

                }

                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))
    // configurar serialización y deserialización
    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id)
    })

    passport.deserializeUser(async (id, done) => {
        let usuario = await usuariosModelo.findById(id)
        return done(null, usuario)
    })

} // fin inicializador passport