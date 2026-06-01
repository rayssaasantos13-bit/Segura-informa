function abrirMenu(){

const menu = document.getElementById("menu");

menu.classList.toggle("ativo");

}

function mostrarInformacoes(){

const area = document.getElementById("areas").value;

const informacoes = document.getElementById("informacoes");

if(area === "almoxarifado"){

informacoes.innerHTML = `
<h2>Almoxarifado</h2>

<p><strong>Acidentes:</strong> Queda de caixas e cortes.</p>

<p><strong>Riscos:</strong> Objetos pesados e empilhamento incorreto.</p>

<p><strong>Prevenção:</strong> Uso obrigatório de luvas e capacete.</p>
`;
}

else if(area === "lazer"){

informacoes.innerHTML = `
<h2>Área de lazer</h2>

<p><strong>Acidentes:</strong> Escorregões próximos à piscina.</p>

<p><strong>Riscos:</strong> Piso molhado.</p>

<p><strong>Prevenção:</strong> Colocar placas de aviso.</p>
`;
}

else if(area === "deposito"){

informacoes.innerHTML = `
<h2>Depósito de equipamentos pesados</h2>

<p><strong>Acidentes:</strong> Queda de materiais.</p>

<p><strong>Riscos:</strong> Equipamentos mal armazenados.</p>

<p><strong>Prevenção:</strong> Organização correta e treinamento.</p>
`;
}

else if(area === "gerador"){

informacoes.innerHTML = `
<h2>Gerador</h2>

<p><strong>Acidentes:</strong> Choque elétrico.</p>

<p><strong>Riscos:</strong> Fiação exposta.</p>

<p><strong>Prevenção:</strong> Manutenção elétrica frequente.</p>
`;
}

else if(area === "logistica"){

informacoes.innerHTML = `
<h2>Logística</h2>

<p><strong>Acidentes:</strong> Colisão com empilhadeiras.</p>

<p><strong>Riscos:</strong> Tráfego intenso de cargas.</p>

<p><strong>Prevenção:</strong> Rotas organizadas.</p>
`;
}

else if(area === "marketing"){

informacoes.innerHTML = `
<h2>Marketing Digital</h2>

<p><strong>Acidentes:</strong> Estresse e fadiga visual.</p>

<p><strong>Riscos:</strong> Tempo excessivo em telas.</p>

<p><strong>Prevenção:</strong> Pausas regulares.</p>
`;
}

else if(area === "producao1"){

informacoes.innerHTML = `
<h2>Produção 1</h2>

<p><strong>Acidentes:</strong> Cortes em máquinas.</p>

<p><strong>Riscos:</strong> Falta de atenção.</p>

<p><strong>Prevenção:</strong> Uso de EPI.</p>
`;
}

else if(area === "producao2"){

informacoes.innerHTML = `
<h2>Produção 2</h2>

<p><strong>Acidentes:</strong> Queimaduras.</p>

<p><strong>Riscos:</strong> Superfícies quentes.</p>

<p><strong>Prevenção:</strong> Luvas térmicas.</p>
`;
}

else if(area === "rh"){

informacoes.innerHTML = `
<h2>Recursos Humanos/RH</h2>

<p><strong>Acidentes:</strong> Problemas ergonômicos.</p>

<p><strong>Riscos:</strong> Má postura.</p>

<p><strong>Prevenção:</strong> Ajuste das cadeiras.</p>
`;
}

else if(area === "ti"){

informacoes.innerHTML = `
<h2>TI</h2>

<p><strong>Acidentes:</strong> Sobrecarga elétrica.</p>

<p><strong>Riscos:</strong> Equipamentos ligados constantemente.</p>

<p><strong>Prevenção:</strong> Revisão elétrica.</p>
`;
}

else if(area === "quimica"){

informacoes.innerHTML = `
<h2>Produção química</h2>

<p><strong>Acidentes:</strong> Contato com produtos químicos.</p>

<p><strong>Riscos:</strong> Vazamentos tóxicos.</p>

<p><strong>Prevenção:</strong> Máscaras e roupas especiais.</p>
`;
}

else{

informacoes.innerHTML = `
<h2>Escolha uma área</h2>
`;
}

}

