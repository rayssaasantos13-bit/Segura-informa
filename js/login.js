
const myForm = document.getElementById('loginUsuario');
if (myForm!=null){
myForm.addEventListener('submit', function (event) {
    // 1. Prevenir o recarregamento da página ao submeter form
    event.preventDefault();

    fetch('https://localhost:7175/usuario/login', {
        method: 'POST', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: " ",
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
            cargo: " "
        }),
    }).then(response => {
             if (response.status == 401) {
            alert("Email ou senha Incorretos!");
        } else {
            alert("Logado com suceeso");
            window.location.href = "mapaderisco.html";
        }
})
       
});
}