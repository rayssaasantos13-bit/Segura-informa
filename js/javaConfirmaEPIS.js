// ============================
// MENU
// ============================

function toggleMenu() {
    document.getElementById("menuLateral").classList.toggle("ativo");
}




// ========================
// BUSCAR ENTREGAS DO FUNCIONÁRIO LOGADO
// ========================
console.log("JS DA CONFIRMAÇÃO CARREGOU");

function carregarEntregas(){

    fetch("https://localhost:7175/Entrega_Epi/minhas-entregas", {
        method:"GET",
        credentials:"include"
    })

    .then(res => res.json())

    .then(lista => {

        console.log("RETORNO API:", lista);


        const pendentes = document.getElementById("listaPendentes");
        const confirmados = document.getElementById("listaConfirmados");


        pendentes.innerHTML = "";
        confirmados.innerHTML = "";


        lista.forEach(entrega => {


  let botao = "";

if(entrega.aceito == true){

    botao = `
        <button disabled>
            EPI confirmado
        </button>
    `;

}else{

    botao = `
        <button onclick="confirmarEntrega(${entrega.id_Entrega_EPI})">
            Confirmar recebimento
        </button>
    `;

}


let card = `

<div class="card-entrega">

    <h3>
        ${entrega.epi}
    </h3>


    <p>
        Data entrega:
        ${formatarData(entrega.data_Entrega)}
    </p>


    <p>
        Devolução:
        ${formatarData(entrega.data_Devolucao)}
    </p>


    ${botao}

</div>

`;


            if(entrega.aceito == true){

                confirmados.innerHTML += card;

            }else{

                pendentes.innerHTML += card;

            }


        });


    })

    .catch(erro=>{

        console.log("ERRO:", erro);

    });

}




// ========================
// CONFIRMAR RECEBIMENTO
// ========================

function confirmarEntrega(id){



    fetch(
    `https://localhost:7175/Entrega_Epi/confirmar/${id}`,
    {

        method:"PUT",

        credentials:"include"

    })


    .then(res=>{


        if(res.status === 401){

            throw new Error(
            "Você não pode confirmar esta entrega."
            );

        }


        if(!res.ok){

            throw new Error(
            "Erro ao confirmar."
            );

        }


        return res.text();


    })


.then(msg => {

  Swal.fire({
    icon: "success",
    title: "Confirmado!",
    text: "EPI confirmado com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    carregarEntregas();

})

    .catch(erro=>{


        console.log(erro);

       Swal.fire({
    icon: "error",
    title: "Erro!",
    text: erro.message,
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});


    });



}
// ========================
// SOLICITAR DEVOLUÇÃO
// ========================


function solicitarDevolucao(id){


fetch(

`https://localhost:7175/Entrega_Epi/solicitar-devolucao/${id}`,

{

method:"PUT",

credentials:"include"

}

)


.then(res=>{


if(!res.ok){

throw new Error("Erro ao solicitar devolução");

}


return res.text();


})


.then(msg=>{


Swal.fire({
    icon: "success",
    title: "Solicitação enviada!",
    text: msg,
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});


carregarEntregas();


})


.catch(erro=>{


console.log(erro);


Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao solicitar devolução.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

});


}




// ========================
// FORMATAR DATA
// ========================

function formatarData(data){


    if(!data){

        return "";

    }


    let d = new Date(data);


    return d.toLocaleDateString("pt-BR");


}



// ========================
// INICIAR PÁGINA
// ========================


window.onload=function(){

    console.log("WINDOW LOAD OK");

    carregarEntregas();

};
