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
            const kmInicio = document.getElementById('kmInicio').value;
            const kmFinal = document.getElementById('kmFinal').value;
            const cliente = row.querySelector('.cliente').value;
            const hChegada = row.querySelector('.h_chegada').value;
            const hSaidaValue = row.querySelector('.h_saida').value;
            const contatoLocal = row.querySelector('.contato_local').value;
            const motivoDisparo = row.querySelector('.motivo_disparo').value;
            const descricao = row.querySelector('.descricao').value;

            console.log({ nome, matricula, placa, cliente, hChegada, hSaidaValue, contatoLocal, motivoDisparo, descricao, kmInicio, kmFinal, });

            const rondaData = [{
                nome,
                matricula,
                placa,
                kmInicio,
                kmFinal,
                cliente,
                hChegada,
                hSaida: hSaidaValue,
                contatoLocal,
                motivoDisparo,
                descricao
            }];

            try {
                const response = await fetch('https://4e10-2804-58bc-1072-7300-bc79-4d03-9874-ee3f.ngrok-free.app/api/rondas/save', {
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
                    alert(`Salvo!: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Salvo!');
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
                    <option>Ronda Interna</option>
                    <option>Entrega de Equipamentos</option>
                    <option>Alarme</option>
                    <option>Atendimento Solicitado</option>
                    <option>Pânico</option>
                    <option>PB</option>
                    <option>QAP</option>
                    <option>Rendição QRF</option>
                    <option>Trocar de Moto</option>
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
        document.getElementById('kmInicio').value = '';
        document.getElementById('kmFinal').value = '';
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
        const kmInicio = document.getElementById('kmInicio').value;
        const kmFinal = document.getElementById('kmFinal').value;

        doc.text('Relatório de Rondas', 14, 20);
        doc.text(`Nome: ${nome}`, 14, 30);
        doc.text(`Matrícula: ${matricula}`, 85, 30);
        doc.text(`Placa: ${placa}`, 14, 40);
        doc.text(`Data: ${data}`, 85, 20);
        doc.text(`Km Início: ${kmInicio}`, 85, 40);
        doc.text(`Km Final: ${kmFinal}`, 147, 40);

        const columns = ["Cliente", "Horário de Chegada", "Horário de Saída", "Contato no Local", " Motivo ", "Descrição"];
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
            startY: 50,
            styles: { fontSize: 10, halign: 'center', valign: 'middle' },
            headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });
        

        const nomeArquivo = `${nome.toUpperCase()}_${data.replace(/\//g, '-')}.pdf`;

        // Salvar PDF localmente
        doc.save(nomeArquivo);

        // Salvar PDF na interface Android
        const pdfBase64 = doc.output('datauristring');
        if (window.Android) {
            window.Android.savePDF(nomeArquivo, pdfBase64);
        } else {
            console.error("Interface Android não encontrada!");
        }

        limparPlanilha();
    }
  });

});