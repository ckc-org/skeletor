<monster_list>

    <div each="{monster in monsters}">
        <h1>{monster.monsterName}</h1>
        <p>{monster.family}</p>
        <p>{monster.element}</p>
        <p>{monster.description}</p>
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
                    console.log(monsters)
                    self.monsters = monsters
                })
                .fail(function(error){
                    console.log(error)
                })
                .always(function(){
                    self.update()
                })
        }
    </script>


</monster_list>