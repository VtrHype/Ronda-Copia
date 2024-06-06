Ronda STV - Documentação do Projeto
1. Introdução
O projeto Ronda STV é uma aplicação desenvolvida para auxiliar na elaboração de relatórios de rondas de segurança. Ele permite o registro de informações importantes durante as rondas, como nome do agente, matrícula, placa do veículo, quilometragem inicial e final, entre outros. Além disso, o sistema gera um relatório em formato PDF contendo todas as informações registradas.

2. Funcionalidades Principais
Registro de dados de rondas de segurança.
Geração de relatórios em formato PDF.
Suporte para dispositivos Android.
Armazenamento dos registros no banco de dados MongoDB.
Página de consulta das informações das rondas.
3. Estrutura do Projeto
O projeto é composto por três arquivos principais:

3.1. index.html
Este arquivo contém a estrutura HTML da aplicação, incluindo formulários para entrada de dados, botões para adicionar linhas e finalizar o turno, e a inclusão de scripts JavaScript.

3.2. styles.css
Arquivo CSS que define a aparência e o estilo da aplicação.

3.3. script.js
Arquivo JavaScript responsável pela lógica da aplicação. Ele inclui funções para capturar eventos do usuário, processar os dados inseridos, gerar o relatório em PDF e interagir com o banco de dados MongoDB.

4. Tecnologias Utilizadas
HTML5
CSS3
JavaScript (ES6+)
MongoDB: Banco de dados NoSQL utilizado para armazenar os registros das rondas de segurança.
Bibliotecas Externas:
xlsx: Para manipulação de arquivos Excel.
jspdf: Para geração de documentos PDF.
html2canvas: Para converter elementos HTML em imagens.
jspdf-autotable: Para criar tabelas automaticamente nos documentos PDF.
5. Execução do Projeto
O projeto pode ser executado em dispositivos móveis com sistema operacional Android por meio do aplicativo APK chamado appRondaStv. O aplicativo pode ser baixado e instalado em dispositivos Android compatíveis. Uma vez instalado, o app pode ser acessado diretamente a partir do ícone na tela inicial do dispositivo, proporcionando uma experiência dedicada e otimizada para dispositivos móveis.

6. Funcionamento
O aplicativo appRondaStv oferece uma interface intuitiva para os usuários preencherem os dados de rondas de segurança. Os campos necessários são apresentados de forma clara, facilitando o registro das informações relevantes. Ao finalizar a entrada de dados, o usuário pode gerar o relatório em PDF com um simples toque no botão "Finalizar Turno". O relatório será salvo localmente no dispositivo e também pode ser compartilhado ou enviado conforme necessário.

7. Registro no Banco de Dados MongoDB
Os registros das rondas de segurança são armazenados no banco de dados MongoDB. Cada registro é inserido como um documento na coleção correspondente. As informações incluídas no documento incluem o nome do agente, matrícula, placa do veículo, dados da ronda, entre outros.

8. Página de Consulta
Além da funcionalidade de registro, o projeto também inclui uma página de consulta das informações das rondas. Esta página permite aos usuários visualizarem os registros armazenados no banco de dados MongoDB, facilitando a análise e o acompanhamento das atividades de segurança.

9. Considerações Finais
O projeto Ronda STV oferece uma solução completa e prática para profissionais da área de segurança patrimonial, permitindo a elaboração rápida e eficiente de relatórios de rondas de segurança diretamente de dispositivos móveis Android, além de oferecer uma interface de consulta das informações registradas. Para mais informações ou suporte, entre em contato com o desenvolvedor.
