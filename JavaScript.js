function imprimir() {
    window.print();
}
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
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


const dadosEPIs = {
    almoxarifado: {
        obrigatorios: ["Capacete", "Botina", "Colete Refletivo",],
        proibidos: ["Alimentos", "Roupas largas", "Fone de ouvido"]
    },

    lazer: {
        obrigatorios: ["Fardamento da empresa"],
        proibidos: ["EPIs não higienizado",]

    },

    lab: {
        obrigatorios: ["Jaleco", "Óculos de Proteção", "Luva de Látex"],
        proibidos: ["Sandália", "Alimentos"]
    },

    deposito: {
        obrigatorios: ["Capacete", "Botina", "Colete refletivo", "Óculos de proteção", "Protetor auricular"],
        probidos: ["Roupas soltas"]
    },

    gerador: {
        obrigatorios: ["Protetor auricular", "Óculos de proteção", "Luvas isolantes", "Capacete", "Botina", "Protetor Facial"],
        probidos: ["Adornos metalicos", "Luvas molhadas"]
    },
    logistica: {
        obrigatorios: ["Colete refletivo", "Botina", "Capacete"],
        probidos: ["Fones de ouvido", "Roupas largas"]
    },
    marketing: {
        obrigatorios: ["Apoio de punho", "Óculos com filtro"],
        probidos: ["Alimentos"]
    },

    producao1: {
        obrigatorios: ["Capacete", "Óculos de proteção", "Protetor auricular", "Botina", "Máscara respiratória", "Luvas adequadas"],
        probidos: ["Adornos", "Roupas lagas", "Tênis"]
    },

    producao2: {
        obrigatorios: ["Capacete", "Óculos de proteção", "Protetor auricular", "Botina", "Máscara respiratória", "Luvas adequadas"],
        probidos: ["Adornos", "Roupas lagas", "Tênis"]
    },

    rh: {
        obrigatorios: ["Ajustes ergonômicos (NR-17)"],
        probidos: ["Não se aplica"]
    },

       ti: {
        obrigatorios: ["Pulseira antiestática", "Calçado fechado", "Óculos de proteção"],
        probidos: ["Objetos metálicos", "Sapatos abertos"]
    },




};

function mostrarEPIs() {
    const area = document.getElementById("selecionarArea").value;
    const infoepis = document.getElementById("infoepis");
    const checklist = document.getElementById("checklist");
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "";
    checklist.innerHTML = "";

    if (!area) {
        infoepis.innerHTML = "";
        return;
    }

    const dados = dadosEPIs[area];

    infoepis.innerHTML = `
        <div class="epi-box obrigatorio">
            <strong>EPIs Obrigatórios:</strong>
            <ul>
                ${dados.obrigatorios.map(epi => `<li>${epi}</li>`).join("")}
            </ul>
        </div>

        <div class="epi-box proibido">
            <strong>EPIs Proibidos:</strong>
            <ul>
                ${dados.proibidos.map(epi => `<li>${epi}</li>`).join("")}
            </ul>
        </div>
    `;

    checklist.innerHTML = `
        <strong>Marque os EPIs que você está usando:</strong>
        ${dados.obrigatorios.map(epi => `
            <div>
                <input type="checkbox" value="${epi}" class="epiCheck"> ${epi}
            </div>
        `).join("")}
    `;
}

function validarEPIs() {
    const area = document.getElementById("selecionarArea").value;
    const resultado = document.getElementById("resultado");

    if (!area) {
        resultado.innerHTML = "Selecione uma área primeiro!";
        resultado.style.color = "orange";
        return;
    }

    const obrigatorios = dadosEPIs[area].obrigatorios;
    const checkboxes = document.querySelectorAll(".epiCheck");
    const marcados = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            marcados.push(cb.value);
        }
    });

    const faltando = obrigatorios.filter(epi => !marcados.includes(epi));

    if (faltando.length === 0) {
        resultado.innerHTML = " Todos os EPIs obrigatórios estão sendo utilizados. Acesso liberado!";
        resultado.style.color = "green";
    } else {
        resultado.innerHTML = ` Faltando EPIs obrigatórios: ${faltando.join(", ")}`;
        resultado.style.color = "red";
    }
}


function cadastrarUsuario(){
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
}).then(response =>{ 
  
    response.json()})
.then(data => console.log(data))
.catch(error => {
     window.location.href = "login.html";
console.error("Erro:", error); // tratamento de erro
});
}

function fazerLogin(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha:senha
        })
    }).then(response =>{

        response.json()})
        then(data => console.log(data))
.catch(error => {
     window.location.href = "mapa de risco.html";
console.error("Erro:", error);
});
}

