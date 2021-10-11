import { derived, Readable, writable } from "svelte/store";

export const jsonInput = writable("");
export const isValidInput: Readable<boolean> = derived(
  jsonInput,
  ($jsonInput, set) => {
    try {
      JSON.parse($jsonInput);
      set(true);
    } catch (error) {
      set(false);
    }
  }
);

export const result = writable("");
export const className = writable("");
export const copied = writable(false);
