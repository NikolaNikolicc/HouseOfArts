$(document).ready(function(){
    initFile();

    function initFile(){
        
        Object.entries(artworks).forEach(([key, value]) => {
            if(value.type == 'sculpture'){
                $(".sculptures").append("<div class='col-lg-6 col-md-6'>" +
                                        "<div class='member'data-aos='zoom-in' data-aos-delay='100'>" +
                                            "<img src='assets/img/"+ value.image +"' class='img-fluid' alt=''>" +
                                                "<div class='member-info'>" +
                                                    "<div class='member-info-content'>" +
                                                        "<h4>"+ value.name +"</h4><a class='artwork-redirect' href='artwork.html' class='artwork-redirect' id="+ key +">Погледај</a>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</img>" +
                                        "</div>" +
                                    "</div>");
             }
        });

    }
});