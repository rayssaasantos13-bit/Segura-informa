using System.ComponentModel.DataAnnotations;

namespace SeguraInforma.Models
{
    public class Risco
    {
        [Key]
        public int Id_risco { get; set; }
        public string Tipo_Risco { get; set; }
        public string Grau_Risco { get; set; }
        public string Descricao {  get; set; }
        public int Id_Usuario { get; set; }
    }
}
