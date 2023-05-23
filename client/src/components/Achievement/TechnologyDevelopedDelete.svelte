<script>
  import TextInput from "../../common/TextInput.svelte";
  import MonthYearInput from "../../common/MonthYearInput.svelte";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";

  
  export let technologyDeveloped = {
    nameofTechnologyDeveloped: null,
    patentPublished: null,
    trl:null,
  }

  let inputNameofTechnologyDeveloped = {
    label: "Name of Technology",
  };

  let inputPatentPublished = {
    label: "Patent Published ?",
  };
  let inputTRL = {
    label: "TRL",
  };
</script>

<TextInput
  bind:label={inputNameofTechnologyDeveloped.label}
  bind:value={technologyDeveloped.nameofTechnologyDeveloped}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputPatentPublished.label}
  bind:value={technologyDeveloped.patentPublished}
  validate={false}
  readonly={true}
  paddingsize={0}
/>

<TextInput
  bind:label={inputTRL.label}
  bind:value={technologyDeveloped.trl}
  validate={false}
  readonly={true}
  paddingsize={0}
/>