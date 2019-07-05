jQuery(document).ready(function() {
    
    //Carousel

    jQuery(".cc-custom-carousel").slick({
        slidesToShow:2,
        centerPadding:"60px",
        dots:!0,
        arrows:!1,
        centerMode:!0,
        autoplay:!0,
        responsive:[{
            breakpoint:991,
            settings:{
                centerPadding:"0px"
                ,arrows:!1,
                slidesToShow:1,
                infinite:!1
            }
        }],
        responsive:[{
            breakpoint:768,
            settings:{
                centerPadding:"0px"
                ,arrows:!1,
                slidesToShow:1,
                infinite:!1
            }
        }]
    });
    
    
    jQuery(document).on('click', '.cc-btn-cluster', function(event) {
        var classe = jQuery(this).find(".fa").attr("class");
        if(classe == "fa fa-plus"){
            classe = "fa-minus";
            jQuery(this).parent().parent().parent().find(".cc-content-cluster").fadeIn("1000");
            jQuery(this).closest(".cc-cabecalho-drop").find(".cc-content-cluster").fadeIn("1000");
        }else{
            classe = "fa-plus";
            jQuery(this).parent().parent().parent().find(".cc-content-cluster").fadeOut("1000");
            jQuery(this).closest(".cc-cabecalho-drop").find(".cc-content-cluster").fadeOut("1000");
        }
        
        jQuery(this).find(".fa").removeClass("fa-plus");
        jQuery(this).find(".fa").removeClass("fa-minus");
        jQuery(this).find(".fa").addClass(classe);
    });
    
    jQuery(".cc-custom-label").on("click", function(){
        jQuery(".cc-custom-label").each(function(){
            jQuery(this).removeClass("cc-active");
        });
        jQuery(this).addClass("cc-active");
    });
    
    jQuery(document).on('click', '.cc-btn-drop-eixo', function(event) {
        var classe = jQuery(this).find(".fa").attr("class");
        if(classe == "fa fa-plus"){
            classe = "fa-minus";
            jQuery(this).closest(".cc-eixo").find(".cc-content").fadeIn("1000");
        }else{
            classe = "fa-plus";
            jQuery(this).closest(".cc-eixo").find(".cc-content").removeClass("cc-eixo-active");
            jQuery(this).closest(".cc-eixo").find(".cc-content").fadeOut("1000");
        }
        
        jQuery(this).find(".fa").removeClass("fa-plus");
        jQuery(this).find(".fa").removeClass("fa-minus");
        jQuery(this).find(".fa").addClass(classe);
    });
    
    jQuery(document).on('click', '.cc-btn-drop-acordion', function(event) {
        var classe = jQuery(this).find(".fa").attr("class");
        if(classe == "fa fa-plus"){
            classe = "fa-minus";
            jQuery(this).closest(".cc-acordion-conteudo").find(".cc-conteudo").fadeIn("1000");
        }else{
            classe = "fa-plus";
            jQuery(this).closest(".cc-acordion-conteudo").find(".cc-conteudo").fadeOut("1000");
        }
        
        jQuery(this).find(".fa").removeClass("fa-plus");
        jQuery(this).find(".fa").removeClass("fa-minus");
        jQuery(this).find(".fa").addClass(classe);
    });
    
        
    jQuery(window).scroll(function() {
        var scroll = jQuery(window).scrollTop();
         console.log(scroll);
        if (scroll > 1664) {
            if (scroll <= 3564) {
            jQuery(".cc-box-card-menu").addClass("cc-fixo");
            // jQuery("#imgbg-final").css("z-index", "1");
                console.log("passou aqui");
            } else {
                jQuery(".cc-box-card-menu").removeClass("cc-fixo");
            }
        }else{
            jQuery(".cc-box-card-menu").removeClass("cc-fixo");            
        }
    });
    
    //Switch do formulario Novdades...
    // jQuery("#switch-shadow").click(function(){
    //     var classe = jQuery(this).attr("class");
    //     if(jQuery(this).prop("checked")){
    //         jQuery(this).addClass(".cc-escolhido");
    //         console.log("checado");
    //     }else{
    //         jQuery(this).removeClass(".cc-escolhido");
    //         console.log("nãoc hecado");
    //     }
    // });
});

