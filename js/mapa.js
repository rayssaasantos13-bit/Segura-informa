// ============================
// MENU
// ============================

function toggleMenu() {
    document.getElementById("menuLateral").classList.toggle("ativo");
}

// ============================
// IMPRIMIR
// ============================

function imprimir() {
    window.print();
}

// ============================
// CADASTRAR NOVO MAPA
// ============================

function CadastrarMapa() {
    window.location.href = "../html/cadastroMapa.html";
}

// ============================
// CARREGAR ÁREAS
// ============================

const selectAreas = document.getElementById("areas");

fetch("https://localhost:7175/Mapa_De_Risco/AreasComMapa")
    .then(response => {

        if (!response.ok)
            throw new Error("Erro ao carregar áreas.");

        return response.json();

    })
    .then(areas => {

        areas.forEach(area => {

            const option = document.createElement("option");

            option.value = area.id_Area;
            option.textContent = area.nome_Area.trim();

            selectAreas.appendChild(option);

        });

    })
    .catch(() => {

        alert("Erro ao carregar as áreas.");

    });

// ============================
// PESQUISAR MAPA
// ============================

document
    .getElementById("btnPesquisar")
    .addEventListener("click", buscarMapa);

function buscarMapa() {

    const idArea = selectAreas.value;

    if (idArea == "") {

        alert("Selecione uma área.");

        return;

    }

    fetch(`https://localhost:7175/Mapa_De_Risco/BuscarPorArea/${idArea}`)

        .then(response => {

            if (!response.ok)
                throw new Error();

            return response.json();

        })

        .then(mapa => {

            const imagem = document.getElementById("imagemMapa");

            imagem.src = mapa.nome_Foto;

            imagem.style.display = "block";

            document.getElementById("textoResultado").innerText =
                "Mapa encontrado para esta área.";

        })

        .catch(() => {

            document.getElementById("imagemMapa").style.display = "none";

            document.getElementById("textoResultado").innerText =
                "Nenhum mapa cadastrado para esta área.";

            alert("Não existe mapa cadastrado para esta área.");

        });

}