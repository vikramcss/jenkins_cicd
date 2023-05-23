<script>
    export let lable;
	export let dropdownOptions;
	export let selected = '';
	let show = false;
    $: selected === '' ? show = false : show = false;
</script>

<div>
	<div class="uppercase text-xs font-semibold">{lable}</div>
	<button
		on:click={() => {
			show = !show;
			console.log('onclick fired value of show is:', show)
		}}
		class="border border-blue-500 block rounded px-6 text-sm py-1 overflow-hidden focus:outline-none focus:border-2 focus:border-blue-500"
	>
		<div class="flex justify-between">
			<span>{selected === '' ? `Select ${lable}` : selected}</span>
			<svg
				class="fill-current text-blue-500"
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 0 24 24"
				width="24"
			>
				<path d="M7 10l5 5 5-5z" />
				<path d="M0 0h24v24H0z" fill="none" /></svg
			>
		</div>
	</button>
	{#if show}
		<div
			class="flex flex-col space-y-3 mt-2 py-4 bg-white rounded-lg shadow-xl border border-gray-500 px-2"
		>
			{#each Object.keys(dropdownOptions) as dropdownGroup}
				<div
					class="flex flex-wrap border border-gray-500 rounded space-x-2 space-y-3 relative py-3 w-40"
				>
					<span
						class="absolute -top-3  left-2 uppercase text-xs font-semibold bg-white px-1 py-1 rounded"
						>{dropdownGroup}</span
					>

					{#each dropdownOptions[dropdownGroup] as dropdownOption}
						<label
							class="cursor-pointer flex items-center justify-center select-none rounded w-auto p-1 text-xs font-semibold tracking-tighter border-blue-500 border
                                {selected.toString() === dropdownOption.toString()
								? 'bg-blue-500 text-white shadow-3xl transform duration-100 scale-110'
								: 'text-blue-500'} "
						>
							<input
								class="hidden"
								type="radio"
								bind:group={selected}
								name="dropdownOption"
								value={dropdownOption.toString()}
							/>
							{dropdownOption}
						</label>
					{/each}
					</div>
			{/each}
		</div>
	{/if}
</div>
