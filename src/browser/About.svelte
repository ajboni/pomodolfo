<script>
  import { version, page } from "./store.js";
  function goBack() {
    page.set("main");
  }
</script>

<section class="hero is-dark is-fullheight">
  <!-- Hero head: will stick at the top -->
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">

          <div class="navbar-item">
            <div class="container is-centered">

              <button
                class="button is-primary is-inverted is-outlined"
                on:click={goBack}>
                <span class="icon">
                  <i class="fas fa-arrow-circle-left" />
                </span>
                <span>Return</span>
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
            <h2 class="subtitle is-6">Version {$version}</h2>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <div class="hero-body ">
    <div class="container">
      <section class="section">
        <div class="content">
          <h1 class="title is-4">MADE WITH THESE AWESOME TOOLS</h1>
          <ul>
            <li>
              <a href="https://www.electronjs.org/">Electron</a>
            </li>
            <li>
              <a href="https://svelte.dev/">Svelte</a>
            </li>
            <li>
              <a href="https://bulma.io">Bulma</a>
            </li>
            <li>
              <a href="https://fontawesome.com/">Font Awesome</a>
            </li>
            <li>
              <a href="https://icons8.com">Icons8</a>
            </li>
          </ul>
        </div>
        <div class="content">
          <p>
            <a href="https://github.com/ajboni/pomodolfo">Pomodolfo</a>
            is free and open-source software under the
            <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">
              GNU GENERAL PUBLIC LICENSE V3.
            </a>
          </p>
          <p>
            <a
              class="button is-primary is-inverted is-outlined"
              href="https://github.com/ajboni/pomodolfo">
              <span class="icon">
                <i class="fab fa-github" />
              </span>
              <span>Source</span>
            </a>
          </p>
        </div>
        <div class="content">
          <p>
            Check out my other tools
            <a href="https://baj.itch.io">@ baj.itch.io</a>
          </p>

        </div>
      </section>
    </div>
  </div>

</section>
