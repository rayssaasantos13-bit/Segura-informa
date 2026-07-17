using Microsoft.AspNetCore.Mvc;
using SeguraInforma.Data;
using SeguraInforma.Models;
namespace SeguraInforma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AreaController : ControllerBase
    {
        private readonly SeguraInformaContext _context;
        public AreaController(SeguraInformaContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult CadastrarArea(Area area)
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (idLogado == null)
            {
                return Unauthorized("Faça login antes.");
            }


            _context.Area.Add(area);

            _context.SaveChanges();


            return Created("", area);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarArea(int id)

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

            var areaBanco = _context.Area.Find(id);
            if (areaBanco == null)
            {
                return NotFound("Não encontrado");
            }
            _context.Remove(areaBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }
        [HttpPut("{id}")]
        public IActionResult AtualizarArea(int id, Area area)
        {


            var sessaoUsuario = "1";
            if (sessaoUsuario == null)
            {
                return Unauthorized("Faça login Antes");
            }
            var usuarioLogado = _context.Usuarios.Find(int.Parse(sessaoUsuario));
            if (usuarioLogado != null)
            {


                if (!usuarioLogado.Cargo.Trim().Equals("Gestão"))
                {
                    return Unauthorized("Apenas gestores podem deletar.");
                }
            }

            var areaDoBanco = _context.Area.Find(id);
            if (areaDoBanco == null)
            {
                return NotFound("Área não existe no banco!");
            }
            areaDoBanco.Nome_Area = area.Nome_Area;
            areaDoBanco.Descricao = area.Descricao;



            _context.SaveChanges();
            return Ok("Atualizado");
        }

        [HttpGet]
        public IActionResult ListarAreas()
        {
            var areas = _context.Area.ToList();

            return Ok(areas);
        }
        [HttpGet("RiscosDaArea/{idArea}")]
        public IActionResult RiscosDaArea(int idArea)
        {
            var riscos = (from ar in _context.Area_Contem_Risco
                          join r in _context.Risco
                          on ar.Fk_Id_Risco equals r.Id_Risco
                          where ar.Fk_Area_Id_Area == idArea
                          select new
                          {
                              r.Id_Risco,
                              r.Tipo_Risco,
                              r.Grau_Risco,
                              r.Descricao
                          }).ToList();

            return Ok(riscos);
        }
        [HttpGet("DadosArea/{idArea}")]
        public IActionResult DadosArea(int idArea)
        {
            var area = _context.Area
                .FirstOrDefault(a => a.Id_Area == idArea);

            if (area == null)
                return NotFound();

            var riscos = (from ar in _context.Area_Contem_Risco
                          join r in _context.Risco
                          on ar.Fk_Id_Risco equals r.Id_Risco
                          where ar.Fk_Area_Id_Area == idArea
                          select new
                          {
                              r.Tipo_Risco,
                              r.Grau_Risco,
                              r.Descricao
                          }).ToList();

            return Ok(new
            {
                area.Nome_Area,
                area.Descricao,
                Riscos = riscos
            });
        }
    }

}

