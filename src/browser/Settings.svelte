<script>
  import Nav from "./Nav.svelte";
  import { slide, fade } from "svelte/transition";
</script>

<section
  out:fade={{ delay: 100 }}
  in:fade={{ delay: 600 }}
  class="hero is-dark is-fullheight">

  <Nav />

</section>
