<script lang="ts">
  import ClassName from "./components/ClassName.svelte";
  import ConvertButton from "./components/ConvertButton.svelte";
  import Copy2ClipButton from "./components/Copy2ClipButton.svelte";
  import FormatJsonButton from "./components/FormatJsonButton.svelte";
  import JsonInput from "./components/JsonInput.svelte";
  import LoadSampleButton from "./components/LoadSampleButton.svelte";
  import Result from "./components/Result.svelte";
</script>

<main>
  <h1>JSON to Dart class converter</h1>
  <ClassName />
  <LoadSampleButton />
  <FormatJsonButton />
  <ConvertButton />
  <Copy2ClipButton />

  <div class="flex">
    <div class="flex-child">
      <JsonInput />
    </div>
    <div class="flex-child">
      <Result />
    </div>
  </div>
</main>

<style>
  .flex {
    display: flex;
  }

  .flex-child {
    flex: 1 1 0px;
  }
</style>
