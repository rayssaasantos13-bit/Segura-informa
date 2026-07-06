function abrirMenu(){
const menu = document.getElementById("menu");
menu.classList.toggle("ativo");
}
const formEntrega = document.getElementById('formEntrega');

if (formEntrega != null) {

    formEntrega.addEventListener('submit', function (event) {

        event.preventDefault();

        fetch('https://localhost:7175/entregaepi', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                colaborador: document.getElementById("nome").value,
                matricula: document.getElementById("matricula").value,
                setor: document.getElementById("setor").value,
                epi: document.getElementById("epi").value,
                quantidade: parseInt(document.getElementById("quantidade").value),
                dataEntrega: document.getElementById("dataEntrega").value,
                observacoes: document.getElementById("observacoes").value
            }),
        })

        .then(response => {

            if (response.status == 401) {

                alert("Faça login antes de registrar uma entrega!");
                window.location.href = "login.html";
                return;
            }

            return response.json();
        })

        .then(data => {

            document.getElementById("respostaEntrega").innerHTML =
                "<h4>Entrega de EPI registrada com sucesso!</h4>";

        });

    });

}


