$(document).ready(function () {
    
    // let myOffers = [
    //     {
    //         artwork: JSON.stringify(data),
    //         bid: bid,
    //         message: messageForAuthor,
    //     }
    // ];

    initFunc();

    function initFunc() {
        // vidi da li ima nesto u LS-u
        let myOffers = getOffers();
        if (myOffers == null) return;
        let cntForActive = 1;
        for (let i = 0; i < myOffers.length; i++) {
            let artwork = JSON.parse(myOffers[i].artwork);
            let bid = myOffers[i].bid;
            let message = myOffers[i].message;
            appendElements(artwork, bid, message, cntForActive);
            cntForActive++;
        }
    }

    function getKeyFromId(artworkId) {
        let artworkKey;
        alert(artworks);
        $.each(artworks, function (key, artwork) {
            if (artwork.id === artworkId) {
                artworkKey = key;
            }
        });
        return artworkKey;
    }

    /**
     * event listener za link
     */
    $(".link-artwork").click(function(){
        let clickedId = $(this).attr('id');
        let key = getKeyFromId(clickedId);
        sessionStorage.setItem('artwork', key);
    })

    /**
     * dinamicko dodavanje elemenata
     * @param {Struct} artwork 
     * @param {int} bid 
     * @param {String} message 
     * @param {int} cntForActive 
     */
    function appendElements(artwork, bid, message,cntForActive) {
        // dodavanje u prvi deo
        var liElement = $('<li>').addClass('nav-item');
        var aElement = $('<a>').addClass('nav-link').attr('data-bs-toggle', 'tab').attr('href', '#tab-'+cntForActive).text(artwork.name);
        if(cntForActive == 1)aElement.addClass('active show');
        aElement.append(liElement);
        $("#list-of-artworks").append(aElement);
        // dodavanje u drugi deo
        var divElement = $('<div>').addClass('tab-pane').attr('id', 'tab-'+cntForActive);
        if(cntForActive == 1)divElement.addClass('active show');
        var rowElement = $('<div>').addClass('row');
        var col1Element = $('<div>').addClass('col-lg-8 details order-2 order-lg-1');
        var col2Element = $('<div>').addClass('col-lg-4 text-center order-1 order-lg-2');
        var h3Element1 = $('<h3>').text('Ваша понуда: ' + bid);
        var pElement1 = $('<p>').addClass('fst-italic').text('Проверите статус понуде за ову уметнину кликом на ');
        var aElement = $('<a>').attr('href', 'artwork.html')
                        .text('линк')
                        .addClass('link-artwork')
                        .attr('id', artwork.id);
        pElement1.append(aElement);
        var h3Element2 = $('<h3>').text('Ваша порука уметнику');
        if(message == "")message = "Нисте оставили поруку приликом даваања понуде.";
        var pElement2 = $('<p>').text(message);
        var imgElement = $('<img>').attr('src', 'assets/img/'+artwork.image).attr('alt', artwork.name).addClass('img-fluid');

        col1Element.append(h3Element1, pElement1, h3Element2, pElement2);
        col2Element.append(imgElement);
        rowElement.append(col1Element, col2Element);
        divElement.append(rowElement);

        // Add the div element to the desired container
        $('#list-of-offers').append(divElement);
    }

    /**
     * dohvata sve ponude iz LS-a
     * @returns Array
     */
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

});