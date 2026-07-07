const myForm1 = document.getElementById('Entrega_EPIs');
if (myForm1 != null) {
myForm1.addEventListener('submit', function (event) {
    // 1. Prevenir o recarregamento da página ao submeter form
    event.preventDefault();

    fetch('https://localhost:7230/Tarefa/Cadastrar', {
        method: 'POST', //Para outros métodos, basta alterar aqui. Obs: Delete remove a parte do body e headers, e no get é conforme todos os exemploes feitos na Unidade interação com API 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            codigodoepi: document.getElementById("Codigo so EPI").value,
            CertificadodeAprovação: document.getElementById("CA").value,
            nomedoepi: document.getElementById("Nome do EPI").value,
            categoria: document.getElementById("Categoria").value,
            fabricante: document.getElementById("Fabricante").value,
            quantidade: document.getElementById("Quantidade").value,
            Unidade: document.getElementById("Unidade").value,
            datadevalidade: document.getElementById("Data de validade").value,
            descrição: document.getElementById("Descrição").value
           
        }),
    }).then(response => {
        if (response.status ==401){
            alert ("Faça login antes da tarefa!");
            window.location.href="Login.html";
        }
        response.json();})
        .then(data => {
            document.getElementById("respostaTarefa").innerHTML ="<h4>Tarefa cadastrada com sucesso!</h4>";        
        })
});
}

fetch('https://localhost:7230/Tarefa',
    { 
        credentials: 'include' 
    }).then(response => {
        if (response.status ==401){
            alert ("Faça login antes da tarefa!");
            window.location.href="Login.html";
        }
        return response.json();})
   .then(data => {
        if(data.length >0){
        var resposta = document.getElementById("respostaConsulta");
        resposta.innerHTML = "<h4>Segue Lista de suas tarefas</h4> ";
        for (i = 0; i < data.length; i++) {
            resposta.innerHTML += "<li> Usuario: " + data[i].usuario + "</li>";
            resposta.innerHTML += "Descrição : <input type='text' id='Descricao"+data[i].id+"' value='" + data[i].tarefa + "'>";
            resposta.innerHTML += "statuss: <input type='text' id='statuss"+data[i].id+"' value='" + data[i].statuss+ "'>";
            resposta.innerHTML += "<button onclick='AtualizarTarefa("+data[i].id+")'>Atualizar Tarefa </button>";
            resposta.innerHTML += "<button onclick='deletarTarefa("+data[i].id+")'>Deletar Tarefa </button> <hr>";
       }
    }
    });

  function deletarTarefa(id) {

    console.log(id);

    fetch('https://localhost:7230/tarefa/Deletar/' + id, {

        method: "DELETE",
        credentials: "include"

    })

    .then(async response => {

        console.log(response.status);

        const texto = await response.text();

        console.log(texto);

        if(response.ok){
            location.reload();
        }

    })

    .catch(error => console.log(error));

}



function AtualizarTarefa(idTarefa) {
console.log(idTarefa);
    fetch('https://localhost:7230/Tarefa/Atualizar/' + idTarefa, {

        method: 'PUT',

        credentials: 'include',

        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({

            Descrição: document.getElementById("Descricao"+idTarefa).value,
            statuss: "Pendente"

        }),

    })

    .then(response => response.text())

  

}

function logout() {
    fetch('https://localhost:7230/Usuario/logout/', { 
        credentials: 'include' })
        .then(response => {
            console.log(response);
            window.location.href = "Login.html"
        })
}