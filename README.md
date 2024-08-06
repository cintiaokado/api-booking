<h1>Arquitetura do projeto</h1>

Configurando sua máquina
-------------------------
Necessário instalar:
-----------------------

*   Node.js é um ambiente de execução JavaScript que permite a criação de aplicações web escaláveis e de alta performance, utilizando a mesma linguagem tanto no frontend quanto no backend
*	Cypress.io é um framework de automação de código aberto desenvolvida para web. Pode ser usado para automação de teste Web e API, interações complexas do usuário até testes de interface e integração.
*   Javascript: linguagem de programação utilizada nos testes.
*   Cucumber: é uma ferramenta de teste que suporta a linguagem Gherkin. O Gherkin permite escrever especificações em uma linguagem natural, estruturada com palavras-chave como "Given", "When" e "Then" ("Dado", "Quando" e "Então").


Configurando o ambiente de automação de testes
------------------------------------------------------------

Para que sua automação possa ser realizada é necessário instalar alguns recursos, conforme será descrito abaixo:

Windows
--------

<h3>1. Instalando o Node.js</h3>
*   Windows:
Acesse a página de download do Node.js.
Baixe o instalador apropriado para seu sistema operacional.
Execute o instalador e siga as instruções na tela.

Utilizei a versão v18.17.1


<h3>2. Instalando o Cypress</h3>

*	Dentro do terminal digite: 
npm install --save-dev cypress, se a instalação estiver correta aparecerá a versão instalada.

Utilizei a versão 13.6.2

<h3>3. Instalando o Cucumber</h3>

*	Dentro do terminal digite: 
npm install --save-dev cypress-cucumber-preprocessor, se a instalação estiver correta aparecerá um arquivo na pasta cypress/plugins/index.js.

Utilizei a versão 4.3.1

E pronto, ambiente configurado.


Automação de Testes
--------------------

Para a automação de testes, utilizaremos o Cypress.

<h3>Aprendendo a usar a pasta pages</h3>

A pasta pages é usada para implementar o padrão de design Page Object Model (POM). Esse padrão ajuda a organizar e gerenciar o código dos testes automatizados, facilitando a manutenção e a reutilização.


Executando os testes automatizados
-----------------------------------

Para executar o testes automatizados usaremos alguns comandos a partir da pasta raiz do nosso projeto.

*	Para acessar o arquivo salvo no diretório utilizamos o seguinte caminho:
`
cd /c/api-booking
`
*  Para execução de todos os cenários implementados utilizamos o seguinte código:
`
npx cypress open
`
