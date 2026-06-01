using Microsoft.AspNetCore.Mvc;
using SeguraInforma.Data;
using SeguraInforma.Models;
namespace SeguraInforma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Entrega_EpiController : ControllerBase
    {
        private readonly SeguraInformaContext _context;
        public Entrega_EpiController(SeguraInformaContext context)
        {
            _context = context;
        }
    }
}
