const myForm = document.getElementById('cadastroUsuario');
if (myForm!=null){
myForm.addEventListener('submit', function (event) {
    // 1. Prevenir o recarregamento da página ao submeter form
    event.preventDefault();

    fetch('https://localhost:7175/usuario/', {
        method: 'POST', //Para outros métodos, basta alterar aqui. Obs: Delete remove a parte do body e headers, e no get é conforme todos os exemploes feitos na Unidade interação com API 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
            cargo: document.getElementById("cargo").value
        }),
    }).then(response => {
        console.log(response);
        response.json();
})
        .then(data => {
            alert("Conta cadastrada com sucesso");
           window.location.href = "login.html";      
        })
});
}
/*document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cargo = document.getElementById("cargo").value;
    let senha = document.getElementById("senha").value;
    let confirmar = document.getElementById("confirmar").value;






    
    if (
        nome === "" ||
        email === "" ||
        cargo === "" ||
        senha === "" ||
        confirmar === ""
    ) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    if (senha !== confirmar) {
        alert("As senhas não coincidem!");
        return;
    }

    if (senha.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres!");
        return;
    }

    alert(
        "Cadastro realizado com sucesso!\n\n" +
        "Nome: " + nome + " " + sobrenome +
        "\nE-mail: " + email +
        "\nTelefone: " + telefone +
        "\nPerfil: " + perfil
    );

    this.reset();
});*/