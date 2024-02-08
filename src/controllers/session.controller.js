export class SessionsController {
  constructor() {}

  static async login(req, res) {
    console.log(req.user);

    req.session.usuario = {
      nombre: req.user.first_name,
      email: req.user.email,
      rol: req.user.rol,
    };

    res.redirect(
      `/realtimeproducts?mensajeBienvenida=Bienvenido ${req.user.first_name}, su rol es ${req.user.rol}`
    );
  }

  static async register(req, res) {
    let { email } = req.body;

    res.redirect(`/login?mensaje=Usuario ${email}registrado correctamente`);
  }

  static async errorLogin(req, res) {
    return res.redirect("/login?error=Error en el proceso de login");
  }

  static async errorRegistro(req, res) {
    return res.redirect("/register?error=Error en el proceso de registro");
  }

  static async logout(req, res) {
    req.session.destroy((error) => {
      if (error) {
        return res.redirect("/?error=Error al cerrar sesión");
      }
      res.redirect("/login");
    });
  }
}
