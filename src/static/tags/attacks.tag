<attacks>
  <div class="container">

    <table class="table text-center">
      <h4>Attacks</h4>
      <input class="monster_search" placeholder="Search by Element" type="text" value=''>
   <thead>

     <tr>
       <th scope="col">Id</th>
       <th scope="col">Name</th>
       <th scope="col">Element</th>
       <th scope="col">Description</th>

     </tr>
   </thead>
   <tbody>
     <tr each='{attack in attacks}'>
       <td>{attack.id}</td>
       <td>{attack.name}</td>
       <td><img src="{attack.image}">{attack.element}</td>
       <td>{attack.description}</td>

     </tr>
   </tbody>
   </table>
  </div>

  <script>
  var self = this
  self.attacks = {}

  self.on('mount', function(){
      get_attacks();
      $('.monster_search').on('change', function(){
        filterMonsters();
      })
  })


  var get_attacks = function(){
      CLIENT.api.get_attacks()
          .done(function(attacks){
              self.attacks = attacks
          })
          .fail(function(error){
              console.log("Errors == " + error)
              console.log(error)
          })
          .always(function(){
              self.update()
          })
  }
  var filterMonsters = function(){
   console.log($('.monster_search')[0].value)
   CLIENT.api.get_attacks_by_type($('.monster_search')[0].value)
     .done(function(attacks){
         self.attacks = attacks
     })
     .fail(function(error){
         console.log("Errors == " + error)
         console.log(error)
         alert(error.responseJSON)
     })
     .always(function(){
         self.update()
     })
   }






  </script>

</attacks>
