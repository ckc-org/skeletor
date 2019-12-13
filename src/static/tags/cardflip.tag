<cardflip>

  <div class="container">
  		<div class="row">
  			<div class="col-sm-6 col-lg-4">
          		<!-- Card Flip -->
  				<div class="card-flip {monster-flip: flipped}" >
  						<div class="front">
  							<!-- front content -->
  							<div class="card monster-card" onclick={flipme}>
                    <h5 class="card-title text-center">{mon.monsterName}</h5>
                    <img class="card-img-top " src="{mon.image}" alt="Card image cap">
                        <p class="card-text">{mon.description}</p>

  							</div>

                <div class="card-footer text-muted">
                  <div class="row text-center">
                     <div class="col">{mon.family}</div>
                     <div class="col-xs-2 v-divider"></div>
                     <div class="col">{mon.element}<img class="logo" src="{mon.element_logo}"></div>

                  </div>
                </div>
  						</div>
  						<div class="back">
  							<!-- back content -->
  							<div class="card" onclick={flipme}>

  							</div>
  						</div>
  				</div>
          		<!-- End Card Flip -->
  			</div>
  		</div>
  	</div>

<script>

 var self = this;
 self.flipped = false;


   self.flipme = function(){
      self.flipped = !self.flipped
      console.log(self.flipped)
   }

</script>

<style>

.card-flip {
perspective: 1000px;

}

.card-flip,
.front,
.back {
width: 100%;
height: 480px;

}

.monster-flip {
  transform: rotateY(180deg);
  transition: 0.6s;
transform-style: preserve-3d;
position: relative;

}


.front,
.back {
backface-visibility: hidden;
position: absolute;
top: 0;
left: 0;
}

.front {
z-index: 2;
transform: rotateY(0deg);
transition: 0.6s;

}

.back {
transform: rotateY(180deg);

}

.fire {
  background-color: red:
}

</style>


</cardflip>
