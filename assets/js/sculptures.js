$(document).ready(function(){
    var keysOfSculptures;

    initFile();

    function initFile(){
        var sortingSculptures = sessionStorage.getItem('sortingSculptures');

        findKeysOfSculptures();

        if(sortingSculptures == 'byName'){
            sortKeysByName();
        } else if(sortingSculptures == 'byArtist'){
            sortKeysByArtist();
        }
        addArtworks();
    }

    function findKeysOfSculptures(){
        var keys = Object.keys(artworks);
        keysOfSculptures = [];
        keys.forEach(key => {
            if(artworks[key].type == 'sculpture'){
                keysOfSculptures.push(key);
            }
        });
      
        
    }

    $("#byName").click(function () {
        $(".sculptures").empty();
        sortKeysByName();
        addArtworks();
        sessionStorage.setItem('sortingSculptures', 'byName');
    });

    $("#byArtist").click(function () {
        $(".sculptures").empty();
        sortKeysByArtist();
        addArtworks(); 
        sessionStorage.setItem('sortingSculptures', 'byArtist');
    });

    function sortKeysByName(){

        keysOfSculptures.sort(function(a, b) {
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

        keysOfSculptures.sort(function(a, b) {
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
        $(".sculptures").append("<div class='col-lg-6 col-md-6'>" +
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
        keysOfSculptures.forEach(key => {
            addArtwork(key, artworks[key]);
        });

        $(".artwork-redirect").click(function(){
            sessionStorage.setItem('artwork', $(this).attr("id"));
        });
    }

    $("#search").keyup(function() {
        var typedText = $(this).val().toUpperCase();
        $(".sculptures").empty();
        findKeys(typedText);
        addArtworks();
    });

    function findKeys(typedText){
        var newKeys = [];
        findKeysOfSculptures();
        keysOfSculptures.forEach(key => {
            if(artworks[key].name.toUpperCase().includes(typedText) || artworks[key].artist.toUpperCase().includes(typedText)){
                newKeys.push(key);
            }
        });

        keysOfSculptures = newKeys;
    }
});