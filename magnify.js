$( function() {
    var tooltips = $( "[title]" ).tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            collision: "none",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
            }
        }
    });
} );