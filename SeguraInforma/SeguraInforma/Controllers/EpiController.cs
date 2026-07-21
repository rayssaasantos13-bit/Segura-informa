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

        [HttpGet]
        public IActionResult ListarEpis()
        {
            var lista = _context.EPI.ToList();
            return Ok(lista);
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
                if (!usuarioLogado.Cargo.Trim().Equals("Gestão"))
                {
                    return Unauthorized("Apenas gestores podem cadastrar.");
                }
            }

            // Salva o EPI principal no Banco SQL
            _context.Add(EPI);
            _context.SaveChanges();

            // Proteção: Só roda o loop se você tiver enviado dados em 'exige_epi' pela tela
            if (EPI.exige_epi != null && EPI.exige_epi.Count > 0)
            {
                for (int x = 0; x < EPI.exige_epi.Count; x++)
                {
                    EPI.exige_epi[x].Fk_EPI_Id_Epi = EPI.Id_epi;
                }

                for (int x = 0; x < EPI.exige_epi.Count; x++)
                {
                    _context.Add(EPI.exige_epi[x]);
                }
                _context.SaveChanges();
            }

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
                if (!usuarioLogado.Cargo.Trim().Equals("Gestão"))
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
        public IActionResult AtualizarEpi(int id, Epi epi)
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
                    return Unauthorized("Apenas gestores podem atualizar.");
                }
            }
            var epiDoBanco = _context.EPI.Find(id);
            if (epiDoBanco == null)
            {
                return NotFound("EPI não existe no banco!");
            }
            epiDoBanco.Nome = epi.Nome;
            epiDoBanco.Qntd_Estoque = epi.Qntd_Estoque;
            epiDoBanco.Descricao = epi.Descricao;
            epiDoBanco.Numero_Ca = epi.Numero_Ca;
            _context.SaveChanges();
            return Ok("Atualizado");
        }
    }
}