<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Toast from "../lib/components/Toast.svelte";
  import { toast_data } from "../lib/writable/toast";
</script>

<Toast data={toast_data}/>

<Header/>

<slot/>