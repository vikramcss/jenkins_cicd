<script>
  import { page } from "$app/stores";
  import Dashboard from "$lib/Pages/Dashboard.svelte";
  import { goto } from "$app/navigation";
  import { api } from "../../../api/api";
  import { token, availablePosts } from "../../../stores/stores";
  import Alert from "../../../common/Alert.svelte";

  import { onMount } from "svelte";

  let application = null;
  let appid = "";
  let alertMsg;
  let _availablePosts = null;
  let dataloaded = false;
  let postId = $page.params.postId;

  onMount(async () => {
    console.log("onMount called for application route");
    try {
      // if not logged in goto signin
      if (!$token) goto("/signin");
      // get application if ther is one
      let {
        error,
        errorMsg: lerrorMsg,
        login: llogin,
        mobile: lmobile,
        application: lapplication,
      } = await api.getApplication({ token: $token });
      console.log("error:", error);
      // get available posts in the advertisement
      application = lapplication;
      appid = application.appid;
      let {
        error: lerror1,
        errorMsg: lerrorMsg1,
        availablePosts: lavailablePosts,
      } = await api.getAvailablePosts({ token: $token });
      if (lerror1) {
        alertMsg = lerrorMsg1;
        return;
      }
      _availablePosts = [...lavailablePosts];
      console.log("available posts: ", _availablePosts);
      $availablePosts = [..._availablePosts];
      dataloaded = true;
    } catch (e) {
      console.log("error in communicating with server: ", e);
      alertMsg = e;
    }
  });
</script>

{#if alertMsg}
  <Alert message={alertMsg} on:alertClosed={() => (alertMsg = null)} />
{:else if dataloaded}
  <Dashboard
    {application}
    {appid}
    {postId}
    availablePosts={_availablePosts}
    on:qualifications={() => goto(`/application/${postId}/${appid}`)}
  />
{/if}
