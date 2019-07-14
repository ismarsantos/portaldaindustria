
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

  getMunicipiosJson(function(data) {
    var municipio = data.find(obj => {
      return obj.key === idMunicipio
    });

    if (municipio) {
      // $('img#mapa-json').attr("src","assets/img/mapa-cluster-" + municipio.key + ".png");
      populateMainRulerValues(municipio);

      var keys = Object.keys(municipio);
      
      $(keys).each(function (i, keyName) {
        buildSubSliderRuler(keyName);
        setSubSliderRuler(keyName, municipio);
      });

      $(keys).each(function (i, name) {
        var value = municipio[name];
        if (isNumeric(value)) {
          $('#' + name).html(parseFloat(value).toFixed(2));
          var nValue = parseFloat(value).toFixed(1);
          var prefix = name.toString().split('_')[0];
          if (prefix === 'cpos'){
            nValue = parseInt(nValue).toString() + '\u00BA';
          }
          $('span[data-'+ name +']').html(nValue.replace(".", ","));
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
    }
  });
}

function populateMainRulerValues(municipio) {

  var session = $('#menu-session').data('session');

  if (session === 'infraestrutura') {
    setMainRuler(
      municipio.cmin_infra,
      municipio.cmed_infra,
      municipio.infra,
      municipio.cmax_infra
    )
  } else if (session === 'pontecial de mercado' ) {
    setMainRuler(
      municipio.cmin_merc,
      municipio.cmed_merc,
      municipio.merc,
      municipio.cmax_merc
    )
  } else if (session === 'capital humano' ) {
    setMainRuler(
      municipio.cmin_caph,
      municipio.cmed_caph,
      municipio.caph,
      municipio.cmax_caph
    )
  } else if (session === 'gestão fiscal' ) {
    setMainRuler(
      municipio.cmin_gestfin,
      municipio.cmed_gestfin,
      municipio.gestfin,
      municipio.cmax_gestfin
    )
  }
}

function setMainRuler(menorVal, medVal, municVal, maiorVal) {
  var mainslider = document.getElementById('main-slider');

  $('#menor-val-cl').text(parseFloat(menorVal).toFixed(1));
  $('#media-val-cl').text(parseFloat(medVal).toFixed(1));
  $('#munic-val-cl').text(parseFloat(municVal).toFixed(1));
  $('#maior-val-cl').text(parseFloat(maiorVal).toFixed(1));

  var menorVal = parseFloat(menorVal).toFixed(1);
  var medVal = parseFloat(medVal).toFixed(1);
  var municVal = parseFloat(municVal).toFixed(1);
  var maiorVal = parseFloat(maiorVal).toFixed(1);

  // console.log([menorVal, medVal, municVal, maiorVal]);
  mainslider.noUiSlider.set([menorVal, medVal, municVal, maiorVal]);
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
  if (input) {
    getMunicipiosJson(function(data) {
      var municipio = data.find(obj => {
        return obj.key === input.data('municipio');
      });

      var selectedValueRadio = $("input[name='options']:checked").val();

      if (selectedValueRadio === 'cluster') {
        // cluster
        setFilterMapValues(
          municipio.ian,
          municipio.cpos_ian,
          municipio.cpos_infra,
          municipio.cmed_infra,
          municipio.infra,
          municipio.cpos_gestfin,
          municipio.cmed_gestfin,
          municipio.gestfin,
          municipio.cpos_merc,
          municipio.cmed_merc,
          municipio.merc,
          municipio.cpos_caph,
          municipio.cmed_caph,
          municipio.caph)
      } else if (selectedValueRadio === 'regional') {
        // regional
        setFilterMapValues(
          municipio.rpos_ian,
          municipio.regional,
          municipio.rpos_infra,
          municipio.rmed_infra,
          municipio.infra,
          municipio.rpos_gestfin,
          municipio.rmed_gestfin,
          municipio.gestfin,
          municipio.rpos_merc,
          municipio.rmed_merc,
          municipio.merc,
          municipio.rpos_caph,
          municipio.rmed_caph,
          municipio.caph)
      } else {
        // estadual
        setFilterMapValues(
          municipio.med_ian,
          municipio.pos_ian,
          municipio.pos_ian,
          municipio.med_infra,
          municipio.ian,
          municipio.pos_ian,
          municipio.med_gestfin,
          municipio.ian,
          municipio.pos_ian,
          municipio.med_merc,
          municipio.ian,
          municipio.pos_ian,
          municipio.med_caph,
          municipio.ian)
      }
    });
  }
}

function setFilterMapValues(
  ian,
  ranking,
  infraRanking,
  infraMedia,
  infraPos,
  gfiscalRanking,
  gfiscalMedia,
  gfiscalPos,
  pmercadoRanking,
  pmercadoMedia,
  pmercadoPos,
  chumanoRanking,
  chumanoMedia,
  chumanoPos
) {
  // if (params) {
    $('#map-ian')         .html(parseFloat(ian).toFixed(1));
    $('#ranking')         .html(parseInt(ranking));
    $('#infra-ranking')   .html(parseInt(infraRanking).toString() + '\u00BA');
    $('#infra-media')     .html(parseFloat(infraMedia).toFixed(1));
    $('#infra-pos')       .html(parseFloat(infraPos).toFixed(1));
    $('#gfiscal-ranking') .html(parseInt(gfiscalRanking).toString() + '\u00BA');
    $('#gfiscal-media')   .html(parseFloat(gfiscalMedia).toFixed(1));
    $('#gfiscal-pos')     .html(parseFloat(gfiscalPos).toFixed(1));
    $('#pmercado-ranking').html(parseInt(pmercadoRanking).toString() + '\u00BA');
    $('#pmercado-media')  .html(parseFloat(pmercadoMedia).toFixed(1));
    $('#pmercado-pos')    .html(parseFloat(pmercadoPos).toFixed(1));
    $('#chumano-ranking') .html(parseInt(chumanoRanking).toString() + '\u00BA');
    $('#chumano-media')   .html(parseFloat(chumanoMedia).toFixed(1));
    $('#chumano-pos')     .html(parseFloat(chumanoPos).toFixed(1));
  // }
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

function buildSubSliderRuler(keyName) {
  var slider = document.getElementById('slider_' + keyName);

  if (slider && !slider.classList.contains('noUi-target')) {

    noUiSlider.create(slider, {
      start: [30.5, 60.5],
      behaviour: 'unconstrained-tap',
      range: {
        'min': [0.0],
        'max': [99.0]
      }
    });
  
    slider.setAttribute('disabled', true);
  
    var media = document.createElement('span');
    media.innerHTML = "Média do Cluster";
  
    var municipio = document.createElement('span');
    municipio.innerHTML = "Vitória";
    municipio.setAttribute('data-municipio', 'Vitória');
  
    media.classList.add('cc-legenda-cluster', 'cc-cor-cinza');
    municipio.classList.add('cc-legenda-cluster', 'cc-cor-marrom', 'cc-municipio');

    var selector = '#slider_' + keyName + ' .noUi-handle';
  
    $($(selector)[0]).parent().prepend(media);
    $($(selector)[1]).parent().prepend(municipio);
  
    // TODO: remover indicadores fundo preto 
    $(selector).each(function () {
      this.style = 'background-color: black;';
    });
  
    var mediaValor = document.createElement('span');
    mediaValor.id = "med_" + keyName;
  
    var municipioValor = document.createElement('span');
    municipioValor.id = keyName;
  
    mediaValor.classList.add('cc-valor', 'cc-color-cinza');
    municipioValor.classList.add('cc-valor', 'cc-color-marrom', 'cc-valor-municipio');
  
    $($(selector)[0]).parent().append(mediaValor);
    $($(selector)[1]).parent().append(municipioValor);
  }
}

function setSubSliderRuler(keyName, objMunic) {
  var slider = document.getElementById('slider_' + keyName);
  if (slider) {
    var keyMedia = 'med_' + keyName;
    slider.noUiSlider.set([objMunic[keyMedia], objMunic[keyName]]);
  }
  
}

function buildMainSliderRuler() {
  var slider = document.getElementById('main-slider');

  noUiSlider.create(slider, {
    start: [2.0, 4.0, 6.0, 8.0],
    behaviour: 'unconstrained-tap',
    range: {
      'min': [0.0],
      'max': [10.0]
    }
  });

  slider.setAttribute('disabled', true);

  var menor = document.createElement('span');
  menor.innerHTML = "Menor do Cluster";

  var media = document.createElement('span');
  media.innerHTML = "Média do Cluster";

  var municipio = document.createElement('span');
  municipio.innerHTML = "Vitoria";
  municipio.setAttribute('data-municipio', 'Vitoria');

  var maior = document.createElement('span');
  maior.innerHTML = "Maior do Cluster";

  menor.classList.add('cc-legenda-cluster', 'cc-cor-roxo');
  media.classList.add('cc-legenda-cluster', 'cc-cor-cinza');
  municipio.classList.add('cc-legenda-cluster', 'cc-cor-marrom', 'cc-municipio');
  maior.classList.add('cc-legenda-cluster', 'cc-cor-roxo');

  var selector = '#main-slider .noUi-handle';

  $($(selector)[0]).parent().prepend(menor);
  $($(selector)[1]).parent().prepend(media);
  $($(selector)[2]).parent().prepend(municipio);
  $($(selector)[3]).parent().prepend(maior);

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

  $($(selector)[0]).parent().append(menorValor);
  $($(selector)[1]).parent().append(mediaValor);
  $($(selector)[2]).parent().append(municipioValor);
  $($(selector)[3]).parent().append(maiorValor);
}

$(document).ready(function() {
  buildMainSliderRuler();
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

  $(".cc-custom-radio").on('click', function () {
    setFilterMapSelected($(".cc-select-municipio").val())
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
