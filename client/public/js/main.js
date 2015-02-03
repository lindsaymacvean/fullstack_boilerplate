
//JQUERY stuff
$.delete = function(url, data, callback, type){
  if ( $.isFunction(data) ){
    type = type || callback,
        callback = data,
        data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'DELETE',
    success: callback,
    data: data,
    contentType: type
  });
};

$.clearInput = function () {
        $('form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Socket Io listening for updates from the server
var socket = io();

socket.on('api_update', function (val) {
  $('#apiStatus').find('#'+val.type)
    .html(val.value+'/'+val.limit+'<br>');
});