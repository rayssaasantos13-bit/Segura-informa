

function toggleMenu() {
    document
        .getElementById("menuLateral")
        .classList.toggle("ativo");
}



window.onload = carregarPerfil;

function carregarPerfil() {

    fetch("https://localhost:7175/Usuario/perfil", {
        method: "GET",
        credentials: "include"
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Usuário não autenticado.");
        }

        return response.json();

    })

    .then(usuario => {

        document.getElementById("nome").textContent = usuario.nome;
        document.getElementById("cargo").textContent = usuario.cargo;
        document.getElementById("nomeInput").value = usuario.nome;
        document.getElementById("email").value = usuario.email;
        document.getElementById("cargoInput").value = usuario.cargo;

    })

    .catch(() => {

        alert("Faça login novamente.");

        window.location.href = "../html/login.html";

    });

}


document
.getElementById("logout")
.addEventListener("click", logout);

document
.getElementById("btnSair")
.addEventListener("click", function(e){

    e.preventDefault();

    logout();

});

function logout(){

    fetch("https://localhost:7175/Usuario/logout",{

        method:"GET",

        credentials:"include"

    })

    .then(() => {

        window.location.href = "../html/login.html";

    })

    .catch(() => {

        window.location.href = "../html/login.html";

    });

}


