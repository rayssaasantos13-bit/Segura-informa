using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeguraInforma.Models
{
    [PrimaryKey(nameof(Fk_Area_Id_Area), nameof(Fk_Id_Risco))]
    [Table("area_contem_risco")]
    public class Area_Contem_Risco
    {
        [Column("fk_area_id_area")]
        public int Fk_Area_Id_Area { get; set; }

        [Column("fk_id_risco")]
        public int Fk_Id_Risco { get; set; }
    }
}