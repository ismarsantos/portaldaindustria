
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
          if (nValue.length > 3) {
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

      populateRulerValues(data, municipio);

    });
  }
}

function populateRulerValues(data, municipio) {

  var session = $('#menu-session').data('session');

  if (session === 'infraestrutura') {
    $('#menor-val-cl').text(parseFloat(municipio.cmin_infra).toFixed(1));
    $('#media-val-cl').text(parseFloat(municipio.cmed_infra).toFixed(1));
    $('#munic-val-cl').text(parseFloat(municipio.med_infra).toFixed(1));
    $('#maior-val-cl').text(parseFloat(municipio.cmax_infra).toFixed(1));
  } else if (session === 'pontecial de mercado' ) {
    $('#menor-val-cl').text(parseFloat(municipio.cmin_merc).toFixed(1));
    $('#media-val-cl').text(parseFloat(municipio.cmed_merc).toFixed(1));
    $('#munic-val-cl').text(parseFloat(municipio.med_merc).toFixed(1));
    $('#maior-val-cl').text(parseFloat(municipio.cmax_merc).toFixed(1));
  } else if (session === 'capital humano' ) {
    $('#menor-val-cl').text(parseFloat(municipio.cmin_caph).toFixed(1));
    $('#media-val-cl').text(parseFloat(municipio.cmed_caph).toFixed(1));
    $('#munic-val-cl').text(parseFloat(municipio.med_caph).toFixed(1));
    $('#maior-val-cl').text(parseFloat(municipio.cmax_caph).toFixed(1));
  } else if (session === 'Gestão fiscal' ) {
    $('#menor-val-cl').text(parseFloat(municipio.cmin_gestfin).toFixed(1));
    $('#media-val-cl').text(parseFloat(municipio.cmed_gestfin).toFixed(1));
    $('#munic-val-cl').text(parseFloat(municipio.med_gestfin).toFixed(1));
    $('#maior-val-cl').text(parseFloat(municipio.cmax_gestfin).toFixed(1));
  }
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
      $('#ian')             .html(municipio.ian);
      $('#ranking')         .html(municipio.cpos_ian);
      $('#infra-ranking')   .html(municipio.cpos_infra);
      $('#infra-media')     .html(municipio.cmed_infra);
      $('#infra-pos')       .html(municipio.cpos_infra);
      $('#gfiscal-ranking') .html(municipio.cpos_gestfin);
      $('#gfiscal-media')   .html(municipio.cmed_gestfin);
      $('#gfiscal-pos')     .html(municipio.cpos_gestfin);
      $('#pmercado-ranking').html(municipio.cpos_merc);
      $('#pmercado-media')  .html(municipio.cmed_merc);
      $('#pmercado-pos')    .html(municipio.cpos_merc);
      $('#chumano-ranking') .html(municipio.cpos_caph);
      $('#chumano-media')   .html(municipio.cmed_caph);
      $('#chumano-pos')     .html(municipio.cpos_caph);
    } else if (selectedValueRadio === 'regional') {
      // regional
      $('#ian')             .html(municipio.rpos_ian);
      $('#ranking')         .html(municipio.regional);
      $('#infra-ranking')   .html(municipio.rpos_infra);
      $('#infra-media')     .html(municipio.rmed_infra);
      $('#infra-pos')       .html(municipio.rpos_infra);
      $('#gfiscal-ranking') .html(municipio.rpos_gestfin);
      $('#gfiscal-media')   .html(municipio.rmed_gestfin);
      $('#gfiscal-pos')     .html(municipio.rpos_gestfin);
      $('#pmercado-ranking').html(municipio.rpos_merc);
      $('#pmercado-media')  .html(municipio.rmed_merc);
      $('#pmercado-pos')    .html(municipio.rpos_merc);
      $('#chumano-ranking') .html(municipio.rpos_caph);
      $('#chumano-media')   .html(municipio.rmed_caph);
      $('#chumano-pos')     .html(municipio.rpos_caph);
    } else {
      // estadual
      $('#ian')             .html(municipio.med_ian);
      $('#ranking')         .html(municipio.pos_ian);
      $('#infra-ranking')   .html(municipio.pos_ian);
      $('#infra-media')     .html(municipio.med_infra);
      $('#infra-pos')       .html(municipio.pos_ian);
      $('#gfiscal-ranking') .html(municipio.pos_ian);
      $('#gfiscal-media')   .html(municipio.med_gestfin);
      $('#gfiscal-pos')     .html(municipio.pos_ian);
      $('#pmercado-ranking').html(municipio.pos_ian);
      $('#pmercado-media')  .html(municipio.med_merc);
      $('#pmercado-pos')    .html(municipio.pos_ian);
      $('#chumano-ranking') .html(municipio.pos_ian);
      $('#chumano-media')   .html(municipio.med_caph);
      $('#chumano-pos')     .html(municipio.pos_ian);
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

$(document).ready(function() {
  getMunicipiosJson(initMunicipioSelect);

  $(".cc-select-municipio").on('change', function () {
    var that = $(this)
    $(".cc-select-municipio").each(function (i, input) {
      $(input).val(that.val());
    });
    populeMunicipioData(that.val());
    setClusterMapSelected(that.val());
    setFilterMapSelected(that.val());
    buildMembrosCluster(that)
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
