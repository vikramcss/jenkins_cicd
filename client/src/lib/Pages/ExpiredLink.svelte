<script>
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();
</script>

<div class="flex flex-col space-y-3 container w-1/3 mx-auto p-5 m-5 bg-gray-100 rounded shadow-xl">
	<div class="bg-gray-500 text-white font-bold p-3 mb-1 rounded">Your reset password link has expired.</div>

	<div class="flex justify-between">
		<button
			on:click={() => {
				dispatch('login', {});
			}}
			class="text-center bg-white text-navy-500 hover:text-navy-700 font-bold py-2 px-4 rounded border-2 border-navy-500 hover:border-navy-700"
		>
			Go back to login page
		</button>
		<button
			on:click={() => {
				dispatch('forgotPassword', {});
			}}
			class="bg-navy-500 hover:bg-navy-700} text-white font-bold py-2 px-4 rounded"
		>
			Reset Password
		</button>
	</div>
</div>
