using Microsoft.EntityFrameworkCore;

namespace SeguraInforma.Models
{
    [PrimaryKey(nameof(Fk_Area_Id_Area), nameof(Fk_EPI_Id_Epi))]
    public class Area_Exige_Epi
    {
        
        public int Fk_Area_Id_Area {  get; set; }
        public int Fk_EPI_Id_Epi { get; set; }
    }
}
