function imprimir() {
    window.print();
}
function toggleMenu() {
    const menu = document.getElementById("menu-lateral");
    menu.style.left = (menu.style.left === "0px") ? "-250px" : "0px";
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
        opcoes: ["Luvas", "Guarda-corpo", "Botas"],
        correta: 1
    },

];

let indice = 0;
let pontuacao = 0;

function mostrarPergunta() {
    const quizDiv = document.getElementById("quiz");

    if (!quizDiv) return; // evita erro se a div não existir

    if (indice >= perguntas.length) {
        quizDiv.innerHTML = "";
        document.getElementById("resultado").innerText =
            "Você acertou " + pontuacao + " de " + perguntas.length + " perguntas!";
        return;
    }

    const atual = perguntas[indice];

    quizDiv.innerHTML = `
        <p><strong>${indice + 1}. ${atual.pergunta}</strong></p>
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


// ================= INICIA O QUIZ =================
document.addEventListener("DOMContentLoaded", function() {
    mostrarPergunta();
});

function cadastrarUsuario() {
    const nome = document.getElementById("nome").value;
    const mat = document.getElementById("matricula").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome,
            matricula: mat,
            email: email,
            senha: senha


        }

        ),
    }).then(response => {

        response.json()
    })
        .then(data => console.log(data))
        .catch(error => {
            window.location.href = "login.html";
            console.error("Erro:", error);
        });
}

function fazerLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    }).then(response => {

        response.json()
    })
    then(data => console.log(data))
        .catch(error => {
            window.location.href = "mapa de risco.html";
            console.error("Erro:", error);
        });
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

function mostrarInfAreas() {
    const areaSelecionada = document.getElementById("areaSelect").value;
    const info = document.getElementById("InfoArea");

    if (areaSelecionada === "almoxarifado") {
    info.innerHTML = `
        <h3>Almoxarifado</h3>
        <p>Área em limpeza, pode conter riscos de quedas. Fique em alerta.</p>
        <img src="img/almoxarifado.jpg" alt="Almoxarifado em limpeza" style="width:200px; margin-top:10px;">
    `;
}


    else if (areaSelecionada === "lazer") {

        info.innerHTML = "<h3>Área de lazer</h3><p>Área livre para circulação. Não deixe de seguir as instruções da Área!</p>";

    }
    else if (areaSelecionada === "depesito") {
        info.innerHTML = "<h3>Depósito de equipamentos pesados</h3><p>Área livre para circulação. Não deixe de seguir as instruções da Área!</p>";

    }


    else if (areaSelecionada === "gerador") {
        info.innerHTML = "<h3>Gerador</h3><p>Área em manuntenção, até o momento a circulação dessa área está bloqueada.</p>";
    }
    else if (areaSelecionada === "logistica") {
        info.innerHTML = "<h3>Almmoxarifado</h3><p>Área em livre para circulação limpeza, pode conter riscos de quedas. Fique em alerta!</p>";

    }
    else if (areaSelecionada === "marketing") {
        info.innerHTML = "<h3>Marketing Digital</h3><p>Área em limpeza, pode conter riscos de quedas> Fique em alerta!</p>";

    }
    else if (areaSelecionada === "p1") {
        info.innerHTML = "<h3>Produção 1</h3><p>Área em limpeza, pode conter riscos de quedas> Fique em alerta!</p>";

    }
    else if (areaSelecionada === "p2") {
        info.innerHTML = "<h3>Produção 2</h3><p>Área em limpeza, pode conter riscos de quedas. Fique em alerta!</p>";

    }
    else if (areaSelecionada === "rh") {
        info.innerHTML = "<h3>Recursos Humanos/RH</h3><p>Área em limpeza, pode conter riscos de quedas. Fique em alerta!</p>";

    }
    else if (areaSelecionada === "ti") {
        info.innerHTML = "<h3>TI</h3><p>Área em limpeza, pode conter riscos de quedas> Fique em alerta!</p>";

    }
    else if (areaSelecionada === "pq") {
        info.innerHTML = "<h3>Produção química</h3><p>Área em limpeza, pode conter riscos de quedas. Fique em alerta!</p>";

    }


    else {
        info.innerHTML = "";
    }
}

function mostrarInfEpis() {
    const areaSelecionada = document.getElementById("episSelect").value;
    const info = document.getElementById("Infoepis");

       if (areaSelecionada === "almoxarifado") {
    info.innerHTML = `
        <h3>Almoxarifado</h3>
        <p>Capacete, Botina, Colete Refletivo</p>
        <img src="img/botina.webp" alt="Almoxarifado em limpeza" style="width:100px; margin-top:10px;">
        <img src="img/colete.jpg" alt="Almoxarifado em limpeza" style="width:100px; margin-top:10px;">
        <img src="img/capacete.png" alt="Almoxarifado em limpeza" style="width:100px; margin-top:10px;">
    `;
}
   
    else if (areaSelecionada === "lazer") {

        info.innerHTML = "<h3>Área de lazer</h3><p>Fardamento da empresa</p>";

    }
    else if (areaSelecionada === "depesito") {
        info.innerHTML = "<h3>Depósito de equipamentos pesados</h3><p>Colete refletivo, Botina, Capacete,</p>";

    }

    else if (areaSelecionada === "gerador") {
        info.innerHTML = "<h3>Gerador</h3><p>Protetor auricular, Óculos de proteção, Luvas isolantes, Capacete, Botina, Protetor Facial</p>";
    }
    else if (areaSelecionada === "logistica") {
        info.innerHTML = "<h3>Almmoxarifado</h3><p>Colete refletivo, Botina, Capacete</p>";

    }
    else if (areaSelecionada === "marketing") {
        info.innerHTML = "<h3>Marketing Digital</h3><p>Apoio de punho, Óculos com filtro</p>";

    }
    else if (areaSelecionada === "p1") {
        info.innerHTML = "<h3>Produção 1</h3><p>Capacete, Óculos de proteção, Protetor auricular</p>";

    }
    else if (areaSelecionada === "p2") {
        info.innerHTML = "<h3>Produção 2</h3><p>Capacete, Óculos de proteção, Protetor auricular</p>";

    }
    else if (areaSelecionada === "rh") {
        info.innerHTML = "<h3>Recursos Humanos/RH</h3><p>Ajustes ergonômicos (NR-17)</p>";

    }
    else if (areaSelecionada === "ti") {
        info.innerHTML = "<h3>TI</h3><p>Pulseira antiestática, Calçado fechado, Óculos de proteção</p>";

    }
    else if (areaSelecionada === "pq") {
        info.innerHTML = "<h3>Produção química</h3><p>Jaleco, Óculos de Proteção, Luva de Látex</p>";

    }


    else {
        info.innerHTML = "";
    }
}