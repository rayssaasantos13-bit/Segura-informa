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

            if (string.IsNullOrEmpty(idLogado))
            {
                return Unauthorized("Faça o login antes.");
            }

            var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));

            if (usuarioLogado == null)
            {
                return Unauthorized("Usuário não encontrado.");
            }

            if (!usuarioLogado.Cargo.Trim().Equals("Gestão", StringComparison.OrdinalIgnoreCase))
            {
                return Unauthorized("Apenas gestores podem cadastrar.");
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
            {
                return Unauthorized("Faça o login antes.");
            }

            return Ok(_context.Risco.ToList());
        }

        // ATUALIZAR
        [HttpPut("{id}")]
        public IActionResult AtualizarRisco(int id, Risco risco)
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (string.IsNullOrEmpty(idLogado))
            {
                return Unauthorized("Faça o login antes.");
            }

            var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));

            if (usuarioLogado == null)
            {
                return Unauthorized("Usuário não encontrado.");
            }

            if (!usuarioLogado.Cargo.Trim().Equals("Gestão", StringComparison.OrdinalIgnoreCase))
            {
                return Unauthorized("Apenas gestores podem atualizar.");
            }

            var riscoBanco = _context.Risco.Find(id);

            if (riscoBanco == null)
            {
                return NotFound("Risco não encontrado.");
            }

            riscoBanco.Tipo_Risco = risco.Tipo_Risco;
            riscoBanco.Grau_Risco = risco.Grau_Risco;
            riscoBanco.Descricao = risco.Descricao;

            _context.SaveChanges();

            return Ok(riscoBanco);
        }

        // EXCLUIR
        [HttpDelete("{id}")]
        public IActionResult DeletarRisco(int id)
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (string.IsNullOrEmpty(idLogado))
            {
                return Unauthorized("Faça o login antes.");
            }

            var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));

            if (usuarioLogado == null)
            {
                return Unauthorized("Usuário não encontrado.");
            }

            if (!usuarioLogado.Cargo.Trim().Equals("Gestão", StringComparison.OrdinalIgnoreCase))
            {
                return Unauthorized("Apenas gestores podem excluir.");
            }

            var riscoBanco = _context.Risco.Find(id);

            if (riscoBanco == null)
            {
                return NotFound("Risco não encontrado.");
            }

            _context.Risco.Remove(riscoBanco);
            _context.SaveChanges();

            return Ok("Risco excluído com sucesso.");
        }
    }
}