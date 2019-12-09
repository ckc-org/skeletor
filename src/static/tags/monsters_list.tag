<monsters_list>
 <div class="card-deck">
    <monster each="{monster in monsters}" mon="{monster}"></monster>
  </div>


    <script>
        var self = this;
        self.monsters = {}
        self.on('mount', function(){
            get_monsters();
        })

        var get_monsters = function(){
            CLIENT.api.get_monsters()
                .done(function(monsters){
                    console.log("Monsters == " + monsters)
                    for(var i = 0; i < monsters.length; i++){
                        console.log(monsters[i])
                    }
                    self.monsters = monsters
                })
                .fail(function(error){
                    console.log("Errors == " + error)
                })
                .always(function(){
                    self.update()
                })
        }
    </script>
</monsters_list>
