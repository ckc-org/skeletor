<monster>
<!--    <h1>{mon.monsterName}</h1>
    <p>{mon.family}</p>
    <p>{mon.element}</p>
    <p>{mon.description}</p>-->

    <div class="container">
        <div class="row">
          <div class="col-sm-6 col-lg-4">
                <!-- Card Flip -->
            <div class="card-flip {monster-flip: flipped}" onclick={flipme} >
                <div class="front">
                  <!-- front content -->
                  <div class="card monster-card">
                      <div class="card-body">

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
                </div>


                <div class="back">
                   <div class="card monster-card">
                     <div class="card-body">
                       <h1>Attack</h1>
                     </div>
                   </div>
                  <!-- back content -->

                </div>
            </div>
                <!-- End Card Flip -->
          </div>
        </div>
      </div>

    <script>
        var self = this;
        this.mon = this.opts.mon

        self.flipped = false;

          self.flipme = function(){
            console.log("hey i've been clicked, wahoo")
             self.flipped = !self.flipped
             console.log(self.flipped)
          }

    </script>
<style>
  .card-footer {
    position: relative;
    width: 100%;
    bottom: 0px;
    }
  .logo {
    position: relative;
    top: 2px;
    left: 5px;
  }

  .card-flip {


  }

  .card-flip,
  .front,
  .back {
    perspective: 1000px;
    width: 300px;
    height: 560px;
    transition: 0.6s;
  }

  .monster-card {
    height: 500px;
    margin-top: 1em;
  }

  .monster-flip {
  transform: rotateY(180deg);
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


  }

  .back {
  transform: rotateY(180deg);

  }

  .fire {
    background-color: red:
  }

</style>

</monster>
