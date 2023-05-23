<script>
	export let company;
	export let gstNo = null;
	export let registeredUser = null;
</script>

<div class="grid grid-cols-2 rounded-md bg-indigo-100 py-2">
	<div class="col-span-2 m-2 border-2 border-gray-300 rounded">
		<div class="grid grid-cols-11">
			<div
				class="col-span-2 text-sm text-left text-gray-200 font-semibold -mt-3 ml-2 pl-3 bg-gray-600 rounded-md"
			>
				Unit
			</div>
			<div class="col-span-11 text-lg mx-2 p-2">{company.unitname}</div>
			<div class="col-span-11 mx-2 p-2 text-sm">
				{company.address.lane}, {company.address.area},
				<p>
					City: {company.address.city}, Tal: {company.address.tal}, District: {company.address
						.district}, {company.address.pin}
				</p>
			</div>
		</div>
	</div>
	<div class="col-span-1 m-2 border-2 border-gray-300 rounded">
		<div class="grid grid-cols-12">
			<div
				class="col-span-7 text-sm text-left text-gray-200 font-semibold -mt-3 ml-2 pl-3 bg-gray-600 rounded-md"
			>
				Licence
			</div>
			<div class="col-span-5" />
			<div class="col-span-6 text-left text-lg mx-2 p-2">{company.licenseNo}</div>
			<div class="col-span-6 text-left text-lg mx-2 p-2">{company.licenseType}</div>
		</div>
	</div>
	<div class="col-span-1 m-2 border-2 border-gray-300 rounded">
		<div class="grid grid-cols-12">
			<div
				class="col-span-8 text-sm text-left text-gray-200 font-semibold -mt-3 ml-2 pl-3 bg-gray-600 rounded-md"
			>
				Excise District
			</div>
			<div class="col-span-8" />
			<div class="col-span-12 text-left text-lg mx-2 p-2">{company.district}</div>
		</div>
	</div>
	{#if gstNo}
		<div class="col-span-2 m-2 border-2 border-gray-300 rounded">
			<div class="grid grid-cols-11">
				<div
					class="col-span-5 text-sm text-left text-gray-200 font-semibold -mt-3 ml-2 pl-3 bg-gray-600 rounded-md"
				>
					GST Last Four
				</div>
				<div class="col-span-11 text-lg mx-2 p-2">
					***********{gstNo}
				</div>
			</div>
		</div>
	{/if}
	{#if registeredUser}
		<div class="col-span-2 m-2 border-2 border-gray-300 rounded">
			<div class="grid grid-cols-11">
				<div
					class="col-span-5 text-sm text-left text-gray-200 font-semibold -mt-3 ml-2 pl-3 bg-gray-600 rounded-md"
				>
					Contact Details
				</div>
				<div class="col-span-11 mx-2 p-2 text-lg">
					{registeredUser.name}, <p class="text-sm">{registeredUser.email}, {registeredUser.mobileno} </p>				</div>
			</div>
		</div>
	{/if}
</div>
