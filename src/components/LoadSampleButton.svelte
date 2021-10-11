<script lang="ts">
  import { className, jsonInput } from "../store";

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
    $className = "User";
    $jsonInput = sample;
  };
</script>

<button on:click={loadSample}>Load sample</button>
