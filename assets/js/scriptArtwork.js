$(document).ready(function () {
    initFunc();

    /**
     * ova fja se izvrsava samo kada je ucitana stranica artwork1.html
     */
    function  initFunc(){
        appendElements();
    }

    function getArtwork(){
        let data;
        if(sessionStorage.getItem('artwork') != null) data = artworks[sessionStorage.getItem('artwork')];
        return data;
    }

    /**
     * dodaje sadrzaj u stranicu artis.html u zavisnosti od umetnika za kojeg zelimo da napravimo stranicu
     */
    function appendElements(){
        let data = getArtwork();
        // postavljanje naslova
        $(".artwork#artwork-name").text(data.name);
        // postavljanje deskripcije umetnika
        $(".artwork#artist-description").text(data.artist);
        // postavljanje vrednosti
        $(".artwork#artwork-value").text(data.value);
        // postavljanje starosti
        $(".artwork#artwork-age").text(data.age);
        

        // pravljenje slike
        var image = $('<img>', {
            'src': './assets/img/'+data.image,
            'alt': data.button,
            'class': 'img-fluid'
        });

        $(".parent-artwork-img").empty();
        $(".parent-artwork-img").append(image);


    }

});