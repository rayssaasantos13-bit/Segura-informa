const api = "https://localhost:7175/Epi";
// ============================
// MENU
// ============================

function toggleMenu() {
    document.getElementById("menuLateral").classList.toggle("ativo");
}

function CadastrarEpi() {
    const nome = document.getElementById("nome").value
    const descricao = document.getElementById("descricao").value.trim();
    const numeroCA = document.getElementById("ca").value;
    const quantidade = document.getElementById("estoque").value;

    if (nome === "" || numeroCA === "" || quantidade === "") {

        alert("Preencha todos os campos.");

        return;

    }

const epi = {

    Nome: nome,

    Qntd_Estoque: Number(quantidade),

    Descricao: descricao,

    Numero_Ca: Number(numeroCA),

    exige_epi: []

};
console.log(JSON.stringify(epi));
    fetch(api, {

        method: "POST",

        credentials: "include",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(epi)

    })

    .then(response => {

        if (!response.ok) {

            return response.text().then(msg => {

                throw new Error(msg);

            });

        }

        return response.json();

    })

    .then(data => {

        alert("EPI cadastrado com sucesso!");

        LimparCampos();

        console.log(data);

    })

    .catch(error => {

        console.error(error);

        alert("Erro ao cadastrar o EPI.\n\n" + error.message);

    });
   
}

 function LimparCampos() {

    document.getElementById("nome").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("ca").value = "";

    document.getElementById("estoque").value = "";
 }

