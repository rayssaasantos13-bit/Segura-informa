function abrirMenu(){
const menu = document.getElementById("menu");
menu.classList.toggle("ativo");
}

hamburguerBtn.addEventListener("click", () => {
    menuLateral.classList.toggle("ativo");
});
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.querySelector("form");
    const tabela = document.querySelector("tbody");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = document.querySelector('input[placeholder="Digite o nome"]').value;
        const matricula = document.querySelector('input[placeholder="Número da matrícula"]').value;

        const setor = document.querySelectorAll("select")[0].value;

        const data = document.querySelector('input[type="date"]').value;

        const epi = document.querySelectorAll("select")[1].value;

        const quantidade = document.querySelector('input[type="number"]').value;

        const observacao = document.querySelector("textarea").value;

        if (
            nome === "" ||
            matricula === "" ||
            setor === "Selecione" ||
            epi === "Selecione" ||
            data === ""
        ) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const dataFormatada = new Date(data).toLocaleDateString("pt-BR");

        const novaLinha = document.createElement("tr");

        novaLinha.innerHTML = `
            <td>${nome}</td>
            <td>${setor}</td>
            <td>${epi}</td>
            <td>${quantidade}</td>
            <td>${dataFormatada}</td>
        `;

        tabela.appendChild(novaLinha);

        alert("Entrega registrada com sucesso!");

        formulario.reset();

        console.log({
            nome,
            matricula,
            setor,
            epi,
            quantidade,
            data,
            observacao
        });
    });

});