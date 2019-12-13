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
                                <div class="row text-center align-middle">
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

                                <div class="text-center" each={atk in mon.attacks}>
                                    <div class="row attack-header row-center  {atk.element}">
                                        <div>{atk.name}</div>
                                        <div>{atk.element}<img class="attack-image" src="{atk.image}"></div>
                                    </div>
                                    <div class="row-center">{atk.description}</div>


                                </div>






                            </div>
                            <!-- back content -->
                        </div>
                    </div>
                    <!-- End Card Flip -->
                </div>
            </div>
        </div>
    </div>
    <script>
        var self = this;
        self.mon = self.opts.mon

        self.flipped = false;

        self.flipme = function(){
            console.log(self.mon.attack)
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

        .card-body {
            background-color: rgba(0,0,0,.03);
        }

        .h-divider{
            margin-top:5px;
            margin-bottom:10px;
            height:1px;
            width:100%;
            border-top:1px solid #000000;
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

        .Arcane {
            background-color: red
        }

        .attack-header{
            /*background-color: grey;*/
            display: block;
            margin: 0px -22px 0px -22px;
        }

        .row-center{
            position: relative;
            top: -21px;
            height: 62px;
        }

        .attack-image{
            position: relative;
            top: 3px;
            left: 10px;
        }
    </style>

</monster>
