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

        public SeguraInformaContext(DbContextOptions<SeguraInformaContext> options)
            : base(options)
        {

        }

        // COLE O MÉTODO AQUI
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Area>().ToTable("area");

            modelBuilder.Entity<Risco>().ToTable("Risco");

            modelBuilder.Entity<Area_Contem_Risco>().ToTable("area_contem_risco");

            modelBuilder.Entity<Area_Contem_Risco>()
                .HasKey(x => new { x.Fk_Area_Id_Area, x.Fk_Id_Risco });
        }
    }
}