<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { toast_data } from "$lib/writable/toast";
  import { PUBLIC_TELEGRAM_URL } from '$env/static/public';
  import name_logo from "$lib/images/name_logo.png";
  import { isDarkMode } from '$lib/writable/isDarkMode';
  import { fly } from 'svelte/transition';
  import { quintInOut, quintOut } from 'svelte/easing';

  let header;
  let header_wrapper;
  let is_main_menu = writable(null);
  let is_about_page_menu = writable(null);
  let is_contact_menu = writable(null);

  $: if($is_main_menu && history) history.pushState({}, null, null);
  $: if($is_about_page_menu && history) history.pushState({}, null, null);
  $: if($is_contact_menu && history) history.pushState({}, null, null);

  const skills_list = [
    {
      text: "HTML",
      svg: `<svg class="absolute bg-white dark:bg-darkLight" fill="rgb(234 88 12)" xmlns="http://www.w3.org/2000/svg" height="2.3em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg>`,
      bg: 'bg-orange-600',
      percentage: 0.95
    },
    {
      text: "CSKS",
      svg: `<svg class="absolute bg-white dark:bg-darkLight" fill="rgb(37 99 235)" xmlns="http://www.w3.org/2000/svg" height="2.3em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"/></svg>`,
      bg: 'bg-blue-600',
      percentage: 0.95
    },
    {
      text: "JSVSPT",
      svg: `<svg class="absolute bg-white dark:bg-darkLight" fill="rgb(250 204 21)" xmlns="http://www.w3.org/2000/svg" height="2.3em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/></svg>`,
      bg: 'bg-yellow-400',
      percentage: 1
    },
    {
      text: "REACT",
      svg: `<svg class="absolute bg-white dark:bg-darkLight" fill="rgb(37 99 235)" xmlns="http://www.w3.org/2000/svg" height="2.3em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"/></svg>`,
      bg: 'bg-blue-600',
      percentage: 0.85
    },
    {
      text: "",
      svg: `<svg class="absolute bg-white dark:bg-darkLight" fill="rgb(22 163 74)" xmlns="http://www.w3.org/2000/svg" height="2.3em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M316.3 452c-2.1 0-4.2-.6-6.1-1.6L291 439c-2.9-1.6-1.5-2.2-.5-2.5 3.8-1.3 4.6-1.6 8.7-4 .4-.2 1-.1 1.4.1l14.8 8.8c.5.3 1.3.3 1.8 0L375 408c.5-.3.9-.9.9-1.6v-66.7c0-.7-.3-1.3-.9-1.6l-57.8-33.3c-.5-.3-1.2-.3-1.8 0l-57.8 33.3c-.6.3-.9 1-.9 1.6v66.7c0 .6.4 1.2.9 1.5l15.8 9.1c8.6 4.3 13.9-.8 13.9-5.8v-65.9c0-.9.7-1.7 1.7-1.7h7.3c.9 0 1.7.7 1.7 1.7v65.9c0 11.5-6.2 18-17.1 18-3.3 0-6 0-13.3-3.6l-15.2-8.7c-3.7-2.2-6.1-6.2-6.1-10.5v-66.7c0-4.3 2.3-8.4 6.1-10.5l57.8-33.4c3.7-2.1 8.5-2.1 12.1 0l57.8 33.4c3.7 2.2 6.1 6.2 6.1 10.5v66.7c0 4.3-2.3 8.4-6.1 10.5l-57.8 33.4c-1.7 1.1-3.8 1.7-6 1.7zm46.7-65.8c0-12.5-8.4-15.8-26.2-18.2-18-2.4-19.8-3.6-19.8-7.8 0-3.5 1.5-8.1 14.8-8.1 11.9 0 16.3 2.6 18.1 10.6.2.8.8 1.3 1.6 1.3h7.5c.5 0 .9-.2 1.2-.5.3-.4.5-.8.4-1.3-1.2-13.8-10.3-20.2-28.8-20.2-16.5 0-26.3 7-26.3 18.6 0 12.7 9.8 16.1 25.6 17.7 18.9 1.9 20.4 4.6 20.4 8.3 0 6.5-5.2 9.2-17.4 9.2-15.3 0-18.7-3.8-19.8-11.4-.1-.8-.8-1.4-1.7-1.4h-7.5c-.9 0-1.7.7-1.7 1.7 0 9.7 5.3 21.3 30.6 21.3 18.5 0 29-7.2 29-19.8zm54.5-50.1c0 6.1-5 11.1-11.1 11.1s-11.1-5-11.1-11.1c0-6.3 5.2-11.1 11.1-11.1 6-.1 11.1 4.8 11.1 11.1zm-1.8 0c0-5.2-4.2-9.3-9.4-9.3-5.1 0-9.3 4.1-9.3 9.3 0 5.2 4.2 9.4 9.3 9.4 5.2-.1 9.4-4.3 9.4-9.4zm-4.5 6.2h-2.6c-.1-.6-.5-3.8-.5-3.9-.2-.7-.4-1.1-1.3-1.1h-2.2v5h-2.4v-12.5h4.3c1.5 0 4.4 0 4.4 3.3 0 2.3-1.5 2.8-2.4 3.1 1.7.1 1.8 1.2 2.1 2.8.1 1 .3 2.7.6 3.3zm-2.8-8.8c0-1.7-1.2-1.7-1.8-1.7h-2v3.5h1.9c1.6 0 1.9-1.1 1.9-1.8zM137.3 191c0-2.7-1.4-5.1-3.7-6.4l-61.3-35.3c-1-.6-2.2-.9-3.4-1h-.6c-1.2 0-2.3.4-3.4 1L3.7 184.6C1.4 185.9 0 188.4 0 191l.1 95c0 1.3.7 2.5 1.8 3.2 1.1.7 2.5.7 3.7 0L42 268.3c2.3-1.4 3.7-3.8 3.7-6.4v-44.4c0-2.6 1.4-5.1 3.7-6.4l15.5-8.9c1.2-.7 2.4-1 3.7-1 1.3 0 2.6.3 3.7 1l15.5 8.9c2.3 1.3 3.7 3.8 3.7 6.4v44.4c0 2.6 1.4 5.1 3.7 6.4l36.4 20.9c1.1.7 2.6.7 3.7 0 1.1-.6 1.8-1.9 1.8-3.2l.2-95zM472.5 87.3v176.4c0 2.6-1.4 5.1-3.7 6.4l-61.3 35.4c-2.3 1.3-5.1 1.3-7.4 0l-61.3-35.4c-2.3-1.3-3.7-3.8-3.7-6.4v-70.8c0-2.6 1.4-5.1 3.7-6.4l61.3-35.4c2.3-1.3 5.1-1.3 7.4 0l15.3 8.8c1.7 1 3.9-.3 3.9-2.2v-94c0-2.8 3-4.6 5.5-3.2l36.5 20.4c2.3 1.2 3.8 3.7 3.8 6.4zm-46 128.9c0-.7-.4-1.3-.9-1.6l-21-12.2c-.6-.3-1.3-.3-1.9 0l-21 12.2c-.6.3-.9.9-.9 1.6v24.3c0 .7.4 1.3.9 1.6l21 12.1c.6.3 1.3.3 1.8 0l21-12.1c.6-.3.9-.9.9-1.6v-24.3zm209.8-.7c2.3-1.3 3.7-3.8 3.7-6.4V192c0-2.6-1.4-5.1-3.7-6.4l-60.9-35.4c-2.3-1.3-5.1-1.3-7.4 0l-61.3 35.4c-2.3 1.3-3.7 3.8-3.7 6.4v70.8c0 2.7 1.4 5.1 3.7 6.4l60.9 34.7c2.2 1.3 5 1.3 7.3 0l36.8-20.5c2.5-1.4 2.5-5 0-6.4L550 241.6c-1.2-.7-1.9-1.9-1.9-3.2v-22.2c0-1.3.7-2.5 1.9-3.2l19.2-11.1c1.1-.7 2.6-.7 3.7 0l19.2 11.1c1.1.7 1.9 1.9 1.9 3.2v17.4c0 2.8 3.1 4.6 5.6 3.2l36.7-21.3zM559 219c-.4.3-.7.7-.7 1.2v13.6c0 .5.3 1 .7 1.2l11.8 6.8c.4.3 1 .3 1.4 0L584 235c.4-.3.7-.7.7-1.2v-13.6c0-.5-.3-1-.7-1.2l-11.8-6.8c-.4-.3-1-.3-1.4 0L559 219zm-254.2 43.5v-70.4c0-2.6-1.6-5.1-3.9-6.4l-61.1-35.2c-2.1-1.2-5-1.4-7.4 0l-61.1 35.2c-2.3 1.3-3.9 3.7-3.9 6.4v70.4c0 2.8 1.9 5.2 4 6.4l61.2 35.2c2.4 1.4 5.2 1.3 7.4 0l61-35.2c1.8-1 3.1-2.7 3.6-4.7.1-.5.2-1.1.2-1.7zm-74.3-124.9l-.8.5h1.1l-.3-.5zm76.2 130.2l-.4-.7v.9l.4-.2z"/></svg>`,
      bg: 'bg-green-600',
      percentage: 0.95
    },
    {
      text: "PYTHN",
      svg: `<svg class="absolute bg-white dark:bg-darkLight" fill="rgb(37 99 235)" xmlns="http://www.w3.org/2000/svg" height="2.3em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"/></svg>`,
      bg: 'bg-blue-600',
      percentage: 0.65
    },
  ];

  let contacts = {};

  // $: if($isDarkMode == true) document.documentElement.classList.add('dark');
  // $: if($isDarkMode == false) document.documentElement.classList.remove('dark');

  onMount(()=>{

    window.onpopstate = function(){
      if($is_main_menu) is_main_menu.set(false);
      if($is_about_page_menu) is_about_page_menu.set(false);
      if($is_contact_menu) is_contact_menu.set(false);
    }

    function scrollHandler(){
      if(window.scrollY > header_wrapper.offsetTop){
        header.style.padding = "0px";
        header_wrapper.style.borderRadius = "0";
      }else{
        header.style.padding = "";
        header_wrapper.style.borderRadius = "";
      }
    }
    window.onscroll = scrollHandler;
    scrollHandler();

    function attachBottomSheet(bottom_menu, bar, height, is){
      let body = document.body;
      let is_clicked;
      bar.addEventListener("mousedown", handleBottomMenu);
      body.addEventListener("mousemove", handleBottomMenu);
      body.addEventListener("mouseup", handleBottomMenu);
  
      bar.addEventListener("touchmove", handleBottomMenu);
      bar.addEventListener("touchend", ()=>{
        is_clicked = false; 
        body.style['user-select'] = 'auto';
        setEndHeight(height);
      });

      function setEndHeight(h){
        setTimeout(()=>{
          bottom_menu.style.transition = "transform 500ms";
          if(h < 0.3) bottom_menu.style.height = '70vh';
        }, 500);
        if(h > 0.75){
          bottom_menu.style.transition = "all 500ms";
          bottom_menu.style.height = '100%';
        }else if(h < 0.3){
          is.set(false);
          history.back();
        }
      }
      function handleBottomMenu(e){
        const clientY = e.touches ? (is_clicked = true && e.touches[0].clientY) : e.clientY;
        if(e.type == "mousedown") is_clicked = true;
        if(is_clicked && (e.type == "mouseup" || e.type == "touchend")){
          is_clicked = false;
          body.style['user-select'] = 'auto';
          body.classList.remove("cursor-grabbing");
          bar.classList.remove("cursor-grabbing");
          setEndHeight(height);
        }
        if(is_clicked && (e.type == "mousemove" || e.type == "touchmove")){
          body.style['user-select'] = 'none';
          body.classList.add("cursor-grabbing");
          bar.classList.add("cursor-grabbing");
          height = (window.innerHeight - clientY)/window.innerHeight;
          bottom_menu.style.height = (height*100) + '%';
        }
  
      }
    }

    attachBottomSheet(document.querySelector("#bottom_menu"), document.querySelector("#bottom_menu .bar-class"), 0, is_main_menu);
    attachBottomSheet(document.querySelector("#about_page_menu"), document.querySelector("#about_page_menu .bar-class"), 0, is_about_page_menu);
    attachBottomSheet(document.querySelector("#contact_menu"), document.querySelector("#contact_menu .bar-class"), 0, is_contact_menu);
    
  });
</script>

<div class="hidden cursor-grab cursor-grabbing overflow-hidden bg-green-600 bg-orange-600 bg-blue-600 bg-yellow-400"></div>

<!-- contact page -->
<input type="checkbox" id="contact_menu_input" class="contact_menu_input bmi" checked="{$is_contact_menu}">
<div on:click={
  ()=>is_contact_menu.set(!$is_contact_menu)
} for="contact_menu_input" class="w-full h-full hidden fixed z-[1000] bg-black top-0 bg-opacity-30"></div>
<div id="contact_menu" class="contact_menu overflow-hidden h-[70vh] w-full md:w-1/2 md:left-[25%] bg-white fixed bottom-0 shadow-md shadow-black z-[9999] rounded-t-lg
                            dark:bg-darkLight dark:text-white">
  <div class="bar w-full h-10 flex justify-center items-center">
    <div class="bg-black dark:bg-white w-20 h-2 rounded-lg bar-class cursor-grab"></div>
  </div>
  <div class="content px-4 py-4 pb-8 overflow-y-scroll h-full">
    <div class="p1 flex items-center space-x-4 px-4">
      <div class="heading text-2xl font-bold"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg></div>
      <div class="heading text-2xl font-bold">Get In Touch</div>
    </div>
    <div class="p2 px-4 py-2">
      Email: mrinmoymondalreal@gmail.com <br/>
      Personal Instagram: themrinmoymondal <br/>
      Twitter: themrinmoyreal <br/>
    </div>
    <div class="p3 px-4">
      <div class="heading text-2xl font-bold">Write to Me: </div>
      <div class="mt-2">
        <form action="?hfbhj" class="space-y-2">
        <input bind:value={contacts.name} type="text" class="w-full placeholder:text-black rounded-md border-2 border-black px-2 py-2 text-black" placeholder="Your Name" name="" id="">
        <input bind:value={contacts.email} type="email" class="w-full placeholder:text-black rounded-md border-2 border-black px-2 py-2 text-black" placeholder="Your Email" name="" id="">
          <textarea bind:value={contacts.message} type="text" class="w-full placeholder:text-black rounded-md h-36 border-2 border-black px-2 py-2 text-black" placeholder="Write your message" name="" id=""></textarea>
          <button on:click={()=>{
            console.log(Object.values(contacts).map(e=>e.trim()));
            if(Object.values(contacts).map(e=>e.trim()).length != 3 || Object.values(contacts).map(e=>e.trim()).includes("")){
              $toast_data.show = true;
              $toast_data.message = "Fill all fields correctly";
            }else{
              var to_text = `Name: ${contacts.name}%0AEmail: ${contacts.email}%0AMessage: ${contacts.message}`;
              fetch((PUBLIC_TELEGRAM_URL+to_text).split("PUBLIC_TELEGRAM_URL=")[1]).then(e=>e.json()).then(e=>{
                if(e["ok"] == true){
                  $is_contact_menu = !$is_contact_menu;
                  $toast_data.show = true;
                  $toast_data.message = "Message Sent Successfully.";
  
                  contacts["name"] = "";
                  contacts["email"] = "";
                  contacts["message"] = "";
                }else{
                  $toast_data.show = true;
                  $toast_data.message = "Unexpected Problem Occured.";
                }
              })
            }
            
          }} type="button"class="w-full rounded-md bg-black text-white px-2 py-2" placeholder="Write your message" name="" id="">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- about page -->
<input type="checkbox" id="about_page_menu_input" class="about_page_menu_input bmi" checked="{$is_about_page_menu}">
<div on:click={
  ()=>is_about_page_menu.set(!$is_about_page_menu)
} for="about_page_menu_input" class="w-full h-full hidden fixed z-[1000] bg-black top-0 bg-opacity-30"></div>
<div id="about_page_menu" class="about_page_menu overflow-hidden h-[70vh] w-full md:w-1/2 md:left-[25%] bg-white fixed bottom-0 shadow-md shadow-black z-[9999] rounded-t-lg
                              dark:bg-darkLight dark:text-white">
  <div class="bar w-full h-10 flex justify-center items-center">
    <div class="bg-black dark:bg-white w-20 h-2 rounded-lg bar-class cursor-grab"></div>
  </div>
  <div class="content px-4 py-4 pb-8 overflow-y-scroll h-full">
    <div class="p1">
      <div class="heading text-2xl font-bold">About</div>
      <div class="wrapper py-4 px-2 text-md">
        Greetings! I'm Mrinmoy Mondal, currently pursuing a Bachelor of Technology (B.Tech) degree in Computer Science and Engineering at Dr. Sudhir Chandra Sur Institute of Technology & Sports Complex, Kolkata, India. I find immense joy in the process of creation and innovation, whether it involves crafting elegant lines of code or engaging in hands-on projects.

        The boundless potential of technology never ceases to amaze me, and I am on a relentless quest to explore and harness this potential in unique and meaningful ways. My enthusiasm for transforming abstract ideas into concrete realities serves as the driving force behind my continuous pursuit of knowledge and skills.

        In addition to my academic endeavors, I often find myself engrossed in various artistic and creative pursuits, drawing inspiration from diverse sources. By chronicling my journey through the realm of Computer Science and Engineering, I aim to connect with like-minded individuals and contribute to the dynamic landscape of innovation.

        Join me as I share my experiences, insights, and projects on this platform. Let's collaborate, innovate, and together, let's shape a future where technology knows no bounds.
      </div>
    </div>
    <div class="p2 h-fit">
      <div class="heading text-2xl font-bold">My Skills</div>
      <ul class="px-8 py-4 flex flex-wrap justify-center item-center gap-6">
        {#each skills_list as skill}
          <li class="w-32 h-32 rounded-full relative flex justify-center">
            {#each new Array(20) as item, index}
              <div class="h-1/2 w-fit absolute origin-bottom" style="transform: rotate({index*(360/20)}deg);">
                <div class="w-4 h-4 {index < Math.floor(skill.percentage*20) ? skill.bg: "bg-gray-300"} rounded-full"></div>
              </div>
            {/each}
            <div class="w-full h-full flex justify-center items-center">
              <div class="w-20 h-20 rounded-full flex justify-center items-center flex-col space-y-0">
                <div class="relative w-10 h-10 flex justify-center items-center">
                  <span class="absolute font-bold text-xl">{skill.text}</span>
                  {@html skill.svg}
                  <!-- <svg class="absolute bg-white" xmlns="http://www.w3.org/2000/svg" height="2.3em" viewBox="0 0 384 512">! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.<path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg> -->
                </div>
                <span class="text-sm">{skill.percentage*100}%</span>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
    <div class="p3 h-fit">
      <div class="heading text-2xl font-bold">Additionals Skills</div>
      <ul class="list-disc px-8 py-4 h-fit">
        <li>Svelte</li>
        <li>Next.Js</li>
        <li>MySQL</li>
        <li>MongoDB</li>
        <li>Postgres</li>
        <li>C++ (Still Learning)</li>
        <li>Data Structure and Algorithms (On the way..)</li>
      </ul>
    </div>
    <div class="p4 h-fit">
      <div class="heading text-2xl font-bold">Details About the page</div>
      <div class="wrapper py-4 px-2 text-md">
        This website is created using Svelte, Tailwind (for CSS) and Vanilla Javascript.
        All the <span class="underline">transitions, animation and interactivity are hand crafted.</span>
        Although In most of my project I use lightweight frameworks to do the high lifting in this website I tried creating all the things by my myself for learning purpose 
      </div>
    </div>
  </div>
</div>

<!-- Main menu -->
<input type="checkbox" class="bottom_menu_input bmi" id="bottom_menu_input" checked="{$is_main_menu}">
<div on:click={()=>{is_main_menu.set(!$is_main_menu)}} for="bottom_menu_input" class="w-full h-full hidden fixed z-[1000] bg-black top-0 bg-opacity-30"></div>
<div class="bottom_menu h-[70vh] w-full bg-white fixed bottom-0 shadow-xl shadow-black z-[9999] rounded-t-lg
          dark:bg-darkLight dark:text-white" id="bottom_menu">
  <div class="bar w-full h-10 flex justify-center items-center">
    <div class="bg-black dark:bg-white w-20 h-2 rounded-lg bar-class cursor-grab"></div>
  </div>
  <div class="content px-3 py-4">
    <ul class="flex flex-col space-y-4">
      <li class="flex p-2 space-x-3 rounded-md hover:bg-gray-500 hover:bg-opacity-30 items-center">
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
        <span>Home</span>
      </li>
      <button on:click={()=>{
        is_main_menu.set(false);
        is_contact_menu.set(!$is_contact_menu);
      }} class="flex p-2 space-x-3 rounded-md hover:bg-gray-500 hover:bg-opacity-30 items-center">
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
        <span>Contact</span>
      </button>
      <button on:click={()=>{
        is_main_menu.set(false);
        is_about_page_menu.set(!$is_about_page_menu);
      }} class="flex p-2 space-x-3 rounded-md hover:bg-gray-500 hover:bg-opacity-30 items-center">
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 32c13.5 0 26.3 5.6 35.4 15.6l176 192c12.9 14 16.2 34.3 8.6 51.8S419 320 400 320H48c-19 0-36.3-11.2-43.9-28.7s-4.3-37.7 8.6-51.8l176-192C197.7 37.6 210.5 32 224 32zM0 432c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48s-21.5 48-48 48H48c-26.5 0-48-21.5-48-48z"/></svg>
        <span>About</span>
      </button>
      <a class="flex p-2 space-x-3 rounded-md hover:bg-gray-500 hover:bg-opacity-30 items-center" target="_blank" href="https://github.com/mrinmoymondalreal">
        <!-- Github -->
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 496 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
        <span>Github</span>
      </a>
      <a class="flex p-2 space-x-3 rounded-md hover:bg-gray-500 hover:bg-opacity-30 items-center" target="_blank" href="https://twitter.com/themrinmoyreal">
        <!-- Twitter -->
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
        <span>Twitter (X)</span>
      </a>
      <a class="flex p-2 space-x-3 rounded-md hover:bg-gray-500 hover:bg-opacity-30 items-center" target="_blank" href="https://www.instagram.com/themrinmoymondal/">
        <!-- Instagram -->
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
        <span>Instagram</span>
      </a>
      <a class="flex p-2 space-x-3 rounded-md hover:bg-gray-500 hover:bg-opacity-30 items-center" target="_blank" href="https://www.linkedin.com/in/mrinmoy-mondal-319861167/">
        <!-- Linkden -->
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
        <span>Linkden</span>
      </a>
      <a class="flex p-2 space-x-3 rounded-md hover:bg-gray-500 hover:bg-opacity-30 items-center" target="_blank" href="https://www.facebook.com/mrinmoy.mandal.585/">
        <!-- Linkden -->
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
        <span>Facebook</span>
      </a>
    </ul>
  </div>
</div>

<header bind:this={header} class="fixed top-0 z-[999] transition-all w-full px-2 py-4 md:px-4 md:py-8 bg-white
                                  dark:bg-dark">
  <div bind:this={header_wrapper} class="wrapper flex justify-center items-center px-4 py-2 rounded-md shadow-md
                                         dark:bg-darkLight dark:text-white">
    <button on:click={()=>{
      is_main_menu.set(!$is_main_menu);
    }} class="menu-btn md:hidden hover:bg-gray-300 px-2 py-2 rounded-md cursor-pointer
            dark:hover:bg-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    </button>
    <div class="name flex-1 md:flex-none flex justify-center">Mrinmoy Mondal</div>
    <div class="middle-menu hidden md:flex justify-center flex-1">
      <ul class="flex space-x-4">
        <li><a class="hover:underline" href="#">Home</a></li>
        <li><button on:click={()=>{
            is_main_menu.set(false);
            is_contact_menu.set(!$is_contact_menu);
          }
        } class="contact hover:underline">Contact</button></li>
        <li><button class="hover:underline about" on:click={()=>{
          is_main_menu.set(false);
          is_about_page_menu.set(!$is_about_page_menu);
        }}>About Me</button></li>
      </ul>
    </div>
    <button type="button" on:click={()=>{
      if($isDarkMode == true) {document.documentElement.classList.remove('dark'); localStorage.setItem("theme", "light");}
      else{ document.documentElement.classList.add('dark'); localStorage.setItem("theme", "dark");}
      $isDarkMode = !$isDarkMode;
    }} class="mr-4 overflow-hidden flex-none w-10 h-10 dark:bg-gray-700 rounded-full bg-cover flex justify-center items-center">
      {#if $isDarkMode}
        <svg transition:fly={{ delay: 100, duration: 300, x: -50, y: 0, opacity: 0, easing: quintInOut }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1.3em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>
      {:else}
        <svg transition:fly={{ delay: 50, duration: 300, x: 50, y: 0, opacity: 0, easing: quintInOut }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1.3em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>
      {/if}
    </button>
    <div class="profile-image flex-none w-12 h-12 bg-black rounded-full bg-cover" style="background-image: url('{name_logo}')">
    </div>
  </div>
</header>

<style>

  .bottom_menu{
    transform: translate(0, 100%);
    transition: transform 500ms;
  }

  .bottom_menu_input:checked ~ .bottom_menu{
    transform: translate(0, 0);
  }

  .bottom_menu_input:checked ~ div[for="bottom_menu_input"]{
    display: block;
  }

  .about_page_menu{
    transform: translate(0, 100%);
    transition: transform 500ms;
  }

  .about_page_menu_input:checked ~ .about_page_menu{
    transform: translate(0, 0);
  }

  .about_page_menu_input:checked ~ div[for="about_page_menu_input"]{
    display: block;
  }

  .contact_menu{
    transform: translate(0, 100%);
    transition: transform 500ms;
  }

  .contact_menu_input:checked ~ .contact_menu{
    transform: translate(0, 0);
  }

  .contact_menu_input:checked ~ div[for="contact_menu_input"]{
    display: block;
  }
</style>