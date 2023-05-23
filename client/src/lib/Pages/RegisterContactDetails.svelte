<script>
	import { api } from '../../api/api';
	import TextInput from '../../common/TextInput.svelte';
	import Alert from '../../common/Alert.svelte';
	import { createEventDispatcher } from 'svelte';
	import { validateEmail, validateMobile } from '../../common/validators';
	import UnitCard from '../../common/UnitCard.svelte';

	let gstLabel = 'Last four letters of GST no';
	let gstLastFour = '';
	let errorGstLastfour = null;
	let paddingsize = 0;
	let errorMsg = '';
	let dispatch = createEventDispatcher();
	let gstVerified = false;
	let unitNameVerified = false;
	let registrationRequestDone = false;
	let verificationId = null;
	export let company;
	export let gstNo;

	const validateName = (value) => {
		if (value.length < 3) return false;
		return true;
	};
	const registerUser = async () => {
		errorMsg = '';
		if (gstNo.error || name.error || email.error || mobileno.error) {
			console.log('returning from wrong place');
			console.log(`${gstNo.error} ${name.error} ${email.error} ${mobileno.error}`);
			errorMsg = 'Please check errors in the form';
			return false;
		}
		let result = await api.registerLicensee({
			name: name.value,
			email: email.value,
			mobileno: mobileno.value,
			licenseInfo: {
				licenseType: company.licenseType,
				licenseNo: company.licenseNo,
				district: company.district
			}
		});
		if (result.error === 0) {
			verificationId = result.registrionResult.verificationId;
			dispatch('UserRegistered', {
				name: name.value,
				email: email.value,
				mobileno: mobileno.value,
				verificationId,
				login: null,
			});
		}
	};

	const handlePrevious = () => {
		dispatch('Previous', {});
	};
	let name = {
		label: 'Enter your Name',
		value: 'Sangram Barge',
		// value: '',
		validate: true,
		readonly: false,
		error: null,
		placeholderValue: 'Enter your Name',
		error_mt: false,
		paddingsize: 0,
		validator: { method: validateName, errormessage: 'Name must be atleast 3 charactors long' }
	};
	let email = {
		label: 'Email',
		// value: '',
		value: 'smbarge@gmail.com',
		validate: true,
		readonly: false,
		error: null,
		placeholderValue: 'Email',
		error_mt: false,
		paddingsize: 0,
		validator: { method: validateEmail, errormessage: 'Please enter valiml-2 pl-1mail id' }
	};
	let mobileno = {
		label: 'Mobile No [10 digit]',
		value: '8805027292',
		// value: '',
		validate: true,
		readonly: false,
		error: null,
		placeholderValue: 'Mobile No',
		error_mt: false,
		paddingsize: 0,
		validator: { method: validateMobile, errormessage: 'Please enter valid 10 digit mobile number' }
	};
</script>

<div class="flex flex-col space-y-3 container w-1/3 mx-auto p-5 m-5 bg-gray-100 rounded shadow-xl">
	<div class="bg-blue-500 text-white font-semibold p-3 mb-1 rounded">Register - Contact Person</div>

	<!-- {JSON.stringify(company, null, 2)} -->
	<UnitCard {company} {gstNo} />

	<div>
		<TextInput
			bind:label={name.label}
			bind:value={name.value}
			validate={name.validate}
			readonly={name.readonly}
			bind:error={name.error}
			placeholderValue={name.placeholderValue}
			error_mt={name.error_mt}
			bind:paddingsize={name.paddingsize}
			validator={name.validator}
		/>
		<TextInput
			bind:label={email.label}
			bind:value={email.value}
			validate={email.validate}
			readonly={email.readonly}
			bind:error={email.error}
			placeholderValue={email.placeholderValue}
			error_mt={email.error_mt}
			bind:paddingsize={email.paddingsize}
			validator={email.validator}
		/>
		<TextInput
			bind:label={mobileno.label}
			bind:value={mobileno.value}
			validate={mobileno.validate}
			readonly={mobileno.readonly}
			bind:error={mobileno.error}
			placeholderValue={mobileno.placeholderValue}
			error_mt={mobileno.error_mt}
			bind:paddingsize={mobileno.paddingsize}
			validator={mobileno.validator}
		/>
	</div>
	{#if errorMsg != ''}
		<Alert
			message={errorMsg}
			on:alertClosed={() => {
				errorMsg = '';
			}}
		/>
	{/if}
	<div class="flex justify-between">
		<button
			on:click={handlePrevious}
			class="bg-white-500 hover:bg-navy-700 hover:text-white border border-navy-500 text-blue-500 font-bold py-2 px-4 rounded"
		>
			Previous
		</button>
		<button
			on:click={() => registerUser()}
			class="bg-navy-500 hover:bg-navy-700 text-white font-bold py-2 px-4 rounded"
		>
			Next
		</button>
	</div>
</div>
