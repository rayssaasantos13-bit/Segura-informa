// ======================================================
// URL da API responsável pelo cadastro dos EPIs
// ======================================================
const api = "https://localhost:7175/Epi";

// ======================================================
// Variável utilizada para armazenar o ID do EPI que está
// sendo editado.
// ======================================================
let idEpiSelecionado = 0;


// ======================================================
// Quando a página é carregada, chama a função que busca
// todos os EPIs cadastrados.
// ======================================================
window.onload = function () {

    listarEpis();

};


// ======================================================
// MENU LATERAL
// Abre e fecha o menu.
// ======================================================
function toggleMenu() {

    document.getElementById("menuLateral").classList.toggle("ativo");

}


// ======================================================
// LISTAR EPIS
// Busca todos os EPIs cadastrados na API.
// ======================================================
function listarEpis() {

    fetch(api, {

        method: "GET",
        credentials: "include"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Erro ao buscar os EPIs.");

        }

        return response.json();

    })

    .then(lista => {

        preencherTabela(lista);

    })

    .catch(error => {

        console.error(error);

        Swal.fire({
    icon: "error",
    title: "Erro!",
    text: error.message,
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    });

}


// ======================================================
// PREENCHER TABELA
// Recebe a lista de EPIs da API e monta as linhas
// da tabela.
// ======================================================
function preencherTabela(lista) {

    console.log(lista);
    
    const tbody = document.querySelector("#tabelaEpis tbody");

    tbody.innerHTML = "";


    for (let i = 0; i < lista.length; i++) {

        let epi = lista[i];

        tbody.innerHTML += `

            <tr>

                <td>${epi.nome}</td>

                <td>${epi.descricao}</td>

                <td>${epi.numero_Ca}</td>

                <td>${epi.qntd_Estoque}</td>

                <td>

                    <button
                        class="btnEditar"
                        onclick="editarEpi(${epi.id_epi})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btnExcluir"
                        onclick="deletarEpi(${epi.id_epi})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    }

}


// ======================================================
// CADASTRAR EPI
// Lê os campos do formulário e envia os dados para a API.
// ======================================================
function cadastrarEpi() {

    const nome = document.getElementById("nome").value;

    const descricao = document.getElementById("descricao").value.trim();

    const numeroCA = document.getElementById("ca").value;

    const quantidade = document.getElementById("estoque").value;


    // Validação
    if (nome == "" || numeroCA == "" || quantidade == "") {

  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "Preencha todos os campos.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

        return;

    }


    // Objeto enviado para a API
    const epi = {

        Nome: nome,

        Descricao: descricao,

        Numero_Ca: Number(numeroCA),

        Qntd_Estoque: Number(quantidade),

        exige_epi: []

    };


    fetch(api, {

        method: "POST",

        credentials: "include",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(epi)

    })

    .then(response => {

        if (!response.ok) {

            return response.text().then(msg => {

                throw new Error(msg);

            });

        }

        return response.json();

    })

    .then(data => {

      Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "EPI cadastrado com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});
        console.log(data);

        LimparCampos();

        listarEpis();

    })

    .catch(error => {

        console.error(error);

       Swal.fire({
    icon: "error",
    title: "Erro!",
    text: error.message,
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    });

}

// ======================================================
// EDITAR EPI
// Busca o EPI selecionado na tabela e preenche os campos
// do formulário para edição.
// ======================================================
function editarEpi(id) {

    fetch(api, {

        method: "GET",
        credentials: "include"

    })

    .then(response => response.json())

    .then(lista => {

        // Procura o EPI pelo ID
        let epi = lista.find(e => e.id_epi == id);

        if (epi == null) {

         Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "EPI não encontrado.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});
            return;

        }

        // Guarda o ID do EPI que será atualizado
        idEpiSelecionado = epi.id_epi;

        // Preenche os campos do formulário
        document.getElementById("nome").value = epi.nome;

        document.getElementById("descricao").value = epi.descricao;

        document.getElementById("ca").value = epi.numero_Ca;

        document.getElementById("estoque").value = epi.qntd_Estoque;

        // Esconde o botão cadastrar
        document.getElementById("btnCadastrar").style.display = "none";

        // Mostra o botão atualizar
        document.getElementById("btnAtualizar").style.display = "inline-block";

    })

    .catch(error => {

        console.error(error);

       Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao carregar o EPI.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    });

}


// ======================================================
// ATUALIZAR EPI
// Envia as novas informações para a API utilizando PUT.
// ======================================================
function atualizarEpi() {

    const epi = {

        Id_epi: idEpiSelecionado,

        Nome: document.getElementById("nome").value,

        Descricao: document.getElementById("descricao").value,

        Numero_Ca: Number(document.getElementById("ca").value),

        Qntd_Estoque: Number(document.getElementById("estoque").value)

    };

    fetch(api + "/" + idEpiSelecionado, {

        method: "PUT",

        credentials: "include",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(epi)

    })

    .then(response => {

        if (!response.ok) {

            return response.text().then(msg => {

                throw new Error(msg);

            });

        }

       Swal.fire({
    icon: "success",
    title: "Atualizado!",
    text: "EPI atualizado com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

        // Limpa o formulário
        LimparCampos();

        // Atualiza a tabela
        listarEpis();

    })

    .catch(error => {

        console.error(error);

    Swal.fire({
    icon: "error",
    title: "Erro!",
    text: error.message,
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    });

}


// ======================================================
// DELETAR EPI
// Exclui um EPI do banco de dados.
// ======================================================
async function deletarEpi(id) {

    const confirmar = await Swal.fire({

        title: "Tem certeza?",
        text: "Deseja realmente excluir este EPI?",
        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#f97316",
        cancelButtonColor: "#6c757d",

        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar"

    });

    if (!confirmar.isConfirmed) {
        return;
    }

    fetch(api + "/" + id, {

        method: "DELETE",

        credentials: "include"

    })

    .then(response => {

        if (!response.ok) {

            return response.text().then(msg => {

                throw new Error(msg);

            });

        }

      Swal.fire({
    icon: "success",
    title: "Excluído!",
    text: "EPI excluído com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

        listarEpis();

    })

    .catch(error => {

        console.error(error);

     Swal.fire({
    icon: "error",
    title: "Erro!",
    text: error.message,
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

    });

}


// ======================================================
// LIMPAR CAMPOS
// Limpa todos os campos do formulário e retorna os
// botões ao estado inicial.
// ======================================================
function LimparCampos() {

    document.getElementById("nome").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("ca").value = "";

    document.getElementById("estoque").value = "";
    
 }

    idEpiSelecionado = 0;

    document.getElementById("btnCadastrar").style.display = "inline-block";

    document.getElementById("btnAtualizar").style.display = "none";

