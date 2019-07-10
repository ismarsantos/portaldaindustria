$(document).ready(function() {
  var sidebar = document.getElementById('sidebar');
  var stickySidebar = new StickySidebar(sidebar, {
    topSpacing: 20,
    bottomSpacing: 300,
  });

  $('a[data-toggle="pill"]').on('click', function (e) {
    $('.cc-box-card.active').removeClass("active");

    var sessionName = $(this).find('h4').text();

    $('#menu-session').data('session', sessionName.toLowerCase());

    var nTitle = 'Eixo <strong>' + sessionName + '</strong> de&nbsp;<span data-municipio="" class="municipioName">' + $('.municipioName').text() + '</span>';

    $('.cc-titulo-principal').html('');

    $('.cc-titulo-principal').html(nTitle);

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

  var slider = document.getElementById('slider');

      noUiSlider.create(slider, {
          start: [2000, 4000, 6000, 8000],
          range: {
            'min': [0],
            'max': [10000]
          }
      });

      slider.setAttribute('disabled', true);
      var menor = document.createElement('span');
      menor.innerHTML = "Menor do Cluster";
      menor.setAttribute('data-', '');

      var media = document.createElement('span');
      media.innerHTML = "Média do Cluster";
      media.setAttribute('data-', '');

      var municipio = document.createElement('span');
      municipio.innerHTML = "Vitoria";
      municipio.setAttribute('data-municipio', 'Vitoria');

      var maior = document.createElement('span');
      maior.innerHTML = "Maior do Cluster";
      maior.setAttribute('data-', '');

      menor.classList.add('cc-legenda-cluster', 'cc-cor-roxo');
      media.classList.add('cc-legenda-cluster', 'cc-cor-cinza');
      municipio.classList.add('cc-legenda-cluster', 'cc-cor-marrom', 'cc-municipio');
      maior.classList.add('cc-legenda-cluster', 'cc-cor-roxo');

      $($('.noUi-handle')[0]).parent().prepend(menor);
      $($('.noUi-handle')[1]).parent().prepend(media);
      $($('.noUi-handle')[2]).parent().prepend(municipio);
      $($('.noUi-handle')[3]).parent().prepend(maior);

      var menorValor = document.createElement('span');
      menorValor.innerHTML = "0,0";
      menorValor.id = "menor-val-cl";

      var mediaValor = document.createElement('span');
      mediaValor.innerHTML = "0,0";
      mediaValor.id = "media-val-cl";

      var municipioValor = document.createElement('span');
      municipioValor.innerHTML = "0,0";
      municipioValor.id = "munic-val-cl";

      var maiorValor = document.createElement('span');
      maiorValor.innerHTML = "0,0";
      maiorValor.id = "maior-val-cl";

      menorValor.classList.add('cc-valor', 'cc-color-roxo');
      mediaValor.classList.add('cc-valor', 'cc-color-cinza');
      municipioValor.classList.add('cc-valor', 'cc-color-marrom', 'cc-valor-municipio');
      maiorValor.classList.add('cc-valor', 'cc-color-roxo');

      $($('.noUi-handle')[0]).parent().append(menorValor);
      $($('.noUi-handle')[1]).parent().append(mediaValor);
      $($('.noUi-handle')[2]).parent().append(municipioValor);
      $($('.noUi-handle')[3]).parent().append(maiorValor);
});

