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

    const area = document.getElementById("areas").value;
    window.location.href = "../html/cadastroMapa.html?area=" + area;

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

            document.getElementById("textoResultado").innerText =
                "Mapa encontrado para esta área.";

            // Imagem
            const imagem = document.getElementById("imagemMapa");
            imagem.src = mapa.nome_Foto;
            imagem.style.display = "block";

            // Exibe painel
            document.getElementById("infoMapa").style.display = "flex";

            // Área
            document.getElementById("nomeArea").textContent =
                mapa.nomeArea;

            // Descrição
            document.getElementById("descricaoMapa").textContent =
                mapa.descricao;

            // Datas
            document.getElementById("dataCriacao").textContent =
                mapa.data_Criacao;

            document.getElementById("dataAtualizacao").textContent =
                mapa.data_Atualizacao;

            // Lista de riscos
            const lista = document.getElementById("listaRiscos");

            lista.innerHTML = "";

            mapa.riscos.forEach(risco => {

                lista.innerHTML += `
                    <div class="risco">

                        <strong>${risco.tipo_Risco}</strong>

                        <br>

                        Grau:
                        <b>${risco.grau_Risco}</b>

                        <br>

                        ${risco.descricao}

                    </div>
                `;

            });

        })

        .catch(() => {

            document.getElementById("imagemMapa").style.display = "none";

            document.getElementById("infoMapa").style.display = "none";

            document.getElementById("textoResultado").innerText =
                "Nenhum mapa encontrado.";

            alert("Não existe mapa cadastrado para esta área.");

        });

}

function PesquisarMapa() {

    const area = document.getElementById("areas").value;


    if (area == "") {

        alert("Selecione uma área.");

        return;

    }


    fetch("https://localhost:7175/Mapa_De_Risco", {

        credentials: "include"

    })


    .then(response => response.json())


    .then(mapas => {


        const mapa = mapas.find(m => 
            m.fk_Area_Id_Area == area
        );


        if (!mapa) {


            document.getElementById("textoResultado").innerHTML =
                "Nenhum mapa encontrado.";


            document.getElementById("conteudoMapa").innerHTML =
                "<p>Essa área não possui mapa.</p>";


            return;

        }



        document.getElementById("textoResultado").innerHTML =
            "Mapa encontrado.";



        const caminhoImagem = (mapa.nome_Foto || "").trim();



        document.getElementById("conteudoMapa").innerHTML = `


            <img 
            src="${caminhoImagem}"
            alt="Mapa de risco"
            style="max-width:100%; border-radius:10px;">



            <br><br>


            <button 
            class="editarMapa"
            onclick="editarMapaTela(${mapa.id_Mapa})">

                ✏️ Editar Mapa

            </button>



            <button 
            class="deletarMapa"
            onclick="deletarMapaTela(${mapa.id_Mapa})">

                🗑️ Excluir Mapa

            </button>


        `;


    })


    .catch(error => {

        console.log(error);


        alert("Erro ao buscar mapa.");

    });


}





// ============================
// IR PARA EDITAR MAPA
// ============================

function editarMapaTela(id){


    window.location.href =
    "../html/cadastroMapa.html?id=" + id;


}





// ============================
// EXCLUIR MAPA
// ============================

function deletarMapaTela(id){


    if(!confirm("Deseja excluir este mapa?")){

        return;

    }



    fetch("https://localhost:7175/Mapa_De_Risco/" + id, {


        method:"DELETE",

        credentials:"include"


    })


    .then(response=>{


        if(response.ok){


            alert("Mapa excluído com sucesso!");

            location.reload();


        }

        else{


            alert("Erro ao excluir mapa.");

        }


    });


}
