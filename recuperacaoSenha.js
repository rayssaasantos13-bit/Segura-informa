function recuperarSenha(){

const email = document.getElementById("email").value;

if(email === ""){
alert("Digite seu e-mail.");
return;
}

alert("Código de recuperação enviado para: " + email);

}