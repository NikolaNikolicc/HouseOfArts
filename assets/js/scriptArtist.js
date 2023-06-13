$(document).ready(function () {
    
    initFunc();

    /**
     * ova fja se izvrsava samo kada je ucitana stranica artist.html
     */
    function  initFunc(){
        appendElements();
    }

    function getArtist(){
        let data;
        if(sessionStorage.getItem('artist') != null) data = artists[sessionStorage.getItem('artist')];
        return data;
    }

    /**
     * dodaje sadrzaj u stranicu artis.html u zavisnosti od umetnika za kojeg zelimo da napravimo stranicu
     */
    function appendElements(){
        let data = getArtist();
        // postavljanje naslova
        $(".artist#artist-name").text(data.name);
        // postavljanje deskripcije
        $(".artist#artist-description").text(data.description);
        // pravljenje dugmeta
        var button = $('<button>', {
            'class': 'btn artist-all',
            'id': data.button,
            'html': $('<a>', {
              'href': '#',
              'text': 'Погледајте списак свих дела'
            })
        });

        $(".parent-artist-all").empty();
        $(".parent-artist-all").append(button);
        // pravljenje slike
        var image = $('<img>', {
            'src': './assets/img/artists/'+data.image,
            'alt': data.button,
            'class': 'img-fluid'
        });

        $(".parent-artist-img").empty();
        $(".parent-artist-img").append(image);
    }

});