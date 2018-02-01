var listaNotas = {
    
    section: this.document.getElementsbyClassName("Notes")[0],

    listaInterna: [],
    
        
    adiciona: (novoTitulo, novoTexto)=>{
        var nota = {
        titulo: novoTitulo,
        texto: novoTexto,
        editando: false
        };

    this.listaInterna.push(nota);
    // atualiza seção
    updateSection(this.section);
    },
    
    remove: function(posicao){
        this.listaInterna.splice(posicao, 1);
        // atualiza seção
        updateSection(this.section);
    },

    edita: function(posicao){
        this.listaInterna[posicao].editando = true;
        // atualiza seção
        updateSection(this.section);
    },

    salva:  function(posicao, novoTitulo, novoTexto){

        this.listaInterna[posicao].titulo = novoTitulo;
        this.listaInterna[posicao].texto = novoTexto;
        this.listaInterna[posicao].editing = false;
        // atualiza seção
        updateSection(this.section);

    }
}



var notes = [];

// essa função é a principal e serve para atualiza a tela;
// trocar tudo que está como notas de notes por listaNotas.ListaInterna

function updateSection(section) {
    var innerHTML = "";

    for (var index = 0; index < listaNotas.listaInterna.length; index++) {
        if (listaNotas.listaInterna[index].editing) {
            innerHTML += '<form class="note">'+
                             '<input class="note__title" type="text" name="title" value="' + listaNotas.listaInterna[index].title + '" placeholder="Título" />' +
                             '<textarea class="note__body" name="body" rows="5" placeholder="Criar uma nota...">' + listaNotas.listaInterna[index].body + '</textarea>' +
                             '<button class="note__control" type="button" onclick="onDoneClick(this.form, this.form.parentElement, this.form.title, this.form.body, ' + index + ')">' +
                                'Concluído' +
                             '</button>' +
                         '</form>';
        } else {
            innerHTML += '<form class="note" onclick="onEditClick(this.parentElement, ' + index + ')">'+
                             '<button class="note__control" type="button" onclick="onRemoveClick(this.form.parentElement, ' + index + ')">' +
                                 '<i class="fa fa-times" aria-hidden="true"></i>' +
                             '</button>' +
                             '<h1 class="note__title">' + listaNotas.listaInterna[index].title + '</h1>' +
                             '<p class="note__body">' + listaNotas.listaInterna[index].body + '</p>' +
                         '</form>';
        }
    }

    section.innerHTML = innerHTML;
}

// essa função trata o click para criar ou editar nota (ao clicar no botão concluido)
// tomar cuidado nesta parte pous o index tem que vir dados, colocar notas[index] e checar no if
function onDoneClick(form, section, inputTitle, textAreaBody, index) {
    if (index === null) {
        // criar uma nota
        var note = {
            title: inputTitle.value,
            body: textAreaBody.value
        };

        // adicionarz a nota
        notes.push(note);

        // atualizar a tela
        updateSection(section);

        //limpar o formulario
        form.reset();
    } else {
        // alterar a nota
        notes[index].title = inputTitle.value;
        notes[index].body = textAreaBody.value;
        notes[index].editing = false;

        // atualizar a tela
        updateSection(section);
    }
}


// essa função serve para remover a nota
function onRemoveClick(section, index) {
    // remover a nota
    notes.splice(index, 1);

    // atualizar a tela
    updateSection(section);
}

// essa função serve para editar a nota quando clicar no template;
function onEditClick(section, index) {
    // adicionar atributo editando
    notes[index].editing = true;

    // atualizar a tela
    updateSection(section);
}

