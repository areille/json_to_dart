<script lang="ts">
  import { AceEditor } from "svelte-ace";
  import Highlight from "svelte-highlight";
  import dart from "svelte-highlight/src/languages/dart";
  import github from "svelte-highlight/src/styles/github";
  import "brace/mode/json";
  import "brace/mode/javascript";
  import "brace/theme/chrome";
  import { convert2Dart } from "./utils/converter";

  let input: string;
  let className: string;
  let result: string;

  //   const sample = `{
  //      	"userId": 1,
  //      	"id": 1,
  //      	"title": "delectus aut autem",
  //      	"completed": false
  // }`;

  //   const loadSample = () => {
  //     className = "Todo";
  //     input = sample;
  //   };

  const sample = `{
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
  }`;

  const loadSample = () => {
    className = "User";
    input = sample;
  };

  const formatJson = () => {
    input = JSON.stringify(JSON.parse(input), null, "\t");
  };

  const updateInput = (value) => {
    input = value;
  };

  $: isValidInput = () => {
    try {
      JSON.parse(input);
      return true;
    } catch (error) {
      return false;
    }
  };

  const convert = () => {
    console.info("Converting...");
    let res = convert2Dart(input, className);
    result = res;
  };
</script>

<svelte:head>
  {@html github}
</svelte:head>
<main>
  <h1>JSON to Dart class converter</h1>
  <input type="text" placeholder="Class name" bind:value={className} />
  <button on:click={loadSample}>Load sample</button>
  <button disabled={!isValidInput()} on:click={formatJson}>Format JSON</button>
  {#if isValidInput()}
    <button id="convert-button" on:click={convert}>Convert</button>
  {/if}
  <div class="flex">
    <div class="flex-child">
      <AceEditor
        on:input={(obj) => updateInput(obj.detail)}
        width="90%"
        height="500px"
        lang="json"
        theme="chrome"
        value={input}
      />
    </div>
    <div class="flex-child">
      {#if result}
        <Highlight language={dart} code={result} />
      {/if}
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
