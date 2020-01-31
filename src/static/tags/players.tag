<players>
  <div class="container player-container text-center">
    <h1>Name:{player.name}</h1>
    <h1>Full Party:{player.full_party}</h1>
    <h1>Joined:{player.lifespan}</h1>
    <div class="card-deck">
      <monster_detail each="{mon in player.binding}" mon="{mon}" full_party="{player.full_party}"></monster_detail>
    </div>
      <a href='/accounts/login'><button type="submit" class="btn btn-secondary btn-lg login">Logout</button></a>
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
            })
            .fail(function(error){
                console.log("Errors == " + error)
            })
            .always(function(){
                self.update()
            })
    }
    CLIENT.events.on('pick_monster', function(){
        get_player(self.id)
    })
    </script>
</players>
