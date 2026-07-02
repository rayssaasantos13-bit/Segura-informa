function abrirMenu(){
const menu = document.getElementById("menu");
menu.classList.toggle("ativo");
}
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

