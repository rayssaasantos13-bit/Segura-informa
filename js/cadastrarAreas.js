var linhaSelecionada = null;
var idSelecionado = 0;

// MENU

function abrirMenu() {

    var menu = document.getElementById("menu");

    menu.classList.toggle("ativo");
}

// CARREGAR TABELA

window.onload = function () {

    listarRiscos();

};

// LISTAR

function listarRiscos() {

    fetch("https://localhost:7175/Risco", {

        method: "GET",
        credentials: "include"

    })

    .then(function (response) {

        if (!response.ok) {

            return response.text().then(function (msg) {

                if (msg.includes("Faça o login antes")) {

                    alert(msg);
                    window.location.href = "login.html";
                }

            });

        }

        return response.json();

    })

    .then(function (dados) {

        if (!dados) return;

        var tabela = document
            .getElementById("tabelaAreas")
            .getElementsByTagName("tbody")[0];

        tabela.innerHTML = "";

        dados.forEach(function (risco) {

            var linha = tabela.insertRow();

            linha.insertCell(0).innerHTML = risco.id_Risco;
            linha.insertCell(1).innerHTML = risco.tipo_Risco;
            linha.insertCell(2).innerHTML = risco.grau_Risco;
            linha.insertCell(3).innerHTML = risco.descricao;

            linha.insertCell(4).innerHTML =
                "<button class='editar' onclick='editarArea(this," + risco.id_Risco + ")'>Editar</button> " +
                "<button class='excluir' onclick='excluirArea(" + risco.id_Risco + ")'>Excluir</button>";

        });

    })

    .catch(function (erro) {

        console.log(erro);

    });

}

// CADASTRAR

function cadastrarArea() {

    var tipo = document.getElementById("nomeArea").value;
    var grau = document.getElementById("grau").value;
    var descricao = document.getElementById("descricaoArea").value;

    if (tipo == "" || descricao == "") {

        alert("Preencha todos os campos!");
        return;
    }

    var risco = {

        Tipo_Risco: tipo,
        Grau_Risco: grau,
        Descricao: descricao

    };

    fetch("https://localhost:7175/Risco", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(risco)

    })

    .then(function (response) {

        if (response.ok) {

            alert("Risco cadastrado com sucesso!");

            limparCampos();

            listarRiscos();

        }

        else {

            response.text().then(function (msg) {

                alert(msg);

                if (msg.includes("Faça o login antes")) {

                    window.location.href = "login.html";

                }

            });

        }

    })

    .catch(function (erro) {

        console.log(erro);

        alert("Erro ao conectar com a API.");

    });

}
// EDITAR

function editarArea(botao, id) {

    idSelecionado = id;

    linhaSelecionada = botao.parentNode.parentNode;

    document.getElementById("nomeArea").value =
        linhaSelecionada.cells[1].innerHTML;

    document.getElementById("grau").value =
        linhaSelecionada.cells[2].innerHTML;

    document.getElementById("descricaoArea").value =
        linhaSelecionada.cells[3].innerHTML;

    document.getElementById("btnCadastrar").style.display = "none";
    document.getElementById("btnAtualizar").style.display = "inline-block";

}

// ATUALIZAR

function atualizarArea() {

    var risco = {

        Tipo_Risco: document.getElementById("nomeArea").value,
        Grau_Risco: document.getElementById("grau").value,
        Descricao: document.getElementById("descricaoArea").value

    };

    fetch("https://localhost:7175/Risco/" + idSelecionado, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(risco)

    })

    .then(function(response){

        if(response.ok){

            alert("Risco atualizado com sucesso!");

            limparCampos();

            listarRiscos();

        }

        else{

            response.text().then(function(msg){

                alert(msg);

                if(msg.includes("Faça o login antes")){

                    window.location.href = "login.html";

                }

            });

        }

    })

    .catch(function(erro){

        console.log(erro);

        alert("Erro ao atualizar.");

    });

}

// EXCLUIR

function excluirArea(id){

    if(!confirm("Deseja excluir este risco?")){

        return;

    }

    fetch("https://localhost:7175/Risco/" + id,{

        method:"DELETE",

        credentials:"include"

    })

    .then(function(response){

        if(response.ok){

            alert("Risco excluído com sucesso!");

            listarRiscos();

        }

        else{

            response.text().then(function(msg){

                alert(msg);

                if(msg.includes("Faça o login antes")){

                    window.location.href = "login.html";

                }

            });

        }

    })

    .catch(function(erro){

        console.log(erro);

        alert("Erro ao excluir.");

    });

}

// LIMPAR

function limparCampos(){

    document.getElementById("nomeArea").value = "";
    document.getElementById("grau").selectedIndex = 0;
    document.getElementById("descricaoArea").value = "";

    idSelecionado = 0;
    linhaSelecionada = null;

    document.getElementById("btnCadastrar").style.display = "inline-block";
    document.getElementById("btnAtualizar").style.display = "none";

}