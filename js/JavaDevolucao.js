window.onload = function(){

    carregarDevolucoes();

}


function carregarDevolucoes(){

    fetch("https://localhost:7175/Entrega_Epi/devolucoes",
    {
        credentials:"include"
    })

    .then(res=>res.json())

    .then(lista=>{

       


        const pendentes =
        document.getElementById("listaPendentes");


        const avaliadas =
        document.getElementById("listaAvaliadas");


        pendentes.innerHTML = "";

        avaliadas.innerHTML = "";



        lista.forEach(d=>{


            let data = d.data_Devolucao ?? "-";



            if(d.status === "Aguardando avaliação")
            {


                pendentes.innerHTML += `

                <tr>

                    <td>
                        ${d.id_Entrega_EPI}
                    </td>


                    <td>
                        ${d.funcionario}
                    </td>


                    <td>
                        ${d.epi}
                    </td>


                    <td>
                        ${d.quantidade}
                    </td>


                    <td>
                        ${data}
                    </td>


                    <td>
                        ${d.status}
                    </td>


                    <td>

                        <button onclick="avaliar(${d.id_Entrega_EPI})">
                            Avaliar
                        </button>

                    </td>


                </tr>

                `;


            }

            else
            {


                avaliadas.innerHTML += `

                <tr>

                    <td>
                        ${d.id_Entrega_EPI}
                    </td>


                    <td>
                        ${d.funcionario}
                    </td>


                    <td>
                        ${d.epi}
                    </td>


                    <td>
                        ${d.quantidade}
                    </td>


                    <td>
                        ${data}
                    </td>


                    <td>
                        ${d.status}
                    </td>


                </tr>

                `;


            }


        });


    })


    .catch(erro=>{

        console.log(erro);

        alert("Erro ao carregar devoluções");

    });


}



// ============================
// ABRIR MODAL
// ============================

function avaliar(id){

    document.getElementById("idDevolucao").value = id;


    document.getElementById("modalAvaliacao")
    .style.display = "flex";

}



// ============================
// SALVAR AVALIAÇÃO
// ============================

function salvarAvaliacao(){


const id =
document.getElementById("idDevolucao").value;


const estado =
document.getElementById("estado").value;


const destino =
document.getElementById("destino").value;

const observacao =
document.getElementById("observacao").value;
if(observacao.trim() === ""){

    alert("Digite uma descrição da avaliação.");

    return;

}


fetch(
`https://localhost:7175/Entrega_Epi/avaliar-devolucao/${id}?estado=${estado}&destino=${destino}&observacao=${observacao}`,
{

method:"PUT",

credentials:"include"

}

)


.then(res=>res.text())


.then(msg=>{


alert(msg);


document.getElementById("modalAvaliacao")
.style.display="none";


carregarDevolucoes();


});


}
