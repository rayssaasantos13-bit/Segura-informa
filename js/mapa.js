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
// ======================================
// CARREGAR AO ABRIR A PÁGINA
// ======================================

document.addEventListener("DOMContentLoaded", function () {


    carregarAreas();



    const botao =
        document.getElementById("btnPesquisar");


    if (botao) {

        botao.addEventListener(
            "click",
            PesquisarMapa
        );

    }



});

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

// ======================================
// PESQUISAR MAPA
// ======================================

function PesquisarMapa() {


    const idArea =
        document.getElementById("areas").value;



    if (idArea === "") {


        alert("Selecione uma área.");

        return;

    }



    fetch(
        `https://localhost:7175/Mapa_De_Risco/BuscarPorArea/${idArea}`,
        {

            credentials: "include"

        }

    )


    .then(response => {


        if (!response.ok) {


            throw new Error(
                "Mapa não encontrado"
            );


        }


        return response.json();


    })


    .then(mapa => {



        console.log("Mapa recebido:", mapa);



        // ===============================
        // TEXTO DE RESULTADO
        // ===============================


        const texto =
            document.getElementById("textoResultado");


        if (texto) {


            texto.innerHTML =
                "Mapa encontrado para esta área.";


        }




        // ===============================
        // IMAGEM DO MAPA
        // ===============================


        const imagem =
            document.getElementById("imagemMapa");



        if (imagem && mapa.nome_Foto) {


            imagem.src =
                mapa.nome_Foto;


            imagem.style.display =
                "block";


        }





        // ===============================
        // NOME DA ÁREA
        // ===============================


        const nomeArea =
            document.getElementById("nomeArea");



        if(nomeArea){


            nomeArea.textContent =
                mapa.nomeArea || "";


        }




        // ===============================
        // DESCRIÇÃO DO MAPA
        // ===============================


        const descricaoMapa =
            document.getElementById("descricaoMapa");



        if(descricaoMapa){


            descricaoMapa.textContent =
                mapa.descricao || "";


        }




        // ===============================
        // DESCRIÇÃO DA ÁREA
        // ===============================


        const descricaoArea =
            document.getElementById("descricaoAreaMapa");



        if(descricaoArea){


            descricaoArea.textContent =
                mapa.descricaoArea || "";


        }





        // ===============================
        // DATAS
        // ===============================


        const dataCriacao =
            document.getElementById("dataCriacao");



        if(dataCriacao){


            dataCriacao.textContent =
                formatarData(mapa.data_Criacao);


        }




        const dataAtualizacao =
            document.getElementById("dataAtualizacao");



        if(dataAtualizacao){


            dataAtualizacao.textContent =
                formatarData(mapa.data_Atualizacao);


        }





        // ===============================
        // RISCOS
        // ===============================


        mostrarRiscos(mapa.riscos);



        // Exibir bloco de informações

        const info =
            document.getElementById("infoMapa");


        if(info){


            info.style.display =
                "flex";


        }




    })


    .catch(error => {



        console.log(error);



        const imagem =
            document.getElementById("imagemMapa");



        if(imagem){


            imagem.src = "";

            imagem.style.display =
                "none";


        }




        alert(
            "Nenhum mapa encontrado para esta área."
        );



    });



}



// ======================================
// FORMATAR DATA
// ======================================

function formatarData(data){


    if(!data){

        return "";

    }


    return data.substring(0,10);


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
// ======================================
// MOSTRAR RISCOS
// ======================================

function mostrarRiscos(riscos) {


    const lista =
        document.getElementById("listaRiscos");



    if (!lista) {

        return;

    }



    lista.innerHTML = "";



    if (!riscos || riscos.length === 0) {


        lista.innerHTML =
            "<p>Nenhum risco cadastrado.</p>";


        return;

    }



    riscos.forEach(risco => {


        lista.innerHTML += `

            <div class="risco">

                <strong>
                    ${risco.tipo_Risco}
                </strong>

                <br>

                Grau:
                <b>
                    ${risco.grau_Risco}
                </b>

                <br>

                ${risco.descricao}

            </div>

        `;


    });


}



// ======================================
// BOTÃO PESQUISAR DA PÁGINA NORMAL
// ======================================

document.addEventListener("DOMContentLoaded", function(){


    const botao =
        document.getElementById("btnPesquisar");



    if(botao){


        botao.addEventListener(
            "click",
            PesquisarMapa
        );


    }



});
