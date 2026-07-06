const myForm1 = document.getElementById('Entrega');
if (myForm1 != null) {
myForm1.addEventListener('submit', function (event) {
    // 1. Prevenir o recarregamento da página ao submeter form
    event.preventDefault();

    fetch('https://localhost:7175/Entrega/Cadastrar', {
        method: 'POST', //Para outros métodos, basta alterar aqui. Obs: Delete remove a parte do body e headers, e no get é conforme todos os exemploes feitos na Unidade interação com API 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            codigodoepi: document.getElementById("Codigo do EPI").value,
            ca: document.getElementById("ca").value,
            nomedoepi: document.getElementById("Nome do EPI").value,
            categoria: document.getElementById("Categoria").value,
            fabricante: document.getElementById("Fabricante").value,
            quantidade: document.getElementById("Quantidade").value,
            unidade: document.getElementById("Unidade").value,
            datadevalidade: document.getElementById("Data de Validade").value,
            descrição: document.getElementById("Descrição").value


        }),
    }).then(response => {
        if (response.status ==401){
            alert ("Faça login antes de cadastrar o EPI!");
            window.location.href="Login.html";
        }
        response.json();})
        .then(data => {
            document.getElementById("respostaEntrega").innerHTML ="<h4>EPI cadastrado com sucesso!</h4>";        
        })
});
}

fetch('https://localhost:7175/Entrega',
    { 
        credentials: 'include' 
    }).then(response => {
        if (response.status ==401){
            alert ("Faça login antes de cadastrar o EPI!");
            window.location.href="Login.html";
        }
 return response.json();
})
.then(data => {
    if (data.length > 0) {

        var resposta = document.getElementById("respostaConsulta");
        resposta.innerHTML = "<h4>Segue a Lista dos EPIs</h4>";

        for (let i = 0; i < data.length; i++) {

            resposta.innerHTML += "<hr>";

            resposta.innerHTML += "Código do EPI: <input type='text' id='codigodoepi" + data[i].id + "' value='" + data[i].codigodoepi + "'><br><br>";

            resposta.innerHTML += "CA: <input type='text' id='ca" + data[i].id + "' value='" + data[i].ca + "'><br><br>";

            resposta.innerHTML += "Nome do EPI: <input type='text' id='nomedoepi" + data[i].id + "' value='" + data[i].nomedoepi + "'><br><br>";

            resposta.innerHTML += "Categoria: <input type='text' id='categoria" + data[i].id + "' value='" + data[i].categoria + "'><br><br>";

            resposta.innerHTML += "Fabricante: <input type='text' id='fabricante" + data[i].id + "' value='" + data[i].fabricante + "'><br><br>";

            resposta.innerHTML += "Quantidade: <input type='number' id='quantidade" + data[i].id + "' value='" + data[i].quantidade + "'><br><br>";

            resposta.innerHTML += "Unidade: <input type='text' id='unidade" + data[i].id + "' value='" + data[i].unidade + "'><br><br>";

            resposta.innerHTML += "Data de Validade: <input type='date' id='datadevalidade" + data[i].id + "' value='" + data[i].datadevalidade + "'><br><br>";

            resposta.innerHTML += "Descrição: <input type='text' id='descricao" + data[i].id + "' value='" + data[i].descricao + "'><br><br>";

            resposta.innerHTML += "<button onclick='AtualizarEPI(" + data[i].id + ")'>Atualizar EPI</button> ";

            resposta.innerHTML += "<button onclick='deletarEPI(" + data[i].id + ")'>Deletar EPI</button>";
        }

    } else {
        document.getElementById("respostaConsulta").innerHTML = "<h4>Nenhum EPI encontrado.</h4>";
    }
});
  function deletarEntrega(id) {

    console.log(id);

    fetch('https://localhost:7175/Entrega/Deletar/' + id, {

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



function AtualizarEntrega(idEntrega) {
console.log(idEntrega);
    fetch('https://localhost:7175/Entrega/Atualizar/' + idEntrega, {

        method: 'PUT',

        credentials: 'include',

        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({

            Descrição: document.getElementById("Descricao"+idEntrega).value,
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