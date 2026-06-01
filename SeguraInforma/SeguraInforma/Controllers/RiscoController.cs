using Microsoft.AspNetCore.Mvc;
using SeguraInforma.Data;
using SeguraInforma.Models;
namespace SeguraInforma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RiscoController : ControllerBase
    {
        private readonly SeguraInformaContext _context;
        public RiscoController(SeguraInformaContext context)
        {
            _context = context;
        }


        [HttpPost]
        public IActionResult CadastraRisco(Risco risco)
        {

            /*var sessaoUsuario = HttpContext.Session.GetString("IdLogado");
            if (sessaoUsuario == null)
            {
                return Unauthorized("Faça login antes");
            }

            var usuarioLogado = _context.Usuarios.Find(int.Parse(sessaoUsuario));

            if (usuarioLogado.Cargo != "Gestor")
            {
                return Unauthorized("Apenas gestores podem cadastrar riscos.");
            }*/

            var idLogado = Request.Cookies["IdLogado"];
            if (idLogado != null)
                risco.Id_Usuario = int.Parse(idLogado);

            _context.Add(risco);
            _context.SaveChanges();
            return Created("", risco);
        }


    }
}

