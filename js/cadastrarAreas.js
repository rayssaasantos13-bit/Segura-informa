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
    carregarListaRiscos();
};
function carregarListaRiscos() {

    fetch("https://localhost:7175/Risco", {

        method: "GET",

        credentials: "include"

    })

    .then(response => response.json())

    .then(riscos => {
    console.log(riscos);

        const lista = document.getElementById("listaRiscos");

        lista.innerHTML = "";

        riscos.forEach(risco => {

            lista.innerHTML += `

                <label>

                    <input
                        type="checkbox"
                        value="${risco.id_Risco}">

                    ${risco.tipo_Risco}
                    - Grau ${risco.grau_Risco}

                </label>

            `;

        });

    });

}
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
async function cadastrarArea() {

    try {

        const area = {

            Nome_Area: document.getElementById("area").value,

            Descricao: document.getElementById("descricaoArea").value

        };

        // Cadastra a Área
        const respostaArea = await fetch("https://localhost:7175/Area", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify(area)

        });

        if (!respostaArea.ok) {
            throw new Error("Erro ao cadastrar área.");
        }

        const areaCriada = await respostaArea.json();

        // Pega todos os riscos marcados
        const riscosSelecionados = [];

        document
            .querySelectorAll("#listaRiscos input:checked")
            .forEach(item => {

                riscosSelecionados.push(parseInt(item.value));

            });

        if (riscosSelecionados.length === 0) {

            Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "Selecione pelo menos um risco.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});
            return;

        }

        // Cria a relação Área x Risco
        for (const idRisco of riscosSelecionados) {

            const relacao = {

                Fk_Area_Id_Area: areaCriada.id_Area || areaCriada.Id_Area,

                Fk_Id_Risco: idRisco

            };

            const respostaRelacao = await fetch("https://localhost:7175/Area_Contem_Risco", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify(relacao)

            });

            if (!respostaRelacao.ok) {

                throw new Error("Erro ao criar relação.");

            }

        }

       Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Área cadastrada com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

        limparCampos();

        listarRiscos();

    }

    catch (erro) {

        console.log(erro);

       Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao cadastrar.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    }

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

        //// Atualiza o Risco
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
       Swal.fire({
    icon: "success",
    title: "Atualizado!",
    text: "Área e risco atualizados com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

        limparCampos();

        listarRiscos();

    }
    catch (erro) {

        console.log(erro);

        Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao atualizar.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    }

}

// ===========================
// EXCLUIR
// ===========================
async function excluirArea(idArea, idRisco) {

   const confirmacao = await Swal.fire({

    title: "Tem certeza?",
    text: "Deseja realmente excluir este registro?",
    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#f97316",
    cancelButtonColor: "#6c757d",

    confirmButtonText: "Sim, excluir",
    cancelButtonText: "Cancelar"

});

if (!confirmacao.isConfirmed) {
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

     Swal.fire({
    icon: "success",
    title: "Excluído!",
    text: "Área e risco excluídos com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

        limparCampos();

        listarRiscos();

    }
    catch (erro) {

        console.log(erro);

       Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao excluir.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    }

}

// ===========================
// LIMPAR
// ===========================
function limparCampos() {

    document.getElementById("area").value = "";

    document.getElementById("descricaoArea").value = "";

    // Desmarca todos os riscos
    document.querySelectorAll("#listaRiscos input").forEach(item => {
        item.checked = false;
    });

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

       Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "EPI atualizado com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

        limparCampos();

        listarEpis();

    }
    catch (erro) {

        console.log(erro);

       Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao atualizar.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    }

}

// ===========================
// EXCLUIR EPI
// ===========================
async function excluirEpi(idEpi) {

  const confirmacao = await Swal.fire({

    title: "Tem certeza?",
    text: "Deseja realmente excluir este EPI?",
    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#f97316",
    cancelButtonColor: "#6c757d",

    confirmButtonText: "Sim, excluir",
    cancelButtonText: "Cancelar"

});

if (!confirmacao.isConfirmed) {
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

    Swal.fire({
    icon: "success",
    title: "Excluído!",
    text: "EPI excluído com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});
        limparCampos();

        listarEpis();

    }
    catch (erro) {

        console.log(erro);

     Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao excluir.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    }

}