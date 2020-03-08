<script>
  import { slide, fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { activeMode, timer, page } from "./store";
  import About from "./About.svelte";
  let read = false;
  function readNotification() {
    read = !read;
  }

  function setPage() {
    console.log("sadas");
    page.set("about");
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    word-break: keep-all;
  }

  .hero-body > .columns {
    width: 100%;
  }
</style>

<main>
  {#if $page === 'main'}
    <section class="hero is-dark is-fullheight">
      <div class="hero-body ">
        <div class="columns is-vcentered has-text-centered ">
          <div class="column is-centered ">
            <div class="buttons has-addons is-centered">
              <button class="button is-outlined is-white">
                <span class="icon is-small">
                  <i class="fas fa-play" />
                </span>
                <span>Play</span>

              </button>
              <button class="button is-outlined is-white">
                <span class="icon is-small">
                  <i class="fas fa-pause" />
                </span>
                <span>Pause</span>

              </button>
              <button class="button is-outlined is-white">
                <span class="icon is-small">
                  <i class="fas fa-sync" />
                </span>
                <span>Restart</span>

              </button>
            </div>
          </div>

          <div class="column is-one-quarter">

            <p class="title is-3 ">{$activeMode.name}</p>
            <p class="subtitle is-5 ">25:00</p>
            <progress class="progress is-primary" value="15" max="100">
              15%
            </progress>
            <p class="heading">Next:</p>
          </div>
          <div class="column">
            <div class="buttons has-addons is-centered">
              <button class="button is-outlined is-white">
                <span class="icon is-small">
                  <i class="fas fa-clock" />
                </span>
                <span>Pomodoro</span>

              </button>
              <button class="button is-outlined is-white">
                <span class="icon is-small">
                  <i class="fas fa-walking" />
                </span>
                <span>Short Break</span>

              </button>
              <button class="button is-outlined is-white" on:click={setPage}>
                <span class="icon is-small">
                  <i class="fas fa-coffee" />
                </span>
                <span>Long Break</span>

              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  {:else}
    <About />
  {/if}

  <!-- 
  <section class="section has-background-info flex-grow ">
    <div class="container" />
    <div class="container">
      <h1 class="title">History</h1>

    </div>
  </section> -->

</main>
