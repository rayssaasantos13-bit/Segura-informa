using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace SeguraInforma.Models
{
    [PrimaryKey(nameof(Fk_Area_Id_Area), nameof(Fk_Id_Risco))]
    public class Area_Contem_Risco
    {
        
        public int Fk_Area_Id_Area { get; set; }
        public int Fk_Id_Risco { get; set; }
    }
}
