using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeguraInforma.Models
{
    public class Epi
    {
        [Key]
        public int Id_epi { get; set; }
        public string Nome { get; set; }
        public int Qntd_Estoque { get; set; }
        public string Descricao { get; set; }
        public int Numero_Ca { get; set; }


        [NotMapped]
        public List<Area_Exige_Epi> exige_epi { get; set; }

    }
}
