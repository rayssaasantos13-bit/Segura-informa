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
    }
}
