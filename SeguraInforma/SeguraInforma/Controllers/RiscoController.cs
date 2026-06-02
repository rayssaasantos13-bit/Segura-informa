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
            var idLogado = HttpContext.Session.GetString("IdLogado");
            if (idLogado == null)
            {
                return Unauthorized("Faça o login antes");
            }
            var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));
            if (usuarioLogado != null)
            {


                if (!usuarioLogado.Cargo.Trim().Equals("gestao"))
                {
                    return Unauthorized("Apenas gestores podem cadastrar.");
                }
            }

            _context.Add(risco);
            _context.SaveChanges();
            return Created("", risco);
        }


        [HttpDelete("{id}")]
        public IActionResult DeletaRisco(int id)

        {
            var idLogado = HttpContext.Session.GetString("IdLogado");
            if (idLogado == null)
            {
                return Unauthorized("Faça o login antes");
            }
            var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));
            if (usuarioLogado != null)
            {
           

                if (!usuarioLogado.Cargo.Trim().Equals("gestao"))
                {
                    return Unauthorized("Apenas gestores podem deletar.");
                }
            }
    
            var riscoBanco = _context.Risco.Find(id);
            if (riscoBanco == null)
            {
                return NotFound("Não encontrado");
            }
            _context.Remove(riscoBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }


        [HttpPut("{id}")]
        public IActionResult AtualizaReserva(int id, Risco risco)
        {


            var sessaoUsuario = HttpContext.Session.GetString("IdLogado");
            if (sessaoUsuario == null)
            {
                return Unauthorized("Faça login Antes");
            }
          /*  var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));
            if (usuarioLogado != null)
            {


                if (!usuarioLogado.Cargo.Trim().Equals("gestao"))
                {
                    return Unauthorized("Apenas gestores podem deletar.");
                }
            }*/

            var riscoDoBanco = _context.Risco.Find(id);
            if (riscoDoBanco == null)
            {
                return NotFound("Risco não existe no banco!");
            }
            riscoDoBanco.Tipo_Risco = risco.Tipo_Risco;
            riscoDoBanco.Grau_Risco = risco.Grau_Risco;
            riscoDoBanco.Descricao = risco.Descricao;
          

            _context.SaveChanges();
            return Ok("Atualizado");
        }
    }


}
    

