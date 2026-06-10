function abrirMenu(){
const menu = document.getElementById("menu");
menu.classList.toggle("ativo");
}

hamburguerBtn.addEventListener("click", () => {
    menuLateral.classList.toggle("ativo");
});

// REGISTRO DE ENTREGA
const botao = document.querySelector("button");

botao.addEventListener("click", () => {

    const funcionario = document.querySelector('input[type="text"]').value;
    const setor = document.querySelectorAll("select")[0].value;
    const epi = document.querySelectorAll("select")[1].value;
    const quantidade = document.querySelector('input[type="number"]').value;
    const data = document.querySelector('input[type="date"]').value;

    if (
        funcionario === "" ||
        setor === "Selecione" ||
        epi === "Selecione" ||
        quantidade === "" ||
        data === ""
    ) {                                                                          
        alert("Preencha todos os campos!");
        return;
    }
    alert(
        "Entrega registrada com sucesso!\n\n" +
        "Funcionário: " + funcionario +
        "\nSetor: " + setor +
        "\nEPI: " + epi +
        "\nQuantidade: " + quantidade +
        "\nData: " + data
    );

    // Atualiza o card Entregas Hoje
    const cardEntregas = document.querySelectorAll(".card span")[1];
    let total = parseInt(cardEntregas.textContent);
    cardEntregas.textContent = total + 1;

    // Limpa os campos
    document.querySelector('input[type="text"]').value = "";
    document.querySelectorAll("select")[0].selectedIndex = 0;
    document.querySelectorAll("select")[1].selectedIndex = 0;
    document.querySelector('input[type="number"]').value = "";
    document.querySelector('input[type="date"]').value = "";
});