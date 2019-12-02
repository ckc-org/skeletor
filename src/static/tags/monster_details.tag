<monster>
<!--    <h1>{mon.monsterName}</h1>
    <p>{mon.family}</p>
    <p>{mon.element}</p>
    <p>{mon.description}</p>-->

    <div class="card monster-card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{mon.monsterName}</h5>
        <img class="card-img-top " src="#" alt="Card image cap">
            <p class="card-text">{mon.description}</p>
        <div class="card-footer text-muted">
          <div class="row text-center">
             <div class="col">{mon.family}</div>
             <div class="col-xs-2 v-divider"></div>
             <div class="col">{mon.element}</div>

          </div>
        </div>
      </div>
    </div>

    <script>
        var self = this;
        this.mon = this.opts.mon
        console.log("Mounted")

    </script>


</monster>
