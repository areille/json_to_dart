<script lang="ts">
  import { Highlight } from "svelte-highlight";
  import dart from "svelte-highlight/src/languages/dart";
  import github from "svelte-highlight/src/styles/github";

  import { result } from "../store";
</script>

<svelte:head>
  {@html github}
</svelte:head>

{#if $result}
  <Highlight language={dart} code={$result} />
{/if}
