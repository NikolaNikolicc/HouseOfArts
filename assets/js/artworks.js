$(document).ready(function(){
    var keys;

    initFile();

    function initFile(){
        var sortingArtworks = sessionStorage.getItem('sortingArtworks');
        keys = Object.keys(artworks);

        if(sortingArtworks == 'byName'){
            sortKeysByName();
        } else if(sortingArtworks == 'byArtist'){
            sortKeysByArtist();
        }
        addArtworks();
    }

    $("#byName").click(function () {
        $(".artworks").empty();
        sortKeysByName();
        addArtworks();
        sessionStorage.setItem('sortingArtworks', 'byName');
    });

    $("#byArtist").click(function () {
        $(".artworks").empty();
        sortKeysByArtist();
        addArtworks(); 
        sessionStorage.setItem('sortingArtworks', 'byArtist');
    });

    function sortKeysByName(){

        keys.sort(function(a, b) {
            var nameA = artworks[a].name.toUpperCase();
            var nameB = artworks[b].name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

    }

    function sortKeysByArtist(){

        keys.sort(function(a, b) {
            var nameA = artworks[a].artist.toUpperCase();
            var nameB = artworks[b].artist.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }

    function addArtwork(key, value){
        $(".artworks").append("<div class='col-lg-6 col-md-6'>" +
                                    "<div class='member'data-aos='zoom-in' data-aos-delay='100'>" +
                                        "<img src='assets/img/"+ value.image +"' class='img-fluid' alt=''>" +
                                            "<div class='member-info'>" +
                                                "<div class='member-info-content'>" +
                                                    "<h4>"+ value.name +"</h4><a href='artwork.html' class='artwork-redirect' id="+ key +">Погледај</a>" +
                                                "</div>" +
                                            "</div>" +
                                        "</img>" +
                                    "</div>" +
                                "</div>");
    }

    function addArtworks(){
        keys.forEach(key => {
            addArtwork(key, artworks[key]);
        });

        $(".artwork-redirect").click(function(){
            alert($(this).attr("id"));
            sessionStorage.setItem('artwork', $(this).attr("id"));
        });
    }

    $("#search").keyup(function() {
        var typedText = $(this).val().toUpperCase();
        $(".artworks").empty();
        findKeys(typedText);
        addArtworks();
    });

    function findKeys(typedText){
        var newKeys = [];
        keys = Object.keys(artworks);
        keys.forEach(key => {
            
            if(artworks[key].name.toUpperCase().includes(typedText) || artworks[key].artist.toUpperCase().includes(typedText)){
                newKeys.push(key);
            }
            
        });

        keys = newKeys;
    }
    
});