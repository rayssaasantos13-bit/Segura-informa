// ============================
// MENU
// ============================

function abrirMenu() {

    const menu = document.getElementById("menu");

    if(menu){
        menu.classList.toggle("ativo");
    }

}


// ============================
// CADASTRAR MAPA
// ============================

function cadastrarMapa() {


    const area = document.getElementById("areas").value;


    if(area === ""){

        alert("Selecione uma área.");

        return;

    }



    const formData = new FormData();



    formData.append(
        "Descricao",
        document.getElementById("descricao").value
    );


    formData.append(
        "Data_Criacao",
        document.getElementById("dataCriacao").value
    );


    formData.append(
        "Data_Atualizacao",
        document.getElementById("dataAtualizacao").value
    );


    formData.append(
        "Fk_Area_Id_Area",
        area
    );



    const imagem =
    document.getElementById("imagemMapa").files[0];



    if(imagem){

        formData.append(
            "ArquivoFoto",
            imagem
        );

    }


console.log(document.getElementById("dataCriacao").value);
console.log(document.getElementById("dataAtualizacao").value);
    fetch("https://localhost:7175/Mapa_De_Risco",{


        method:"POST",


        credentials:"include",


        body:formData


    })


    .then(async response=>{


        if(!response.ok){


            const erro =
            await response.text();


            console.log("ERRO:",erro);


            alert("Erro: "+erro);


            return;

        }



        alert("Mapa cadastrado com sucesso!");


        window.location.href="mapaderiscoGest.html";


    })


    .catch(error=>{


        console.log(error);


        alert("Erro ao cadastrar mapa.");


    });



}



// ============================
// CARREGAR ÁREAS
// ============================


document.addEventListener("DOMContentLoaded", function () {

    const selectAreas = document.getElementById("areas");

    if (!selectAreas) {
        console.log("Select de áreas não encontrado.");
        return;
    }

    fetch("https://localhost:7175/Area", {
        method: "GET",
        credentials: "include"
    })

    .then(response => {

        console.log("Status:", response.status);

        if (!response.ok) {
            throw new Error("Erro ao buscar áreas");
        }

        return response.json();

    })

    .then(areas => {

        console.log("Áreas recebidas:", areas);

        selectAreas.innerHTML =
            '<option value="">Selecione uma área</option>';

        areas.forEach(area => {

            const option = document.createElement("option");

            option.value = area.id_Area;
            option.textContent = area.nome_Area.trim();

            selectAreas.appendChild(option);

        });

        selectAreas.addEventListener("change", carregarDadosArea);

    })

    .catch(error => {

        console.log(error);

        alert("Erro ao carregar áreas.");

    });

});
// ============================
// PREVISUALIZAÇÃO DA IMAGEM
// ============================


const inputImagem =
document.getElementById("imagemMapa");


const preview =
document.getElementById("previewMapa");


const nomeArquivo =
document.getElementById("nomeArquivo");



if(inputImagem){


inputImagem.addEventListener("change",function(){



    if(this.files.length > 0){



        const arquivo =
        this.files[0];



        nomeArquivo.textContent =
        arquivo.name;



        const leitor =
        new FileReader();



        leitor.onload=function(e){


            preview.src =
            e.target.result;


        }



        leitor.readAsDataURL(arquivo);



    }



});



}




// ============================
// CARREGAR MAPA PARA EDITAR
// ============================


const parametros =
new URLSearchParams(window.location.search);



const idMapa =
parametros.get("id");



if(idMapa){

    const campoId = document.getElementById("idMapa");

    if(campoId){
        campoId.value = idMapa;
    }

    fetch(`https://localhost:7175/Mapa_De_Risco/${idMapa}`,{


        credentials:"include"


    })


    .then(response=>response.json())


    .then(mapa=>{



        document.getElementById("descricao").value =
        mapa.descricao.trim();



        document.getElementById("dataCriacao").value =
        mapa.data_Criacao.substring(0,10);



        document.getElementById("dataAtualizacao").value =
        mapa.data_Atualizacao.substring(0,10);



      document.getElementById("areas").value =
mapa.fk_Area_Id_Area;

carregarDadosArea();


        if(mapa.nome_Foto){


            document.getElementById("previewMapa").src =
            mapa.nome_Foto;


        }



    })

    .catch(error=>{


        console.log(error);


        alert("Erro ao carregar mapa.");


    });



}




// ============================
// EDITAR MAPA
// ============================


function editarMapa() {

    const idMapa = document.getElementById("idMapa").value;

    if (idMapa == "") {

        alert("Mapa não encontrado.");

        return;
    }

    const formData = new FormData();

    formData.append(
        "Descricao",
        document.getElementById("descricao").value
    );

    formData.append(
        "Data_Criacao",
        document.getElementById("dataCriacao").value
    );

    formData.append(
        "Data_Atualizacao",
        document.getElementById("dataAtualizacao").value
    );

    formData.append(
        "Fk_Area_Id_Area",
        document.getElementById("areas").value
    );

    const imagem = document.getElementById("imagemMapa").files[0];

    if (imagem) {

        formData.append(
            "ArquivoFoto",
            imagem
        );

    }

    fetch("https://localhost:7175/Mapa_De_Risco/" + idMapa, {

        method: "PUT",

        credentials: "include",

        body: formData

    })

    .then(async response => {

        if (!response.ok) {

            const erro = await response.text();

            alert(erro);

            return;
        }

        alert("Mapa atualizado com sucesso!");

        window.location.href = "mapaderiscoGest.html";

    })

    .catch(error => {

        console.log(error);

        alert("Erro ao atualizar mapa.");

    });

}
// ============================
// DELETAR MAPA
// ============================


function deletarMapa() {

    const idMapa = document.getElementById("idMapa").value;

    if (idMapa == "") {

        alert("Nenhum mapa selecionado.");

        return;
    }

    if (!confirm("Deseja realmente excluir este mapa?")) {

        return;
    }

    fetch("https://localhost:7175/Mapa_De_Risco/" + idMapa, {

        method: "DELETE",

        credentials: "include"

    })

    .then(async response => {

        if (!response.ok) {

            const erro = await response.text();

            alert(erro);

            return;
        }

        alert("Mapa excluído com sucesso!");

        window.location.href = "mapaderiscoGest.html";

    })

    .catch(error => {

        console.log(error);

        alert("Erro ao excluir mapa.");

    });

}
function carregarRiscos() {

    const idArea = document.getElementById("areas").value;

    if (idArea == "") {

        document.getElementById("listaRiscos").innerHTML =
            "<p class='semRisco'>Selecione uma área.</p>";

        return;
    }

    fetch("https://localhost:7175/Area/RiscosDaArea/" + idArea)

        .then(response => response.json())

        .then(riscos => {

            const lista = document.getElementById("listaRiscos");

            lista.innerHTML = "";

            if (riscos.length == 0) {

                lista.innerHTML =
                    "<p class='semRisco'>Nenhum risco cadastrado.</p>";

                return;
            }

            riscos.forEach(risco => {

                lista.innerHTML += `
                    <div class="risco-card">
                        <h4>${risco.tipo_Risco}</h4>
                        <span><strong>Grau:</strong> ${risco.grau_Risco}</span>
                        <span>${risco.descricao}</span>
                    </div>
                `;

            });

        })

        .catch(error => {

            console.log(error);

        });

}
function carregarDadosArea(){

    const idArea = document.getElementById("areas").value;

    if(idArea==""){

        document.getElementById("descricaoArea").value="";

        document.getElementById("listaRiscos").innerHTML=
        "<p>Selecione uma área.</p>";

        return;

    }

    fetch("https://localhost:7175/Area/DadosArea/"+idArea,{

        credentials:"include"

    })

    .then(response=>response.json())

    .then(dados=>{

        document.getElementById("descricaoArea").value=
        dados.descricao;

        const lista=
        document.getElementById("listaRiscos");

        lista.innerHTML="";

        dados.riscos.forEach(risco=>{

            lista.innerHTML+=`

                <div class="risco">

                    <strong>${risco.tipo_Risco}</strong>

                    <br>

                    Grau:
                    ${risco.grau_Risco}

                    <br><br>

                    ${risco.descricao}

                </div>

            `;

        });

    });

}