using System.ComponentModel.DataAnnotations;

namespace SeguraInforma.Models
{
    public class Epi
    {
        [Key]
        public int Id_epi { get; set; }
        public string Nome { get; set; }
        public int Qntd_Estoque { get; set; }
        public string Descricao { get; set; }
        
    }
}
