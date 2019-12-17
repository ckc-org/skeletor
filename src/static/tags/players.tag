<players>
  <div class="container player-container text-center">
    <h1>Name:{player.name}</h1>
    <h1>Full Party:{player.full_party}</h1>
    <h1>Joined:{player.lifespan}</h1>
    <div class="card-deck">
      <monster each="{mon in player.binding}" mon="{mon}"></monster>
    </div>
  </div>


    <script>
    var self = this;
    self.player = {}
    self.id = self.opts.id

    self.on('mount', function(){
        get_player(self.id);
    })


    var get_player = function(pk){
        console.log(pk)
        CLIENT.api.get_player(pk)
            .done(function(player){
                self.player = player
                console.log(player)
            })
            .fail(function(error){
                console.log("Errors == " + error)
            })
            .always(function(){
                self.update()
            })
    }
    CLIENT.events.on('monster_selected', function(){
      console.log("Received event");
        get_player(self.id);
    })

    </script>


<style>
.player-container {
  background-color: #86d8d0;
  padding: 15px 0 0 0;
}

.player-container p {
  margin-top: 10px;
}

</style>


</players>
