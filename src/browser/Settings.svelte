<script>
  import Nav from "./Nav.svelte";
  import { slide, fade } from "svelte/transition";
  import { settings } from "./settings.js";
  import { clock } from "./store.js";

  function capMinutes(e, item, i) {
    let val = e.target.value;
    if (val > 1440) {
      val = 1440;
    }
    console.log(item);
    let s = $settings;
    s[i].value = val;
    settings.set(s);
    //  clock.set(val);
  }
</script>

<style>
  .flex-slider {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .flex-slider > output {
    position: unset !important;
    top: unset !important;
  }

  .flex-slider > label {
    margin-right: 1rem;
  }
</style>

<section
  out:fade={{ delay: 100 }}
  in:fade={{ delay: 600 }}
  class="hero is-dark is-fullheight">

  <Nav />
  <div class="hero-body ">
    <div class="container is-fluid">
      <h1 class="title is-4">SETTINGS</h1>
      {#each $settings as item, i}
        {#if item.type === 'checkbox'}
          <div class="field">
            <input
              bind:checked={item.value}
              class="is-checkradio has-background-color is-primary"
              id={item.id}
              type="checkbox"
              name={item.id} />

            <label for={item.id}>{item.caption}</label>
            <div class="has-text-weight-light is-size-7">{item.help}</div>
          </div>
        {:else if item.type === 'slider'}
          <div class="field flex-slider">
            <label for={item.id}>{item.caption}</label>
            <input
              id={item.id}
              disabled={!$settings.find(x => x.id === item.depends_on).value}
              class="slider has-output is-fullwidth is-large is-circle
              is-primary"
              min="0"
              max="99"
              bind:value={item.value}
              step="1"
              type="range" />
            <output for={item.caption}>{item.value}</output>
          </div>
        {:else if item.type === 'input'}
          <div class="field is-horizontal">
            <div class="field-label" />
            <div class="field-body">
              <div class="field is-expanded">
                <div class="field has-addons">
                  <p class="control">
                    <button
                      class="button is-small is-primary is-static"
                      on:click={item.callback}>
                      <span class="icon">
                        <i class={item.icon} />
                      </span>
                      <span>{item.caption}</span>
                    </button>
                  </p>
                  <p class="control is-small is-expanded">
                    <input
                      on:change={e => capMinutes(e, item, i)}
                      class="input is-small is-primary"
                      type="number"
                      bind:value={item.value} />
                  </p>
                </div>
                <!-- <p class="help">{item.help}</p> -->
                <div class="has-text-weight-light is-size-7">{item.help}</div>
              </div>
            </div>
          </div>
        {/if}
      {/each}

    </div>
  </div>
</section>
