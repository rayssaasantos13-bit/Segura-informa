using Microsoft.AspNetCore.Mvc;
using SeguraInforma.Data;
using SeguraInforma.Models;
namespace SeguraInforma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly SeguraInformaContext _context;
        public UsuarioController(SeguraInformaContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(Usuario usuario)
        {
            var usuarioBanco = _context.Usuarios.Where
                (u => u.Email.Equals(usuario.Email) &&
                u.Senha.Equals(usuario.Senha)).ToList();
            if (usuarioBanco.Count == 0)
            {
                return Unauthorized("Email ou senha incorretos!");
            }
            HttpContext.Session.SetString("IdLogado", usuarioBanco[0].Id_Usuario.ToString());
            Response.Cookies.Append("IdLogado", usuarioBanco[0].Id_Usuario.ToString(),
                 new CookieOptions
                 {
                     HttpOnly = true,
                     Secure = true,
                     SameSite = SameSiteMode.None
                 });
            return Ok(usuarioBanco[0].Cargo.Trim());
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            Response.Cookies.Delete("IdLogado");
            Response.Cookies.Delete(".AspNetCore.Session");
            return Ok("logout realizado!");
        }

        [HttpPost]
        public IActionResult CadastraUsuario(Usuario usuario)
        {
            _context.Add(usuario);
            _context.SaveChanges();
            return Created("", usuario);
        }


        [HttpDelete("{id}")]
        public IActionResult DeletaUsuario(int id)

        {
            var idLogado = HttpContext.Session.GetString("IdLogado");
            if (idLogado == null)
            {
                return Unauthorized("Faça o login antes");
            }
            var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));
            if (usuarioLogado != null)
            {
           

                if (!usuarioLogado.Cargo.Trim().Equals("Gestão"))
                {
                    return Unauthorized("Apenas gestores podem deletar usuários.");
                }
            }
    
            var usuarioBanco = _context.Usuarios.Find(id);
            if (usuarioBanco == null)
            {
                return NotFound("Usuario não encontrado");
            }
            _context.Remove(usuarioBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }
        [HttpGet("perfil")]
        public IActionResult Perfil()
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (idLogado == null)
                return Unauthorized("Faça login.");

            var usuario = _context.Usuarios.Find(int.Parse(idLogado));

            if (usuario == null)
                return NotFound();

            return Ok(new
            {
                usuario.Id_Usuario,
                usuario.Nome,
                usuario.Email,
                usuario.Cargo
            });
        }

        [HttpGet]
        private static IActionResult ListarUsuarios(UsuarioController @this)
        {
            var lista = @this._context.Usuarios.ToList();

            return @this.Ok(lista);
        }
    }

   /*somos as mais mais!!!! <33333 wow
    safadinhas gostosinhas */
}
    

