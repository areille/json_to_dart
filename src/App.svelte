<script lang="ts">
  import { AceEditor } from "svelte-ace";
  import "brace/mode/json";
  import "brace/theme/chrome";

  let input: string;
  let className: string;
  let result: string;

  const sample = `{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}    
`;

  const loadSample = () => {
    className = "User";
    input = sample;
  };

  const updateInput = (value) => {
    input = value;
  };

  const convert = () => {
    console.info("Converting...");
  };
</script>

<main>
  <h1>JSON to Dart class converter</h1>
  <input type="text" placeholder="Class name" bind:value={className} />
  <button on:click={loadSample}>Load sample</button>
  <button id="convert-button" on:click={convert}>Convert</button>
  <div class="flex">
    <AceEditor
      on:input={(obj) => updateInput(obj.detail)}
      width="90%"
      height="300px"
      lang="json"
      theme="chrome"
      value={input}
    />
    <AceEditor
      width="90%"
      height="300px"
      lang="json"
      theme="chrome"
      value={result}
    />
  </div>
</main>

<style>
  .flex {
    display: flex;
  }

  #convert-button {
    z-index: 1;
    position: relative;
    font-size: inherit;
    font-family: inherit;
    color: white;
    padding: 0.5em 1em;
    outline: none;
    border: none;
    background-color: hsl(236, 32%, 26%);
    overflow: hidden;
    cursor: pointer;
  }

  #convert-button::after {
    content: "";
    z-index: -1;
    background-color: hsla(0, 0%, 100%, 0.2);
    position: absolute;
    top: -50%;
    bottom: -50%;
    width: 1.25em;
    transform: translate3d(-525%, 0, 0) rotate(35deg);
  }

  #convert-button:hover::after {
    transition: transform 0.45s ease-in-out;
    transform: translate3d(200%, 0, 0) rotate(35deg);
  }
</style>
