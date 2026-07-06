
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeguraInforma.Models
{
    public class Area
    {
        [Key]
        public int Id_Area { get; set; }
        public string Nome_Area { get; set; }
        public string Descricao { get; set; }

        [NotMapped]
        public List<Area_Contem_Risco> riscos_da_area { get; set; }
    }
}
