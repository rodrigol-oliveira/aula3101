"use strict";

var secaoNotas = document.getElementsByClassName("notes")[0];

function observaListaNotas() {
    atualizarSecao(secaoNotas);
}

var listaNotas = {
    listaInterna: [],
    // Refatoração: desacoplamento da lista com a tela
    observador: observaListaNotas,
    adiciona: function adiciona(item) {
        this.listaInterna.push(item);
        this.observador();
    },
    remove: function remove(posicao) {
        this.listaInterna.splice(posicao, 1);
        this.observador();
    },
    edita: function edita(posicao, item) {
        // Refatoração: usar internamente nossa função pega
        var itemAtual = this.pega(posicao);
        itemAtual = item;
        this.observador();
    },
    temItem: function temItem(posicao) {
        return posicao in this.listaInterna;
    },
    pega: function pega(posicao) {
        return this.listaInterna[posicao];
    },
    contaTotal: function contaTotal() {
        return this.listaInterna.length;
    }
};

function atualizarSecao(secao) {
    var conteudoSecao = "";

    for (var posicao = 0; posicao < listaNotas.contaTotal(); posicao++) {
        // Refatoração: guardar numa variável a nota pega
        var notaAtual = listaNotas.pega(posicao);

        if (notaAtual.editando) {
            conteudoSecao += "<form class=\"note\">\n                                <input class=\"note__title\" type=\"text\" name=\"titulo\" value=\"" + notaAtual.titulo + "\" placeholder=\"T\xEDtulo\">\n                                <textarea class=\"note__body\" name=\"texto\" rows=\"5\" placeholder=\"Criar uma nota...\"> " + notaAtual.texto + " </textarea>\n                                <button class=\"note__control\" type=\"button\" onclick=\"adicionarNota(this.form.titulo, this.form.texto, this.form,  " + posicao + " )\">\n                                    'Conclu\xEDdo'\n                                </button>\n                             </form>";
        } else {
            conteudoSecao += "<form class=\"note\" onclick=\"editaFormulario(" + posicao + ")\">\n                                <button class=\"note__control\" type=\"button\" onclick=\"removerNota(event," + posicao + ")\">\n                                    <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n                                </button>\n                                <h1 class=\"note__title\">" + notaAtual.titulo + "</h1>\n                                <p class=\"note__body\">" + notaAtual.texto + "</p>\n                             </form>";
        }
    }

    secao.innerHTML = conteudoSecao;
}

function editaFormulario(posicao) {
    var nota = listaNotas.pega(posicao);
    nota.editando = true;
    listaNotas.edita(posicao, nota);
}

function adicionarNota(inputTitulo, textareaTexto, formulario, posicao) {
    // Refatoração: guardar os valores em uma variavel
    var titulo = inputTitulo.value,
        texto = textareaTexto.value;

    if (listaNotas.temItem(posicao)) {
        var notaExistente = listaNotas.pega(posicao);
        notaExistente.titulo = titulo;
        notaExistente.texto = texto;
        notaExistente.editando = false;
        listaNotas.edita(posicao, notaExistente);
    } else {
        var novaNota = { titulo: titulo, texto: texto };
        listaNotas.adiciona(novaNota);
        formulario.reset();
    }
}

function removerNota(evento, posicao) {
    evento.stopPropagation();
    listaNotas.remove(posicao);
}