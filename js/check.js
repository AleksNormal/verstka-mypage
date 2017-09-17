var textErrors = {
    empty: 'Вы не заполнили поле ',
    short: 'Слишком мало инвормации в поле ',
    required: 'Обязательно для заполнения - ',
    format: 'Неправильно формат данных в поле ',
    email: 'Неверный формат e-mail адреса',
    phone: 'Неверный формат телефона'
};


function checkRequired(id_selector_form) {

    var form = '#' + id_selector_form || 'form';
    var elForm = $(form);
    var elMessages = elForm.find('.messages');
    var elRequired = elForm.find('input.required');


    var errors = [];

    var addError = function (text, input, type) {
        var e_text = text || '';
        var e_input = input || '';
        var e_type = type || '';
        var obj =
            {
                text: e_text,
                input: e_input,
                type: e_type

            };
        errors.push(obj);
    };

    var showErrors = function () {
        console.log('function showErrors');
        $.each(errors, function (index, value) {
            elMessages.append('<p class="hide">' + value.text + '</p>');
            $(value.input).addClass('error');
            $(value.input).parents('.input').eq(0).addClass('error');
        });
        elMessages.find('p').slideDown(800);
    };

    var hideErrors = function () {
        console.log('function hideErrors');
        elRequired.removeClass('error');
        elRequired.parents('.input').removeClass('error');
        elMessages.find('p').slideUp(600, function (element) {
            $(this).remove();
            // $(element).remove();
        });
    };

    var checkEmpty = function (element) {
        console.log('function checkEmpty');
        var value = $(element).val();
        if (value === '') {
            var e_text = textErrors.empty + ' ' + getFieldLabel(element);
            var e_input = element;
            var e_type = 'empty';
            addError(e_text, e_input, e_type);
            return false;
        }
        return true;
    };

    var validateEmail = function (element) {
        console.log('function validateEmail');
        var value = $(element).val();
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!pattern.test(value)) {
            var e_text = textErrors.email;
            var e_input = element;
            var e_type = 'validate';
            addError(e_text, e_input, e_type);
            return false;
        }
        return true;
    };
    var validateName = function (element) {

        return true;
    };

    var validatePhone = function (element) {
        var value = $(element).val();
        var pattern = /[^0-9]/i;
        var number = value.replace(pattern);
        if (number.length < 12) {
            var e_text = textErrors.phone;
            var e_input = element;
            var e_type = 'validate';
            addError(e_text, e_input, e_type);
            return false;
        }
        return true;
    };
    var getFieldLabel = function (element) {
        console.log('function getFieldLabel');
        var label = $(element).next('label').text();
        return label;
    };

    //////////////////////////////////////////

    elRequired.each(function () {
        console.info(this);
        var name = $(this).attr('name');
        var type = $(this).attr('type');
        var value = $(this).val();
        if ($(this).hasClass('type-email')) type = 'email';
        if ($(this).hasClass('type-phone')) type = 'phone';

        console.log('type = ' + type + ' name = ' + name + ' value = ' + value);

        if (type === 'text') {
            checkEmpty(this);
        }
        else if (type === 'email') {
            if (checkEmpty(this)) {
                validateEmail(this);
            }
        }
        else if (type === 'phone') {
            if (checkEmpty(this)) {
                validatePhone(this);
            }
        }

    });

    hideErrors();
    if (errors.length !== 0) {
        showErrors();
        return false;
    }


    return true;
}


/*$(function () {

 $('form').submit(function (form) {

 var checkForm = new checkRequired(form);
 checkForm.run();
 return false;

 });

 });*/

$(document).ready(function () {


    /*
     $('button[type="submit"]').click(function (e) {


     });
     */

    // $('#btn-send-message').click();
//    $('#btn-send-contact').click();


});