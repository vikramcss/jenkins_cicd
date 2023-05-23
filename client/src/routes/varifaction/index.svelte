This is varifaction sign in page
<script>
  import ReviewSignin from "../../lib/Pages/reviewSignin.svelte";
  import { adminToken } from "../../stores/stores"
  import {goto} from '$app/navigation'

  const adminLoggedin = (e) => {
    console.log("admin has logged in", e.detail);
    $adminToken = e.detail.token;
    goto('/reviewDashboard')
  };
</script>

<ReviewSignin on:loggedIn={adminLoggedin} />