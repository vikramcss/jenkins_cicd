this is sc category page
<script>
    import CandidateDetails from "../../../lib/Pages/candidateDetails.svelte";
    import { onMount } from "svelte";
    import {api} from '../../../api/api'
    import {adminToken} from '../../../stores/stores'

    let application;
    onMount(async()=> {
        console.log('token is ...',$adminToken)
        let {error,errorMsg,application:lapplication} = await api.getSCApplication({category:"SC",token:$adminToken})
        if(error){
            return errorMsg
        }
        application = lapplication
        console.log('application is ...',application)
    })
</script>
<!-- {JSON.stringify(application)} -->
<CandidateDetails {application} />