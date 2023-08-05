<script>
  import { writable } from "svelte/store";
  
  import { fly } from 'svelte/transition';
  import { quintOut, quintIn } from 'svelte/easing';

  export let data = writable({
    show: false,
    message: "This is still under development."
  });

  let timeout;

  $: if($data.show) timeout = setTimeout(()=>$data.show = false, 3000);
</script>

{#if $data.show}

  <div out:fly={{ delay: 0, duration: 300, y: -500, opacity: 1, easing: quintIn }} in:fly={{ delay: 0, duration: 300, y: -500, opacity: 0.5, easing: quintOut }} class="w-full h-fit flex justify-center items-center fixed top-6 z-[99999]">
    <div class="toast-wrapper min-w-fit max-w-[90%] w-fit h-10 bg-gray-700 rounded-md py-2 px-2 
    flex justify-center items-center gap-x-2 shadow-lg">
      <div class="icon">
        <svg class="text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
      </div>
      <div class="text text-white">
        {$data.message}
      </div>
      <div class="close-icon">
        <button type="button" on:click={()=>{
          if(timeout) clearTimeout(timeout);
          $data.show = false
        }} class="flex px-2 py-1 hover:bg-gray-400 rounded-md text-white hover:text-black">
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>
      </div>
    </div>
  </div>

{/if}