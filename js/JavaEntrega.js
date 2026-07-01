function abrirMenu(){
const menu = document.getElementById("menu");
menu.classList.toggle("ativo");
}
document.getElementById('formEPI').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede de recarregar a página

        // Pega os valores dos campos    
        const nome = document.getElementById('nome').value;
        const setor = document.getElementById('setor').value;
        const epi = document.getElementById('epi').value;
        const qtd = document.getElementById('qtd').value; 
        const dataInput = document.getElementById('data').value;
     // Formata a data de yyyy-mm-dd pra dd/mm/yyyy  
     const data = dataInput.split('-').reverse().join('/');
// Pega o tbody da tabela   
 const tbody = document.querySelector('#tabelaHistorico tbody');
  // Cria uma nova linha 
   const novaLinha = tbody.insertRow();
   // Insere as células   
    novaLinha.insertCell(0).textContent = nome;
    novaLinha.insertCell(1).textContent = setor;
    novaLinha.insertCell(2).textContent = epi;
    novaLinha.insertCell(3).textContent = qtd;
    novaLinha.insertCell(4).textContent = data;
// Limpa o formulário depois de registrar  
 document.getElementById('formEPI').reset();});