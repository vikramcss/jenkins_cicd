<script>
  import TextInput from "../../common/TextInput.svelte";

  export let award = {
    nameofAward: null,
    sponsoringAgency: null,
    awardYear: null,
  }

  let inputNameofAward= {
    label: "Name of Award",
  };
  let inputSponsoringAgency= {
    label: "Sponsoring Agency Name",
  };

  let inputAwardYear = {
    label: "Award Year",
  };

</script>

<TextInput
  bind:label={inputNameofAward.label}
  bind:value={award.nameofAward}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputSponsoringAgency.label}
  bind:value={award.sponsoringAgency}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputAwardYear.label}
  bind:value={award.awardYear}
  validator={inputAwardYear.validator}
  validate={false}
  readonly={true}
  paddingsize={0}
/>