$(document).ready(function() {
  var sidebar = document.getElementById('sidebar');
  var stickySidebar = new StickySidebar(sidebar, {
    topSpacing: 20,
    bottomSpacing: 300,
  });

  $('a[data-toggle="pill"]').on('click', function (e) {
    $('.cc-box-card.active').removeClass("active");
    $('html, body').animate({
        scrollTop: $("#categorias").offset().top
    }, 0);
    $(this).find(">:first-child").addClass("active");
    stickySidebar.updateSticky();
    setTimeout(function () {
      stickySidebar.updateSticky();
    }, 1000);
  });

  //Carousel
  $(".cc-custom-carousel").slick({
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


  $(document).on('click', '.cc-btn-cluster', function(event) {
    var classe = $(this).find(".fa").attr("class");
    if(classe == "fa fa-plus"){
        classe = "fa-minus";
        $(this).parent().parent().parent().find(".cc-content-cluster").fadeIn("1000");
        $(this).closest(".cc-cabecalho-drop").find(".cc-content-cluster").fadeIn("1000");
    }else{
        classe = "fa-plus";
        $(this).parent().parent().parent().find(".cc-content-cluster").fadeOut("1000");
        $(this).closest(".cc-cabecalho-drop").find(".cc-content-cluster").fadeOut("1000");
    }

    $(this).find(".fa").removeClass("fa-plus");
    $(this).find(".fa").removeClass("fa-minus");
    $(this).find(".fa").addClass(classe);
  });

  $(".cc-custom-label").on("click", function(){
      $(".cc-custom-label").each(function(){
          $(this).removeClass("cc-active");
      });
      $(this).addClass("cc-active");
  });

  $(document).on('click', '.cc-btn-drop-eixo', function(event) {
    var classe = $(this).find(".fa").attr("class");
    if(classe == "fa fa-plus"){
      classe = "fa-minus";
      $(this).closest(".cc-eixo").find(".cc-content").fadeIn("1000");
    }else{
      classe = "fa-plus";
      $(this).closest(".cc-eixo").find(".cc-content").removeClass("cc-eixo-active");
      $(this).closest(".cc-eixo").find(".cc-content").fadeOut("1000");
    }

    $(this).find(".fa").removeClass("fa-plus");
    $(this).find(".fa").removeClass("fa-minus");
    $(this).find(".fa").addClass(classe);

    setTimeout(function () {
      stickySidebar.updateSticky();
    }, 1000);
  });

  $(document).on('click', '.cc-btn-drop-acordion', function(event) {
      var classe = $(this).find(".fa").attr("class");
      if(classe == "fa fa-plus"){
          classe = "fa-minus";
          $(this).closest(".cc-acordion-conteudo").find(".cc-conteudo").fadeIn("1000");
      }else{
          classe = "fa-plus";
          $(this).closest(".cc-acordion-conteudo").find(".cc-conteudo").fadeOut("1000");
      }

      $(this).find(".fa").removeClass("fa-plus");
      $(this).find(".fa").removeClass("fa-minus");
      $(this).find(".fa").addClass(classe);
  });


  // $(window).scroll(function() {
  //     var scroll = $(window).scrollTop();
  //      console.log(scroll);
  //     if (scroll > 1664) {
  //         if (scroll <= 3564) {
  //         $(".cc-box-card-menu").addClass("cc-fixo");
  //         // $("#imgbg-final").css("z-index", "1");
  //             console.log("passou aqui");
  //         } else {
  //             $(".cc-box-card-menu").removeClass("cc-fixo");
  //         }
  //     }else{
  //         $(".cc-box-card-menu").removeClass("cc-fixo");
  //     }
  // });

  //Switch do formulario Novdades...
  // $("#switch-shadow").click(function(){
  //     var classe = $(this).attr("class");
  //     if($(this).prop("checked")){
  //         $(this).addClass(".cc-escolhido");
  //         console.log("checado");
  //     }else{
  //         $(this).removeClass(".cc-escolhido");
  //         console.log("nãoc hecado");
  //     }
  // });
});

