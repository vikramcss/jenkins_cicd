<script>
  import { adminToken } from "../../stores/stores";
  import { onMount } from "svelte";
  import CenterMgmtDashboard from "$lib/Pages/CenterMgmtDashboard.svelte";
  import { api } from "../../api/api";
  import Alert from "../../common/Alert.svelte"

  let centers = [];
  let alertMessage;
  onMount(async ()=>{
    const {error, message, centers:lcenters} = await api.getAllCenters({token:$adminToken})
    if(error) {
      alertMessage = message
    }
    centers = lcenters
  })
  const updateCenter = async (ev, data) => {
    console.log(`event ${ev} data: `, data);
    let error = 0;
    let message = "";
    switch (ev) {
      case "addCenter":
        {
          const { error: e, message: em } = await api.addCenter({
            token: $adminToken,
            center: data,
          });
          if (e) {
            error = e;
            message = em;
          }
        }
        break;
      case "editCenter":
        {
          const { error: e, message: em } = await api.editCenter({
            token: $adminToken,
            center: data,
          });
          if (e) {
            error = e;
            message = em;
          }
        }
        break;
      case "deleteCenter":
        {
          const { error: e, message: em } = await api.deleteCenter({token:$adminToken, _id: data })
          if (e) {
            error = e;
            message = em;
          }
        }
        break;
    }
  };
</script>
<CenterMgmtDashboard
  {centers}
  {alertMessage}
  on:addCenter={(e) => updateCenter("addCenter", e.detail)}
  on:editCenter={(e) => updateCenter("editCenter", e.detail)}
  on:deleteCenter={(e) => updateCenter("deleteCenter", e.detail)}
/>
{#if alertMessage}
<Alert
message={alertMessage}
on:alertClosed={()=>{alertMessage= null}}
/>
{/if}
