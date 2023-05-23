<script>
  import TextInput from "../../common/TextInput.svelte";

  export let project = {
    title: "",
    principalInvestigator: "",
    copi: "",
    fundingAgency: "",
    projectDurationFrom: "",
    projectDurationTo: "",
    projectOutlay: "",
  }

  let inputTitle = {
    label: "Title Of Project",
  };
  let inputPrincipalInvestigator = {
    label: "Name of Principal Invistigator",
  };
  let inputCopi= {
    label: "Co-P.I.",
  };
  let inputFundingAgency= {
    label: "Co-P.I.",
  };
  let inputProjectDurationFrom =
  {
    label: "Date Of Commencement",
  }
  let inputProjectDurationTo =
  {
    label: "Date Of Closure",
  }
  let inputProjectOutlay = {
    label: "Outlay of the project(in Lakhs)",
  };
</script>

<TextInput
  bind:label={inputTitle.label}
  bind:value={project.title}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputPrincipalInvestigator.label}
  bind:value={project.principalInvestigator}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputCopi.label}
  bind:value={project.copi}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputCopi.label}
  bind:value={project.fundingAgency}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputProjectDurationFrom.label}
  bind:value={project.projectDurationFrom}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputProjectDurationTo.label}
  bind:value={project.projectDurationTo}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
<TextInput
  bind:label={inputProjectOutlay.label}
  bind:value={project.projectOutlay}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
