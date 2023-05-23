<script>
  import TextInput from "../../common/TextInput.svelte";

  export let bookChapter = {
    bookTitle: "",
    bookAuthor: "",
    nameOfBook: "",
    year: "",
    pages: "",
    publishingAgency: "",
    doi: "",
  };

  let inputBookTitle = {
    label: "Title Of The Chapter",
  };

  let inputBookAuthor = {
    label: "Authors",
  };

  let inputNameOfBook = {
    label: "Name Of Book",
  };

  let inputYear = {
    label: "Year",
  };

  let inputPages = {
    label: "Pages",
  };

  let inputPublishingAgency = {
    label: "Publishing Agency",
  };

  let inputDOI = {
    label: "DOI",
  };
</script>

<TextInput
  bind:label={inputBookTitle.label}
  bind:value={bookChapter.bookTitle}
  validate={false}
  readonly={true}
  paddingsize={0}
/>

<TextInput
  bind:label={inputBookAuthor.label}
  bind:value={bookChapter.bookAuthor}
  validate={false}
  readonly={true}
  paddingsize={0}
/>

<TextInput
  bind:label={inputNameOfBook.label}
  bind:value={bookChapter.nameOfBook}
  validate={false}
  readonly={true}
  paddingsize={0}
/>

<TextInput
  bind:label={inputYear.label}
  bind:value={bookChapter.year}
  validate={false}
  readonly={true}
  paddingsize={0}
/>

<TextInput
  bind:label={inputPages.label}
  bind:value={bookChapter.pages}
  validate={false}
  readonly={true}
  paddingsize={0}
/>

<TextInput
  bind:label={inputPublishingAgency.label}
  bind:value={bookChapter.publishingAgency}
  validate={false}
  readonly={true}
  paddingsize={0}
/>

<TextInput
  bind:label={inputDOI.label}
  bind:value={bookChapter.doi}
  validate={false}
  readonly={true}
  paddingsize={0}
/>
