using Microsoft.AspNetCore.Mvc;
using SeguraInforma.Data;
using SeguraInforma.Models;
namespace SeguraInforma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Mapa_De_RiscoController : ControllerBase
    {
        private readonly SeguraInformaContext _context;
        public Mapa_De_RiscoController(SeguraInformaContext context)
        {
            _context = context;
        }


        [HttpGet("areasMapa")]
        public IActionResult AreasMapa( string nomeArea)
        {
            var resultado = from m in _context.Mapa_De_Risco
                            join a in _context.Area
                            on m.Fk_Area_Id_Area equals a.Id_Area
                            where a.Nome_Area == nomeArea
                            select new
                            {
                                Mapa = m.Id_Mapa, m.Descricao,
                                Area = a.Nome_Area
                            };

            return Ok(resultado.ToList());
        }
        [HttpPost]

        public IActionResult CadastrarRisco(Mapa_De_Risco mapa_de_risco)
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

            _context.Add(mapa_de_risco);
            _context.SaveChanges();
            return Created("", mapa_de_risco);
        }


        [HttpDelete("{id}")]
        public IActionResult DeletarMapa(int id)

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

            var mapaBanco = _context.Mapa_De_Risco.Find(id);
            if (mapaBanco == null)
            {
                return NotFound("Não encontrado");
            }
            _context.Remove(mapaBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }


        [HttpPut("{id}")]
        public IActionResult AtualizarMapa(int id, Mapa_De_Risco mapa_de_risco)
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

            var mapaBanco = _context.Mapa_De_Risco.Find(id);
            if (mapaBanco == null)
            {
                return NotFound("Mapa não existe no banco!");
            }
            mapaBanco.Descricao = mapa_de_risco.Descricao;
            mapaBanco.Data_Criacao = mapa_de_risco.Data_Criacao;
            mapaBanco.Data_Atualizacao = mapa_de_risco.Data_Atualizacao;
           


            _context.SaveChanges();
            return Ok("Atualizado");
        }


    }
}
