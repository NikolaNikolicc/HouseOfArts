$(document).ready(function(){
    initFile();

    function initFile(){
        
        Object.entries(artists).forEach(([key, value]) => {
            $(".artists").append("<div class='col-lg-6 col-md-6'>" +
                                    "<div class='member'data-aos='zoom-in' data-aos-delay='100'>" +
                                        "<img src='assets/img/artists/"+ value.image +"' class='img-fluid' alt=''>" +
                                            "<div class='member-info'>" +
                                                "<div class='member-info-content'>" +
                                                    "<h4>"+ value.name +"</h4><a href='artist.html' class='artist-redirect' id="+ key +">Погледај</a>" +
                                                "</div>" +
                                            "</div>" +
                                        "</img>" +
                                    "</div>" +
                                "</div>");
        });

    }
});