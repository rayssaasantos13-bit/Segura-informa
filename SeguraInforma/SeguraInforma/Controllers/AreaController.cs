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
    }
}
