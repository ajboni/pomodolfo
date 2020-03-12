<script>
  import { slide, fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import {
    activeMode,
    page,
    status,
    setMode,
    startTimer,
    pauseTimer,
    restartTimer,
    clock,
    stringClock,
    nextMode,
    setModeManual,
    version,
    setPage,
    percentDone
  } from "./store";
  import { longBreak, pomodoro, shortBreak } from "./modes";
  import About from "./About.svelte";
  import Settings from "./Settings.svelte";
  import Nav from "./Nav.svelte";

  setPage("settings");
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

  .flex-justify-center {
    justify-content: center !important;
    display: flex !important;
  }
</style>

<main class="has-background-dark">
  {#if $page === 'main'}
    <section
      out:fade={{ delay: 100 }}
      in:fade={{ delay: 600 }}
      class="hero is-dark is-fullheight">

      <Nav
        button={{ icon: 'fas fa-cog', caption: 'Settings', callback: () => setPage('settings') }} />

      <div class="hero-body flex-justify-center">
        <div class="columns is-vcentered has-text-centered ">
          <div class="column is-centered ">
            <div class="buttons has-addons is-centered">
              <button
                class="button is-primary is-inverted is-outlined"
                on:click={startTimer}>
                <span class="icon is-small">
                  <i class="fas fa-play" />
                </span>
                <span>Play</span>

              </button>
              <button
                class="button is-primary is-inverted is-outlined"
                on:click={pauseTimer}>
                <span class="icon is-small">
                  <i class="fas fa-pause" />
                </span>
                <span>Pause</span>

              </button>
              <button
                class="button is-primary is-inverted is-outlined"
                on:click={restartTimer}>
                <span class="icon is-small">
                  <i class="fas fa-sync" />
                </span>
                <span>Restart</span>

              </button>
            </div>
          </div>

          <div class="column is-one-quarter">

            <p class="title is-3 ">{$activeMode.name}</p>
            <p class="subtitle is-5 ">{$stringClock}</p>
            <progress
              class="progress is-primary"
              value={$percentDone}
              max="100">
              {percentDone}%
            </progress>
            {$percentDone}%
            <p class="heading">Next: {$nextMode.name}</p>
          </div>
          <div class="column">
            <div class="buttons has-addons is-centered">
              <button
                class="button button is-primary is-inverted is-outlined"
                on:click={() => setModeManual(pomodoro)}>
                <span class="icon is-small">
                  <i class="fas fa-clock" />
                </span>
                <span>Pomodoro</span>

              </button>
              <button
                class="button is-primary is-inverted is-outlined"
                on:click={() => setModeManual(shortBreak)}>
                <span class="icon is-small">
                  <i class="fas fa-walking" />
                </span>
                <span>Short Break</span>

              </button>
              <button
                class="button is-primary is-inverted is-outlined"
                on:click={() => setModeManual(longBreak)}>
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
  {:else if $page === 'about'}
    <!-- else if content here -->
    <div in:fade={{ delay: 600 }} out:fade>
      <About />
    </div>
  {:else if $page === 'settings'}
    <!-- else if content here -->
    <div in:fade={{ delay: 600 }} out:fade>
      <Settings />
    </div>
  {/if}

  <!-- 
  <section class="section has-background-info flex-grow ">
    <div class="container" />
    <div class="container">
      <h1 class="title">History</h1>

    </div>
  </section> -->

</main>
