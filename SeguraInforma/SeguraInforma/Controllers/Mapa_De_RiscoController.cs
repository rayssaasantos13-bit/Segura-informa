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
    }
}
