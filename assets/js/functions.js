
function getMunicipiosJson (callback) {
  $.getJSON("https://raw.githubusercontent.com/kleytonmr/ES-municipios/master/munic/banco.min.json?token=AHNGKJ76U73FCUWASQXOPAK5DHRMY",
    function (data) {
      callback(data.municipios);
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

function initClusterMap(input) {

  var munic_current = $(input).data("municipio");
  if (!munic_current) return;

  selectMunicipioOption(munic_current);
  populeMunicipioData(munic_current);

  var buildMunicSelector = function (id) {
    return "#cluster-map g[data-municipio='" + id + "']";
  }

  getMunicipiosJson(function(data) {
    for (var i in data){
      $(buildMunicSelector(data[i].key)).css("fill", "#e7e8ea");
    }

    for (var i in data){
      $(buildMunicSelector(data[i].key)).css("fill", "#e7e8ea");
    }

    for (var i in data){
      if (data[i].key == munic_current) {
        for (var j in data){
          if (data[i].cluster == data[j].cluster) {
            $(buildMunicSelector(data[j].key)).css("fill", "#a1a1a1");
            $(buildMunicSelector(munic_current)).css("fill", "#ffba5a");
          }
        }
      }
    }
  });
}

function initFilterMap(input) {
// console.log();input.parent().parent().attr('id')
  var buildMunicSelector = function (id) {
    return "#filter-map g[data-municipio='" + id + "']";
  }

  var selectedValueRadio = $("input[name='options']:checked").val();
  var munic_current = $(input).data("municipio");

  selectMunicipioOption(munic_current);
  populeMunicipioData(munic_current);
  getMunicipiosJson(function (data) {
    for (var i in data){
      $(buildMunicSelector(data[i].key)).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }

    for (var i in data){
      if (data[i].key == munic_current) {
        if(selectedValueRadio == "cluster"){
          for (var j in data){
            if (data[i].cluster == data[j].cluster) {
              $(buildMunicSelector(data[j].key)).css("fill", "#a1a1a1");
              $(buildMunicSelector(munic_current)).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
            }
          }
        }else if(selectedValueRadio == "regional"){
          for (var j in data){
            if (data[i].regional == data[j].regional) {
              $(buildMunicSelector(data[j].key)).css("fill", "#2d3091");
              $(buildMunicSelector(munic_current)).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
            }
          }
        }else if(selectedValueRadio == "estadual"){
          for (var j in data){
            $(buildMunicSelector(data[j].key)).css("fill", "#a1a1a1");
            $(buildMunicSelector(munic_current)).css("fill", "#ffba5a");
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

      var keys = Object.keys(municipio);
      $(keys).each(function (i, name) {
        var value = municipio[name];
        if (isNumeric(value)) {
          $('#' + name).html(parseFloat(value).toFixed(2));
          var nValue = parseFloat(value).toFixed(1);
          if (nValue.length > 3 ||
            name === 'cpos_ian' ||
            name === 'cpos_infra' ||
            name === 'cpos_merc' ||
            name === 'cpos_caph' ||
            name === 'cpos_gestfin') {
            nValue = parseInt(nValue);
          }
          $('span[data-'+ name +']').html(nValue.toString().replace(".", ","));
        } else {
          $('#' + name).html(value);
          if (name === 'munic'){
            $('span[data-municipio]').html(municipio.munic);
          }
        }
      });

      $("span[id*='ran_']").each(function (i, e) {
        $(this).text(parseInt($(e).text()));
      });

      populateRulerValues(municipio);

    });
  }
}

function populateRulerValues(municipio) {

  var session = $('#menu-session').data('session');

  if (session === 'infraestrutura') {
    setRuler(
      municipio.cmin_infra,
      municipio.cmed_infra,
      municipio.med_infra,
      municipio.cmax_infra
    )
  } else if (session === 'pontecial de mercado' ) {
    setRuler(
      municipio.cmin_merc,
      municipio.cmed_merc,
      municipio.med_merc,
      municipio.cmax_merc
    )
  } else if (session === 'capital humano' ) {
    setRuler(
      municipio.cmin_caph,
      municipio.cmed_caph,
      municipio.med_caph,
      municipio.cmax_caph
    )
  } else if (session === 'gestão fiscal' ) {
    setRuler(
      municipio.cmin_gestfin,
      municipio.cmed_gestfin,
      municipio.med_gestfin,
      municipio.cmax_gestfin
    )
  }
}

function setRuler(menorVal, medVal, municVal, maiorVal) {
  var slider = document.getElementById('slider');

  $('#menor-val-cl').text(parseFloat(menorVal).toFixed(1));
  $('#media-val-cl').text(parseFloat(medVal).toFixed(1));
  $('#munic-val-cl').text(parseFloat(municVal).toFixed(1));
  $('#maior-val-cl').text(parseFloat(maiorVal).toFixed(1));

  var menorVal = parseFloat(menorVal).toFixed(1) * 10.0;
  var medVal = parseFloat(medVal).toFixed(1) * 20.0;
  var municVal = parseFloat(municVal).toFixed(1) * 40.0;
  var maiorVal = parseFloat(maiorVal).toFixed(1) * 60.0;

  console.log([menorVal, medVal, municVal, maiorVal])
  slider.noUiSlider.set([menorVal, medVal, municVal, maiorVal])
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function setClusterMapSelected(idMunicipio) {
  var cluster = "#cluster-map g[data-municipio='" + idMunicipio + "']";
  $(cluster).click();
}

function setFilterMapSelected(idMunicipio) {
  var filter = "#filter-map g[data-municipio='" + idMunicipio + "']";
  $(filter).click();
}

function clickFilterMap(input) {
  getMunicipiosJson(function(data) {
    var municipio = data.find(obj => {
      return obj.key === input.data('municipio');
    });

    var selectedValueRadio = $("input[name='options']:checked").val();

    if (selectedValueRadio === 'cluster') {
      // cluster
      $('#map-ian')         .html(parseFloat(municipio.ian).toFixed(1));
      $('#ranking')         .html(parseInt(municipio.cpos_ian));
      $('#infra-ranking')   .html(parseInt(municipio.cpos_infra));
      $('#infra-media')     .html(parseFloat(municipio.cmed_infra).toFixed(1));
      $('#infra-pos')       .html(parseFloat(municipio.cpos_infra).toFixed(1));
      $('#gfiscal-ranking') .html(parseInt(municipio.cpos_gestfin));
      $('#gfiscal-media')   .html(parseFloat(municipio.cmed_gestfin).toFixed(1));
      $('#gfiscal-pos')     .html(parseFloat(municipio.cpos_gestfin).toFixed(1));
      $('#pmercado-ranking').html(parseInt(municipio.cpos_merc));
      $('#pmercado-media')  .html(parseFloat(municipio.cmed_merc).toFixed(1));
      $('#pmercado-pos')    .html(parseFloat(municipio.cpos_merc).toFixed(1));
      $('#chumano-ranking') .html(parseInt(municipio.cpos_caph));
      $('#chumano-media')   .html(parseFloat(municipio.cmed_caph).toFixed(1));
      $('#chumano-pos')     .html(parseFloat(municipio.cpos_caph).toFixed(1));
    } else if (selectedValueRadio === 'regional') {
      // regional
      $('#map-ian')         .html(parseFloat(municipio.rpos_ian).toFixed(1));
      $('#ranking')         .html(parseInt(municipio.regional));
      $('#infra-ranking')   .html(parseInt(municipio.rpos_infra));
      $('#infra-media')     .html(parseFloat(municipio.rmed_infra).toFixed(1));
      $('#infra-pos')       .html(parseFloat(municipio.rpos_infra).toFixed(1));
      $('#gfiscal-ranking') .html(parseInt(municipio.rpos_gestfin));
      $('#gfiscal-media')   .html(parseFloat(municipio.rmed_gestfin).toFixed(1));
      $('#gfiscal-pos')     .html(parseFloat(municipio.rpos_gestfin).toFixed(1));
      $('#pmercado-ranking').html(parseInt(municipio.rpos_merc));
      $('#pmercado-media')  .html(parseFloat(municipio.rmed_merc).toFixed(1));
      $('#pmercado-pos')    .html(parseFloat(municipio.rpos_merc).toFixed(1));
      $('#chumano-ranking') .html(parseInt(municipio.rpos_caph));
      $('#chumano-media')   .html(parseFloat(municipio.rmed_caph).toFixed(1));
      $('#chumano-pos')     .html(parseFloat(municipio.rpos_caph).toFixed(1));
    } else {
      // estadual
      $('#map-ian')         .html(parseFloat(municipio.med_ian).toFixed(1));
      $('#ranking')         .html(parseInt(municipio.pos_ian));
      $('#infra-ranking')   .html(parseInt(municipio.pos_ian));
      $('#infra-media')     .html(parseFloat(municipio.med_infra).toFixed(1));
      $('#infra-pos')       .html(parseFloat(municipio.pos_ian).toFixed(1));
      $('#gfiscal-ranking') .html(parseInt(municipio.pos_ian));
      $('#gfiscal-media')   .html(parseFloat(municipio.med_gestfin).toFixed(1));
      $('#gfiscal-pos')     .html(parseFloat(municipio.pos_ian).toFixed(1));
      $('#pmercado-ranking').html(parseInt(municipio.pos_ian));
      $('#pmercado-media')  .html(parseFloat(municipio.med_merc).toFixed(1));
      $('#pmercado-pos')    .html(parseFloat(municipio.pos_ian).toFixed(1));
      $('#chumano-ranking') .html(parseInt(municipio.pos_ian));
      $('#chumano-media')   .html(parseFloat(municipio.med_caph).toFixed(1));
      $('#chumano-pos')     .html(parseFloat(municipio.pos_ian).toFixed(1));
    }
  });
}

function buildMembrosCluster(input) {
  var idMunicipio = $(input).val() || $(input).data('municipio');

  if (idMunicipio) {
    getMunicipiosJson(function(data) {
      var selected = data.find(munic => {
        return munic.key === idMunicipio
      });
      var cClusters = data.map(function (munic) {
        if (munic.cluster === selected.cluster) {
          return munic;
        }
      }).filter(function(item) {
        return item != undefined
      });

      $('#membros-cluster').empty();
      var ul = document.createElement('ul');
      ul.classList.add('list-group', 'list-group-flush');
      $(cClusters).each(function(i,item) {
        var li = document.createElement('li');
        li.classList.add('list-group-item');
        $(li).html(item.munic);
        $(ul).append(li);
        $('#membros-cluster').append(ul);
      });
    });
  }
}

function populateTexts(data) {
  var municipioSelected = $(".cc-select-municipio").val();
  var municipio
  if (municipioSelected) {
    municipio = data.find(obj => {
      return obj.key === municipioSelected
    });
  } else {
    municipio = data[0];
  }

  var keys = Object.keys(municipio);
  $(keys).each(function (i, name) {
    $('.'+ name).html(municipio[name]);
  });

  var session = $('#menu-session').data('session');
  var texto1 = $('.texto1');
  var texto2 = $('.texto2');
  if (session === 'infraestrutura') {
    texto1.html(municipio['texto1_infra']);
    texto2.html(municipio['texto2_infra']);
  }
  if (session === 'pontecial de mercado') {
    texto1.html(municipio['texto1_potencial_de_mercado']);
    texto2.html(municipio['texto2_potencial_de_mercado']);
  }
  if (session === 'capital humano') {
    texto1.html(municipio['texto1_capital_humano']);
    texto2.html(municipio['texto2_capital_humano']);
  }
  if (session === 'gestão fiscal') {
    texto1.html(municipio['texto1_gestao_fiscal']);
    texto2.html(municipio['texto2_gestao_fiscal']);
  }
}

$(document).ready(function() {
  getMunicipiosJson(initMunicipioSelect);
  getMunicipiosJson(populateTexts);

  $(".cc-select-municipio").on('change', function () {
    var that = $(this)
    $(".cc-select-municipio").each(function (i, input) {
      $(input).val(that.val());
    });
    populeMunicipioData(that.val());
    setClusterMapSelected(that.val());
    setFilterMapSelected(that.val());
    buildMembrosCluster(that);
  });

  $("g[data-municipio]").on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var input = $(this);
    initClusterMap(input);
    initFilterMap(input);
    clickFilterMap(input);
    buildMembrosCluster(input);

  });

  $("#radio").on('change', function () {
    getMunicipiosJson(function (data) {
      for (var i in data){
        $("#filter-map g[data-municipio='" + data[i].key + "']").css("fill", "#e7e8ea");
        $("#agrupamentos").find('li').remove();
      }
    });
  });

  $('a[data-toggle="pill"]').on('click', function (e) {
    var idMunicipio = $(".cc-select-municipio").val();
    populeMunicipioData(idMunicipio);
    getMunicipiosJson(populateTexts);
  });

  setTimeout(function () {
    var input = $(".cc-select-municipio")
    input.val('vitoria');
    populeMunicipioData('vitoria');
    setClusterMapSelected('vitoria');
    setFilterMapSelected('vitoria');
    buildMembrosCluster(input[0]);
  }, 1000);
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
