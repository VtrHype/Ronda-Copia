// scipt.js
document.addEventListener('DOMContentLoaded', () => {
    function getHoraAtual() {
        const now = new Date();
        const dia = String(now.getDate()).padStart(2, '0');
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const ano = now.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    document.getElementById('data').value = getHoraAtual();

    async function finalizarRonda(event) {
        if (event.target.classList.contains('finalizar-ronda')) {
            const row = event.target.closest('tr');

            const hSaida = row.querySelector('.h_saida');
            hSaida.value = new Date().toTimeString().split(' ')[0];
            hSaida.style.display = 'inline';

            event.target.style.display = 'none';

            const inputs = row.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.setAttribute('disabled', 'disabled');
            });

            const nome = document.getElementById('nome').value;
            const matricula = document.getElementById('matricula').value;
            const placa = document.getElementById('placa').value;
            const cliente = row.querySelector('.cliente').value;
            const hChegada = row.querySelector('.h_chegada').value;
            const hSaidaValue = row.querySelector('.h_saida').value;
            const contatoLocal = row.querySelector('.contato_local').value;
            const motivoDisparo = row.querySelector('.motivo_disparo').value;
            const descricao = row.querySelector('.descricao').value;

            console.log({ nome, matricula, placa, cliente, hChegada, hSaidaValue, contatoLocal, motivoDisparo, descricao });

            const rondaData = [{
                nome,
                matricula,
                placa,
                cliente,
                hChegada,
                hSaida: hSaidaValue,
                contatoLocal,
                motivoDisparo,
                descricao
            }];

            try {
                const response = await fetch('http://localhost:3000/api/rondas/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(rondaData)
                });

                if (response.ok) {
                    const savedRonda = await response.json();                    
                    console.log(savedRonda);
                } else {
                    const errorData = await response.json();
                    alert(`Erro ao salvar ronda: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao salvar ronda');
            }
        }
    }

    document.addEventListener('click', finalizarRonda);

    const addRowButton = document.getElementById('add-row');
    addRowButton.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        newRow.classList.add('minha_classe');

        newRow.innerHTML = `
        <hr class="linha"> 
        <td>
                        <label for="cliente">Cliente</label>
                        <input type="text" class="cliente" id="cliente" style="text-transform: uppercase;">
                    </td>
                    
                    <td>
                        <label for="contato_local">Contato no Local</label>
                        <input type="text" class="contato_local" id="contato_local" style="text-transform: uppercase;">
                    </td>
                    <<td>
                    <label for="motivo_disparo">Motivo</label>
                    <select class="motivo_disparo" id="motivo_disparo" style="text-transform: uppercase;">
                        <option>Selecione</option>
                        
                        <option>Ronda</option>
                        <option>Ronda interna</option>
                        <option>Entrga de Equipamentos</option>
                        <option>Disparo Falso</option>
                        <option>Provocado pelo Cliente</option>
                        <option>Pânico</option>
                        <option>PB</option>
                        <option>QAP</option>
                        <option>Rendição QRF</option>
                        <option>Atendimento solicitado</option>
                        <option>Manutenção Moto</option>
                        <option>Alteração no Local</option>
                    </select>
                </td>
                    <td>
                        <label for="descricao">Descrição</label>
                        <input type="text" class="descricao" id="descricao" style="text-transform: uppercase;">
                    </td>
                    
                    <td>
                        <label for="h_chegada">Horário de Chegada</label>
                        <input type="time" class="h_chegada" id="h_chegada" style="text-transform: uppercase; display: none;">
                    </td>
                    <td class="btn-container">
                        <label for="h_saida">Horário de Saída</label>
                        <input type="time" class="h_saida" id="h_saida" style="text-transform: uppercase; display: none;">
                        <button class="btn finalizar-ronda">Finalizar Ronda</button>
                    </td>

        `;

        document.getElementById('in').appendChild(newRow);

        const clienteInput = newRow.querySelector('.cliente');
        const hChegadaInput = newRow.querySelector('.h_chegada');

        clienteInput.addEventListener('input', () => {
            if (clienteInput.value.trim() === '') {
                hChegadaInput.style.display = 'none';
            } else {
                const now = new Date();
                hChegadaInput.value = now.toTimeString().split(' ')[0];
                hChegadaInput.style.display = 'block';
            }
        });

        addRowButton.disabled = true;

        newRow.querySelector('.finalizar-ronda').addEventListener('click', () => {
            addRowButton.disabled = false;
        });
    });

    const clienteInputInicial = document.querySelector('.cliente');
    const hChegadaInputInicial = document.querySelector('.h_chegada');

    clienteInputInicial.addEventListener('input', () => {
        if (clienteInputInicial.value.trim() === '') {
            hChegadaInputInicial.style.display = 'none';
        } else {
            const now = new Date();
            hChegadaInputInicial.value = now.toTimeString().split(' ')[0];
            hChegadaInputInicial.style.display = 'block';
        }
    });

    addRowButton.disabled = true;

    document.querySelector('.finalizar-ronda').addEventListener('click', () => {
        addRowButton.disabled = false;
    });

    // Função para limpar os campos da planilha
    function limparPlanilha() {
        document.getElementById('nome').value = '';
        document.getElementById('matricula').value = '';
        document.getElementById('placa').value = '';
        document.getElementById('data').value = getHoraAtual();
        document.querySelectorAll('#in tr').forEach(row => row.remove());
        addRowButton.disabled = false;
    }

    // Função para gerar o PDF
    document.getElementById('finalizar-turno').addEventListener('click', async () => {
        if (confirm('Deseja finalizar o Relatório?')) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const nome = document.getElementById('nome').value;
            const matricula = document.getElementById('matricula').value;
            const placa = document.getElementById('placa').value;
            const data = document.getElementById('data').value;

            doc.text('Relatório de Rondas', 14, 20);
            doc.text(`Nome: ${nome}`, 14, 30);
            doc.text(`Matrícula: ${matricula}`, 14, 40);
            doc.text(`Placa: ${placa}`, 14, 50);
            doc.text(`Data: ${data}`, 14, 60);

            const columns = ["Cliente", "Horário de Chegada", "Horário de Saída", "Contato no Local", "Motivo do Disparo", "Descrição"];
            const rows = [];

            document.querySelectorAll('#rondas_tabela tbody tr').forEach(row => {
                const cliente = row.querySelector('.cliente').value;
                const hChegada = row.querySelector('.h_chegada').value;
                const hSaida = row.querySelector('.h_saida').value;
                const contatoLocal = row.querySelector('.contato_local').value;
                const motivoDisparo = row.querySelector('.motivo_disparo').value;
                const descricao = row.querySelector('.descricao').value;

                rows.push([cliente, hChegada, hSaida, contatoLocal, motivoDisparo, descricao]);
            });

            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 70,
                styles: { fontSize: 10, halign: 'center', valign: 'middle' },
                headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
                alternateRowStyles: { fillColor: [240, 240, 240] },
            });

            const nomeArquivo = `${nome.toUpperCase()}_${data.replace(/\//g, '-')}.pdf`;
            doc.save(nomeArquivo);

            limparPlanilha();
        }
    });
});
