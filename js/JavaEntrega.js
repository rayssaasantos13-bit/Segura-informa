// URL da sua API (ajustada para a porta 7175 conforme seu último arquivo)
const myForm = document.getElementById('loginUsuario');
if (myForm != null) {
const API_URL = 'https://localhost:7175/Entrega_Epi';

document.addEventListener("DOMContentLoaded", ( ) => {
    // Mapeia o formulário e os botões do seu HTML
    const myForm = document.getElementById('Entrega_Epi'); 
    const btnCadastrar = document.getElementById("btnCadastrar");
    const btnAtualizar = document.getElementById("btnAtualizar");
    const btnExcluir = document.getElementById("btnExcluir");
    const btnLimpar = document.getElementById("btnLimpar");

    // 1. Prevenir o recarregamento da página e disparar o cadastro
    if (myForm != null) {
        myForm.addEventListener('submit', function (event) {
            event.preventDefault();
            cadastrarEPI();
        });
    }

    // 2. Adiciona os eventos de clique aos botões
    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", () => {
            // Se o form existir, dispara o evento submit dele
            if (myForm) myForm.dispatchEvent(new Event('submit'));
            else cadastrarEPI();
        });
    }

    if (btnAtualizar) btnAtualizar.addEventListener("click", atualizarEPI);
    if (btnExcluir) btnExcluir.addEventListener("click", excluirEPI);
    if (btnLimpar) btnLimpar.addEventListener("click", limparFormulario);
});

// Função para capturar os dados do formulário e montar o objeto para o C#
function getFormData() {
    return {
        id_Entrega_EPI: 0, 
        data_Entrega: new Date().toISOString(), 
        data_Devolucao: document.getElementById("validade").value || null,
        // O seu controller espera uma lista 'entrega_de_epi'
        entrega_de_epi: [
            {
                nome_epi: document.getElementById("nome").value,
                ca_epi: document.getElementById("ca").value,
                codigo_epi: document.getElementById("codigo").value,
                categoria: document.getElementById("categoria").value,
                fabricante: document.getElementById("fabricante").value,
                quantidade: parseInt(document.getElementById("quantidade").value) || 0,
                unidade: document.getElementById("unidade").value,
                descricao: document.getElementById("descricao").value
            }
        ]
    };
}

// [POST] - Cadastrar no Banco de Dados SQL
async function cadastrarEPI() {
    const dados = getFormData();

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            credentials: 'include', // Mantém a sessão de login do usuário
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert("EPI cadastrado com sucesso no SQL!");
            limparFormulario();
            window.location.reload(); 
        } else if (response.status == 401) {
            alert("Faça login antes de cadastrar!");
            window.location.href = "login.html";
        } else {
            const erro = await response.text();
            alert("Erro ao cadastrar: " + erro);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar ao servidor da API.");
    }
}

// [PUT] - Atualizar no Banco de Dados
async function atualizarEPI() {
    const id = document.getElementById("codigo").value; 
    const dados = {
        data_Entrega: new Date().toISOString(),
        data_Devolucao: document.getElementById("validade").value
    };

    if (!id) {
        alert("Informe o código do EPI para atualizar.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert("Registro atualizado no banco!");
            window.location.reload();
        } else if (response.status == 401) {
            alert("Faça login antes de editar!");
        } else {
            alert("Erro ao atualizar.");
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}

// [DELETE] - Excluir do Banco de Dados
async function excluirEPI() {
    const id = document.getElementById("codigo").value;
    if (!id || !confirm("Deseja excluir este registro?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: 'include'
        });

        if (response.ok) {
            alert("Excluído com sucesso!");
            limparFormulario();
            window.location.reload();
        } else if (response.status == 401) {
            alert("Faça login antes de excluir!");
        } else {
            alert("Erro ao excluir.");
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}

function limparFormulario() {
    const form = document.getElementById("Entrega_Epi");
    if (form) form.reset();
}

}
