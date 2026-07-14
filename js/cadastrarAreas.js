var linhaSelecionada = null;

// ============================
// MENU
// ============================

function toggleMenu() {
    document.getElementById("menuLateral").classList.toggle("ativo");
}

function cadastrarArea() {

    var nome = document.getElementById("nomeArea").value;
    var descricao = document.getElementById("descricaoArea").value;
    var grau = document.getElementById("grau").value;

    if (nome == "" || descricao == "") {
        alert("Preencha todos os campos!");
        return;
    }

    var area = {
    Nome_Area: nome,
    Grau: grau,
    Descricao: descricao,
    riscos_da_area: []
};

            fetch("https://localhost:7175/Area", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(area)
        })
    .then(function(response){

        if(response.ok){

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

            alert("Área cadastrada com sucesso!");

        }
       else {

    response.text().then(function (msg) {

        console.log(msg);
        alert(msg);

    });



}

    })

    .catch(function(erro){

        console.log(erro);

        alert("Erro ao conectar com a API.");

    });

}

function editarArea(botao){

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

function atualizarArea(){

    if(linhaSelecionada == null){

        alert("Selecione uma área.");

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

    alert("Área atualizada!");

}

function excluirArea(botao){

    if(confirm("Deseja excluir esta área?")){

        var linha = botao.parentNode.parentNode;

        linha.remove();

        atualizarIds();

    }

}

function atualizarIds(){

    var tabela =
        document.getElementById("tabelaAreas")
        .getElementsByTagName("tbody")[0];

    for(var i = 0; i < tabela.rows.length; i++){

        tabela.rows[i].cells[0].innerHTML = i + 1;

    }

}

function limparCampos(){

    document.getElementById("nomeArea").value = "";
    document.getElementById("descricaoArea").value = "";
    document.getElementById("grau").selectedIndex = 0;

    document.getElementById("btnCadastrar").style.display = "inline-block";
    document.getElementById("btnAtualizar").style.display = "none";

}