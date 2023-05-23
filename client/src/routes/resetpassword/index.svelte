<script>
	import TextInput from '../../common/TextInput.svelte';
	import { goto } from '$app/navigation';
	import { api } from '../../api/api';
	import Alert from '../../common/Alert.svelte';

	let userId = '';
	let errMsg = '';

	const login = async () => {
		const result = await api.forgotPassword({ login: userId });
		if (result.success) {
			alert(
				'A link has been sent to your registered email ID. This link will expire in 5 minutes.'
			);
		} else {
			errMsg = result.errorMsg;
		}
	};
</script>

<div class="flex flex-col space-y-3 container lg:w-1/3 w-full mx-auto p-5 m-5 bg-gray-100 rounded shadow-xl">
	<div class="bg-blue-500 text-white font-semibold p-3 mb-3 rounded">Forgot Password</div>
	<TextInput label="User Id" placeholderValue="User Id" bind:value={userId} />
	{#if errMsg}
		<div class="mt-2">
			<Alert
				on:alertClosed={() => {
					errMsg = null;
				}}
				message={errMsg}
			/>
		</div>
	{/if}
	<div class="flex justify-between pt-3">
		<button
			on:click={() => goto('/signin')}
			class="text-center bg-white shadow-lg text-navy-500 hover:text-navy-700 font-bold py-2 px-4 rounded border-2 border-navy-500 hover:border-navy-700"
		>
			Go back
		</button>
		<button
			on:click={login}
			class="bg-navy-500 hover:bg-navy-700 text-white font-bold py-2 px-4 rounded"
		>
			Send link
		</button>
	</div>
</div>
