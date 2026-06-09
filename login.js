function fazerLogin() {

const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;

if(email === "" || senha === ""){

alert("Preencha todos os campos.");

return;
}

if(!email.includes("@")){

alert("Digite um e-mail válido.");

return;
}

alert("Login realizado com sucesso!");

window.location.href = "alertas.html";
}

function criarConta(){

window.location.href = "cadastro.html";
}
