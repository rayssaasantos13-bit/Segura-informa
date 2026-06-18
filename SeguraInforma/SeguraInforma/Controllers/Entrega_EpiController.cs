using Microsoft.AspNetCore.Mvc;
using SeguraInforma.Data;
using SeguraInforma.Models;

namespace SeguraInforma.Controllers
{
        [ApiController]
        [Route("[controller]")]
        public class Entrega_EpiController : ControllerBase
        {
            private readonly SeguraInformaContext _context;
            public Entrega_EpiController(SeguraInformaContext context)
            {
                _context = context;
            }


            [HttpPost]

            public IActionResult CadastrarEntregaEpi(Entrega_epi entrega_epi)
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


                _context.Add(entrega_epi);
                _context.SaveChanges();


            for (int x = 0; x < entrega_epi.entrega_de_epi.Count; x++)
            {
                entrega_epi.entrega_de_epi[x].Fk_Entrega_Epi_Id_Entrega_Epi = entrega_epi.Id_Entrega_EPI;
            }


            for (int x = 0; x < entrega_epi.entrega_de_epi.Count; x++)
            {
                _context.Add(entrega_epi.entrega_de_epi[x]);

            }
            _context.SaveChanges();
            return Created("", entrega_epi);
            }
            [HttpDelete("{id}")]
            public IActionResult DeletarEntregaEpi(int id)

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
                        return Unauthorized("Apenas gestores podem deletar.");
                    }
                }

                var entregaEpiBanco = _context.Entrega_Epi.Find(id);
                if (entregaEpiBanco == null)
                {
                    return NotFound("Não encontrado");
                }
                _context.Remove(entregaEpiBanco);
                _context.SaveChanges();
                return Ok("Deletado");
            }
            [HttpPut("{id}")]
            public IActionResult AtualizarEpi(int id, Entrega_epi entrega_epi)
            {


                var sessaoUsuario = "1";
                if (sessaoUsuario == null)
                {
                    return Unauthorized("Faça login Antes");
                }
                var usuarioLogado = _context.Usuarios.Find(int.Parse(sessaoUsuario));
                if (usuarioLogado != null)
                {


                    if (!usuarioLogado.Cargo.Trim().Equals("gestao"))
                    {
                        return Unauthorized("Apenas gestores podem deletar.");
                    }
                }

                var entregaEpiBanco = _context.Entrega_Epi.Find(id);
                if (entregaEpiBanco == null)
                {
                    return NotFound("Entrega não existe no banco!");
                }
            entregaEpiBanco.Data_Entrega = entrega_epi.Data_Entrega;
            entregaEpiBanco.Data_Devolucao = entrega_epi.Data_Devolucao;
                        



            _context.SaveChanges();
                return Ok("Atualizado");
            }
        }
    }

