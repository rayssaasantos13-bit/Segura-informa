using Microsoft.EntityFrameworkCore;

namespace SeguraInforma.Models

{
    [PrimaryKey(nameof(Fk_Epi_Id_Epi), nameof(Fk_Entrega_Epi_Id_Entrega_Epi))]
    public class Entrega_Tem_Epi
    {
        public int Fk_Epi_Id_Epi { get; set; }
        public int Fk_Entrega_Epi_Id_Entrega_Epi { get; set; }
    }
}
