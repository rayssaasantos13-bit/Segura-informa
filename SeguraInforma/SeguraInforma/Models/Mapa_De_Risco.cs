using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string Nome_Foto { get; set; }

        [NotMapped]
        public IFormFile? ArquivoFoto { get; set; }

       /* public Mapa_De_Risco(int id_Mapa, string descricao, DateOnly data_Criacao, DateOnly data_Atualizacao, int fk_Usuario_Id_Usuario, int fk_Area_Id_Area, string nome_Foto)
        {
            Id_Mapa = id_Mapa;
            Descricao = descricao;
            Data_Criacao = data_Criacao;
            Data_Atualizacao = data_Atualizacao;
            Fk_Usuario_Id_Usuario = fk_Usuario_Id_Usuario;
            Fk_Area_Id_Area = fk_Area_Id_Area;
            Nome_Foto = nome_Foto;
        }*/
    }
}
