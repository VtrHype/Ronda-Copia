// script.js
document.getElementById('searchButton').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

async function performSearch() {
    const query = document.getElementById('searchInput').value;
    try {
        const response = await fetch('http://localhost:3001/api/search?query=' + encodeURIComponent(query));
        const results = await response.json();

        console.log('Resultados obtidos:', results); // Log para verificar a resposta

        const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
        resultsTable.innerHTML = '';

        if (Array.isArray(results)) {
            results.forEach(result => {
                const row = resultsTable.insertRow();
                
                const nameCell = row.insertCell(0);
                const matriculaCell = row.insertCell(1);
                const placaCell = row.insertCell(2);
                const clienteCell = row.insertCell(3);
                const contatoLocalCell = row.insertCell(4);
                const motivoDisparoCell = row.insertCell(5);
                const descricaoCell = row.insertCell(6);
                const hChegadaCell = row.insertCell(7);
                const hSaidaCell = row.insertCell(8);
                const dataCell = row.insertCell(9);

                
                nameCell.textContent = result.nome;
                matriculaCell.textContent = result.matricula;
                placaCell.textContent = result.placa;
                clienteCell.textContent = result.cliente;
                contatoLocalCell.textContent = result.contatoLocal;
                motivoDisparoCell.textContent = result.motivoDisparo;
                descricaoCell.textContent = result.descricao;
                hChegadaCell.textContent = result.hChegada;
                hSaidaCell.textContent = result.hSaida;
                dataCell.textContent = result.data;
            });
        } else {
            console.error('Os resultados não são um array:', results);
            alert('Erro na pesquisa: ' + results.message);
        }
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        alert('Erro ao buscar os dados: ' + error.message);
    }
}
