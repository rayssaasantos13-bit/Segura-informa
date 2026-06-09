using Microsoft.AspNetCore.Mvc;
using SeguraInforma.Data;
using SeguraInforma.Models;
namespace SeguraInforma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EpiController : ControllerBase
    {
        private readonly SeguraInformaContext _context;
        public EpiController(SeguraInformaContext context)
        {
            _context = context;
        }


        [HttpPost]

        public IActionResult CadastrarEpi(Epi EPI)
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

            _context.Add(EPI);
            _context.SaveChanges();

            for (int x = 0; x < EPI.exige_epi.Count; x++)
            {
                EPI.exige_epi[x].Fk_EPI_Id_Epi = EPI.Id_epi;
            }


            for (int x = 0; x < EPI.exige_epi.Count; x++)
            {
                _context.Add(EPI.exige_epi[x]);

            }
            _context.SaveChanges();
            return Created("", EPI);
        }
        [HttpDelete("{id}")]
        public IActionResult DeletarEpi(int id)

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

            var epiBanco = _context.EPI.Find(id);
            if (epiBanco == null)
            {
                return NotFound("Não encontrado");
            }
            _context.Remove(epiBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }
        [HttpPut("{id}")]
        public IActionResult AtualizarEpi(int id, Epi epi )
        {


            var sessaoUsuario = "1";
            if (sessaoUsuario == null)
            {
                return Unauthorized("Faça login Antes");
            }
            var usuarioLogado = _context.Usuarios.Find(int.Parse(sessaoUsuario));
            if (usuarioLogado != null)
            {


                if (!usuarioLogado.Cargo.Trim().Equals("gestao"))
                {
                    return Unauthorized("Apenas gestores podem deletar.");
                }
            }

            var epiDoBanco = _context.EPI.Find(id);
            if (epiDoBanco == null)
            {
                return NotFound("Risco não existe no banco!");
            }
            epiDoBanco.Nome = epi.Nome;
            epiDoBanco.Qntd_Estoque = epi.Qntd_Estoque;
            epiDoBanco.Descricao = epi.Descricao;


            _context.SaveChanges();
            return Ok("Atualizado");
        }
    }
}
