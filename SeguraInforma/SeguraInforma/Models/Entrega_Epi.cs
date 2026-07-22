using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeguraInforma.Models
{
    public class Entrega_epi
    {
        [Key]
        public int Id_Entrega_EPI {  get; set; }
        public DateOnly Data_Entrega { get; set; }
        public DateOnly Data_Devolucao { get; set; }
        public int Fk_Usuario_Id_Usuario{ get; set; }
        public bool Aceito { get; set; }
        public bool Solicitou_Devolucao { get; set; }
        public bool? Recebido_Pela_Gestao { get; set; }

        public string? Estado_Epi { get; set; }

        public string? Destino_Epi { get; set; }

        public string? Observacao_Devolucao { get; set; }
        public bool? Devolucao_Processada { get; set; }
       

        [NotMapped]
        public List<Entrega_Tem_Epi> entrega_de_epi { get; set;}
    }
}
