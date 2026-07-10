const formulario = document.getElementById("Entrega");

// Listas na memória para cruzar Nome -> ID
let listaUsuariosBanco = [];
let listaEpisBanco = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarUsuarios();
    carregarEpis();
});

if (formulario) {
    formulario.addEventListener("submit", cadastrarEntrega);
}

// 1. BUSCA OS USUÁRIOS DO BANCO PARA CRIAR AS SUGESTÕES
function carregarUsuarios() {
    fetch("http://localhost:7175/Usuario", {
        method: "GET",
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) throw new Error("Não autorizado ou erro na rota /Usuario");
        return response.json();
    })
    .then(usuarios => {
        listaUsuariosBanco = usuarios; // Salva a lista completa (com IDs e Nomes)
        const datalist = document.getElementById("listaUsuarios");
        if (!datalist) return;

        datalist.innerHTML = "";
        usuarios.forEach(u => {
            // Adiciona o nome como opção de autocompletar
            datalist.innerHTML += `<option value="${u.nome}"></option>`;
        });
    })
    .catch(error => {
        console.warn("Aviso: Não foi possível listar os usuários do banco (você está logado?):", error);
    });
}

// 2. BUSCA OS EPIS DO BANCO PARA CRIAR AS SUGESTÕES
function carregarEpis() {
    fetch("https://localhost:7175/Epi", {
        method: "GET",
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) throw new Error("Não autorizado ou erro na rota /Epi");
        return response.json();
    })
    .then(epis => {
        listaEpisBanco = epis; // Salva a lista completa (com IDs e Nomes)
        const datalist = document.getElementById("listaEpis");
        if (!datalist) return;

        datalist.innerHTML = "";
        epis.forEach(e => {
            // Adiciona o nome como opção de autocompletar
            datalist.innerHTML += `<option value="${e.nome}"></option>`;
        });
    })
    .catch(error => {
        console.warn("Aviso: Não foi possível listar os EPIs do banco (você está logado?):", error);
    });
}

// 3. FAZ O CADASTRO ENVIANDO OS IDS CORRETOS
function cadastrarEntrega(event) {
    event.preventDefault();

    const nomeDigitadoUsuario = document.getElementById("nomeFuncionario").value.trim();
    const nomeDigitadoEpi = document.getElementById("idEpi").value.trim();
    const dataEntrega = document.getElementById("dataEntrega").value;
    const dataDevolucao = document.getElementById("dataDevolucao").value;
    const aceito = document.getElementById("aceito").value === "true";

    // Procura na lista o usuário que tem o mesmo nome digitado
    const usuarioEncontrado = listaUsuariosBanco.find(
        u => u.nome.toLowerCase() === nomeDigitadoUsuario.toLowerCase()
    );

    // Procura na lista o EPI que tem o mesmo nome digitado
    const epiEncontrado = listaEpisBanco.find(
        e => e.nome.toLowerCase() === nomeDigitadoEpi.toLowerCase()
    );

    // Validação: Se o usuário digitou um nome que não existe no sistema, avisa ele
    if (!usuarioEncontrado) {
        alert(`O funcionário "${nomeDigitadoUsuario}" não foi encontrado no sistema. Cadastre-o primeiro.`);
        return;
    }
    if (!epiEncontrado) {
        alert(`O EPI "${nomeDigitadoEpi}" não foi encontrado no sistema. Cadastre-o primeiro.`);
        return;
    }

    // Extrai os IDs corretos do banco de dados
    const idUsuario = usuarioEncontrado.id_Usuario || usuarioEncontrado.id;
    const idEpi = epiEncontrado.id_epi || epiEncontrado.id;

    // Monta o payload idêntico à sua classe Entrega_epi do C#
    const entregaPayload = {
        Data_Entrega: dataEntrega,
        Data_Devolucao: dataDevolucao || dataEntrega,
        Fk_Usuario_Id_Usuario: parseInt(idUsuario),
        Aceito: aceito,
        entrega_de_epi: [
            {
                Fk_Epi_Id_Epi: parseInt(idEpi)
            }
        ]
    };

    fetch("https://localhost:7175/Entrega_Epi", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entregaPayload)
    })
    .then(response => {
        if (response.status === 401) {
            alert("Sessão inválida ou expirada. Por favor, refaça o login.");
            return;
        }
        if (!response.ok) throw new Error("Erro de validação 400 no servidor.");
        return response.json();
    })
    .then(data => {
        if (data) {
            alert("Entrega de EPI cadastrada com sucesso!");
            formulario.reset();
        }
    })
    .catch(error => {
        console.error("Erro ao enviar cadastro:", error);
        alert("Falha ao salvar. Verifique se o seu usuário possui permissão de 'Gestão'.");
    });
}