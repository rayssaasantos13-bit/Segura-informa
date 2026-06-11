const myFormLogin = document.getElementById('loginUsuario');
if (myFormLogin !=null){
myFormLogin.addEventListener('submit', function (event) {
    // 1. Prevenir o recarregamento da página ao submeter form
    event.preventDefault();

    fetch('https://localhost:7175/Usuario/login', {
        method: 'POST', //Para outros métodos, basta alterar aqui. Obs: Delete remove a parte do body e headers, e no get é conforme todos os exemploes feitos na Unidade interação com API 
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
        console.log(response);
        if (response.status == 401) {
            alert("Email ou senha Incorretos!");
        } else {
            alert("Logado com suceeso");
          window.location.href = "mapa de risco.html";
        }
    })

});
}