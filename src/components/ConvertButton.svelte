<script lang="ts">
  import { jsonInput, isValidInput, result, className, copied } from "../store";
  import { convert2Dart } from "../converter";

  const convert = () => {
    console.info("Converting...");
    let res = convert2Dart($jsonInput, $className);
    $result = res;
    $copied = false;
  };
</script>

{#if $isValidInput}
  <button on:click={convert}>Convert</button>
{/if}

<style>
  button {
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

  button::after {
    content: "";
    z-index: -1;
    background-color: hsla(0, 0%, 100%, 0.2);
    position: absolute;
    top: -50%;
    bottom: -50%;
    width: 1.25em;
    transform: translate3d(-525%, 0, 0) rotate(35deg);
  }

  button:hover::after {
    transition: transform 0.45s ease-in-out;
    transform: translate3d(200%, 0, 0) rotate(35deg);
  }
</style>
