
function getMunicipiosJson (callback) {
  return $.ajax({
    url: "https://raw.githubusercontent.com/kleytonmr/ES-municipios/master/munic/banco.min.json?token=AHNGKJ76U73FCUWASQXOPAK5DHRMY",
    dataType: "json",
    success: function(data) {
      if (callback) {
        callback(data.municipios);
      }
    }
  });
}

function initMunicipioSelect(data) {
  $('.cc-select-municipio').each(function() {
    var input = $(this);
    $(data).each(function(i, value){
      input.append($('<option>', { value: value.key, text: value.munic }));
    });
  });
}

function selected(data){
  $('#list-munic').on('change', function(event) {
    event.stopPropagation();

    var munic_current = $( "#list-munic option:selected" ).val()

    for (var i in data){
      $("#" + data[i].key).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }

    for (var i in data){
      if (data[i].key == munic_current) {
        if(selectedValueRadio == "cluster"){
          for (var j in data){
            if (data[i].cluster == data[j].cluster) {
              $("#" + data[j].key).css("fill", "#a1a1a1");
              $("#" + munic_current).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
            }
          }
        } else if(selectedValueRadio == "regional"){
          for (var j in data){
            if (data[i].regional == data[j].regional) {
              $("#" + data[j].key).css("fill", "#2d3091");
              $("#" + munic_current).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
            }
          }
        } else if(selectedValueRadio == "estadual"){
          for (var j in data){
            $("#" + data[j].key).css("fill", "#a1a1a1");
            $("#" + munic_current).css("fill", "#ffba5a");
          }
        } else{
          // alert("Escolha um grupo primeiro!")
        }
      }
    }
  });
}

function onMapClick(data) {

  var selectedValueRadio = "cluster";

  $("#radio").on('change', function () {
    selectedValueRadio = $("input[name='options']:checked").val();
    $('#list-munic option:first').prop('selected', true);
    for (var i in data){
      $("#" + data[i].key).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }
    console.log(selectedValueRadio);
  });

  $('g').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    var munic_current = $(this).attr("id");

    selectMunicipioOption(munic_current);
    populeMunicipioData(munic_current)

    for (var i in data){
      $("#" + data[i].key).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }

    for (var i in data){
      if (data[i].key == munic_current) {
        if(selectedValueRadio == "cluster"){
          for (var j in data){
            if (data[i].cluster == data[j].cluster) {
              $("#" + data[j].key).css("fill", "#a1a1a1");
              $("#" + munic_current).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
            }
          }
        }else if(selectedValueRadio == "regional"){
          for (var j in data){
            if (data[i].regional == data[j].regional) {
              $("#" + data[j].key).css("fill", "#2d3091");
              $("#" + munic_current).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
            }
          }
        }else if(selectedValueRadio == "estadual"){
          for (var j in data){
            $("#" + data[j].key).css("fill", "#a1a1a1");
            $("#" + munic_current).css("fill", "#ffba5a");
          }
        }else{
          // alert("Escolha um grupo primeiro!")
        }
      }
    }
  });
}

function selectMunicipioOption(idMunicipio) {
  if (idMunicipio) {
    $(".cc-select-municipio").each(function (i, input) {
      getMunicipiosJson(function (data) { 
        var result = data.find(obj => {
          return obj.key === idMunicipio
        });
        $(input).val(result.key);
      });
    });
  }
}

function populeMunicipioData(idMunicipio) {
  if (idMunicipio) {

    getMunicipiosJson(function(data) {
      var municipio = data.find(obj => {
        return obj.key === idMunicipio
      });

      // $('img#mapa-json').attr("src","assets/img/mapa-cluster-" + municipio.key + ".png");
  
      $("#top-nota").text(municipio.merc);
      $("#merc-nota").text(municipio.merc);
  
      $("#right-nota").text(municipio.caph);
      $("#caph-nota").text(municipio.caph);
  
      $("#bottom-nota").text(municipio.gestfin);
      $("#gestfin-nota").text(municipio.gestfin);
  
      $("#left-nota").text(municipio.infra);
      $("#infra-nota").text(municipio.infra);
  
      $("#ian-nota-escolha").text(municipio.ian);
      $("#ian-nota").text(municipio.ian);
  
      $("#top-ranking").text(municipio.cpos_merc + 'º');
      $("#cpos_merc-ranking").text(municipio.cpos_merc + 'º');
      $("#right-ranking").text(municipio.cpos_caph + 'º');
      $("#cpos_caph-ranking").text(municipio.cpos_caph + 'º');
      $("#bottom-ranking").text(municipio.cpos_gestfin + 'º');
      $("#cpos_gestfin-ranking").text(municipio.cpos_gestfin + 'º');
      $("#left-ranking").text(municipio.cpos_infra + 'º');
      $("#cpos_infra-ranking").text(municipio.cpos_infra + 'º');
      $("#cpos_infra-ranking").text(municipio.cpos_infra + 'º');
      $("#ian-nota-ranking").text(municipio.cpos_ian + 'º');
      $("#cpos_ian-ranking").text(municipio.cpos_ian + 'º');
  
      $("#notaReguaPrincipaCaph").text(municipio.caph);
      $("#notaReguaPrincipaMerc").text(municipio.merc);
      $("#notaReguaPrincipaGestfin").text(municipio.gestfin);
      $("#notaReguaPrincipaInfra").text(municipio.infra);
      $("#notaReguaPrincipaIan").text(municipio.ian);
  
  
      $("#notaReguacmed_merc").text(municipio.cmed_merc);
      $("#notaReguacmin_merc").text(municipio.cmin_merc);
      $("#notaReguacmax_merc").text(municipio.cmax_merc);
  
  
      $("#notaReguacmed_caph").text(municipio.cmed_caph);
      $("#notaReguacmin_caph").text(municipio.cmin_caph);
      $("#notaReguacmax_caph").text(municipio.cmax_caph);
  
      $("#notaReguacmed_infra").text(municipio.cmed_infra);
      $("#notaReguacmin_infra").text(municipio.cmin_infra);
      $("#notaReguacmax_infra").text(municipio.cmax_infra);
  
      $("#notaReguacmed_gestfin").text(municipio.cmed_gestfin);
      $("#notaReguacmin_gestfin").text(municipio.cmin_gestfin);
      $("#notaReguacmax_gestfin").text(municipio.cmax_gestfin);
  
      //Capital Humano - educaçao
      $("#n_ideb_fund_1_59y").text(municipio.n_ideb_fund_1_59y);
      $("#n_ideb_fund_2_1014y").text(municipio.n_ideb_fund_2_1014y);
  
      $(".municipioName").text(municipio.munic);
      // $(".municipioNameLimit").text(municipio.munic.toString().substr(0, 11) + '..');
  
      $('#indicador-ambiente-pontuacao').html(municipio.ian);
      $('#indicador-ambiente-ranking').html(municipio.cpos_ian);
  
      $('#pontecial-mercado-pontuacao').html(municipio.merc);
      $('#pontecial-mercado-ranking').html(municipio.cpos_merc);
  
      $('#capital-humano-pontuacao').html(municipio.caph);
      $('#capital-humano-ranking').html(municipio.cpos_caph);
  
      $('#gestao-fical-pontuacao').html(municipio.gestfin);
      $('#gestao-fical-ranking').html(municipio.cpos_gestfin);
  
      $('#infra-estrutura-pontuacao').html(municipio.infra);
      $('#infra-estrutura-ranking').html(municipio.cpos_infra);
    });      
  }
}

function setMapSelectedMunicipio(idMunicipio) {
  var selected = "#" + idMunicipio
  $(selected).click();
}

$(document).ready(function() {
  getMunicipiosJson(initMunicipioSelect);
  getMunicipiosJson(onMapClick);
  getMunicipiosJson(selected);

  $(".cc-select-municipio").on('change', function () {
    var that = $(this)
    $(".cc-select-municipio").each(function (i, input) {
      $(input).val(that.val());
      populeMunicipioData(that.val());
      setMapSelectedMunicipio(that.val());
    });
  });
});


// ---------------------- Old js

$(document).on('click', '.button-js', function(event) {
  $(this).find(".minus").toggle();
  $(this).find(".plus").toggle();
  $(this).parent().find(".descricao").toggleClass("descricao-show");
});

$(document).on('click', '.button-categorias', function(event) {
  $(this).find(".minus").toggle();
  $(this).find(".plus").toggle();
  $(this).parent().parent().find(".categoria").toggleClass("categoria-show");
});

$(document).on('click', '.button-cluster', function(event) {
  $(this).find(".minus").toggle();
  $(this).find(".plus").toggle();
  $(this).parent().parent().find(".cluster-content").toggleClass("cluster-content-show");
});

$(document).on('click', '.button-cases', function(event) {
  $(this).find(".minus").toggle();
  $(this).find(".plus").toggle();
  $(this).parent().find(".more").toggleClass("show-more");
});

$(document).on('click', '#card-potencialMercado', function(event) {
$("#content-potencialMercado").show();
$("#content-capitalHumano").hide();
$("#content-gestaoFiscal").hide();
$("#content-infraEstrutura").hide();

$("#card-potencialMercado").removeClass("active");
$("#card-capitalHumano").removeClass("active");
$("#card-gestaoFiscal").removeClass("active");
$("#card-infraEstrutura").removeClass("active");
$(this).addClass("active");

});

$(document).on('click', '#card-capitalHumano', function(event) {
$("#content-capitalHumano").show();
$("#content-potencialMercado").hide();
$("#content-gestaoFiscal").hide();
$("#content-infraEstrutura").hide();

$("#card-potencialMercado").removeClass("active");
$("#card-capitalHumano").removeClass("active");
$("#card-gestaoFiscal").removeClass("active");
$("#card-infraEstrutura").removeClass("active");
$(this).addClass("active");

});

$(document).on('click', '#card-gestaoFiscal', function(event) {
$("#content-gestaoFiscal").show();
$("#content-potencialMercado").hide();
$("#content-capitalHumano").hide();
$("#content-infraEstrutura").hide();
$("#card-potencialMercado").removeClass("active");
$("#card-capitalHumano").removeClass("active");
$("#card-gestaoFiscal").removeClass("active");
$("#card-infraEstrutura").removeClass("active");
$(this).addClass("active");

});

$(document).on('click', '#card-infraEstrutura', function(event) {
  $("#content-infraEstrutura").show();
  $("#content-potencialMercado").hide();
  $("#content-gestaoFiscal").hide();
  $("#content-capitalHumano").hide();
  $("#card-potencialMercado").removeClass("active");
  $("#card-capitalHumano").removeClass("active");
  $("#card-gestaoFiscal").removeClass("active");
  $("#card-infraEstrutura").removeClass("active");
  $(this).addClass("active");

});

// $(document).on('scroll', function() {
//     if($(this).scrollTop()>=$('#imgbg-final').position().top){
//         $(".sidebar.fixed").css("display", "none");
//     } else {
//         $(".sidebar.fixed").css("display", "block");
//     }
// });

$(document).on('click', '#radio #option1', function(event) {
  $("label#label1").addClass("active");
  $("label#label2").removeClass("active");
  $("label#label3").removeClass("active");
});

$(document).on('click', '#radio #option2', function(event) {
  $("label#label2").addClass("active");
  $("label#label1").removeClass("active");
  $("label#label3").removeClass("active");
});

$(document).on('click', '#radio #option3', function(event) {
  $("label#label3").addClass("active");
  $("label#label2").removeClass("active");
  $("label#label1").removeClass("active");
});
$(document).on('click', '.button-js', function(event) {
    $(this).find(".minus").toggle();
    $(this).find(".plus").toggle();
    $(this).parent().find(".descricao").toggleClass("descricao-show");
});

$(document).on('click', '.button-categorias', function(event) {
    $(this).find(".minus").toggle();
    $(this).find(".plus").toggle();
    $(this).parent().parent().find(".categoria").toggleClass("categoria-show");
});

$(document).on('click', '.button-cluster', function(event) {
    $(this).find(".minus").toggle();
    $(this).find(".plus").toggle();
    $(this).parent().parent().find(".cluster-content").toggleClass("cluster-content-show");
});

$(document).on('click', '.button-cases', function(event) {
    $(this).find(".minus").toggle();
    $(this).find(".plus").toggle();
    $(this).parent().find(".more").toggleClass("show-more");
});

$(document).on('click', '#card-potencialMercado', function(event) {
  $("#content-potencialMercado").show();
  $("#content-capitalHumano").hide();
  $("#content-gestaoFiscal").hide();
  $("#content-infraEstrutura").hide();

  $("#card-potencialMercado").removeClass("active");
  $("#card-capitalHumano").removeClass("active");
  $("#card-gestaoFiscal").removeClass("active");
  $("#card-infraEstrutura").removeClass("active");
  $(this).addClass("active");

});

$(document).on('click', '#card-capitalHumano', function(event) {
  $("#content-capitalHumano").show();
  $("#content-potencialMercado").hide();
  $("#content-gestaoFiscal").hide();
  $("#content-infraEstrutura").hide();

  $("#card-potencialMercado").removeClass("active");
  $("#card-capitalHumano").removeClass("active");
  $("#card-gestaoFiscal").removeClass("active");
  $("#card-infraEstrutura").removeClass("active");
  $(this).addClass("active");

});

$(document).on('click', '#card-gestaoFiscal', function(event) {
  $("#content-gestaoFiscal").show();
  $("#content-potencialMercado").hide();
  $("#content-capitalHumano").hide();
  $("#content-infraEstrutura").hide();
  $("#card-potencialMercado").removeClass("active");
  $("#card-capitalHumano").removeClass("active");
  $("#card-gestaoFiscal").removeClass("active");
  $("#card-infraEstrutura").removeClass("active");
  $(this).addClass("active");

});

$(document).on('click', '#card-infraEstrutura', function(event) {
  $("#content-infraEstrutura").show();
  $("#content-potencialMercado").hide();
  $("#content-gestaoFiscal").hide();
  $("#content-capitalHumano").hide();
  $("#card-potencialMercado").removeClass("active");
  $("#card-capitalHumano").removeClass("active");
  $("#card-gestaoFiscal").removeClass("active");
  $("#card-infraEstrutura").removeClass("active");
  $(this).addClass("active");

});

// $(document).on('scroll', function() {
//     if($(this).scrollTop()>=$('#imgbg-final').position().top){
//         $(".sidebar.fixed").css("display", "none");
//     } else {
//         $(".sidebar.fixed").css("display", "block");
//     }
// });

$(document).on('click', '#radio #option1', function(event) {
    $("label#label1").addClass("active");
    $("label#label2").removeClass("active");
    $("label#label3").removeClass("active");
});

$(document).on('click', '#radio #option2', function(event) {
    $("label#label2").addClass("active");
    $("label#label1").removeClass("active");
    $("label#label3").removeClass("active");
});

$(document).on('click', '#radio #option3', function(event) {
    $("label#label3").addClass("active");
    $("label#label2").removeClass("active");
    $("label#label1").removeClass("active");
});

// $(window).scroll(function() {
//     var scroll = $(window).scrollTop();
//     if (scroll >= 1500) {
//         $(".sidebar").addClass("fixed");
//         $("#imgbg-final").css("z-index", "1");
//     } else {
//         $(".sidebar").removeClass("fixed");
//     }
// });

// function selected(data){
//   var selectedValueRadio;
//   $("#radio").on('change', function () {
//     selectedValueRadio = $("input[name='options']:checked").val();
//     $('#list-munic option:first').prop('selected', true);
//     for (var i in data){
//       $("#" + data[i].key).css("fill", "#e7e8ea");
//       $("#agrupamentos").find('li').remove()
//     }
//     console.log(selectedValueRadio);
//   });

//   $('#list-munic').on('change', function(event) {
//     event.stopPropagation();
//     var munic_current = $("#list-munic option:selected" ).val()
//     var selectGroup = false;

//     for (var i in data){
//       $("#" + data[i].key).css("fill", "#e7e8ea");
//       $("#agrupamentos").find('li').remove()
//     }

//     for (var i in data){
//       if (data[i].key == munic_current) {
//         if(selectedValueRadio == "cluster"){
//           for (var j in data){
//             if (data[i].cluster == data[j].cluster) {
//               $("#" + data[j].key).css("fill", "#a1a1a1");
//               $("#" + munic_current).css("fill", "#ffba5a");
//               $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
//             }
//           }
//         }else if(selectedValueRadio == "regional"){
//           for (var j in data){
//             if (data[i].regional == data[j].regional) {
//               $("#" + data[j].key).css("fill", "#2d3091");
//               $("#" + munic_current).css("fill", "#ffba5a");
//               $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
//             }
//           }
//         }else if(selectedValueRadio == "estadual"){
//           for (var j in data){
//             $("#" + data[j].key).css("fill", "#a1a1a1");
//             $("#" + munic_current).css("fill", "#ffba5a");
//           }
//         }else{
//           selectGroup = true
//         }
//       }
//     }

//     // if (selectGroup) {
//     //   alert("Escolha um grupo primeiro!")
//     // }
//   });
// }

// function clicked(data){
//   var selectedValueRadio;
//   var selectGroup = false;

//   $("#radio").on('change', function () {
//     selectedValueRadio = $("input[name='options']:checked").val();
//     $('#list-munic option:first').prop('selected', true);
//     for (var i in data){
//       $("#" + data[i].key).css("fill", "#e7e8ea");
//       $("#agrupamentos").find('li').remove()
//     }
//     console.log(selectedValueRadio);
//   });

//   $('g').on('click', function(event) {
//     event.stopPropagation();
//     var munic_current = $(this).attr("id")
//     $("#list-munic").val($(this).attr("id")).change();

//     for (var i in data){
//       $("#" + data[i].key).css("fill", "#e7e8ea");
//       $("#agrupamentos").find('li').remove()
//     }

//     for (var i in data){
//       if (data[i].key == munic_current) {
//         if(selectedValueRadio == "cluster"){
//           for (var j in data){
//             if (data[i].cluster == data[j].cluster) {
//               $("#" + data[j].key).css("fill", "#a1a1a1");
//               $("#" + munic_current).css("fill", "#ffba5a");
//               $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
//             }
//           }
//         }else if(selectedValueRadio == "regional"){
//           for (var j in data){
//             if (data[i].regional == data[j].regional) {
//               $("#" + data[j].key).css("fill", "#2d3091");
//               $("#" + munic_current).css("fill", "#ffba5a");
//               $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
//             }
//           }
//         }else if(selectedValueRadio == "estadual"){
//           for (var j in data){
//             $("#" + data[j].key).css("fill", "#a1a1a1");
//             $("#" + munic_current).css("fill", "#ffba5a");
//           }
//         }else{
//           selectGroup = true
//         }
//       }
//     }

//     if (selectGroup) {
//       alert("Escolha um grupo primeiro!")
//     }
//   });
// }






