// ============================
// VARIÁVEL DE EDIÇÃO
// ============================

let mapaEdicao = null;


// ============================
// MENU
// ============================

function abrirMenu(){

    const menu = document.getElementById("menu");

    if(menu){

        menu.classList.toggle("ativo");

    }

}


// ============================
// INICIAR PÁGINA
// ============================

document.addEventListener("DOMContentLoaded", function(){


    carregarAreas();

    carregarMapas();


});




// ============================
// CARREGAR MAPAS
// ============================

function carregarMapas(){


    fetch("https://localhost:7175/Mapa_De_Risco",{

        credentials:"include"

    })


    .then(response=>response.json())


    .then(mapas=>{


        const lista =
        document.getElementById("listaMapas");


        lista.innerHTML="";



        if(mapas.length == 0){


            lista.innerHTML =
            "<p>Nenhum mapa cadastrado.</p>";

            return;

        }




        mapas.forEach(mapa=>{


            lista.innerHTML += `


            <div class="mapa-card">


                <h3>
                    ${mapa.descricao.trim()}
                </h3>



                <p>
                    Data criação:
                    ${mapa.data_Criacao.substring(0,10)}
                </p>



                <button 
                onclick="selecionarMapa(${mapa.id_Mapa})">

                    Editar

                </button>



                <button
                onclick="deletarMapa(${mapa.id_Mapa})">

                    Excluir

                </button>



            </div>



            `;


        });



    })


    .catch(error=>{


        console.log(error);

        alert("Erro ao carregar mapas.");


    });


}




// ============================
// NOVO MAPA
// ============================

function novoMapa(){


    limparFormulario();


}




// ============================
// SELECIONAR MAPA PARA EDITAR
// ============================


function selecionarMapa(id){

    console.log("ID do mapa selecionado:", id);



    fetch(
        "https://localhost:7175/Mapa_De_Risco/" + id,
        {

        credentials:"include"

        }

    )


    .then(response=>response.json())


    .then(mapa=>{
            console.log("Mapa recebido:", mapa);


        mapaEdicao = mapa;



        document.getElementById("descricao").value =
        mapa.descricao.trim();



        document.getElementById("dataCriacao").value =
        mapa.data_Criacao.substring(0,10);



        document.getElementById("dataAtualizacao").value =
        mapa.data_Atualizacao.substring(0,10);



        document.getElementById("areas").value =
        mapa.fk_Area_Id_Area;



   if(mapa.nome_Foto){

    const imagem =
    document.getElementById("previewMapa");


    imagem.src = mapa.nome_Foto;


    imagem.style.display = "block";


}
else{

    document.getElementById("previewMapa").src = "";

}



        carregarDadosArea();



    })



}




// ============================
// CARREGAR ÁREAS
// ============================

function carregarAreas(){



    fetch("https://localhost:7175/Area",{

        credentials:"include"

    })


    .then(response=>response.json())


    .then(areas=>{


        const select =
        document.getElementById("areas");


        select.innerHTML =
        "<option value=''>Selecione uma área</option>";



        areas.forEach(area=>{


            select.innerHTML += `

            <option value="${area.id_Area}">

                ${area.nome_Area.trim()}

            </option>

            `;


        });



        select.addEventListener(
            "change",
            carregarDadosArea
        );



    });


}



// ============================
// CADASTRAR
// ============================

function cadastrarMapa(){



    const area =
    document.getElementById("areas").value;



    if(area==""){


        alert("Selecione uma área.");

        return;

    }




    const formData =
    new FormData();



    formData.append(
        "Descricao",
        document.getElementById("descricao").value.trim()
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




    fetch("https://localhost:7175/Mapa_De_Risco",{

        method:"POST",

        credentials:"include",

        body:formData

    })


    .then(response=>{


        if(!response.ok){

            throw new Error();

        }



        alert("Mapa cadastrado!");

        carregarMapas();

        limparFormulario();


    })


    .catch(()=>{


        alert("Erro ao cadastrar mapa.");

    });



}




// ============================
// EDITAR
// ============================

function editarMapa(){



    if(!mapaEdicao){


        alert("Selecione um mapa para editar.");

        return;

    }



    const id =
    mapaEdicao.id_Mapa;



    const formData =
    new FormData();



    formData.append(
        "Descricao",
        document.getElementById("descricao").value.trim()
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




    const imagem =
    document.getElementById("imagemMapa").files[0];



    if(imagem){

        formData.append(
            "ArquivoFoto",
            imagem
        );

    }





    fetch(
        "https://localhost:7175/Mapa_De_Risco/" + id,
        {

        method:"PUT",

        credentials:"include",

        body:formData

        }

    )


    .then(()=>{


        alert("Mapa atualizado!");

        carregarMapas();

        limparFormulario();


    })



}




// ============================
// DELETAR
// ============================


function deletarMapa(id){



    if(!confirm("Excluir mapa?")){

        return;

    }




    fetch(
        "https://localhost:7175/Mapa_De_Risco/" + id,
        {

        method:"DELETE",

        credentials:"include"

        }

    )


    .then(()=>{


        alert("Mapa excluído!");

        carregarMapas();


        limparFormulario();


    });



}




// ============================
// LIMPAR FORMULÁRIO
// ============================

function limparFormulario(){



    mapaEdicao=null;



    document.getElementById("descricao").value="";


    document.getElementById("dataCriacao").value="";


    document.getElementById("dataAtualizacao").value="";


    document.getElementById("areas").value="";


    document.getElementById("descricaoArea").value="";


    document.getElementById("listaRiscos").innerHTML =
    "<p>Selecione uma área.</p>";



    document.getElementById("previewMapa").src="";


}




// ============================
// DADOS DA ÁREA
// ============================

function carregarDadosArea(){



    const id =
    document.getElementById("areas").value;



    if(id==""){

        return;

    }



    fetch(
        "https://localhost:7175/Area/DadosArea/" + id,
        {

        credentials:"include"

        }

    )


    .then(response=>response.json())


    .then(dados=>{


        document.getElementById("descricaoArea").value =
        dados.descricao;



        const lista =
        document.getElementById("listaRiscos");


        lista.innerHTML="";



        dados.riscos.forEach(risco=>{


            lista.innerHTML += `

            <div class="risco">

            <strong>
            ${risco.tipo_Risco}
            </strong>

            <br>

            Grau:
            ${risco.grau_Risco}

            <br>

            ${risco.descricao}

            </div>

            `;


        });



    });



}