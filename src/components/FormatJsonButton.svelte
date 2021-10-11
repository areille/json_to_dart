<script lang="ts">
  import { isValidInput, jsonInput } from "../store";

  const formatJson = () => {
    $jsonInput = JSON.stringify(JSON.parse($jsonInput), null, "\t");
  };
</script>

<button disabled={!$isValidInput && !$jsonInput} on:click={formatJson}
  >Format JSON</button
>
