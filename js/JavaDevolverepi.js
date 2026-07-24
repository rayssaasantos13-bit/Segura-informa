window.onload = function(){

    carregarDevolucoesFuncionario();

};



function carregarDevolucoesFuncionario(){


fetch("https://localhost:7175/Entrega_Epi/minhas-devolucoes",
{
    credentials:"include"
})


.then(res=>res.json())


.then(lista=>{


    console.log("MINHAS DEVOLUÇÕES:", lista);



    const uso =
    document.getElementById("listaUso");


    const solicitadas =
    document.getElementById("listaSolicitadas");


    const finalizadas =
    document.getElementById("listaFinalizadas");



    uso.innerHTML="";
    solicitadas.innerHTML="";
    finalizadas.innerHTML="";



lista.forEach(e=>{


    // EPIs que ainda estão com o funcionário
    if(e.aceito === true && e.solicitou_Devolucao !== true)
    {


        uso.innerHTML += `

        <tr>

        <td>${e.epi}</td>

        <td>${formatarData(e.data_Entrega)}</td>

        <td>

        <button onclick="solicitarDevolucao(${e.id_Entrega_EPI})">
        Solicitar devolução
        </button>

        </td>

        </tr>

        `;

    }



    // Devolução enviada para gestão
    else if(
        e.solicitou_Devolucao === true &&
        e.estado_Epi == null
    )
    {


        solicitadas.innerHTML += `

        <tr>

        <td>${e.epi}</td>

        <td>${formatarData(e.data_Devolucao)}</td>

        <td>
        Aguardando gestão
        </td>

        </tr>

        `;


    }



    // Devolução finalizada
    else if(e.estado_Epi != null)
    {


        finalizadas.innerHTML += `

        <tr>

        <td>${e.epi}</td>

        <td>${e.estado_Epi}</td>

        <td>${e.destino_Epi}</td>

        </tr>

        `;


        }



        // pediu devolução, esperando gestão
        else if(
            e.solicitou_Devolucao == true &&
            e.estado_Epi == null
        )
        {


            solicitadas.innerHTML += `

            <tr>

            <td>${e.epi}</td>

            <td>${formatarData(e.data_Devolucao)}</td>

            <td>
            Aguardando avaliação da gestão
            </td>


            </tr>

            `;


        }



        // já foi avaliado
        else if(e.estado_Epi != null)
        {


            finalizadas.innerHTML += `

            <tr>

            <td>${e.epi}</td>

            <td>${e.estado_Epi}</td>

            <td>${e.destino_Epi}</td>


            </tr>

            `;


        }



    });



})

.catch(erro=>{

    console.log(erro);

 Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao carregar devoluções.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

});


}





function solicitarDevolucao(id){



fetch(
`https://localhost:7175/Entrega_Epi/solicitar-devolucao/${id}`,
{

method:"PUT",

credentials:"include"

}

)


.then(res=>res.text())


.then(msg=>{


Swal.fire({
    icon: "success",
    title: "Solicitação enviada!",
    text: msg,
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});


carregarDevolucoesFuncionario();


});


}




function formatarData(data){


if(!data)
{
    return "-";
}


let d = new Date(data);


return d.toLocaleDateString("pt-BR");


}