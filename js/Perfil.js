
function editarPerfil() {
    let nome = prompt("Novo nome:");
    let email = prompt("Novo email:");
    let telefone = prompt("Novo telefone:");

    if(nome) {
        document.getElementById("nome").textContent = nome;
    }

    if(email) {
        document.getElementById("email").textContent = "📧 " + email;
    }

    if(telefone) {
        document.getElementById("telefone").textContent = "📱 " + telefone;
    }
}
function toggleMenu() {
document.getElementById("menuLateral")
.classList.toggle("ativo");
}