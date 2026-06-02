
using System.ComponentModel.DataAnnotations;

namespace SeguraInforma.Models
{
    public class Area
    {
        [Key]
        public int Id_Area { get; set; }
        public string Nome_Area { get; set; }
        public int Descricao { get; set; }
    }
}
