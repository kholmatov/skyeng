/**
 * Created by kholmatov on 06/08/2019.
 */
$(document).ready(function () {

    $('.error').click(function () {
        alert("Handler for .focus() called.");
        $(this).removeClass('error');
    });

    $('.button').click(function () {
        if (validation()) {
            $('.button').attr("disabled", true);
            $('.button').val('Отправляем');
            var name = $("#name").val();
            var email = $("#email").val();
            var data = 'name=' + name + '&email=' + email;
            var request = $.ajax({
                type: "POST",
                dataType: "json",
                url: "send.php",
                data: data,
                success: function (data) {
                    if (data == 3) {
                        $('#form').hide();
                        $('#form').after('<div class="result"><div>Поздравляем </div> <div>с подпиской на курс.</div> <div>Успехов в учебе! :)</div></div>');
                        $("#name").val("");
                        $("#email").val("");
                    }
                }
            });
            request.fail(function (jqXHR, textStatus) {
                console.log("Request failed: " + textStatus);
            });

        }
    });

    $(".request").focus(function () {
        if ($(this).hasClass("error")) {
            $(this).removeClass('error');
            $(this).next('div').remove();
        }
    });

});

function validation() {
    var check = true;
    var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    $('#form .request').each(function (e) {
        if ($(this).val().trim() == '') {
            checkError(this);
            check = false;
        }
    });

    if (!filter.test($('#form #email').val())) {
        checkError('#form #email');
        check = false;
    }

    return check;
}

function checkError(current) {
    if (!$(current).hasClass("error")) {
        $(current).addClass('error');
        if (current == '#form #email') $(current).after('<div class="error-msg">' + $(current).data("error") + '</div>');
    }
}