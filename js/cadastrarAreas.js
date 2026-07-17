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

            var area = linha.insertCell(1);
            area.innerHTML = risco.area;
            area.dataset.idArea = risco.idArea;

            linha.insertCell(2).innerHTML = risco.tipo_Risco;
            linha.insertCell(3).innerHTML = risco.grau_Risco;
            linha.insertCell(4).innerHTML = risco.descricao;

            linha.insertCell(5).innerHTML =
                "<button class='editar' onclick='editarArea(this," + risco.id_Risco + ")'>Editar</button> " +
                "<button class='excluir' onclick='excluirArea(" + risco.id_Risco + ")'>Excluir</button>";

        });

    })

    .catch(erro => console.log(erro));

}

// CADASTRAR
function cadastrarArea() {

    var idArea = document.getElementById("area").value;

    if (idArea == "" ||
        document.getElementById("nomeArea").value == "" ||
        document.getElementById("grau").value == "" ||
        document.getElementById("descricaoArea").value == "") {

        alert("Preencha todos os campos!");
        return;
    }

    var risco = {

        Tipo_Risco: document.getElementById("nomeArea").value,
        Grau_Risco: document.getElementById("grau").value,
        Descricao: document.getElementById("descricaoArea").value

    };

    fetch("https://localhost:7175/Risco?idArea=" + idArea, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(risco)

    })

    .then(response => {

        if (response.ok) {

            alert("Risco cadastrado com sucesso!");

            limparCampos();

            listarRiscos();

        } else {

            response.text().then(msg => alert(msg));

        }

    })

    .catch(erro => {

        console.log(erro);

        alert("Erro ao conectar com a API.");

    });

}

// EDITAR
function editarArea(botao, id) {

    idSelecionado = id;

    linhaSelecionada = botao.parentNode.parentNode;

    document.getElementById("area").value =
        linhaSelecionada.cells[1].dataset.idArea;

    document.getElementById("nomeArea").value =
        linhaSelecionada.cells[2].innerHTML;

    document.getElementById("grau").value =
        linhaSelecionada.cells[3].innerHTML;

    document.getElementById("descricaoArea").value =
        linhaSelecionada.cells[4].innerHTML;

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

    .then(response => {

        if (response.ok) {

            alert("Atualizado!");

            limparCampos();

            listarRiscos();

        } else {

            response.text().then(msg => alert(msg));

        }

    });

}

// EXCLUIR
function excluirArea(id) {

    if (!confirm("Deseja excluir?")) return;

    fetch("https://localhost:7175/Risco/" + id, {

        method: "DELETE",

        credentials: "include"

    })

    .then(response => {

        if (response.ok) {

            alert("Excluído!");

            listarRiscos();

        } else {

            response.text().then(msg => alert(msg));

        }

    });

}

// LIMPAR
function limparCampos() {

    document.getElementById("area").selectedIndex = 0;
    document.getElementById("nomeArea").selectedIndex = 0;
    document.getElementById("grau").selectedIndex = 0;
    document.getElementById("descricaoArea").value = "";

    idSelecionado = 0;
    linhaSelecionada = null;

    document.getElementById("btnCadastrar").style.display = "inline-block";
    document.getElementById("btnAtualizar").style.display = "none";

}