<script>
  import { onMount } from "svelte";

  export let array;

  onMount(e=>{
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
  })
</script>

<div class="hidden x-slide"></div>
<div class="work-list grid grid-cols-2 md:flex justify-center gap-y-4 md:-space-x-24 w-full overflow-hidden">
  {#each array as item, index}
    <div class="work
    hidden_s opacity-50 -translate-x-1/2
    md:hover:px-28 pointer-events-none" animate-class="x-slide" style="--delay: {index*100}ms;">
      <div class="w-[calc(40vh*0.8007)] h-[40vh] border-2 border-white bg-cover rounded-lg shadow-lg pointer-events-auto bg-gray-800"
      style="background: url('{item}');background-size: cover;"></div>
    </div>
  {/each}
</div>

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
  }

</style>