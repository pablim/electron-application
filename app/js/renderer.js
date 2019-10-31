const { ipcRenderer } = require('electron');
const data = require('../data');

// Utilizar um módulo
//const timer = require('./timer');
//timer.iniciar();
//timer.parar();

let linkSobre = document.querySelector('#link-sobre');
let enviar = document.querySelector('#enviar');

linkSobre.addEventListener('click', function () {
    ipcRenderer.send('abrir-janela-sobre');
});

enviar.addEventListener('click', function () {
    nome = campoNome.value;
    email = campoEmail.value;
    console.log(nome);
    console.log(email);
    ipcRenderer.send('get-dados', nome, email);
});

window.onload = () => {
    data.pegaDados('pablo')
        .then((dados) => {
            dadosView.textContent = dados['nome'] + " - " + dados['email'];
        })
}


ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    //curso.textContent = nomeCurso;
    console.log(nomeCurso);
});