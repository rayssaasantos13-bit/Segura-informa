function abrirMenu(){
const menu = document.getElementById("menu");
menu.classList.toggle("ativo");
}

function cadastrarMapa() {

    const formData = new FormData();

    formData.append("Descricao", document.getElementById("descricao").value);

 
    formData.append("Data_Criacao", document.getElementById("dataCriacao").value);
    formData.append("Data_Atualizacao", document.getElementById("dataAtualizacao").value);
    formData.append("Fk_Area_Id_Area", 1); 
   

    const imagem = document.getElementById("imagemMapa").files[0];

    if (imagem) {
        formData.append("ArquivoFoto", imagem);
    }

    fetch("https://localhost:7175/Mapa_De_Risco", {
        method: "POST",
        credentials: "include",
        body: formData
    })
    .then(async response => {

        if (!response.ok) {
            const erro = await response.text();
            console.log("ERRO BACKEND:", erro);
            alert("Erro: " + erro);
            return;
        }

        alert("Mapa cadastrado com sucesso!");
    });

}

function deletarMapa(id) {

    fetch("https://localhost:7175/Mapa_De_Risco/" + id, {
        method: "DELETE",
        credentials: "include"
    })
    .then(response => {

        if (response.status == 401) {
            alert("Faça login antes!");
            return;
        }

        if (response.ok) {
            alert("Mapa de risco excluído!");
            location.reload();
        } else {
            alert("Erro ao excluir o mapa.");
        }

    });

}

function editarMapa(id) {

    fetch("https://localhost:7175/Mapa_De_Risco/" + id, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descricao: document.getElementById("descricao").value,
            data_Criacao: document.getElementById("dataCriacao").value,
            data_Atualizacao: document.getElementById("dataAtualizacao").value
        })
    })
    .then(response => {

        if (response.status == 401) {
            alert("Faça login antes!");
            return;
        }

        if (response.ok) {
            alert("Mapa de risco atualizado!");
        } else {
            alert("Erro ao atualizar o mapa.");
        }

    });

}

const inputImagem = document.getElementById("imagemMapa");

const preview = document.getElementById("previewMapa");

const nomeArquivo = document.getElementById("nomeArquivo");

inputImagem.addEventListener("change", function(){

    if(this.files.length > 0){

        const arquivo = this.files[0];

        nomeArquivo.textContent = arquivo.name;

        const leitor = new FileReader();

        leitor.onload = function(e){

            preview.src = e.target.result;

        }

        leitor.readAsDataURL(arquivo);

    }
    else{

        nomeArquivo.textContent = "Nenhuma imagem selecionada.";

        preview.src = "../img/sem-imagem.png";

    }

});

/*const inputImagem = document.getElementById("imagemMapa");

const preview = document.getElementById("previewMapa");

const nomeArquivo = document.getElementById("nomeArquivo");

inputImagem.addEventListener("change", function(){

    if(this.files.length > 0){

        const arquivo = this.files[0];

        nomeArquivo.textContent = arquivo.name;

        const leitor = new FileReader();

        leitor.onload = function(e){

            preview.src = e.target.result;

        }

        leitor.readAsDataURL(arquivo);

    }
    else{

        nomeArquivo.textContent = "Nenhuma imagem selecionada.";

        preview.src = "../img/sem-imagem.png";

    }

});


function cadastrarMapa(){

    const area = document.getElementById("areas").value;

    const descricao = document.getElementById("descricao").value;

    const dataCriacao = document.getElementById("dataCriacao").value;

    const dataAtualizacao = document.getElementById("dataAtualizacao").value;

    const imagem = document.getElementById("imagemMapa").files[0];

    if(area == ""){

        alert("Selecione uma área.");

        return;

    }

    if(descricao == ""){

        alert("Digite uma descrição.");

        return;

    }

    if(!imagem){

        alert("Selecione uma imagem do mapa.");

        return;

    }

    const formData = new FormData();

    formData.append("area", area);

    formData.append("descricao", descricao);

    formData.append("dataCriacao", dataCriacao);

    formData.append("dataAtualizacao", dataAtualizacao);

    formData.append("imagemMapa", imagem);

    
    fetch("https://localhost:7175/Mapa_de_risco",{

        method:"POST",

        body:formData

    })
    .then(r=>r.json())
    .then(()=>{
        alert("Mapa cadastrado com sucesso!");
    });
    

    alert("Mapa pronto para ser enviado!");

}


function atualizarMapa(){

    alert("Atualizar mapa.");

}


function deletarMapa(){

    if(confirm("Deseja excluir este mapa?")){

        alert("Mapa excluído.");

    }

}
}*/

