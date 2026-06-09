using Microsoft.EntityFrameworkCore;
using SeguraInforma.Models;

namespace SeguraInforma.Data
{
    public class SeguraInformaContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
       public DbSet<Risco> Risco { get; set; }
       public DbSet<Mapa_De_Risco> Mapa_De_Risco { get; set; }
       public DbSet<Epi> EPI { get; set; }
       public DbSet<Entrega_Tem_Epi> Entrega_Tem_Epi { get; set; }
       public DbSet<Entrega_epi> Entrega_Epi { get; set; }
      public DbSet<Area_Exige_Epi> Area_Exige_Epi { get; set; }
       public DbSet<Area_Contem_Risco> Area_Contem_Risco { get; set; }
       public DbSet<Area> Area { get; set; }


        public SeguraInformaContext(DbContextOptions<SeguraInformaContext> options) : base(options)
        {

        }
    }
}