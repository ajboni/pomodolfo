<script>
  import { slide, fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  let read = false;
  function readNotification() {
    read = !read;
  }
</script>

<main>

  {#if read}
    <section
      in:fly={{ delay: 1000, x: 200, duration: 2000 }}
      out:fade={{ delay: 0 }}
      class="section">
      <div class="container">
        <h1 class="title">Bravo</h1>
        <h2 class="subtitle">
          Thank you for doing
          <strong>that.</strong>
          will you discard me again?
        </h2>
        <button
          class="button is-outlined"
          on:click={readNotification}
          in:fade={{ delay: 4000 }}>
          Okay.
        </button>

      </div>
    </section>
  {:else}
    <section
      in:slide={{ delay: 1000, duration: 3000, easing: quintOut }}
      out:fade
      class="section">
      <div class="container">
        <div class="notification">
          <div class="notification">
            <button on:click={readNotification} class="delete" />
            Read me and discard me...
          </div>
        </div>
      </div>
    </section>
  {/if}

</main>
