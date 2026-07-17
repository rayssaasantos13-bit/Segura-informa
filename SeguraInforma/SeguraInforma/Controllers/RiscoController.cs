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

        // CADASTRAR
        [HttpPost]
        public IActionResult CadastrarRisco(Risco risco)
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (idLogado == null)
            {
                return Unauthorized("Faça login antes.");
            }


            _context.Risco.Add(risco);

            _context.SaveChanges();


            return Created("", risco);
        }
    
        // LISTAR
        [HttpGet]
        public IActionResult ListarRiscos()
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (string.IsNullOrEmpty(idLogado))
                return Unauthorized("Faça o login antes.");

            var riscos = (from r in _context.Risco
                          join rel in _context.Area_Contem_Risco
                          on r.Id_Risco equals rel.Fk_Id_Risco
                          join a in _context.Area
                          on rel.Fk_Area_Id_Area equals a.Id_Area
                          select new
                          {
                              id_Risco = r.Id_Risco,
                              area = a.Nome_Area,
                              idArea = a.Id_Area,
                              tipo_Risco = r.Tipo_Risco,
                              grau_Risco = r.Grau_Risco,
                              descricao = r.Descricao
                          }).ToList();

            return Ok(riscos);
        }

        // ATUALIZAR
        [HttpPut("{id}")]
        public IActionResult AtualizarRisco(int id, [FromBody] Risco risco)
        {
            var riscoBanco = _context.Risco.Find(id);

            if (riscoBanco == null)
                return NotFound("Risco não encontrado.");

            riscoBanco.Tipo_Risco = risco.Tipo_Risco;
            riscoBanco.Grau_Risco = risco.Grau_Risco;
            riscoBanco.Descricao = risco.Descricao;

            _context.SaveChanges();

            return Ok(riscoBanco);
        }

        // EXCLUIR
        [HttpDelete("{id}")]
        public IActionResult ExcluirRisco(int id)
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (string.IsNullOrEmpty(idLogado))
                return Unauthorized("Faça o login antes.");

            var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));

            if (usuarioLogado == null)
                return Unauthorized("Usuário não encontrado.");

            if (!usuarioLogado.Cargo.Trim().Equals("Gestão", StringComparison.OrdinalIgnoreCase))
                return Unauthorized("Apenas gestores podem excluir.");

            // Remove as relações Área x Risco primeiro
            var relacoes = _context.Area_Contem_Risco
                .Where(x => x.Fk_Id_Risco == id)
                .ToList();

            if (relacoes.Any())
            {
                _context.Area_Contem_Risco.RemoveRange(relacoes);
                _context.SaveChanges();
            }

            // Depois remove o risco
            var risco = _context.Risco.Find(id);

            if (risco == null)
                return NotFound("Risco não encontrado.");

            _context.Risco.Remove(risco);
            _context.SaveChanges();

            return Ok("Risco excluído com sucesso.");
        }
    }
}