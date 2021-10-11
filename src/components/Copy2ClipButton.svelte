<script lang="ts">
  import { copied, result } from "../store";

  const copyToClipboard = async () => {
    navigator.clipboard.writeText($result);
    $copied = true;
  };
</script>

{#if $result}
  <button disabled={$copied} on:click={copyToClipboard}
    >{$copied ? "Copied" : "Copy to clipboard"}</button
  >
{/if}
