
// irá salvar os dados em arquivos json

const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(nome, email) {
        let arquivo = __dirname + '/data/' + nome + '.json';
        let dados = {
            nome: nome,
            email: email
        }
        if (fs.existsSync(arquivo)) {
            // Salva os dados  
            jsonfile.writeFile(arquivo, dados, { spaces: 2 })
                .then(() => {
                    console.log('Arquivo Criado')
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            this.criaArquivoDeCurso(arquivo, dados)
                .then(() => {
                    // Salva os dados
                });
        }
    },
    criaArquivoDeCurso(nomeArquivo, conteudoArquivo) {
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo, { spaces: 2 })
            .then(() => {
                console.log('Arquivo Criado')
            }).catch((err) => {
                console.log(err);
            });
    },
    pegaDados(nome) {
        let nomePessoa = __dirname + '/data/' + nome + '.json';
        return jsonfile.readFile(nomePessoa);
    },
    pegaArquivos() {
        let arquivos = fs.readdirSync(__dirname + '/data/');
        return arquivos
    }
}