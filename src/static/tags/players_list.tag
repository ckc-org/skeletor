<players_list>
 <div class="container">
   <table class="table text-center">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Joined</th>
      <th scope="col">Monster count</th>

    </tr>
  </thead>
  <tbody>
    <tr each='{player in players}'>
      <td>{player.id}</td>
      <td>{player.name}</td>
      <td>{player.lifespan}</td>
      <td>{player.binding.length}</td>

    </tr>
  </tbody>
  </table>
 </div>


  <script>

      var self = this;
      self.players = {}

      self.on('mount', function(){
        console.log('we both are nerds')
        get_players_list();
      })

      var get_players_list = function(){
        CLIENT.api.get_players_list()
        .done(function(players){
            self.players = players
        })
        .fail(function(error){
            console.log('Error ==', error)
        })
        .always(function(){
            self.update()
        })
      }


  </script>
</players_list>
