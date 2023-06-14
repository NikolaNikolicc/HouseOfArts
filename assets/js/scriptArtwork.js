$(document).ready(function () {

    initFunc();

    /**
     * ova fja se izvrsava samo kada je ucitana stranica artwork1.html
     */
    function initFunc() {
        appendElements();
    }

    function getArtwork() {
        let data;
        if (sessionStorage.getItem('artwork') != null) data = artworks[sessionStorage.getItem('artwork')];
        return data;
    }

    function getOffers() {
        let myOffers = localStorage.getItem("offers");
        if (myOffers != null) {
            myOffers = JSON.parse(myOffers);
            return myOffers;
        } else {
            localStorage.setItem("offers", JSON.stringify(myOffers));
            return [];
        }
    }

    /**
     * event listener za potvrdu slanja ponude
     */
    $(".confirm-bid").click(function () {
        confirmBid();
    });

    /**
     * funkcija obrade event lsitenera za slanje ponude
     */
    function confirmBid() {
        let bid = $("#bid").val();
        let messageForAuthor = $("#messageForAuthor").val();

        // validacija (cena i da li je vec licitirao)
        alert("potrebna validacija");
        // ako je sve ok upisi u sesiju
        if (sessionStorage.getItem('artwork') != null) data = artworks[sessionStorage.getItem('artwork')];

        let offer = {
            artwork: JSON.stringify(data),
            bid: bid,
            message: messageForAuthor,
        }
        let myOffers = getOffers();
        // da li se vec nalazi u myOffers nizu
        if(!isAlreadyOffered(myOffers, data)){
            if(myOffers == null)myOffers = [];
            myOffers.push(offer);
            localStorage.setItem("offers", JSON.stringify(myOffers));
        }
        else{
            let change = confirm("Vec ste uneli ponudu za ovu umetninu, zelite li da je izmenite?");
            if(change){
                changeCurrentBid(bid, messageForAuthor, data, myOffers);
                localStorage.setItem("offers", JSON.stringify(myOffers));
            }
        }
        
    }

    /**
     * izmena vrednosti tekuce ponude
     * @param {vrednost} bid 
     * @param {poruka autoru} messageForAuthor 
     * @param {delo za  koje se daje ponuda} artwork 
     * @param {spisak korisnikovih ponuda} myOffers 
     * @returns 
     */
    function changeCurrentBid(bid, messageForAuthor, artwork, myOffers){
        for(let i = 0; i <  myOffers.length; i++){
            if((JSON.parse(myOffers[i].artwork)).id == artwork.id){
                myOffers[i].bid = bid;
                myOffers[i].message = messageForAuthor;
                return;
            }
        }
        // nece nikad doci do ovde ali za svaki slucaj
        return;
    }

    /**
     * proverava da li se vec nalazi u nizu u localStorage
     * @param {Array} myOffers 
     */
    function isAlreadyOffered(myOffers, artwork){
        if(myOffers == null)return false;
        for(let i = 0; i <  myOffers.length; i++){
            if((JSON.parse(myOffers[i].artwork)).id == artwork.id){
                return true;
            }
        }
        return false;
    }

    /**
     * dodaje sadrzaj u stranicu artis.html u zavisnosti od umetnika za kojeg zelimo da napravimo stranicu
     */
    function appendElements() {
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
            'src': './assets/img/' + data.image,
            'alt': data.button,
            'class': 'img-fluid'
        });

        $(".parent-artwork-img").empty();
        $(".parent-artwork-img").append(image);


    }

});