<script>
	import { api } from '../../api/api';
	import TextInput from '../../common/TextInput.svelte';
	import Alert from '../../common/Alert.svelte';
	import { createEventDispatcher } from 'svelte';
	import { validateEmail, validateMobile } from '../../common/validators';
	import UnitCard from '../../common/UnitCard.svelte';

	let errorMsg = '';
	let dispatch = createEventDispatcher();
	let gstVerified = false;
	let unitNameVerified = false;
	export let company;

	const validateGst = async (value) => {
		errorMsg = '';
		if (gstVerified) return true;
		if (value.length == 0) return false;
		if (value.length != 4) {
			// errorMsg = 'Please enter last four digits/alphbets of GST';
			return false;
		}
		let reply = await api.validateGstLastFour({ company, gstLastFour: value });
		if (reply.error != 0) {
			// errorMsg = reply.errorMsg;
			return false;
		}
		gstNo.readonly = true;
		gstVerified = true;
		gstNo.label = `Last four letters of GST no [Verified]`;
		return true;
	};
	let gstNo = {
		label: 'Enter Last four digits/letters of GST No',
		value: 'A1Z5',
		// value: '',
		validate: true,
		readonly: false,
		error: null,
		placeholderValue: 'Enter Last four digits/letters of GST No',
		error_mt: false,
		paddingsize: 0,
		validator: {
			method: validateGst,
			errormessage: 'Please enter last four digits/letters of GST No'
		}
	};
	const handleVerifyUnit = () => {
		dispatch('Verified', { gstNo: gstNo.value });
	};
	const handlePrevious = () => {
		dispatch('Previous', { gstNo: gstNo.value });
	}
</script>

<div class="flex flex-col space-y-3 container w-1/3 mx-auto p-5 m-5 bg-gray-100 rounded shadow-xl">
	<div class="bg-blue-500 text-white font-semibold p-3 mb-1 rounded">Register - Verify Unit</div>
	<UnitCard {company} />
	<label>
		<input type="checkbox" bind:checked={unitNameVerified} />
		Yes I have verified, Unit Name, Licese No and Licese Type. I am representing this Unit for monthly
		production returns filing.
	</label>
	{#if unitNameVerified}
	<div class="pb-4">

		<TextInput
			bind:label={gstNo.label}
			bind:value={gstNo.value}
			validate={gstNo.validate}
			bind:readonly={gstNo.readonly}
			bind:error={gstNo.error}
			placeholderValue={gstNo.placeholderValue}
			error_mt={gstNo.error_mt}
			bind:paddingsize={gstNo.paddingsize}
			validator={gstNo.validator}
		/>
	</div>
	{/if}
	{#if errorMsg != ''}
		<Alert
			message={errorMsg}
			on:alertClosed={() => {
				errorMsg = '';
			}}
		/>
	{/if}
		{#if gstVerified}
		<div class="flex justify-between">
			<button
				on:click={handlePrevious}
				class="bg-white-500 hover:bg-navy-700 hover:text-white border border-navy-500 text-blue-500 font-bold py-2 px-4 rounded"
			>
				Previous
			</button>
			<button
				on:click={() => handleVerifyUnit()}
				class="bg-navy-500 hover:bg-navy-700 text-white font-bold py-2 px-4 rounded"
			>
				Next
			</button>

		</div>
		{:else}
		<div class="flex justify-between">
			<button 
				on:click={handlePrevious}
				class="bg-white-500 hover:bg-navy-700 hover:text-white border border-navy-500 text-blue-500 font-bold py-2 px-4 rounded"
			>
				Previous
			</button>
			<button class="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
				Next
			</button>
		</div>
		{/if}
</div>
