// let titulo = document.querySelector("h1")
// titulo.innerHTML = "Jogo do número secreto";

// let paragrafo = document.querySelector("p")
// paragrafo.innerHTML = "Escolha um número entre 1 e 10";


let listaDeNumerosSorteados = [];
let quantMax = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //serve para ser lido, "texto" = o que é para ler, "Brazilian ...." o idioma e "rate" é a velocidade
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        // let mensagemTentativas = `Você descobriu o número secreto com` + palavraTentativa `tentativas!`;
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor");
        } else {
            exibirTextoNaTela("p", "O número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}

// FUNCTION SERVE PARA DETERMINAR UMA ACAO DENTRO DO CODIGO

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantMax + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    //reiniciará a lista quando atingir 10 numeros
    if (quantidadeDeElementosNaLista == quantMax) {
        listaDeNumerosSorteados = [];
    }

    //includes = confere se o número já foi escolhido
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        //push = adiciona números(elementos) ao final da lista
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

exibirMensagemInicial();

