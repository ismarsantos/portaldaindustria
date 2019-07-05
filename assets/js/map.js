function init(){
  $(document).ready(function(){
    $.ajax({
      url: "https://raw.githubusercontent.com/kleytonmr/ES-municipios/master/munic/banco.min.json?token=AHNGKJ76U73FCUWASQXOPAK5DHRMY",
      dataType: "json",
      success: function(data){
        $(data.municipios).each(function(index,value){
          var $select = $('#list-munic');  
          $select.append('<option value=' + value.key + '>' + value.munic + '</option>');
        });
        selected(data.municipios)
        clicked(data.municipios)
      }
    });
  });
}

function selected(data){
  var selectedValueRadio;
  $("#radio").on('change', function () {
    selectedValueRadio = $("input[name='options']:checked").val();
    $('#list-munic option:first').prop('selected', true);
    for (var i in data){
      $("#" + data[i].key).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }
    console.log(selectedValueRadio);
  });

  $('#list-munic').on('change', function() {
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
          alert("Escolha um grupo primeiro!")
        }
      }
    }
  });
}

function clicked(data){
  var selectedValueRadio;
  $("#radio").on('change', function () {
    selectedValueRadio = $("input[name='options']:checked").val();
    $('#list-munic option:first').prop('selected', true);
    for (var i in data){
      $("#" + data[i].key).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }
    console.log(selectedValueRadio);
  });

  $('g').on('click', function() {
    var munic_current = $(this).attr("id")
    $("#list-munic").val($(this).attr("id")).change();
    console.log(munic_current)

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
          alert("Escolha um grupo primeiro!")
        }
      }
    }
  });
}

init();





