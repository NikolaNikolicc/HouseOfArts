$(document).ready(function(){
    
    initFile();

    function initFile(){
        Object.entries(artists).forEach(([key, value]) => {
            $("#artists-list").append("<li><a class='artist-redirect' id="+ key +" href='artist.html'>"+ value.name +"</a></li>")
        });

        Object.entries(artworks).forEach(([key, value]) => {
            if(value.type == 'painting') $("#paintings-list").append("<li><a class='artwork-redirect' id="+ key +" href='artwork.html'>"+ value.name +"</a></li>")
            else $("#sculptures-list").append("<li><a class='artwork-redirect' id="+ key +" href='artwork.html'>"+ value.name +"</a></li>")

        });

    }
    $(".artist-redirect").click(function(){
        sessionStorage.setItem('artist', $(this).attr("id"));
    });

    $(".artwork-redirect").click(function(){
        alert($(this).attr("id"));
        sessionStorage.setItem('artwork', $(this).attr("id"));
    });

});