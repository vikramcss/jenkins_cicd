<script>
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
	import { api } from '../../api/api';
	import TextInput from '../../common/TextInput.svelte';
	import Alert from '../../common/Alert.svelte';
	import { createEventDispatcher } from 'svelte';
	import UnitCard from '../../common/UnitCard.svelte';
	import PasswordInput from '../../common/PasswordInput.svelte';

	export let valid;
	export let error;
	export let errorMsg;
	export let login;
	export let resetId;

	let dispatch = createEventDispatcher();

	let passwordCriteria = {
		len: {
			satisfied: false
		},
		letters: {
			satisfied: false
		},
		specialchar: {
			satisfied: false
		},
		digits: {
			satisfied: false
		},
		reenter: {
			satisfied: false
		}
	};

	const validatePassword = (value) => {
		passwordCriteria.len.satisfied = false;
		passwordCriteria.letters.satisfied = false;
		passwordCriteria.digits.satisfied = false;
		passwordCriteria.specialchar.satisfied = false;

		reenterPassword.error = validateReenterPassword(reenterPassword.value)
			? null
			: reenterPassword.validator.errormessage;

		if (value.length >= 8 && value.length <= 15) passwordCriteria.len.satisfied = true;
		if (/[a-zA-Z]/.test(value)) passwordCriteria.letters.satisfied = true;
		if (/[ !\\"#$%&'\(\)\*\+,-\.:;<=>\?@\[\\\]\^_`\{\|\}~]/.test(value))
			passwordCriteria.specialchar.satisfied = true;
		if (/[0-9]/.test(value)) passwordCriteria.digits.satisfied = true;

		if (
			passwordCriteria.len.satisfied === false ||
			passwordCriteria.letters.satisfied === false ||
			passwordCriteria.digits.satisfied === false ||
			passwordCriteria.specialchar.satisfied === false
		)
			return false;

		return true;
	};

	const validateReenterPassword = (value) => {
		passwordCriteria.reenter.satisfied = false;

		if (value != password.value) return false;

		passwordCriteria.reenter.satisfied = true;
		return true;
	};

	const resetPassword = async () => {
		let result = await api.resetPassword({ resetId, login, password: password.value });
		if (result.error !== 0) {
			errorMsg = result.errorMsg;
			return false;
		}
		dispatch('resetpasswordsuccess', {});
		return true;
	};

	let loginId = {
		label: 'Login Id',
		value: '',
		validate: false,
		readonly: true,
		error: null,
		placeholderValue: '',
		error_mt: false,
		paddingsize: 0,
		validator: null
	};
	loginId.value = login;

	let password = {
		label: 'Password',
		value: '',
		validate: true,
		readonly: false,
		error: null,
		placeholderValue: 'Password',
		error_mt: false,
		paddingsize: 0,
		validator: { method: validatePassword, errormessage: 'Please enter valid password' }
	};

	let reenterPassword = {
		label: 'Reenter Password',
		value: '',
		validate: true,
		readonly: false,
		error: null,
		placeholderValue: 'Password',
		error_mt: false,
		paddingsize: 0,
		validator: {
			method: validateReenterPassword,
			errormessage: 'Passwords do not match'
		}
	};

	$: buttonDisabled =
		!validatePassword(password.value) || !validateReenterPassword(reenterPassword.value);

	let inputType = 'text';
</script>

<div class="flex flex-col space-y-3 container lg:w-1/3 mx-auto p-5 m-5 bg-gray-100 rounded shadow-xl">
	<div class="bg-blue-500 text-white font-semibold p-3 mb-1 rounded">Reset Password</div>

	<div>
		<TextInput
			bind:label={loginId.label}
			bind:value={loginId.value}
			validate={loginId.validate}
			readonly={loginId.readonly}
			bind:error={loginId.error}
			placeholderValue={loginId.placeholderValue}
			error_mt={loginId.error_mt}
			bind:paddingsize={loginId.paddingsize}
			validator={loginId.validator}
		/>
		<div class="flex justify-between">
			<PasswordInput
				bind:label={password.label}
				bind:value={password.value}
				validate={password.validate}
				readonly={password.readonly}
				bind:error={password.error}
				placeholderValue={password.placeholderValue}
				error_mt={password.error_mt}
				bind:paddingsize={password.paddingsize}
				validator={password.validator}
			/>
		</div>

		<div class="grid grid-cols-1 justify-items-end text-xs font-semibold pr-3">
			<div class={passwordCriteria.letters.satisfied ? 'text-gray-700' : 'text-red-500'}>
				{#if passwordCriteria.letters.satisfied}
					<Fa icon={faCheck} size="xs" pull="left" class="mt-1.5 mr-1" />
				{:else}
					<Fa icon={faTimes} size="xs" pull="left" class="mt-1.5 mr-1" />
				{/if}
				[letter]
			</div>
			<div class={passwordCriteria.digits.satisfied ? 'text-gray-700' : 'text-red-500'}>
				{#if passwordCriteria.digits.satisfied}
					<Fa icon={faCheck} size="xs" pull="left" class="mt-1.5 mr-1" />
				{:else}
					<Fa icon={faTimes} size="xs" pull="left" class="mt-1.5 mr-1" />
				{/if}
				[digit]
			</div>
			<div class={passwordCriteria.specialchar.satisfied ? 'text-gray-700' : 'text-red-500'}>
				{#if passwordCriteria.specialchar.satisfied}
					<Fa icon={faCheck} size="xs" pull="left" class="mt-1.5 mr-1" />
				{:else}
					<Fa icon={faTimes} size="xs" pull="left" class="mt-1.5 mr-1" />
				{/if}
				[special char like @,#,$,%,^,&,*]
			</div>
			<div class={passwordCriteria.len.satisfied ? 'text-gray-700' : 'text-red-500'}>
				{#if passwordCriteria.len.satisfied}
					<Fa icon={faCheck} size="xs" pull="left" class="mt-1.5 mr-1" />
				{:else}
					<Fa icon={faTimes} size="xs" pull="left" class="mt-1.5 mr-1" />
				{/if}
				[length 8-15]
			</div>
		</div>

		<PasswordInput
			bind:label={reenterPassword.label}
			bind:value={reenterPassword.value}
			validate={reenterPassword.validate}
			readonly={reenterPassword.readonly}
			bind:error={reenterPassword.error}
			placeholderValue={reenterPassword.placeholderValue}
			error_mt={reenterPassword.error_mt}
			bind:paddingsize={reenterPassword.paddingsize}
			validator={reenterPassword.validator}
		/>
		<div class="grid grid-cols-1 justify-items-end text-xs font-semibold pr-3">
			<div class={passwordCriteria.reenter.satisfied ? 'text-gray-700' : 'text-red-500'}>
				{#if passwordCriteria.reenter.satisfied}
					<Fa icon={faCheck} size="xs" pull="left" class="mt-1.5 mr-1" />
				{:else}
					<Fa icon={faTimes} size="xs" pull="left" class="mt-1.5 mr-1" />
				{/if}
				[passwords match]
			</div>
		</div>
	</div>

	{#if errorMsg}
		<Alert
			message={errorMsg}
			on:alertClosed={() => {
				errorMsg = null;
			}}
		/>
	{/if}

	<div class="flex justify-center pt-4">
		<button
			disabled={buttonDisabled}
			on:click={() => resetPassword()}
			class="{buttonDisabled
				? 'bg-gray-500'
				: 'bg-orange-500 hover:bg-orange-700'} text-white font-bold py-2 px-4 rounded"
			>Reset Password
		</button>
	</div>
</div>
