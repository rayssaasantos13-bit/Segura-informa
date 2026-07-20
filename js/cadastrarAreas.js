var linhaSelecionada = null;

var idAreaSelecionada = 0;
var idRiscoSelecionado = 0;

// MENU
function abrirMenu() {
    document.getElementById("menu").classList.toggle("ativo");
}

// CARREGAR
window.onload = function () {
    listarRiscos();
};

// ===========================
// LISTAR RISCOS
// ===========================
function listarRiscos() {

    fetch("https://localhost:7175/Risco", {

        method: "GET",

        credentials: "include"

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Erro ao listar riscos.");
        }

        return response.json();

    })

    .then(dados => {

        const tabela = document.querySelector("#tabelaAreas tbody");

        tabela.innerHTML = "";

        dados.forEach(risco => {

            const linha = tabela.insertRow();

            // Guarda os IDs para editar/excluir depois
            linha.dataset.idArea = risco.idArea;
            linha.dataset.idRisco = risco.id_Risco;

            linha.insertCell(0).innerHTML = risco.id_Risco;
            linha.insertCell(1).innerHTML = risco.area;
            linha.insertCell(2).innerHTML = risco.tipo_Risco;
            linha.insertCell(3).innerHTML = risco.grau_Risco;
            linha.insertCell(4).innerHTML = risco.descricao;

            linha.insertCell(5).innerHTML =
                "<button class='editar' onclick='editarArea(this)'>Editar</button> " +
                "<button class='excluir' onclick='excluirArea(" +
                risco.idArea + "," +
                risco.id_Risco +
                ")'>Excluir</button>";

        });

    })

    .catch(error => {

        console.log(error);

    });

}

// ===========================
// CADASTRAR
// ===========================
function cadastrarArea() {

    let area = {

        Nome_Area: document.getElementById("area").value,

        Descricao: document.getElementById("descricaoArea").value

    };

    fetch("https://localhost:7175/Area", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(area)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Erro ao cadastrar área.");
        }

        return response.json();

    })

    .then(areaCriada => {

        let risco = {

            Tipo_Risco: document.getElementById("tipoRisco").value,

            Grau_Risco: document.getElementById("grau").value,

            Descricao: document.getElementById("descricaoArea").value

        };

        return fetch("https://localhost:7175/Risco", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify(risco)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Erro ao cadastrar risco.");
            }

            return response.json();

        })

        .then(riscoCriado => {

            let relacao = {

                Fk_Area_Id_Area: areaCriada.id_Area || areaCriada.Id_Area,

                Fk_Id_Risco: riscoCriado.id_Risco || riscoCriado.Id_Risco

            };

            return fetch("https://localhost:7175/Area_Contem_Risco", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify(relacao)

            });

        });

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Erro ao criar relação.");
        }

        alert("Cadastro realizado com sucesso!");

        limparCampos();

        listarRiscos();

    })

    .catch(error => {

        console.log(error);

        alert("Erro ao cadastrar.");

    });

}

// ===========================
// EDITAR
// ===========================
function editarArea(botao) {

    linhaSelecionada = botao.parentNode.parentNode;

    idAreaSelecionada = linhaSelecionada.dataset.idArea;

    idRiscoSelecionado = linhaSelecionada.dataset.idRisco;

    document.getElementById("area").value =
        linhaSelecionada.cells[1].innerHTML.trim();

    document.getElementById("tipoRisco").value =
        linhaSelecionada.cells[2].innerHTML.trim();

    document.getElementById("grau").value =
        linhaSelecionada.cells[3].innerHTML.trim();

    document.getElementById("descricaoArea").value =
        linhaSelecionada.cells[4].innerHTML.trim();

    document.getElementById("btnCadastrar").style.display = "none";

    document.getElementById("btnAtualizar").style.display = "inline-block";

}

// ===========================
// ATUALIZAR
// ===========================
async function atualizarArea() {

    try {

        // Atualiza a Área
        const respostaArea = await fetch(
            "https://localhost:7175/Area/" + idAreaSelecionada,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({

                    Nome_Area: document.getElementById("area").value,

                    Descricao: document.getElementById("descricaoArea").value

                })

            }
        );

        if (!respostaArea.ok) {
            throw new Error("Erro ao atualizar a área.");
        }

        // Atualiza o Risco
        const respostaRisco = await fetch(
            "https://localhost:7175/Risco/" + idRiscoSelecionado,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({

                    Tipo_Risco:
                        document.getElementById("tipoRisco").value,

                    Grau_Risco:
                        document.getElementById("grau").value,

                    Descricao:
                        document.getElementById("descricaoArea").value

                })

            }
        );

        if (!respostaRisco.ok) {
            throw new Error("Erro ao atualizar o risco.");
        }

        alert("Área e risco atualizados com sucesso!");

        limparCampos();

        listarRiscos();

    }
    catch (erro) {

        console.log(erro);

        alert("Erro ao atualizar.");

    }

}

// ===========================
// EXCLUIR
// ===========================
async function excluirArea(idArea, idRisco) {

    if (!confirm("Deseja realmente excluir este registro?")) {
        return;
    }

    try {

        // Exclui o risco (seu controller já remove a relação Area_Contem_Risco)
        const respostaRisco = await fetch(
            "https://localhost:7175/Risco/" + idRisco,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        if (!respostaRisco.ok) {
            throw new Error("Erro ao excluir o risco.");
        }

        // Exclui a área
        const respostaArea = await fetch(
            "https://localhost:7175/Area/" + idArea,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        if (!respostaArea.ok) {
            throw new Error("Erro ao excluir a área.");
        }

        alert("Área e risco excluídos com sucesso!");

        limparCampos();

        listarRiscos();

    }
    catch (erro) {

        console.log(erro);

        alert("Erro ao excluir.");

    }

}

// ===========================
// LIMPAR
// ===========================
function limparCampos() {

    document.getElementById("area").value = "";

    document.getElementById("tipoRisco").selectedIndex = 0;

    document.getElementById("grau").selectedIndex = 0;

    document.getElementById("descricaoArea").value = "";

    linhaSelecionada = null;

    idAreaSelecionada = 0;

    idRiscoSelecionado = 0;

    document.getElementById("btnCadastrar").style.display = "inline-block";

    document.getElementById("btnAtualizar").style.display = "none";

}

// ===========================
// EDITAR EPI
// ===========================
function editarEpi(botao) {

    linhaSelecionada = botao.parentNode.parentNode;

    idEpiSelecionado = linhaSelecionada.dataset.idEpi;

    document.getElementById("nomeEpi").value =
        linhaSelecionada.cells[1].innerHTML.trim();

    document.getElementById("ca").value =
        linhaSelecionada.cells[2].innerHTML.trim();

    document.getElementById("validade").value =
        linhaSelecionada.cells[3].innerHTML.trim();

    document.getElementById("fabricante").value =
        linhaSelecionada.cells[4].innerHTML.trim();

    document.getElementById("quantidade").value =
        linhaSelecionada.cells[5].innerHTML.trim();

    document.getElementById("btnCadastrar").style.display = "none";

    document.getElementById("btnAtualizar").style.display = "inline-block";

}

// ===========================
// ATUALIZAR EPI
// ===========================
async function atualizarEpi() {

    try {

        const resposta = await fetch(
            "https://localhost:7175/Epi/" + idEpiSelecionado,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({

                    Nome_Epi: document.getElementById("nomeEpi").value,

                    CA: document.getElementById("ca").value,

                    Validade: document.getElementById("validade").value,

                    Fabricante: document.getElementById("fabricante").value,

                    Quantidade: document.getElementById("quantidade").value

                })

            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar o EPI.");
        }

        alert("EPI atualizado com sucesso!");

        limparCampos();

        listarEpis();

    }
    catch (erro) {

        console.log(erro);

        alert("Erro ao atualizar.");

    }

}

// ===========================
// EXCLUIR EPI
// ===========================
async function excluirEpi(idEpi) {

    if (!confirm("Deseja realmente excluir este EPI?")) {
        return;
    }

    try {

        const resposta = await fetch(
            "https://localhost:7175/Epi/" + idEpi,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao excluir o EPI.");
        }

        alert("EPI excluído com sucesso!");

        limparCampos();

        listarEpis();

    }
    catch (erro) {

        console.log(erro);

        alert("Erro ao excluir.");

    }

}