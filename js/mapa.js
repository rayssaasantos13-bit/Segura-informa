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

// ============================
// CARREGAR ÁREAS
// ============================

function carregarAreas(){


    const selectAreas =
        document.getElementById("areas");


    if(!selectAreas){

        return;

    }



    fetch("https://localhost:7175/Mapa_De_Risco/AreasComMapa", {

        method:"GET",

        credentials:"include"

    })


    .then(response=>{


        if(!response.ok){

            throw new Error("Erro ao carregar áreas.");

        }


        return response.json();


    })


    .then(areas=>{


        selectAreas.innerHTML = "";


        let opcao = document.createElement("option");

        opcao.value = "";

        opcao.textContent = "Selecione uma área";


        selectAreas.appendChild(opcao);



        areas.forEach(area=>{


            let option =
            document.createElement("option");


            option.value =
            area.id_Area;


            option.textContent =
            area.nome_Area.trim();



            selectAreas.appendChild(option);


        });


    })


    .catch(erro=>{


        console.log("Erro:", erro);

     Swal.fire({
    title: "Atenção!",
    text: "Erro ao carregar áreas.",
    icon: "warning",
    confirmButtonColor: "#ff8c00",
    confirmButtonText: "OK"
});


    });


}

// ======================================
// PESQUISAR MAPA
// ======================================

function PesquisarMapa() {


    const idArea =
        document.getElementById("areas").value;



    if (idArea === "") {


       Swal.fire({
    title: "Atenção!",
    text: "Selecione uma área.",
    icon: "warning",
    confirmButtonColor: "#ff8c00",
    confirmButtonText: "OK"
});

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
            document.getElementById("descricaoArea");



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




Swal.fire({
    title: "Atenção!",
    text: "Nenhum mapa encontrado para esta área.",
    icon: "warning",
    confirmButtonColor: "#ff8c00",
    confirmButtonText: "OK"
});



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

async function deletarMapaTela(id){


Swal.fire({
    title: "Tem certeza?",
    text: "Deseja excluir este mapa?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ff8c00",
    cancelButtonColor: "#808080",
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar"

}).then((resultado) => {

    if (resultado.isConfirmed) {

        fetch("https://localhost:7175/Mapa_De_Risco/" + id, {

            method:"DELETE",

            credentials:"include"

        })

        .then(response=>{

            if(response.ok){

                Swal.fire({
                    title: "Sucesso!",
                    text: "Mapa excluído com sucesso!",
                    icon: "success",
                    confirmButtonColor: "#ff8c00",
                    confirmButtonText: "OK"
                });

                location.reload();

            }

            else{

                Swal.fire({
                    title: "Erro!",
                    text: "Erro ao excluir mapa.",
                    icon: "error",
                    confirmButtonColor: "#ff8c00",
                    confirmButtonText: "OK"
                });

            }

        });

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

function CadastrarMapa(){

    window.location.href = "cadastroMapa.html";

}
document.addEventListener("DOMContentLoaded", function(){

    const botaoNovoMapa = document.getElementById("btnNovoMapa");


    if(botaoNovoMapa){

        botaoNovoMapa.addEventListener("click", function(){

            window.location.href = "cadastroMapa.html";

        });

    }
    else{

        console.log("Botão não encontrado");

    }

});