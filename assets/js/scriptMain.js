$(document).ready(function () {
    initFunc();

    function initFunc(){
        if(localStorage.getItem("offers") != null){
            offers =JSON.parse(localStorage.getItem("offers"));
            let iter = (offers.length > 3)? 3 : offers.length;
            for(let i = 0; i < iter; i++){
                let item = offers[offers.length - i - 1];
                
                let artwork = JSON.parse(item.artwork);
                appendElement(artwork, item.bid);
            }
            appendElement(artwork, item.bid);
        } 
    }

    function appendElement(artwork, bid){
        let newElem = 
        "<div class='swiper-slide'>"+
            "<div class='row event-item'>"+
                "<div class='col-lg-6'>"+
                    "<img src='./assets/img/"+artwork.image+"' class='img-fluid' alt=''>"+
                "</div>"+
            "<div class='col-lg-6 pt-4 pt-lg-0 content'>"+
                "<h3>"+artwork.name+"</h3>"+
                "<p class='fst-italic'>"+
                    "понуда за ову уметнину: "+ bid +
                "</p>"+
            "</div>"+
        "</div>";
      $("#last-three").append(newElem);
    }
});