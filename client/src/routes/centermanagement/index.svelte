<script>
  import CtrMgmtSignin from "$lib/Pages/CtrMgmtSignin.svelte";
  import { adminToken } from "../../stores/stores"
  import {goto} from '$app/navigation'

  const adminLoggedin = (e) => {
    console.log("admin has logged in", e.detail);
    $adminToken = e.detail.token;
    goto('/ctrmgmtdashboard')
  };
</script>

<CtrMgmtSignin on:loggedIn={adminLoggedin} />
