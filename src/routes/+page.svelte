<script>
  import { onMount } from "svelte";
  import { toast_data } from "../lib/writable/toast";

  let is_pop_up = true;

  setTimeout(()=>$toast_data.show = true, 500);

  onMount(()=>{
    var observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        try{
          var element = entry.target;
          var attr = element.getAttribute('animate-class');
          if(entry.isIntersecting){
            element.classList.add(attr);
          }else{
            element.classList.remove(attr);
          }
        }catch(err){}
      })
    }, {
      threshold: 0.2
    });
    var hiddenElements = document.querySelectorAll(".hidden_s");
    hiddenElements.forEach(element => observer.observe(element));
  });
</script>

<div class="hidden slide-left slide-right x-slide right-slide"></div>

<div class="first-screen h-screen w-full -mt-8 md:mt-0 flex justify-center items-center gap-y-12 md:gap-y-0 md:gap-x-12 flex-col md:flex-row-reverse">
  <div class="image right-wrapper mt-12">
    <div class="image h-56 w-56 rounded-full bg-black">
    </div>
  </div>
  <div class="info text-center box-border left-wrapper flex flex-col items-center">
    <div class="text-4xl font-bold hidden md:block" style="--delay: 0ms">Hey 
      <div class="animate-bounce inline-block">👋</div>
    </div>
    <div class="md:mt-4 -space-y-4" style="--delay: 155ms">
      <div class="font-bold text-3xl md:inline-block font-['Borel']">I am </div>
      <svg class="w-72 md:w-96 md:inline-block text-red-600" viewBox="0 0 540 100" xmlns="http://www.w3.org/2000/svg">
        <style>
          .heavy {
            stroke-width: 0;
            stroke: currentColor;
            fill: currentColor;
            stroke-dashoffset: 0;
            stroke-dasharray: 900;
            font: bold 60px 'Borel', cursive;
            animation: dash 1s ease-in-out;
            fill-opacity: 1;
          }

          @keyframes dash{
            0%{
              stroke-dashoffset: -900;
              fill-opacity: 0;
              stroke-width: 4px;
            }
            10%{
              stroke-dashoffset: -800;
            }
            75%{
              stroke-dashoffset: -100;
            }
            80%{
              stroke-dashoffset: 0;
            }
            90%{
              fill-opacity: 0.1;
              stroke-width: 1px;
            }
            100%{
              stroke-width: 0;
              fill-opacity: 1;
            }
          }
        </style>
        <text x="0" y="65" class="heavy">Mrinmoy Mondal</text>
      </svg>
    </div>
    <p class="text-lg px-8 md:w-[70%] mt-2" style="--delay: 256ms">Currently Pursuing B.Tech in CSE at <a href="https://www.surtech.edu.in/" class="underline" target="_blank" rel="noopener noreferrer">DSCSITSC</a>.
      I love creating new stuff and making friends.
    </p>
    <button on:click={()=>{
      document.querySelector(".about").click();
    }} type="button" class="bg-gray-600 px-4 py-2 text-white shadow-sm rounded-md mt-4"><a href="#">Know More &#10132;</a></button>
  </div>
</div>


<div class="second-screen h-fit lg:h-screen flex justify-center items-center flex-col gap-y-8 relative py-24 px-4 overflow-hidden">
  <div class="heading text-2xl font-bold">Some of my <span class="text-red-500">Works</span>...</div>
  <div class="work-list flex flex-wrap item-center justify-center gap-4 h-fit">
    {#each new Array(5).fill(0).map(e=>Math.random()*100) as item, index}
      <div class="work md:w-[calc(30vh*1.7777777778)] md:h-[30vh] w-[calc(23vh*1.7777777778)] h-[23vh] bg-gray-700 rounded-lg
      hidden_s {index%2 == 0 ? "-translate-x-1/2" : "translate-x-1/2"}" animate-class="x-slide" style="--delay: {index*100}ms;">{item} - {index}</div>
    {/each}
  </div>
</div>

<div class="third-page md:h-screen flex justify-center items-center flex-col gap-y-8 relative py-24 px-4">
  <div class="heading text-2xl font-bold">Sometimes I also get <span class="text-red-500">Creative</span></div>
  <div class="work-list grid grid-cols-2 md:flex justify-center gap-y-4 md:-space-x-24 w-full overflow-hidden">
    {#each new Array(5) as item, index}
      <div class="work
      hidden_s opacity-50 -translate-x-1/2
      md:hover:px-28 pointer-events-none" animate-class="x-slide" style="--delay: {index*100}ms;">
        <div class="w-[calc(40vh*0.8007)] h-[40vh] border-2 border-white bg-cover rounded-lg shadow-lg pointer-events-auto bg-gray-800"
        style=""></div>
      </div>
    {/each}
  </div>
</div>

<div class="contact-btn-holder w-full flex justify-center items-center h-24">
  <button type="button" on:click={()=>{
    document.querySelector('.contact').click();
  }} class="w-36 h-12 bg-gray-600 text-white shadow-md rounded-md">Get In Touch</button>
</div>

<footer class="flex justify-center items-center h-36 bg-gray-900 space-y-4 flex-col">
  <div class="flex space-x-4">
    <a target="_blank" href="https://github.com/mrinmoymondalreal" class="text-white">
      <!-- Github -->
      <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" fill="currentColor" viewBox="0 0 496 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
    </a>
    <a target="_blank" href="https://twitter.com/themrinmoyreal" class="text-white">
      <!-- Twitter -->
      <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" fill="currentColor" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
    </a>
    <a target="_blank" href="https://www.instagram.com/themrinmoymondal/" class="text-white">
      <!-- Instagram -->
      <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" fill="currentColor" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
    </a>
    <a target="_blank" href="https://www.linkedin.com/in/mrinmoy-mondal-319861167/" class="text-white">
      <!-- Linkden -->
      <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" fill="currentColor" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
    </a>
  </div>
  <div class="flex">
    <div class="text-white">&copy; Mrinmoy Mondal</div>
    <div class="text-white">&nbsp;&#11821;&nbsp;Made with ♥ in India</div>
  </div>

</footer>

<style>

  .x-slide{
    opacity: 1 !important;
    transform: translateX(0px) !important;
    visibility: visible !important;
  }
  .hidden_s{
    opacity: 0;
    transition: all 500ms ease-in-out;
    transition-delay: var(--delay);
    visibility: collapse;
  }

</style>