<script>
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();
</script>

<div class="flex flex-col space-y-3 container w-1/3 mx-auto p-5 m-5 bg-gray-100 rounded shadow-xl">
	<div class="bg-blue-500 text-white font-bold p-3 mb-1 rounded">
		Your password has been successfully changed.
	</div>
	<div class="flex justify-center">
		<button
			on:click={() => {
				dispatch('login', {});
			}}
			class="bg-navy-500 hover:bg-navy-700 text-white font-bold py-2 px-4 rounded"
		>
			Go back to login page
		</button>
	</div>
</div>
