This is Review dashboard


<script>
    import { adminToken } from "../../stores/stores"
    import {onMount} from 'svelte'
    import ReviewDashboard from "../../lib/Pages/ReviewDashboard.svelte"
  import { goto } from "$app/navigation";
    import {api}  from "../../api/api"
  
    let adminSummary;
  
    const getAdminSummary = async () => {
  
      let {error, errorMsg, adminSummary:ladminSummary} = await api.adminSummary({token: $adminToken})
      adminSummary = ladminSummary;
    }
    onMount(async ()=> {
      if($adminToken == '') {
        goto('admin')
      }
      await getAdminSummary()
    })
    const refresh = () => {
  
    }
  </script>
  {#if adminSummary}
  <ReviewDashboard {adminSummary} refresh={getAdminSummary}/>
  {:else }
  ...Loading please wait
  {/if}