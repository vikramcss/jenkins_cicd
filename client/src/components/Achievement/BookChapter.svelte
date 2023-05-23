<script>
  import TextInput from "../../common/TextInput.svelte";

  export let bookChapter = {
    bookTitle: "",
    bookAuthor: "",
    nameOfBook: "",
    year:"",
    pages:"",
    publishingAgency:"",
    doi: "",
  }

  let inputBookTitle= {
    label: "Title Of The Chapter",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Title Of The Chapter",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputBookTitle.error = null;
        if (value.length < 3) {
          inputBookTitle.error = inputBookTitle.validator.errormessage 
          return false;
        }
        return true;
      },
      errormessage: "Title Must Entered",
    },
  };

  let inputBookAuthor= {
    label: "Authors",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Authors",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputBookAuthor.error = null;
        if (value.length < 3) {
          inputBookAuthor.error = inputBookAuthor.validator.errormessage 
          return false;
        }
        return true;
      },
      errormessage: "Author Must Entered",
    },
  };

  let inputNameOfBook= {
    label: "Name Of Book",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name Of Book",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputNameOfBook.error = null;
        if (value.length < 3) {
          inputNameOfBook.error = inputNameOfBook.validator.errormessage 
          return false;
        }
        return true;
      },
      errormessage: "Name of Book Must Entered",
    },
  };

  let inputYear= {
    label: "Year",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Year",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputYear.error = null;
        if (!value || isNaN(value) || (Number(value) < 1975  || Number(value) > 2023)) {
          inputYear.error = inputYear.validator.errormessage 
          return false;
        }
        return true;
      },
      errormessage: "Year between 1975 and 2002 must be entered"
    },
  };

  let inputPages= {
    label: "Pages",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Pages",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputPages.error = null;
        if (value.length < 1) {
          inputPages.error = inputPages.validator.errormessage 
          return false;
        }
        return true;
      },
      errormessage: "pages Must Entered",
    },
  };

  let inputPublishingAgency= {
    label: "Publishing Agency",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Publishing Agency",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputPublishingAgency.error = null;
        if (value.length < 3) {
          inputPublishingAgency.error = inputPublishingAgency.validator.errormessage 
          return false;
        }
        return true;
      },
      errormessage: "Publishing Agency Must Entered",
    },
  };

  let inputDOI = {
    label: "DOI",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "DOI",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputDOI.error = null;
        if (!value || value.length < 3) {
          inputDOI.error = inputDOI.validator.errormessage 
          return false;
        }
        return true;
      },
      errormessage: "DOI should be atleast 3 chars long",
    },
  };

  const validateInput = () => {
    let valid = true;
    if (!inputBookTitle.validator.method(bookChapter.bookTitle)) {
      valid = false;
    }
    if (!inputBookAuthor.validator.method(bookChapter.bookAuthor)) {
      valid = false;
    }
    if (!inputNameOfBook.validator.method(bookChapter.nameOfBook)) {
      valid = false;
    }
    if (!inputYear.validator.method(bookChapter.year)) {
      valid = false;
    }
    if (!inputPages.validator.method(bookChapter.pages)) {
      valid = false;
    }
    if (!inputPublishingAgency.validator.method(bookChapter.publishingAgency)) {
      valid = false;
    }
    if (!inputDOI.validator.method(bookChapter.doi)) {
      valid = false;
    }
    if (!valid) return false;
    return true;
  };
  export let validate;
  validate = validateInput;
</script>

<TextInput
  bind:label={inputBookTitle.label}
  bind:value={bookChapter.bookTitle}
  validate={inputBookTitle.validate}
  readonly={inputBookTitle.readonly}
  bind:error={inputBookTitle.error}
  placeholderValue={inputBookTitle.placeholderValue}
  error_mt={inputBookTitle.error_mt}
  bind:paddingsize={inputBookTitle.paddingsize}
  validator={inputBookTitle.validator}
/>

<TextInput
  bind:label={inputBookAuthor.label}
  bind:value={bookChapter.bookAuthor}
  validate={inputBookAuthor.validate}
  readonly={inputBookAuthor.readonly}
  bind:error={inputBookAuthor.error}
  placeholderValue={inputBookAuthor.placeholderValue}
  error_mt={inputBookAuthor.error_mt}
  bind:paddingsize={inputBookAuthor.paddingsize}
  validator={inputBookAuthor.validator}
/>

<TextInput
  bind:label={inputNameOfBook.label}
  bind:value={bookChapter.nameOfBook}
  validate={inputNameOfBook.validate}
  readonly={inputNameOfBook.readonly}
  bind:error={inputNameOfBook.error}
  placeholderValue={inputNameOfBook.placeholderValue}
  error_mt={inputNameOfBook.error_mt}
  bind:paddingsize={inputNameOfBook.paddingsize}
  validator={inputNameOfBook.validator}
/>

<TextInput
  bind:label={inputYear.label}
  bind:value={bookChapter.year}
  validate={inputYear.validate}
  readonly={inputYear.readonly}
  bind:error={inputYear.error}
  placeholderValue={inputYear.placeholderValue}
  error_mt={inputYear.error_mt}
  bind:paddingsize={inputYear.paddingsize}
  validator={inputYear.validator}
/>

<TextInput
  bind:label={inputPages.label}
  bind:value={bookChapter.pages}
  validate={inputPages.validate}
  readonly={inputPages.readonly}
  bind:error={inputPages.error}
  placeholderValue={inputPages.placeholderValue}
  error_mt={inputPages.error_mt}
  bind:paddingsize={inputPages.paddingsize}
  validator={inputPages.validator}
/>


<TextInput
  bind:label={inputPublishingAgency.label}
  bind:value={bookChapter.publishingAgency}
  validate={inputPublishingAgency.validate}
  readonly={inputPublishingAgency.readonly}
  bind:error={inputPublishingAgency.error}
  placeholderValue={inputPublishingAgency.placeholderValue}
  error_mt={inputPublishingAgency.error_mt}
  bind:paddingsize={inputPublishingAgency.paddingsize}
  validator={inputPublishingAgency.validator}
/>

<TextInput
  bind:label={inputDOI.label}
  bind:value={bookChapter.doi}
  validate={inputDOI.validate}
  readonly={inputDOI.readonly}
  bind:error={inputDOI.error}
  placeholderValue={inputDOI.placeholderValue}
  error_mt={inputDOI.error_mt}
  bind:paddingsize={inputDOI.paddingsize}
  validator={inputDOI.validator}
/>