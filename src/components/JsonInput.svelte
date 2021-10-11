<script lang="ts">
  import { AceEditor } from "svelte-ace";
  import "brace/mode/json";
  import "brace/mode/javascript";
  import "brace/theme/chrome";
  import { jsonInput } from "../store";
</script>

<AceEditor
  on:input={(obj) => ($jsonInput = obj.detail)}
  width="90%"
  height="500px"
  lang="json"
  theme="chrome"
  value={$jsonInput}
/>
