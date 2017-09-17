/**
 * Created by Master on 06.04.2017.
 */
$(document).ready(function () {
    var circuleOption = {
        animation: 1,
        animationStep: 5,
        foregroundBorderWidth: 10,
        backgroundBorderWidth: 25,
        foregroundColor: '#99cc33',
        backgroundColor: '#eeeeee',
        fontColor: '#99cc33',
        percentageTextSize: 30,
        animateInView: true,
        percentageY: 110
    };
    var options = circuleOption;
    options.percent = 100;
    $('#circle-opencart').circliful(options);


    options.percent = 95;
    options.replacePercentageByText = '95/100';
    $('#circle-pagespeed').circliful(options);

    options.replacePercentageByText = null;
    options.percent = 100;
    $('#circle-seo').circliful(options);

    options = circuleOption;
    options.percent = 0;
    options.backgroundColor = '#99cc33';
    options.foregroundColor = '#eeeeee';
    options.backgroundBorderWidth = 10;
    options.foregroundBorderWidth = 25;
    options.noPercentageSign = true;
    $('#circle-errors').circliful(options);


    $('.bxslider').bxSlider({
        minSlides: 1,
        maxSlides: 6,
        moveSlides: 1,
        slideWidth: 120,
        slideMargin: 25,
        pager: false
    });


    $('.product-page .slider').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        slideMargin: 0,
        pager: true,
        pagerCustom: '.slider-pager',
        controls: false
    });

    $('.product-page .slider-pager').bxSlider({
        minSlides: 6,
        maxSlides: 6,
        moveSlides: 4,
        slideWidth: 80,
        slideMargin: 10,
        pager: false

    });


    $('.btn-contact').click(function () {
        $('#user-box').toggleClass('mini');
    });


});


function sendDatas(id_selector) {

    var selectorForm = "#" + id_selector + " form";
    var elForm = $(selectorForm);
    var elMessages = elForm.find('.messages');
    var urlForm = elForm.attr('action') || 'index.php';
    var datasForm = elForm.serialize() || '';
    var typeForm = elForm.attr('type') || 'POST';

    console.log('datasForm = ' + datasForm);
    console.log('urlForm = ' + urlForm);
    console.log('typeForm = ' + typeForm);

    console.info(datasForm);

/*

     var datas = {
     error: 1,
     type: 'success',
     texts: ["Ваше сообщение успешно отправленно! Скоро свяжимся."]
     };
     showMessages(selectorForm, datas);
     return true;

*/

    if (checkRequired(id_selector)) {

        $.ajax({
            type: typeForm,
            url: urlForm,
            data: datasForm,
            dataType: 'json',

            beforeSend: function (data) {
                showPreloader(selectorForm);
            },

            success: function (data) {
                if (data.error === 0) {
                    showMessages(selectorForm, data);
                }
                else {

                    $.each(data.errors, function (index, value) {
                        elMessages.append('<p class="hide">' + value.text + '</p>');
                    });
                    elMessages.find('p').slideDown(800);
                }
            },

            error: function (xhr, str) {
                alert('Возникла ошибка: ' + xhr.responseCode);
            },

            complete: function (data) {
                hidePreloader(selectorForm);
            }


        });


    }

}

function showPreloader(selector_str) {       //console.log('function showPreloader');

    var elContainer = $(selector_str);
    var loading = '<div class="loading"><div class="mask"></div><div class="loader"><img src="images/loading.gif" alt="loader..."></div></div>';

    elContainer.css('position', 'relative');
    elContainer.append(loading);
    //window.setTimeout(function(){hidePreloader(selector_str)}, 5000);

}

function hidePreloader(selector_str) {      // console.log('function hidePreloader');
    var elContainer = $(selector_str);
    elContainer.find('.loading').remove();
    //elContainer.find('.loading').fadeOut(400, function(){$(this).remove();});
}

function showMessages(selector_str, datas) {
    var elContainer = $(selector_str);
    var html = '<div class="alert hide"><div class="ico"></div><div class="close btn-close-effect"></div><div class="content"></div></div>';
    elContainer.css('position', 'relative');
    elContainer.append(html);
    var elContent = elContainer.find('.content');
    $.each(datas.texts, function (index, value) {
        elContent.append('<p>' + value + '</p>');
    });
    elContainer.find('.alert').fadeIn(800);


    window.setTimeout(closeMessages, 5000);
    $('.alert .close').bind('click', function () {
        closeMessages();
    });
}
function closeMessages() {

    $('.alert').fadeOut(800, function () {
        $('.alert').remove();
    });
}


//Reference:
//http://www.onextrapixel.com/2012/12/10/how-to-create-a-custom-file-input-with-jquery-css3-and-php/
;(function($) {

    // Browser supports HTML5 multiple file?
    var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
        isIE = /msie/i.test( navigator.userAgent );

    $.fn.customFile = function() {

        return this.each(function() {

            var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
                $wrap = $('<div class="file-upload-wrapper">'),
                $input = $('<input type="text" class="file-upload-input" />'),
                // Button that will be used in non-IE browsers
                $button = $('<button type="button" class="file-upload-button">Выбрать файл</button>'),
                // Hack for IE
                $label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Выбрать файл</label>');

            // Hide by shifting to the left so we
            // can still trigger events
            $file.css({
                position: 'absolute',
                left: '-9999px'
            });

            $wrap.insertAfter( $file )
                .append( $file, $input, ( isIE ? $label : $button ) );

            // Prevent focus
            $file.attr('tabIndex', -1);
            $button.attr('tabIndex', -1);

            $button.click(function () {
                $file.focus().click(); // Open dialog
            });

            $file.change(function() {

                var files = [], fileArr, filename;

                // If multiple is supported then extract
                // all filenames from the file array
                if ( multipleSupport ) {
                    fileArr = $file[0].files;
                    for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                        files.push( fileArr[i].name );
                    }
                    filename = files.join(', ');

                    // If not supported then just take the value
                    // and remove the path to just show the filename
                } else {
                    filename = $file.val().split('\\').pop();
                }

                $input.val( filename ) // Set the value
                    .attr('title', filename) // Show filename in title tootlip
                    .focus(); // Regain focus

            });

            $input.on({
                blur: function() { $file.trigger('blur'); },
                keydown: function( e ) {
                    if ( e.which === 13 ) { // Enter
                        if ( !isIE ) { $file.trigger('click'); }
                    } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
                        // On some browsers the value is read-only
                        // with this trick we remove the old input and add
                        // a clean clone with all the original events attached
                        $file.replaceWith( $file = $file.clone( true ) );
                        $file.trigger('change');
                        $input.val('');
                    } else if ( e.which === 9 ){ // TAB
                        return;
                    } else { // All other keys
                        return false;
                    }
                }
            });

        });

    };

    // Old browser fallback
    if ( !multipleSupport ) {
        $( document ).on('change', 'input.customfile', function() {

            var $this = $(this),
                // Create a unique ID so we
                // can attach the label to the input
                uniqId = 'customfile_'+ (new Date()).getTime(),
                $wrap = $this.parent(),

                // Filter empty input
                $inputs = $wrap.siblings().find('.file-upload-input')
                    .filter(function(){ return !this.value }),

                $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

            // 1ms timeout so it runs after all other events
            // that modify the value have triggered
            setTimeout(function() {
                // Add a new input
                if ( $this.val() ) {
                    // Check for empty fields to prevent
                    // creating new inputs when changing files
                    if ( !$inputs.length ) {
                        $wrap.after( $file );
                        $file.customFile();
                    }
                    // Remove and reorganize inputs
                } else {
                    $inputs.parent().remove();
                    // Move the input so it's always last on the list
                    $wrap.appendTo( $wrap.parent() );
                    $wrap.find('input').focus();
                }
            }, 1);

        });
    }

}(jQuery));

$(document).ready(function () {
    $('input[type=file]').customFile();
});
