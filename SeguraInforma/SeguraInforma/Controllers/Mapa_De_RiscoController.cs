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


                if (!usuarioLogado.Cargo.Trim().Equals("Gestão"))
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
        public IActionResult AtualizarMapa(int id, Mapa_De_Risco mapa_de_risco)
        {


            var sessaoUsuario = "1";
            if (sessaoUsuario == null)
            {
                return Unauthorized("Faça login Antes");
            }
            var usuarioLogado = _context.Usuarios.Find(int.Parse(sessaoUsuario));
            if (usuarioLogado != null)
            {


                if (!usuarioLogado.Cargo.Trim().Equals("Gestão"))
                {
                    return Unauthorized("Apenas gestores podem deletar.");
                }
            }

            var mapaBanco = _context.Mapa_De_Risco.Find(id);
            if (mapaBanco == null)
            {
                return NotFound("O Mapa de Risco não existe no banco!");
            }
            mapaBanco.Descricao = mapa_de_risco.Descricao;
            mapaBanco.Data_Criacao = mapa_de_risco.Data_Criacao;
            mapaBanco.Data_Atualizacao = mapa_de_risco.Data_Atualizacao;
           


            _context.SaveChanges();
            return Ok("Atualizado");


            
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
                .Where(m => m.Fk_Area_Id_Area == idArea && m.Nome_Foto != null)
                .OrderByDescending(m => m.Id_Mapa)
                .FirstOrDefault();

            if (mapa == null)
            {
                return NotFound("Nenhum mapa encontrado para esta área.");
            }

            var nomeArquivo = Path.GetFileName(mapa.Nome_Foto);

            mapa.Nome_Foto = $"{Request.Scheme}://{Request.Host}/uploads/{nomeArquivo}";

            return Ok(mapa);
        }

        [HttpGet("{id}")]
        public IActionResult BuscarMapaPorId(int id)
        {
            var mapa = _context.Mapa_De_Risco
                .FirstOrDefault(m => m.Id_Mapa == id);


            if (mapa == null)
            {
                return NotFound("Mapa não encontrado.");
            }


            if (mapa.Nome_Foto != null)
            {
                mapa.Nome_Foto =
                $"{Request.Scheme}://{Request.Host}/uploads/{mapa.Nome_Foto}";
            }


            return Ok(mapa);
        }
    }
}
