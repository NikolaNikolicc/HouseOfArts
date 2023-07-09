$(document).ready(function () {

    // let myOffers = [
    //     {
    //         artwork: JSON.stringify(data),
    //         bid: bid,
    //         message: messageForAuthor,
    //     }
    // ];

    initFunc();

    /**
     * ova fja se izvrsava samo kada je ucitana stranica artwork.html
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
    $(".confirm-bid").click(function (event) {
        event.preventDefault();
        confirmBid();
    });

    /**
     * vraca true ako su prosla sva validaciona pravila, ili false ukoliko nisu
     * @param {integer} bid 
     * @param {JSON file} artwork 
     * @returns boolean
     */
    function validationOfBid(bid, artwork){
        
        if(bid == ""){
            $("div#submitMessage").text("Морате унети износ понуде.").addClass("error-message");
            return false;
        }
        if(parseInt(bid) < artwork.value){
            $("div#submitMessage").text("Понуђени износ је мањи од вредности слике.").addClass("error-message");
            return false;
        }
        let pattern = /^\d+$/;
        if(!pattern.test(bid)){
            $("div#submitMessage").text("У пољу понуда морају се налазити само цели бројеви.").addClass("error-message");
            return false;
        }
        return true;
    }

    function getOfferID(){
        let offerID = 0;
        if(localStorage.getItem("offerID") == null){
            localStorage.setItem("offerID", offerID);
        }else{
            offerID = localStorage.getItem("offerID");
            localStorage.setItem("offerID", offerID++);
        }
        return offerID;
    }

    /**
     * funkcija obrade event lsitenera za slanje ponude
     */
    function confirmBid() {
        let bid = $("#bid").val();
        let messageForAuthor = $("#messageForAuthor").val();

        // ako je sve ok upisi u sesiju
        if (sessionStorage.getItem('artwork') != null) data = artworks[sessionStorage.getItem('artwork')];
        // validacija (cena i da li je vec licitirao)
        if(!validationOfBid(bid, data)){
            return;
        }
        let offerId = getOfferID();
        let offer = {
            offerID: offerId,
            artwork: JSON.stringify(data),
            bid: bid,
            message: messageForAuthor,
            userID: localStorage.getItem("userID"),
        }
        let myOffers = getOffers();
        // da li se vec nalazi u myOffers nizu
        if(!isAlreadyOffered(myOffers, data)){
            if(myOffers == null)myOffers = [];
            myOffers.push(offer);
            localStorage.setItem("offers", JSON.stringify(myOffers));
            // alert("mora se izmeniti value na novu cenu");
            $("div#submitMessage").text("Ваша понуда за уметнину је послата. Хвала Вам!").addClass("sent-message");
        }
        else{
            let change = confirm("Vec ste uneli ponudu za ovu umetninu, zelite li da je izmenite?");
            if(change){
                changeCurrentBid(bid, messageForAuthor, data, myOffers);
                localStorage.setItem("offers", JSON.stringify(myOffers));
                // alert("mora se izmeniti value na novu cenu");
                $("div#submitMessage").text("Ваша понуда за уметнину је измењена. Хвала Вам!").addClass("sent-message");
                
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
            if((JSON.parse(myOffers[i].artwork)).id == artwork.id && (JSON.parse(myOffers[i].artwork)).userID == localStorage.getItem("userID")){
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
        $(".artwork#artwork-name").text(data.name + " $" + data.value);
        // postavljanje tipa umetnina
        if(data.type == 'painting') $(".artwork#artwork-type").append("<a href='paintings.html'>Слике</a>");
        else $(".artwork#artwork-type").append("<a href='sculptures.html'>Скулптуре</a>");
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