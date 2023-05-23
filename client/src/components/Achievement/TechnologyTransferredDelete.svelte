<script>
  import TextInput from "../../common/TextInput.svelte";
  import MonthYearInput from "../../common/MonthYearInput.svelte";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";


  export let technologyTransferred = {
    nameofTechnology: "",
    projectName: "",
    investigatorName: "",
    transferredToOrg: "",
    transferredYear: "",
    trl: "",
    costOfTechnology:"",
  }

  let inputNameofTechnology= {
    label: "Name of Technology",
  };
  let inputProjectName= {
    label: "Project Name",
  };

  let inputInvestigatorName= {
    label: "Investigator Name",
  };

  let inputTransferredToOrg= {
    label: "Transferred to Org Name",
  };

  let inputTransferredYear = {
    label: "Transferred Year",
  };

  let inputTRL = {
    label: "TRL",
  };

  let inputCostOfTechnology = {
    label: "Cost of Technology in laks(Rs)",
  };
</script>

<TextInput
  bind:label={inputNameofTechnology.label}
  bind:value={technologyTransferred.nameofTechnology}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputProjectName.label}
  bind:value={technologyTransferred.projectName}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputInvestigatorName.label}
  bind:value={technologyTransferred.investigatorName}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputTransferredToOrg.label}
  bind:value={technologyTransferred.transferredToOrg}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputTransferredYear.label}
  bind:value={technologyTransferred.transferredYear}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputTRL.label}
  bind:value={technologyTransferred.trl}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputCostOfTechnology.label}
  bind:value={technologyTransferred.costOfTechnology}
  validate={false}
  readonly={true}
  paddingsize={0}
/>