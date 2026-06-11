document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let sobrenome = document.getElementById("sobrenome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let perfil = document.getElementById("perfil").value;
    let senha = document.getElementById("senha").value;
    let confirmar = document.getElementById("confirmar").value;






    
    if (
        nome === "" ||
        sobrenome === "" ||
        email === "" ||
        perfil === "" ||
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
});