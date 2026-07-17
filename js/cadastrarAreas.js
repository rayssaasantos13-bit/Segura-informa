var linhaSelecionada = null;
var idSelecionado = 0;

// MENU
function abrirMenu() {
    document.getElementById("menu").classList.toggle("ativo");
}

// CARREGAR
window.onload = function () {
    listarRiscos();
};

// LISTAR
function listarRiscos() {

    fetch("https://localhost:7175/Risco", {
        method: "GET",
        credentials: "include"
    })

    .then(response => response.json())

    .then(dados => {

        var tabela = document.querySelector("#tabelaAreas tbody");

        tabela.innerHTML = "";


        dados.forEach(risco => {


            var linha = tabela.insertRow();


            linha.insertCell(0).innerHTML = risco.id_Risco;

            linha.insertCell(1).innerHTML = risco.area;

            linha.insertCell(2).innerHTML = risco.tipo_Risco;

            linha.insertCell(3).innerHTML = risco.grau_Risco;

            linha.insertCell(4).innerHTML = risco.descricao;



            linha.insertCell(5).innerHTML =

            "<button class='editar' onclick='editarArea(this," 
            + risco.id_Risco + ")'>Editar</button> " +

            "<button class='excluir' onclick='excluirArea(" 
            + risco.id_Risco + ")'>Excluir</button>";


        });


    })

    .catch(erro => console.log(erro));

}

// CADASTRAR
function cadastrarArea(){


    let area = {

        Nome_Area: document.getElementById("area").value,

        Descricao: document.getElementById("descricaoArea").value

    };


    console.log("AREA ENVIADA:", area);



    // CADASTRA ÁREA

    fetch("https://localhost:7175/Area",{

        method:"POST",

        headers: {
            "Content-Type": "application/json"
        },

        credentials: "include",

        body:JSON.stringify(area)

    })


    .then(response=>{

        if(!response.ok){

            return response.json().then(erro=>{

                throw erro;

            });

        } else {

            response.text().then(msg => alert(msg));

        }

        return response.json();

    })


    .then(areaCriada=>{


        console.log("ÁREA CRIADA:", areaCriada);



        let risco = {


            Tipo_Risco:
            document.getElementById("tipoRisco").value,


            Grau_Risco:
            document.getElementById("grau").value,


            Descricao:
            document.getElementById("descricaoArea").value

        };


        console.log("RISCO ENVIADO:", risco);



        // CADASTRA RISCO

        return fetch("https://localhost:7175/Risco",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            credentials:"include",

            body:JSON.stringify(risco)

        })


        .then(response=>response.json())


        .then(riscoCriado=>{


            console.log("RISCO CRIADO:", riscoCriado);



            let relacao = {


                Fk_Area_Id_Area:

                areaCriada.id_Area || areaCriada.Id_Area,



                Fk_Id_Risco:

                riscoCriado.id_Risco || riscoCriado.Id_Risco


            };



            console.log("RELAÇÃO:", relacao);



            // CRIA RELAÇÃO AREA X RISCO


            return fetch("https://localhost:7175/Area_Contem_Risco",{


                method:"POST",


                headers:{

                    "Content-Type":"application/json"

                },


                credentials:"include",


                body:JSON.stringify(relacao)


            });



        });


    })


    .then(response=>{


        if(!response.ok){

            throw new Error("Erro ao criar relação.");

        }


        return response.json();


    })


    .then(()=>{


        alert("Área e risco cadastrados com sucesso!");


        limparCampos();


        listarRiscos();


    })


    .catch(erro=>{


        console.log("ERRO:", erro);


        alert("Erro ao cadastrar.");

    });


}
// EDITAR
function editarArea(botao,id){


    idSelecionado = id;


    linhaSelecionada = botao.parentNode.parentNode;



    document.getElementById("area").value =
    linhaSelecionada.cells[1].innerHTML.trim();



    document.getElementById("tipoRisco").value =
    linhaSelecionada.cells[2].innerHTML.trim();



    document.getElementById("grau").value =
    linhaSelecionada.cells[3].innerHTML.trim();



    document.getElementById("descricaoArea").value =
    linhaSelecionada.cells[4].innerHTML.trim();



    document.getElementById("btnCadastrar").style.display="none";


    document.getElementById("btnAtualizar").style.display="inline-block";


}

// ATUALIZAR
function atualizarArea(){


    let risco = {


        Tipo_Risco:
        document.getElementById("tipoRisco").value,


        Grau_Risco:
        document.getElementById("grau").value,


        Descricao:
        document.getElementById("descricaoArea").value


    };



    fetch("https://localhost:7175/Risco/"+idSelecionado,{


        method:"PUT",


        headers:{


            "Content-Type":"application/json"


        },


        credentials:"include",


        body:JSON.stringify(risco)


    })


    .then(response=>{


        if(response.ok){


            alert("Risco atualizado!");


            limparCampos();


            listarRiscos();


        }


    });


}
// EXCLUIR
function excluirArea(id) {


    if(!confirm("Deseja excluir?")) return;



    fetch("https://localhost:7175/Risco/"+id,{

        method: "DELETE",

        credentials: "include"

    })


    .then(response=>{


        if(response.ok){


            alert("Excluído!");


            listarRiscos();


        }


    })


}
// LIMPAR
function limparCampos() {

    document.getElementById("area").value="";

    document.getElementById("tipoRisco").selectedIndex=0;

    document.getElementById("grau").selectedIndex=0;

    document.getElementById("descricaoArea").value="";


    idSelecionado=0;
    linhaSelecionada=null;


    document.getElementById("btnCadastrar").style.display="inline-block";

    document.getElementById("btnAtualizar").style.display="none";

}