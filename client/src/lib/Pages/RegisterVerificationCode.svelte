<script>
	import { api } from '../../api/api';
	import TextInput from '../../common/TextInput.svelte';
	import Alert from '../../common/Alert.svelte';
	import { createEventDispatcher } from 'svelte';
	import UnitCard from '../../common/UnitCard.svelte';

	let errorMsg = '';
	let dispatch = createEventDispatcher();
	export let company;
	export let gstNo;
	export let registeredUser;
	export let userVerified = false;

	const validateVerificationCode = async (value) => {
		verificationCode.error = null;
		if (isNaN(value)) return false;
		if (value.length !== 6) return false;

		let result = await api.validateVerificationCode({
			licenseNo: company.licenseNo,
			verificationId: registeredUser.verificationId,
			verificationCode: verificationCode.value
		});
		console.log('validateVerificationCode :', result);
		if (result.error !== 0) {
			verificationCode.error = result.errorMsg;
			return true;
		}
		registeredUser.login = result.login;
		userVerified = true;
		verificationCode.readonly = true;
		return true;
	};

	let verificationCode = {
		label: 'Enter Verification Code',
		value: '',
		// value: '',
		validate: true,
		readonly: false,
		error: null,
		placeholderValue: 'Verification Code',
		error_mt: false,
		paddingsize: 0,
		validator: {
			method: validateVerificationCode,
			errormessage: 'Enter valid 6 digit email verification code'
		}
	};

	const handleUserVerified = () => {
		if (!userVerified) return;
		dispatch('UserVerified', {});
	};

	const handlResendVerificationCode = async () => {
		verificationCode.value = null;
		let result = await api.registerLicensee({
			name: registeredUser.name,
			email: registeredUser.email,
			mobileno: registeredUser.mobileno,
			licenseInfo: {
				licenseType: company.licenseType,
				licenseNo: company.licenseNo,
				district: company.district
			}
		});
		if (result.error === 0) {
			registeredUser.verificationId = result.registrionResult.verificationId;
		}
	};
	const handlePrevious = () => {
		dispatch('Previous', {});
	};
</script>

<div class="flex flex-col space-y-3 container w-1/3 mx-auto p-5 m-5 bg-gray-100 rounded shadow-xl">
	<div class="bg-blue-500 text-white font-semibold p-3 mb-1 rounded">
		Register - Enter 'verification code' sent to your email
	</div>

	<!-- {JSON.stringify(company, null, 2)} -->
	<UnitCard {company} {gstNo} {registeredUser} />
	<div class="flex space-x-3 p-2">
		<TextInput
			bind:label={verificationCode.label}
			bind:value={verificationCode.value}
			validate={verificationCode.validate}
			bind:readonly={verificationCode.readonly}
			bind:error={verificationCode.error}
			placeholderValue={verificationCode.placeholderValue}
			error_mt={verificationCode.error_mt}
			bind:paddingsize={verificationCode.paddingsize}
			validator={verificationCode.validator}
		/>
		<div class="flex items-end">
			{#if !userVerified}
				<button
					on:click={handlResendVerificationCode}
					class="bg-navy-500 hover:bg-navy-700 text-white font-bold py-2 px-4 rounded"
				>
					Resend
				</button>
			{:else}
				<button class="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
					Resend
				</button>
			{/if}
		</div>
	</div>
	{#if errorMsg != ''}
		<Alert
			message={errorMsg}
			on:alertClosed={() => {
				errorMsg = '';
			}}
		/>
	{/if}
	{#if userVerified}
		<div class="flex justify-between">
			<button
				on:click={handlePrevious}
				class="bg-white-500 hover:bg-navy-700 hover:text-white border border-navy-500 text-blue-500 font-bold py-2 px-4 rounded"
			>
				Previous
			</button>
			<button
				on:click={() => handleUserVerified()}
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
