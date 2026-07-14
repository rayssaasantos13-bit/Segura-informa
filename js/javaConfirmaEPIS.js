// ============================
// MENU
// ============================

function toggleMenu() {
    document.getElementById("menuLateral").classList.toggle("ativo");
}




// ========================
// BUSCAR ENTREGAS DO FUNCIONÁRIO LOGADO
// ========================

function carregarEntregas(){


    fetch("https://localhost:7175/Entrega_Epi/minhas-entregas",
    {
        method:"GET",

        credentials:"include"
    })


    .then(res=>{


        if(res.status === 401){

            throw new Error("Usuário não está logado");

        }


        return res.json();


    })


    .then(lista=>{


        const div =
        document.getElementById("lista");


        div.innerHTML = "";



        if(lista.length === 0){


            div.innerHTML =
            `
            <p>
            Você não possui EPIs pendentes de confirmação.
            </p>
            `;


            return;

        }



        lista.forEach(entrega=>{


            div.innerHTML +=
            `

            <div class="card-entrega">


                <h3>
                    Entrega de EPI
                </h3>


                <p>
                    Data da entrega:
                    ${formatarData(entrega.data_Entrega)}
                </p>


                <p>
                    Devolução:
                    ${formatarData(entrega.data_Devolucao)}
                </p>



                <button 
                onclick="confirmarEntrega(${entrega.id_Entrega_EPI})">

                    Confirmar recebimento

                </button>


            </div>


            `;


        });



    })


    .catch(erro=>{


        console.log(erro);

        alert(
        "Erro ao carregar suas entregas."
        );


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


    .then(msg=>{


        alert(
        "EPI confirmado com sucesso!"
        );


        carregarEntregas();


    })


    .catch(erro=>{


        console.log(erro);

        alert(
        erro.message
        );


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


    carregarEntregas();


};