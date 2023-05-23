<script>
  import TextInput from "../../common/TextInput.svelte";
  export let publishedPaper = {
    title: "",
    author: null,
    nameOfJournal: null,
    year: null,
    pages: null,
    impactFactor: null,
    doi: null,
  };
  let inputTitle = {
    label: "Title of Manuscript",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Title of Manuscript",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        console.log('inputTitle validor method called')
        inputTitle.error = null;
        if (value == null || value.length < 3) {
          inputTitle.error = "Title of Manuscript should be at least 3 chars long";
          console.log('input error is :', inputTitle.error)
          return false;
        }
        return true;
      },
      errormessage: "Title of Manuscript should be at least 3 chars long",
    },
  };
  let inputAuthor = {
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
        inputAuthor.error = null;
        if (!value || value.length < 3) {
          inputAuthor.error = "Author should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Author should be at least 3 chars long",
    },
  };
  let inputNameOfJournal = {
    label: "Name of Journal",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name of Journal",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputNameOfJournal.error = null;
        if (!value || value.length < 3) {
          inputNameOfJournal.error =
            "Name of Journal should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Name of Journal be at least 3 chars long",
    },
  };
  let inputYear = {
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
        if (!value || isNaN(value)) {
          inputYear.error = "Year should be between 1975 and 2023";
          return false;
        }
        if (Number(value) < 1975 || Number(value) > 2023) {
          inputYear.error = "Year should be between 1975 and 2023";
          return false;
        }
        return true;
      },
      errormessage: "Year should be between 1975 and 2023",
    },
  };
  let inputPages = {
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
        if (!value || isNaN(value)) {
          inputPages.error = "Pages should be at least 1 digit number";
          return false;
        }
        if (value.length < 1) {
          inputPages.error = "Pages should be at least 1 digit number";
          return false;
        }
        return true;
      },
      errormessage: "Pages should be at least 1 digit number",
    },
  };
  let inputImpactFactor = {
    label: "Impact Factor",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Impact Factor",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputImpactFactor.error = null;
        if (!value || value.length < 3) {
          inputImpactFactor.error =
            "Impact factor should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Impact factor should be at least 3 chars long",
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
          inputDOI.error = "DOI should be atleast 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "DOI should be atleast 3 chars long",
    },
  };

  const validateInput = () => {
    let valid = true;
    if (!inputTitle.validator.method(publishedPaper.title)) {
      valid = false;
    }
    if (!inputAuthor.validator.method(publishedPaper.author)) {
      valid = false;
    }
    if (!inputNameOfJournal.validator.method(publishedPaper.nameOfJournal)) {
      valid = false;
    }
    if (!inputYear.validator.method(publishedPaper.year)) {
      valid = false;
    }
    if (!inputPages.validator.method(publishedPaper.pages)) {
      valid = false;
    }
    if (!inputImpactFactor.validator.method(publishedPaper.impactFactor)) {
      valid = false;
    }
    if(!valid) return false;
    return true;
  };
  export let validate = validateInput;
  validate = validateInput;
</script>

<TextInput
  bind:label={inputTitle.label}
  bind:value={publishedPaper.title}
  validate={inputTitle.validate}
  readonly={inputTitle.readonly}
  bind:error={inputTitle.error}
  placeholderValue={inputTitle.placeholderValue}
  error_mt={inputTitle.error_mt}
  bind:paddingsize={inputTitle.paddingsize}
  validator={inputTitle.validator}
/>
<TextInput
  bind:label={inputAuthor.label}
  bind:value={publishedPaper.author}
  validate={inputAuthor.validate}
  readonly={inputAuthor.readonly}
  bind:error={inputAuthor.error}
  placeholderValue={inputAuthor.placeholderValue}
  error_mt={inputAuthor.error_mt}
  bind:paddingsize={inputAuthor.paddingsize}
  validator={inputAuthor.validator}
/>
<TextInput
  bind:label={inputNameOfJournal.label}
  bind:value={publishedPaper.nameOfJournal}
  validate={inputNameOfJournal.validate}
  readonly={inputNameOfJournal.readonly}
  bind:error={inputNameOfJournal.error}
  placeholderValue={inputNameOfJournal.placeholderValue}
  error_mt={inputNameOfJournal.error_mt}
  bind:paddingsize={inputNameOfJournal.paddingsize}
  validator={inputNameOfJournal.validator}
/>
<TextInput
  bind:label={inputYear.label}
  bind:value={publishedPaper.year}
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
  bind:value={publishedPaper.pages}
  validate={inputPages.validate}
  readonly={inputPages.readonly}
  bind:error={inputPages.error}
  placeholderValue={inputPages.placeholderValue}
  error_mt={inputPages.error_mt}
  bind:paddingsize={inputPages.paddingsize}
  validator={inputPages.validator}
/>
<TextInput
  bind:label={inputImpactFactor.label}
  bind:value={publishedPaper.impactFactor}
  validate={inputImpactFactor.validate}
  readonly={inputImpactFactor.readonly}
  bind:error={inputImpactFactor.error}
  placeholderValue={inputImpactFactor.placeholderValue}
  error_mt={inputImpactFactor.error_mt}
  bind:paddingsize={inputImpactFactor.paddingsize}
  validator={inputImpactFactor.validator}
/>
<TextInput
  bind:label={inputDOI.label}
  bind:value={publishedPaper.doi}
  validate={inputDOI.validate}
  readonly={inputDOI.readonly}
  bind:error={inputDOI.error}
  placeholderValue={inputDOI.placeholderValue}
  error_mt={inputDOI.error_mt}
  bind:paddingsize={inputDOI.paddingsize}
  validator={inputDOI.validator}
/>
