<script>
  import { version, setPage, page } from "./store.js";
  export let button = {
    icon: "fas fa-arrow-circle-left",
    caption: "Back",
    callback: () => setPage("main")
  };
</script>

<style>
  .flex-justify-center {
    justify-content: center !important;
    display: flex !important;
  }
</style>

<div class="hero-head">
  <nav class="navbar">
    <div class="container flex-justify-center">
      <div class="navbar-brand">

        <div class="navbar-item">
          <div class="container is-centered">

            <button
              class="button is-primary is-inverted is-outlined"
              on:click={button.callback}>
              <span class="icon">
                <i class={button.icon} />
              </span>
              <span>{button.caption}</span>
            </button>
          </div>
        </div>
        <div class="navbar-item">
          <img src="icon.png" alt="Logo" />
        </div>

        <div class="navbar-item">
          <h1 class="title">Pomodolfo</h1>
        </div>
        <div class="navbar-item">
          <h2
            on:click={() => setPage('about')}
            class="subtitle is-6"
            style="cursor: pointer;">
            Version {$version}
          </h2>
        </div>
      </div>
    </div>
  </nav>
</div>
