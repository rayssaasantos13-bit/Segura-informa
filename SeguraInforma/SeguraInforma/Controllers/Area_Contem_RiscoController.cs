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
    }
}
