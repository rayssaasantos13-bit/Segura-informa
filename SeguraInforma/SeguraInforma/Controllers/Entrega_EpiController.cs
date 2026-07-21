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
        public IActionResult CriarEntrega(Entrega_epi entrega)
        {
            // Verifica se veio algum EPI
            if (entrega.entrega_de_epi == null || entrega.entrega_de_epi.Count == 0)
            {
                return BadRequest("Nenhum EPI selecionado.");
            }


            // 1 - Verificar estoque antes de salvar
            foreach (var item in entrega.entrega_de_epi)
            {
                var epiBanco = _context.EPI
                    .FirstOrDefault(e => e.Id_epi == item.Fk_Epi_Id_Epi);


                if (epiBanco == null)
                {
                    return NotFound($"EPI com ID {item.Fk_Epi_Id_Epi} não encontrado.");
                }


                if (item.Quantidade <= 0)
                {
                    return BadRequest("A quantidade deve ser maior que zero.");
                }


                if (item.Quantidade > epiBanco.Qntd_Estoque)
                {
                    return BadRequest(
                        $"Estoque insuficiente para {epiBanco.Nome}. Disponível: {epiBanco.Qntd_Estoque}"
                    );
                }
            }



            // 2 - Salvar a entrega principal
            _context.Entrega_Epi.Add(entrega);

            _context.SaveChanges();



            // 3 - Descontar estoque e salvar os EPIs entregues
            foreach (var item in entrega.entrega_de_epi)
            {

                var epiBanco = _context.EPI
                    .FirstOrDefault(e => e.Id_epi == item.Fk_Epi_Id_Epi);



                // diminui o estoque
                epiBanco.Qntd_Estoque -= item.Quantidade;



                // cria relação entrega x epi
                var entregaEpi = new Entrega_Tem_Epi
                {
                    Fk_Epi_Id_Epi = epiBanco.Id_epi,

                    Fk_Entrega_Epi_Id_Entrega_Epi = entrega.Id_Entrega_EPI,

                    Quantidade = item.Quantidade
                };


                _context.Entrega_Tem_Epi.Add(entregaEpi);
            }



            // Salva desconto e relação
            _context.SaveChanges();



            return Ok(new
            {
                mensagem = "Entrega realizada com sucesso.",
                idEntrega = entrega.Id_Entrega_EPI
            });
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


                if (!usuarioLogado.Cargo.Trim().Equals("Gestão"))
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


                if (!usuarioLogado.Cargo.Trim().Equals("Gestão"))
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


        [HttpGet("minhas-entregas")]
        public IActionResult MinhasEntregas()
        {
            var idLogado = HttpContext.Session.GetString("IdLogado");

            if (idLogado == null)
            {
                return Unauthorized("Faça login");
            }

            /* var entregas = _context.Entrega_Epi
                 .Where(e => e.Fk_Usuario_Id_Usuario == int.Parse(idLogado))
                 .ToList();*/
            var entregas = from e in _context.Entrega_Epi
                           join ete in _context.Entrega_Tem_Epi
                                on e.Id_Entrega_EPI equals ete.Fk_Entrega_Epi_Id_Entrega_Epi
                           join epi in _context.EPI
                                on ete.Fk_Epi_Id_Epi equals epi.Id_epi
                           where e.Fk_Usuario_Id_Usuario == int.Parse(idLogado)
                           select new
                           {
                               Id_Entrega_EPI = e.Id_Entrega_EPI,
                               Aceito = e.Aceito,
                               Data_Entrega = e.Data_Entrega,
                               Data_Devolucao = e.Data_Devolucao,
                               Epi = epi.Nome
                           };

            return Ok(entregas);

        }

        [HttpPut("confirmar/{id}")]
        public IActionResult ConfirmarEntrega(int id)
        {

            var idLogado = HttpContext.Session.GetString("IdLogado");


            if (idLogado == null)
            {
                return Unauthorized("Faça login.");
            }


            var entrega = _context.Entrega_Epi.Find(id);


            if (entrega == null)
            {
                return NotFound();
            }


            if (entrega.Fk_Usuario_Id_Usuario != int.Parse(idLogado))
            {
                return Unauthorized("Essa entrega não pertence a você.");
            }


            entrega.Aceito = true;


            _context.SaveChanges();


            return Ok("Entrega confirmada.");
        }
    }
}

