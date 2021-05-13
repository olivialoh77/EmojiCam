$(function(){
    var $write = $('#display'),
        shift = false;


    $('#keyboard li').click(function(){
        var $this = $(this),
            character = $this.html();

        if ($this.hasClass('shift')) {
            $('.letter').toggleClass('uppercase');

            shift = true;
            return false;
        }

        if ($this.hasClass('delete')) {
            var string = $write.html();
            $write.html(string.substr(0, string.length - 1));
            return false;
        }

        if ($this.hasClass('space')) {
            $write.html($write.html() + " ");
            return false;
        }

        if (shift){
            character = character.toUpperCase();
            shift = false;
            $('.letter').toggleClass('uppercase');
        }

        $write.html($write.html() + character);


    });
});