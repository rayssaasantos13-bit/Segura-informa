async function login() {
const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;

try {
const resposta = await fetch(`http://localhost:8080/usuarios/email/${email}`);

if (!resposta.ok) {
alert("⚠️ E-mail não cadastrado no sistema.");
return;
}

const usuario = await resposta.json();

if (usuario.senha !== senha) {
alert("⚠️ Senha incorreta.");
return;
}

alert("✅ Login realizado com sucesso!");
window.location.href = "dashboard.html";

} catch (erro) {
alert("Erro ao conectar com o servidor.");
console.error(erro);
}
}