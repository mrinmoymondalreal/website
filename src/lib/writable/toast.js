import { writable } from 'svelte/store';

export const toast_data = writable({
  show: false,
  message: "This is still under development."
});
