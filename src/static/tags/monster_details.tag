<monster>
<!--    <h1>{mon.monsterName}</h1>
    <p>{mon.family}</p>
    <p>{mon.element}</p>
    <p>{mon.description}</p>-->

    <div class="card monster-card" style="width: 18rem;">
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

    <script>
        var self = this;
        this.mon = this.opts.mon

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
</style>

</monster>
