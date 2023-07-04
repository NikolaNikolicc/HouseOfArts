(function($) {
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
            'class': 'btn artist-all pdf-generated',
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


        var doc = new jsPDF();

        

        $(".pdf-generated").click(function(){
            var artistId = $(this).attr("id");
            var artworksByArtist = [];

            doc.text(data.print, 10, 10);
            doc.text("Dela:", 10, 30);

            keys = Object.keys(artworks);
            var pom = 50;
            keys.forEach(key => {
                if(artworks[key].artistId == artistId ){
                    doc.text(artworks[key].print, 10, pom);
                    pom = pom + 20;
                    
                }
                
            });

            doc.save("document.pdf");
            // Generate the content for the artist
            //var artistContent = `
            //<h1>${artist}</h1>
            //<ul>
            //    ${artworksByArtist.map(artwork => `<li>${artwork}</li>`).join("")}
            //</ul>
            //`;

            

            // Add the artist content to the PDF
            //doc.html2pdf(artistContent, {
            //callback: function(pdf) {
                // Save the PDF file with the artist's name
                //var filename = `${artist}_artworks.pdf`;
                //pdf.save(filename);

                // Open the PDF in a new tab/window
                //window.open(filename);
           // }

            //});

        });
    }});
})(jQuery)