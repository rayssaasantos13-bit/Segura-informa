using Microsoft.AspNetCore.Mvc;
using SeguraInforma.Data;
using SeguraInforma.Models;

namespace SeguraInforma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Area_Contem_RiscoController : ControllerBase
    {

        private readonly SeguraInformaContext _context;


        public Area_Contem_RiscoController(SeguraInformaContext context)
        {
            _context = context;
        }



        [HttpPost]
        public IActionResult Criar(Area_Contem_Risco relacao)
        {
            if (relacao.Fk_Area_Id_Area <= 0)
            {
                return BadRequest("Id da área inválido");
            }


            if (relacao.Fk_Id_Risco <= 0)
            {
                return BadRequest("Id do risco inválido");
            }


            _context.Area_Contem_Risco.Add(relacao);

            _context.SaveChanges();


            return Ok(relacao);
        }

    }

    }

