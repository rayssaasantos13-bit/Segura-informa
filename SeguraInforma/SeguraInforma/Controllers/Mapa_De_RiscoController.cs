using Microsoft.AspNetCore.Mvc;
using SeguraInforma.Data;
using SeguraInforma.Models;
namespace SeguraInforma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Mapa_De_RiscoController : ControllerBase
    {
        private readonly SeguraInformaContext _context;
        public Mapa_De_RiscoController(SeguraInformaContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CriarMapadeRisco([FromForm] Mapa_De_Risco mapa)
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");
            if (idLogado == null)
            {
                return Unauthorized("Faça o login antes");
            }
            var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));
            if (usuarioLogado != null)
            {


                if (!usuarioLogado.Cargo.Trim().Equals("Gestão"))
                {
                    return Unauthorized("Apenas gestores podem cadastrar.");
                }
            }

            //Mapa_De_Risco mapa_de_risco = new Mapa_De_Risco(mapa.Id_Mapa, mapa.Descricao, mapa.Data_Criacao, mapa.Data_Atualizacao, mapa.Fk_Usuario_Id_Usuario, mapa.Fk_Area_Id_Area, mapa.Nome_Foto);
            Mapa_De_Risco mapa_de_risco = mapa;
            var usuario = HttpContext.Session.GetString("IdLogado");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            mapa_de_risco.ArquivoFoto = mapa.ArquivoFoto;

            if (mapa_de_risco.ArquivoFoto != null)
            {
                var nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(mapa_de_risco.ArquivoFoto.FileName);

                var pastaUploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                if (!Directory.Exists(pastaUploads))
                {
                    Directory.CreateDirectory(pastaUploads);
                }

                var caminhoArquivo = Path.Combine(pastaUploads, nomeArquivo);

                using (var stream = new FileStream(caminhoArquivo, FileMode.Create))
                {
                    await mapa_de_risco.ArquivoFoto.CopyToAsync(stream);
                }

                mapa_de_risco.Nome_Foto = nomeArquivo;
                mapa_de_risco.Fk_Usuario_Id_Usuario = int.Parse(usuario);
            }

            _context.Add(mapa_de_risco);
            _context.SaveChanges();
            return Created("Teste", mapa_de_risco);
        }
       

        [HttpGet("areasMapa")]
        public IActionResult AreasMapa( string nomeArea)
        {
            var resultado = from m in _context.Mapa_De_Risco
                            join a in _context.Area
                            on m.Fk_Area_Id_Area equals a.Id_Area
                            where a.Nome_Area == nomeArea
                            select new
                            {
                                Mapa = m.Id_Mapa, m.Descricao,
                                Area = a.Nome_Area
                            };

            return Ok(resultado.ToList());
        }

        [HttpGet]
        public IActionResult BuscaMapadeRisco()

        {
            var mapa_de_risco = _context.Mapa_De_Risco.ToList();

            for (int i = 0; i < mapa_de_risco.Count; i++)
            {

                var pastaBase = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
                var caminho = Path.Combine(pastaBase, mapa_de_risco[i].Nome_Foto);
                var nomeArquivo = Path.GetFileName(mapa_de_risco[i].Nome_Foto);
                mapa_de_risco[i].Nome_Foto = $"{Request.Scheme}://{Request.Host}/uploads/{nomeArquivo}";
            }
            return Ok(mapa_de_risco);
        }

         /*[HttpPost]

         public IActionResult CadastrarRisco(Mapa_De_Risco mapa_de_risco)
         {
             var idLogado = HttpContext.Session.GetString("IdLogado");
             if (idLogado == null)
             {
                 return Unauthorized("Faça o login antes");
             }
             var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));
             if (usuarioLogado != null)
             {


                 if (!usuarioLogado.Cargo.Trim().Equals("gestao"))
                 {
                     return Unauthorized("Apenas gestores podem cadastrar.");
                 }
             }

             _context.Add(mapa_de_risco);
             _context.SaveChanges();
             return Created("", mapa_de_risco);
         */


        [HttpDelete("{id}")]
        public IActionResult DeletarMapa(int id)

        {
            var idLogado = HttpContext.Session.GetString("IdLogado");
            if (idLogado == null)
            {
                return Unauthorized("Faça o login antes");
            }
            var usuarioLogado = _context.Usuarios.Find(int.Parse(idLogado));
            if (usuarioLogado != null)
            {


                if (!usuarioLogado.Cargo.Trim().Equals("Gestão", StringComparison.OrdinalIgnoreCase))
                {
                    return Unauthorized("Apenas gestores podem deletar.");
                }
            }

            var mapaBanco = _context.Mapa_De_Risco.Find(id);
            if (mapaBanco == null)
            {
                return NotFound("Não encontrado");
            }
            _context.Remove(mapaBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }


        [HttpPut("{id}")]
        public IActionResult AtualizarMapa(int id, [FromForm] Mapa_De_Risco mapa)
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (idLogado == null)
            {
                return Unauthorized("Faça login antes.");
            }

            var usuario = _context.Usuarios.Find(int.Parse(idLogado));

            if (usuario == null || !usuario.Cargo.Trim().Equals("Gestão"))
            {
                return Unauthorized("Apenas gestores podem atualizar.");
            }

            var mapaBanco = _context.Mapa_De_Risco.Find(id);

            if (mapaBanco == null)
            {
                return NotFound("Mapa não encontrado.");
            }

            mapaBanco.Descricao = mapa.Descricao;
            mapaBanco.Data_Criacao = mapa.Data_Criacao;
            mapaBanco.Data_Atualizacao = mapa.Data_Atualizacao;
            mapaBanco.Fk_Area_Id_Area = mapa.Fk_Area_Id_Area;

            if (mapa.ArquivoFoto != null)
            {
                var pasta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                if (!Directory.Exists(pasta))
                {
                    Directory.CreateDirectory(pasta);
                }

                var nomeArquivo = Guid.NewGuid() + Path.GetExtension(mapa.ArquivoFoto.FileName);

                var caminho = Path.Combine(pasta, nomeArquivo);

                using (var stream = new FileStream(caminho, FileMode.Create))
                {
                    mapa.ArquivoFoto.CopyTo(stream);
                }

                mapaBanco.Nome_Foto = nomeArquivo;
            }

            _context.SaveChanges();

            return Ok("Mapa atualizado com sucesso.");
        }
        [HttpGet("AreasComMapa")]
        public IActionResult AreasComMapa()
        {
            var areas = (from mapa in _context.Mapa_De_Risco
                         join area in _context.Area
                         on mapa.Fk_Area_Id_Area equals area.Id_Area
                         select new
                         {
                             area.Id_Area,
                             area.Nome_Area
                         })
                         .Distinct()
                         .ToList();

            return Ok(areas);
        }
        [HttpGet("BuscarPorArea/{idArea}")]
        public IActionResult BuscarPorArea(int idArea)
        {
            var mapa = _context.Mapa_De_Risco
                .Where(m => m.Fk_Area_Id_Area == idArea)
                .OrderByDescending(m => m.Id_Mapa)
                .FirstOrDefault();

            if (mapa == null)
                return NotFound("Nenhum mapa encontrado.");

            var area = _context.Area
                .FirstOrDefault(a => a.Id_Area == idArea);

            var riscos = (from ar in _context.Area_Contem_Risco
                          join r in _context.Risco
                            on ar.Fk_Id_Risco equals r.Id_Risco
                          where ar.Fk_Area_Id_Area == idArea
                          select new
                          {
                              r.Tipo_Risco,
                              r.Grau_Risco,
                              r.Descricao
                          }).ToList();

            var nomeArquivo = Path.GetFileName(mapa.Nome_Foto);

                return Ok(new
                {
                    mapa.Id_Mapa,
                    mapa.Descricao,
                    mapa.Data_Criacao,
                    mapa.Data_Atualizacao,

                    Nome_Foto = $"{Request.Scheme}://{Request.Host}/uploads/{nomeArquivo}",

                    NomeArea = area?.Nome_Area,
                    DescricaoArea = area?.Descricao,

                    Riscos = riscos
               
        });
        }

       [HttpGet("{id}")]
public IActionResult BuscarMapaPorId(int id)
{
    var mapa = _context.Mapa_De_Risco
        .FirstOrDefault(m => m.Id_Mapa == id);

    if (mapa == null)
        return NotFound();

    var area = _context.Area
        .FirstOrDefault(a => a.Id_Area == mapa.Fk_Area_Id_Area);

    return Ok(new
    {
        mapa.Id_Mapa,
        mapa.Descricao,
        mapa.Data_Criacao,
        mapa.Data_Atualizacao,
        mapa.Nome_Foto,

        Fk_Area_Id_Area = mapa.Fk_Area_Id_Area,

        NomeArea = area?.Nome_Area,
        DescricaoArea = area?.Descricao
    });
}

    }
}
