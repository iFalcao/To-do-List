// P�gina come�a sem todos
var mainSection = $('#main');
var footer = $('#footer');
mainSection.hide();
footer.hide();

$(document).on('keyup', '#new-todo, .edit', function (e) {
    // Verifica se a tecla pressionada foi ENTER
    if (e.keyCode == 13) {
        validaInput(e.target.value.trim(), this);
    }
    else if (e.keyCode == 27 && $(this).hasClass('edit')) {
        $(this).parent().removeClass('editing');
    }
});

function validaInput(nomeDoTodo, elementoDoInput) {
    if (nomeDoTodo.length > 0) {
        $(elementoDoInput).val('');
        $(elementoDoInput).hasClass('edit') ? editaTodo(nomeDoTodo, elementoDoInput) : criaTodo(nomeDoTodo);
    }
}

function criaTodo(nomeAtividadeNova) {
    mainSection.show();
    footer.show();
    $('#todo-list').append("<li><div class='view'><input class='toggle' type='checkbox'><label class='campoTodo'>" + nomeAtividadeNova + "</label><button class='destroy'></button></div><input class='edit' value='Editando a ativadade'></li>");
    atualizaQuantidadeDeItens();
}

function atualizaQuantidadeDeItens() {
    var quantidade = $('#main > ul li').length - $('#main > ul li.completed').length;
    if (quantidade != 1) {
        //$('#todo-count').html("<strong> itens restantes</strong>");
    } else {
       // $('#todo-count').text(" item restante");
    }
    $('#quantidade-itens').text(quantidade);
}

function editaTodo(nomeNovoDaAtividade, campo) {
    var listItemPai = $(campo).parent();
    $(listItemPai).removeClass('editing');
    $(listItemPai).find('.campoTodo').text(nomeNovoDaAtividade);
}

// Bot�o para marcar todos ou tirar a marca��o de todos
$('#toggle-all').on('click', function (e) {
    var marcado = $(e.target).prop('checked');
    $('#todo-list').find('.toggle').prop('checked', marcado);

});

// Double click para editar o todo
$(document).on('dblclick', '.campoTodo', function (e) {
    var listItemPai = $(this).parent().parent();
    var inputEdicao = listItemPai.children('.edit');
    listItemPai.addClass('editing');
    inputEdicao.val(this.innerText);
    inputEdicao.focus();
});

// Aperta o bot�o de todo completo
$(document).on('click', '.toggle', function () {
    $(this).parent().parent().toggleClass('completed');
    atualizaQuantidadeDeItens();
});

// Aperta o bot�o de excluir o todo
$(document).on('click', '.destroy', function () {
    $(this).parent().parent().remove();
    atualizaQuantidadeDeItens();
});