$(document).ready(function(){

    var keysOfPaintings;

    initFile();

    function initFile(){
        var sortingPaintings = sessionStorage.getItem('sortingPaintings');

        findKeysOfPaintings();

        if(sortingPaintings == 'byName'){
            sortKeysByName();
        } else if(sortingPaintings == 'byArtist'){
            sortKeysByArtist();
        }
        addArtworks();
    }

    function findKeysOfPaintings(){
        var keys = Object.keys(artworks);
        keysOfPaintings = [];
        keys.forEach(key => {
            if(artworks[key].type == 'painting'){
                keysOfPaintings.push(key);
            }
        });
      
        
    }

    $("#byName").click(function () {
        $(".paintings").empty();
        sortKeysByName();
        addArtworks();
        sessionStorage.setItem('sortingPaintings', 'byName');
    });

    $("#byArtist").click(function () {
        $(".paintings").empty();
        sortKeysByArtist();
        addArtworks(); 
        sessionStorage.setItem('sortingPaintings', 'byArtist');
    });

    function sortKeysByName(){

        keysOfPaintings.sort(function(a, b) {
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

        keysOfPaintings.sort(function(a, b) {
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
        $(".paintings").append("<div class='col-lg-6 col-md-6'>" +
                                        "<div class='member'data-aos='zoom-in' data-aos-delay='100'>" +
                                            "<img src='assets/img/"+ value.image +"' class='img-fluid' alt=''>" +
                                                "<div class='member-info'>" +
                                                    "<div class='member-info-content'>" +
                                                        "<h4><span>"+ value.name +"</span></h4><a class='artwork-redirect' href='artwork.html' class='artwork-redirect' id="+ key +"><span>Погледај</span></a>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</img>" +
                                        "</div>" +
                                    "</div>");
    }

    function addArtworks(){
        keysOfPaintings.forEach(key => {
            addArtwork(key, artworks[key]);
        });

        $(".artwork-redirect").click(function(){
            sessionStorage.setItem('artwork', $(this).attr("id"));
        });
    }

    $("#search").keyup(function() {
        var typedText = $(this).val().toUpperCase();
        $(".paintings").empty();
        findKeys(typedText);
        addArtworks();
    });

    function findKeys(typedText){
        var newKeys = [];
        findKeysOfPaintings();
        keysOfPaintings.forEach(key => {
            if(artworks[key].name.toUpperCase().includes(typedText) || artworks[key].artist.toUpperCase().includes(typedText)){
                newKeys.push(key);
            }
        });

        keysOfPaintings = newKeys;
    }
});