function imprimir() {
    window.print();
}
function toggleMenu() {
document.getElementById("menuLateral")
.classList.toggle("ativo");
}
function pesquisarArea(){

const area =
document.getElementById("busca")
.value.toLowerCase();

const resultado =
document.getElementById("resultado");

if(area.includes("produção")){

resultado.innerHTML = `
<h2>Produção</h2>

<p><strong>Risco Físico:</strong>
Ruído elevado das máquinas.</p>

<p><strong>Risco Químico:</strong>
Contato com substâncias industriais.</p>

<p><strong>Risco Ergonômico:</strong>
Movimentos repetitivos.</p>

<p><strong>Risco de Acidente:</strong>
Cortes e prensamentos.</p>

<p><strong>EPIs:</strong>
Capacete, luvas e protetor auricular.</p>

<p><strong>Prevenção:</strong>
Treinamentos e inspeções periódicas.</p>
`;
}

else if(area.includes("ti")){

resultado.innerHTML = `
<h2>TI</h2>

<p><strong>Risco Elétrico:</strong>
Sobrecarga de equipamentos.</p>

<p><strong>Risco Ergonômico:</strong>
Postura inadequada.</p>

<p><strong>Risco Visual:</strong>
Excesso de exposição a telas.</p>

<p><strong>EPIs:</strong>
Apoio ergonômico e cadeiras adequadas.</p>

<p><strong>Prevenção:</strong>
Revisões elétricas e pausas regulares.</p>
`;
}

else{

resultado.innerHTML = `
<h2>Área não encontrada</h2>

<p>
Tente pesquisar Produção ou TI.
</p>
`;
}
}
