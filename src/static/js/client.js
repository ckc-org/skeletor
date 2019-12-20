var CLIENT = {}

CLIENT.URLS = []
CLIENT.events = riot.observable()
CLIENT.state = {}

CLIENT.api = {
    request: function(method, url, data) {
        if(method.toLowerCase() !== "get"){
            data = JSON.stringify(data)
        }
        return $.ajax({
            type: method,
            url: url,
            data: data,
            contentType: "application/json",
            dataType: 'json'
        })
    },
/*            Monsters                             */
    get_monsters: function(){
        return CLIENT.api.request('GET', '/api/bindings/')
    },
    get_monattacks: function(pk){
      return CLIENT.api.request('GET', '/api/bindings/' + pk + '/')
    },

    get_players_list: function(pk){
      return CLIENT.api.request('GET', '/api/players/get_players_list/')
    },
    get_player: function(pk){
        return CLIENT.api.request('GET', '/api/players/' + pk + '/get_player/')
    },
    pick_monster: function(pk){
      return CLIENT.api.request("PUT", "/api/bindings/" + pk + "/pick_monster/")
    },
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({

    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
