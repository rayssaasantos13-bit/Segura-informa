using System.ComponentModel.DataAnnotations;

namespace SeguraInforma.Models
{
    public class Area_Contem_Risco
    {
        [Key]
        public int Fk_Area_Id_Area { get; set; }
        public int Fk_Int_Risco { get; set; }
    }
}
