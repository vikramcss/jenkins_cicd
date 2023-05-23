<script>
	export let label = null;
	export let value;
	export let validate = false;
	export let readonly = false;
	export let error = null;
	export let placeholderValue = 'Bulk Liters';
	export let inputBoxSize = 'md:w-auto ';
	export let paddingsize = 1;
	export let error_mt = true;
	export let validator = null;
	export let inputType = 'text';

	const handleonkeyup = async () => {
		error = null;
		if (!validate) return;

		if (validator) {
			if (!(await validator.method(value))) {
				error = validator.errormessage;
			}
		} else if (isNaN(value) || value === '') {
			error = 'should be number';
		}
		return;
	};
</script>

<div class="flex flex-col w-full px-{paddingsize} mt-3 relative pt-3">
	<label class="absolute top-0 left-3 mt-1.5 px-2 uppercase font-semibold text-xs bg-white">{label}</label>
	{#if readonly}
		<input
			type="text"
			readonly
			bind:value
			on:keyup={handleonkeyup}
			placeholder={placeholderValue}
			class="{inputBoxSize} bg-white rounded 
			{error != null
				? 'border border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
				: 'border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
				} 
				text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	{:else if inputType !== 'password'}
		<input
			type="text"
			bind:value
			on:keyup={handleonkeyup}
			placeholder={placeholderValue}
			class="{inputBoxSize} bg-white rounded border {error != null
				? 'border border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
				: 'border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	{:else}
		<input
			type="password"
			bind:value
			on:keyup={handleonkeyup}
			placeholder={placeholderValue}
			class="{inputBoxSize} bg-white rounded border {error != null
				? 'border border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
				: 'border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	{/if}

	{#if error != null}
		<div class="relative">
			<span
				class="absolute {error_mt ? '-mt-1.5' : ''} text-xs leading-none text-red-700"
				id="passwordHelp"
				>{error}
			</span>
		</div>
	{/if}
</div>
