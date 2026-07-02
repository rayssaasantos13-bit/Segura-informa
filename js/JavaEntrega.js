const myForm1 = document.getElementById('Entrga_Epi');
if (myForm1 != null) {
myForm1.addEventListener('submit', function (event) {
    // 1. Prevenir o recarregamento da página ao submeter form
    event.preventDefault();

    fetch('https://localhost:7175/Entrga_Epi/', {
        method: 'POST', //Para outros métodos, basta alterar aqui. Obs: Delete remove a parte do body e headers, e no get é conforme todos os exemploes feitos na Unidade interação com API 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
})
});
// Seletores de Elementos
const form = document.getElementById('epiForm');
const tableBody = document.querySelector('#epiTable tbody');
const searchInput = document.getElementById('search');

// Botões do Form
const btnCadastrar = document.getElementById('btnCadastrar');
const btnAtualizar = document.getElementById('btnAtualizar');
const btnExcluir = document.getElementById('btnExcluir');
const btnLimpar = document.getElementById('btnLimpar');

// Auxiliar para formatar data (AAAA-MM-DD para DD/MM/AAAA)
function formatDateToBR(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Auxiliar para formatar data invertida (DD/MM/AAAA para AAAA-MM-DD)
function formatDateToISO(dateString) {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

// Limpar Formulário
btnLimpar.addEventListener('click', () => {
    form.reset();
    document.getElementById('codigo').disabled = false; // re-habilita ID caso estivesse editando
});

// Cadastrar Novo EPI
btnCadastrar.addEventListener('click', () => {
    const codigo = document.getElementById('codigo').value;
    const ca = document.getElementById('ca').value;
    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const fabricante = document.getElementById('fabricante').value || '-';
    const quantidade = document.getElementById('quantidade').value || '0';
    const validade = formatDateToBR(document.getElementById('validade').value) || '-';

    if (!codigo || !ca || !nome || !categoria) {
        alert('Por favor, preencha todos os campos obrigatórios (*)');
        return;
    }

    // Verifica se o código já existe
    if (document.querySelector(`tr[data-id="${codigo}"]`)) {
        alert('Este código de EPI já está cadastrado!');
        return;
    }

    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', codigo);
    newRow.innerHTML = `
                <td>${codigo}</td>
                <td>${ca}</td>
                <td>${nome}</td>
                <td>${categoria}</td>
                <td>${fabricante}</td>
                <td>${quantidade}</td>
                <td>${validade}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn act-edit" onclick="editRow('${codigo}')"><i class="fa-solid fa-pen"></i></button>
                        <button class="action-btn act-delete" onclick="deleteRow('${codigo}')"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </td>
            `;
    tableBody.appendChild(newRow);
    form.reset();
});

// Editar linha (Preenche formulário para atualização)
function editRow(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const cells = row.querySelectorAll('td');

    document.getElementById('codigo').value = cells[0].innerText;
    document.getElementById('codigo').disabled = true; // Chave primária travada na edição
    document.getElementById('ca').value = cells[1].innerText;
    document.getElementById('nome').value = cells[2].innerText;
    document.getElementById('categoria').value = cells[3].innerText;
    document.getElementById('fabricante').value = cells[4].innerText === '-' ? '' : cells[4].innerText;
    document.getElementById('quantidade').value = cells[5].innerText === '0' ? '' : cells[5].innerText;
    document.getElementById('validade').value = formatDateToISO(cells[6].innerText);
}

// Atualizar Registro Existente
btnAtualizar.addEventListener('click', () => {
    const codigo = document.getElementById('codigo').value;
    const row = document.querySelector(`tr[data-id="${codigo}"]`);

    if (!row) {
        alert('Selecione um EPI existente na tabela (clicando no ícone de lápis) para atualizar.');
        return;
    }

    const cells = row.querySelectorAll('td');
    cells[1].innerText = document.getElementById('ca').value;
    cells[2].innerText = document.getElementById('nome').value;
    cells[3].innerText = document.getElementById('categoria').value;
    cells[4].innerText = document.getElementById('fabricante').value || '-';
    cells[5].innerText = document.getElementById('quantidade').value || '0';
    cells[6].innerText = formatDateToBR(document.getElementById('validade').value) || '-';

    document.getElementById('codigo').disabled = false;
    form.reset();
    alert('EPI atualizado com sucesso!');
});

// Excluir via Botão do Formulário
btnExcluir.addEventListener('click', () => {
    const codigo = document.getElementById('codigo').value;
    if (!codigo) {
        alert('Insira ou selecione um código de EPI para excluir.');
        return;
    }
    deleteRow(codigo);
});

// Função de Excluir Linha Geral
function deleteRow(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
        if (confirm(`Tem certeza que deseja excluir o EPI com código ${id}?`)) {
            row.remove();
            if (document.getElementById('codigo').value === id) {
                document.getElementById('codigo').disabled = false;
                form.reset();
            }
        }
    } else {
        alert('EPI não encontrado.');
    }
}

// Filtro Dinâmico de Pesquisa (Filtra por qualquer coluna)
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
})
};
