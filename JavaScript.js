function imprimir() {
    window.print();
}

const perguntas = [
    {
        pergunta: "Qual EPI protege a cabeça?",
        opcoes: ["Capacete", "Luvas", "Óculos"],
        correta: 0
    },
    {
        pergunta: "Para evitar quedas, o trabalhador deve:",
        opcoes: ["Trabalhar rápido", "Usar calçados adequados", "Ignorar o piso molhado"],
        correta: 1
    },
    {
        pergunta: "O que a cor vermelha indica nas sinalizações de segurança? ",
        opcoes: ["Atenção", "Equipamentos de combate a incêndio", "Área Liberada"],
        correta: 1
    },
    {
        pergunta: "O uso de óculos de proteção é obrigatório quando: ",
        opcoes: ["Há risco de partículas ou produtos químicos", "O ambiente está frio", "O trabalhador usa capacete"],
        correta: 0
    },
    {
        pergunta: "A cor amarela nas sinalizações indica: ",
        opcoes: ["Equipamentos de incêndio", "Segurança total", "Atenção e alerta"],
        correta: 2
    },
    {
        pergunta: "O uso correto dos equipamentos de segurança: ",
        opcoes: ["Reduz riscos de acidentes", "Aumenta o tempo de trabalho", "É opcional"],
        correta: 0
    },
    {
        pergunta: "Manter o local de trabalho organizado ajuda a: ",
        opcoes: ["Melhorar apenas a aparência", "Evitar acidentes e quedas", "Reduzir o espaço disponível"],
        correta: 1
    },
    {
        pergunta: "Placas de sinalização servem para: ",
        opcoes: ["Decorar o ambiente", "Informar riscos e orientar comportamentos seguros", "Identificar visitantes"],
        correta: 1
    },
    {
        pergunta: "Trabalhar com equipamentos defeituosos pode causar: ",
        opcoes: ["Maior produtividade", "Acidentes", "Economia de tempo"],
        correta: 1
    },
    {
        pergunta: "Qual destes é um exemplo de EPC (Equipamento de Proteção Coletiva)? ",
        opcoes: ["Luvas","Guarda-corpo","Botas"],
        correta: 1
    },

];

let indice = 0;
let pontuacao = 0;

function mostrarPergunta() {
    const quizDiv = document.getElementById("quiz");

    if (indice >= perguntas.length) {
        quizDiv.innerHTML = "";
        document.getElementById("resultado").innerText =
            "Você acertou " + pontuacao + " de " + perguntas.length + " perguntas!";
        return;
    }

    const atual = perguntas[indice];

    quizDiv.innerHTML = `
        <p>${indice + 1}. ${atual.pergunta}</p>
        ${atual.opcoes.map((opcao, i) =>
        `<button onclick="responder(${i})">${opcao}</button>`
    ).join("")}
    `;
}

function responder(opcaoEscolhida) {
    if (opcaoEscolhida === perguntas[indice].correta) {
        pontuacao++;
    }

    indice++;
    mostrarPergunta();
}

mostrarPergunta();

