/**
 * Created by kholmatov on 06/08/2019.
 */
$(function () {

    $('.error').click(function() {
        alert( "Handler for .focus() called." );
        $(this).removeClass('error');
    });

    $('.button').click(function () {
        if (validation()) {
            var name = $("#name").val();
            var email = $("#email").val();
            var data = 'name=' + name + '&email=' + email;
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "send.php",
                data: data,
                success: function (data) {
                    if(data == 3) {
                        $('#form').hide();
                        $('.result').show(500);
                        $("#name").val("");
                        $("#email").val("");
                    }

                }
            });
        }

        //Кажется, вы ввели несуществующий email
    })

    $(".request").focus(function () {
        $(this).removeClass('error');
    });

});

function validation() {
    var check = true;
    var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    $('#form .request').each(function (e) {
        if ($(this).val().trim() == '') {
            check = false;
            $(this).addClass('error');
        }
    });

    if (!filter.test($('#form #email').val())) {
        $('#form #email').addClass('error');
        check = false;
    }

    return check;
}