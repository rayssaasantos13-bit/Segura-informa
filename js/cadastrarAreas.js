function cadastrarArea() {

    var nome = document.getElementById("nomeArea").value;
    var grau = document.getElementById("grau").value;
    var descricao = document.getElementById("descricaoArea").value;

    if (nome == "" || descricao == "") {
        alert("Preencha todos os campos!");
        return;
    }

    var tabela = document.getElementById("tabelaAreas").getElementsByTagName("tbody")[0];

    var linha = tabela.insertRow();

    linha.insertCell(0).innerHTML = tabela.rows.length;
    linha.insertCell(1).innerHTML = nome;
    linha.insertCell(2).innerHTML = grau;
    linha.insertCell(3).innerHTML = descricao;
    linha.insertCell(4).innerHTML =
        "<button class='editar' onclick='editarArea(this)'>Editar</button> " +
        "<button class='excluir' onclick='excluirArea(this)'>Excluir</button>";

    limparCampos();
}

function editarArea(botao) {

    linhaSelecionada = botao.parentNode.parentNode;

    document.getElementById("nomeArea").value = linhaSelecionada.cells[1].innerHTML;
    document.getElementById("grau").value = linhaSelecionada.cells[2].innerHTML;
    document.getElementById("descricaoArea").value = linhaSelecionada.cells[3].innerHTML;

    document.getElementById("btnCadastrar").style.display = "none";
    document.getElementById("btnAtualizar").style.display = "inline-block";

}

function atualizarArea() {

    if (linhaSelecionada == null) {
        alert("Selecione uma área para atualizar.");
        return;
    }

    linhaSelecionada.cells[1].innerHTML =
        document.getElementById("nomeArea").value;

    linhaSelecionada.cells[2].innerHTML =
        document.getElementById("grau").value;

    linhaSelecionada.cells[3].innerHTML =
        document.getElementById("descricaoArea").value;

    limparCampos();

    linhaSelecionada = null;

    alert("Área atualizada com sucesso!");

}

function excluirArea(botao) {

    if (confirm("Deseja excluir esta área?")) {

        var linha = botao.parentNode.parentNode;

        linha.remove();

        atualizarIds();

    }

}

function atualizarIds() {

    var tabela = document.getElementById("tabelaAreas").getElementsByTagName("tbody")[0];

    for (var i = 0; i < tabela.rows.length; i++) {

        tabela.rows[i].cells[0].innerHTML = i + 1;

    }

}

function limparCampos() {

    document.getElementById("nomeArea").value = "";
    document.getElementById("grau").selectedIndex = 0;
    document.getElementById("descricaoArea").value = "";

    document.getElementById("btnCadastrar").style.display = "inline-block";
    document.getElementById("btnAtualizar").style.display = "none";

}

function abrirMenu() {

    var menu = document.getElementById("menu");

    menu.classList.toggle("ativo");

}

var linhaSelecionada = null;
