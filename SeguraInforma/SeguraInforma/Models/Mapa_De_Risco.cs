using System.ComponentModel.DataAnnotations;

namespace SeguraInforma.Models
{
    public class Mapa_De_Risco
    {
        [Key]
        public int Id_Mapa { get; set; }
        public string Descricao { get; set; }
        public DateOnly Data_Criacao { get; set; }
        public DateOnly Data_Atualizacao { get; set; }
        public int Fk_Usuario_Id_Usuario { get; set; }
        public int Fk_Area_Id_Area { get; set; }  
    }
}
