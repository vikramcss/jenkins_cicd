<script>
  import TextInput from "../../common/TextInput.svelte";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";

  export let patent = {
    patentStatus: null,
    title: null,
    author: null,
    patentType: null,
    yearOfSubmission: null,
    patentNumber: null,
  }
  let inputPatentStatus = {
    label: "Patent Status",
  };
  let inputTitle = {
    label: "Title Of Patent",
  };
  let inputAuthor = {
    label: "Authors",
  };
  let inputPatentType = {
    label: "Patent Type",
  };
  let inputYearOfSubmission = {
    label: "Year of Submission",
  };
  let inputPatentNumber = {
    label: "Patent Number",
  };
</script>

<TextInput
  bind:label={inputPatentStatus.label}
  bind:value={patent.patentStatus}
  paddingsize={0}
  validate={false}
  readonly={true}
  placeholderValue={''}
/>
<TextInput
  bind:label={inputTitle.label}
  bind:value={patent.title}
  paddingsize={0}
  validate={false}
  readonly={true}
  placeholderValue={''}
/>
<TextInput
  bind:label={inputAuthor.label}
  bind:value={patent.author}
  paddingsize={0}
  validate={false}
  readonly={true}
  placeholderValue={''}
/>
<TextInput
  bind:label={inputPatentType.label}
  bind:value={patent.patentType}
  paddingsize={0}
  validate={false}
  readonly={true}
  placeholderValue={''}
/>
<TextInput
  bind:label={inputYearOfSubmission.label}
  bind:value={patent.yearOfSubmission}
  paddingsize={0}
  validate={false}
  readonly={true}
  placeholderValue={''}
/>
<TextInput
  bind:label={inputPatentNumber.label}
  bind:value={patent.patentNumber}
  paddingsize={0}
  validate={false}
  readonly={true}
  placeholderValue={''}
/>
