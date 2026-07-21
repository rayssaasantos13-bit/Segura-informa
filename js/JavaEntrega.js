// ============================
// MENU
// ============================

function toggleMenu() {
    document.getElementById("menuLateral").classList.toggle("ativo");
}

let formulario;



// ========================
// INICIAR
// ========================


window.onload = function(){


    formulario =
    document.getElementById("Entrega");


    carregarFuncionarios();


    carregarEPIs();

       carregarEntregas();



    formulario.addEventListener(
        "submit",
        cadastrarEntrega
    );


};





// ========================
// BUSCAR FUNCIONÁRIOS
// ========================


function carregarFuncionarios(){


fetch("https://localhost:7175/Usuario",
{

credentials:"include"

})


.then(res=>res.json())


.then(lista=>{


const select =
document.getElementById("funcionario");



lista.forEach(usuario=>{


select.innerHTML +=
`

<option value="${usuario.id}">
${usuario.nome}
</option>

`;


});


})


.catch(erro=>{


console.log(erro);

alert(
"Erro ao carregar funcionários"
);


});


}






// ========================
// BUSCAR EPIS
// ========================


function carregarEPIs() {

    fetch("https://localhost:7175/Epi", {
        credentials: "include"
    })

    .then(res => res.json())

    .then(lista => {

        const select = document.getElementById("epi");

        select.innerHTML = `
            <option value="">
                Selecione o EPI
            </option>
        `;


        lista.forEach(e => {

            select.innerHTML += `
                <option
                    value="${e.id_epi}"
                    data-ca="${e.numero_Ca}"
                    data-estoque="${e.qntd_Estoque}">
                    ${e.nome.trim()}
                </option>
            `;

        });

    })

}
// MOSTRAR NUMERO CA
// ========================


document.addEventListener("change", function(e) {

    if (e.target.id === "epi") {

        const opcao = e.target.options[e.target.selectedIndex];

        const ca = opcao.dataset.ca;
        const estoque = Number(opcao.dataset.estoque);

        document.getElementById("numeroCA").value =
            ca || "Sem CA cadastrado";

document.getElementById("quantidade").value = "";

document.getElementById("quantidade").max = estoque;

    }

});





// ========================
// CADASTRAR ENTREGA
// ========================


// ========================
// CADASTRAR ENTREGA
// ========================

function cadastrarEntrega(event){

    event.preventDefault();


    const quantidade =
    Number(document.getElementById("quantidade").value);


    const selectEpi =
    document.getElementById("epi");


    const estoque =
    Number(
        selectEpi.options[selectEpi.selectedIndex]
        .dataset.estoque
    );


    console.log("Quantidade digitada:", quantidade);
    console.log("Estoque disponível:", estoque);



    // verifica estoque

    if(quantidade <= 0){

        alert("Informe uma quantidade válida.");

        return;

    }



    if(quantidade > estoque){

        alert(
            "Quantidade solicitada maior que o estoque disponível! Estoque atual: "
            + estoque
        );

        return;

    }



    const entrega = {


        Data_Entrega:

        document.getElementById("dataEntrega").value,



        Data_Devolucao:

        document.getElementById("dataDevolucao").value || null,



        Fk_Usuario_Id_Usuario:

        Number(
            document.getElementById("funcionario").value
        ),



        Aceito:false,



        entrega_de_epi:[

            {

                Fk_Epi_Id_Epi:

                Number(
                    document.getElementById("epi").value
                ),


                Quantidade:

                quantidade

            }

        ]

    };




    console.log("Dados enviados:", entrega);



    fetch("https://localhost:7175/Entrega_Epi",
    {


        method:"POST",


        credentials:"include",


        headers:{

            "Content-Type":"application/json"

        },


        body:

        JSON.stringify(entrega)


    })



    .then(async resposta=>{


        const texto =
        await resposta.text();



        if(!resposta.ok){

            throw new Error(texto);

        }



        return texto;



    })



    .then(()=>{


        alert(
            "Entrega cadastrada com sucesso!"
        );



        formulario.reset();


        document.getElementById("numeroCA").value="";



    })



    .catch(erro=>{


        console.log(erro);


        alert(
            "Erro ao cadastrar: " + erro.message
        );


    });


}
function carregarEntregas() {

    fetch("https://localhost:7175/Entrega_Epi", {
        method: "GET",
        credentials: "include"
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Erro ao buscar entregas");
        }

        return response.json();

    })

    .then(entregas => {

        const tabela = document.getElementById("listaEntregas");

        tabela.innerHTML = "";


        entregas.forEach(entrega => {

            tabela.innerHTML += `

                <tr>

                    <td>${entrega.id_Entrega_EPI}</td>

                    <td>${entrega.usuario?.nome ?? "Não informado"}</td>

                    <td>${entrega.epi?.nome ?? "Não informado"}</td>

                    <td>${entrega.quantidade ?? "-"}</td>

                    <td>${formatarData(entrega.data_Entrega)}</td>

                    <td>${formatarData(entrega.data_Devolucao) ?? "-"}</td>

                </tr>

            `;

        });

    })

    .catch(error => {

        console.error("Erro:", error);

    });

}

