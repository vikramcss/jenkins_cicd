<script>
  import AdminSignin from "$lib/Pages/AdminSignin.svelte";
  import { adminToken } from "../../stores/stores"
  import {goto} from '$app/navigation'

  const adminLoggedin = (e) => {
    console.log("admin has logged in", e.detail);
    $adminToken = e.detail.token;
    goto('/admindashboard')
  };
</script>

<AdminSignin on:loggedIn={adminLoggedin} />
