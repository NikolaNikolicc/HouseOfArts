$(document).ready(function () {
    let offers = localStorage.getItem("offers");
    if(offers != null) offers = JSON.parse(offers);
    for (let i = 0; i < 3 && offers.length > i; i++) {
        let artwork = JSON.parse(offers[i].artwork);
        
        $("#offers").append("<div class='swiper-slide'>"+
                                "<div class='row latest-offers-item'>"+
                                    "<div class='col-lg-6'>"+
                                        "<img src='assets/img/"+artwork.image+"' class='img-fluid' alt=''>"+
                                    "</div>"+
                                    "<div class='col-lg-6 pt-4 pt-lg-0 content'>"+
                                        "<h3>Поставка 'Експлозија боја'</h3>"+
                                        "<p class='fst-italic'>"+
                                            "Ова нова поставка у галерији представља уређену експлозију боја."+ 
                                            "Изложени радови су живописни и витални, са јаким контрастима и разиграним "+
                                            "комбинацијама боја. Посетиоци ће се наћи окружени вртлогом енергије и живости"+ 
                                            "док су радови постављени на начин који отвара простор за индивидуално искуство"+ 
                                            "и тумачење. Ова поставка је одличан изазов за све који су заинтересовани за визуелну"+ 
                                            "уживанцију и истраживање могућности боја."+
                                        "</p>"+   
                                    "</div>"+
                                "</div>"+
                            "</div>");                     

    }
    
})