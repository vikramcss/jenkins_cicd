<script>
	import { api } from '../../api/api';
	import TextInput from '../../common/TextInput.svelte';
	import DistrictDropdown from '../../common/TwoDDropdown.svelte';
	import LicenseDropdown from '../../common/TwoDDropdown.svelte';
	import { exciseDistricts, licenses } from '../../data/golobalData';
	import Alert from '../../common/Alert.svelte';
	import { createEventDispatcher } from 'svelte';

	let licenseNolabel = 'License No';
	let licenseNo = '';
	let validate = true;
	let readonly = false;
	let errorLicenseNo = null;
	let placeholderValue = 'License No';
	let error_mt = false;
	let paddingsize = 0;
	let licenseType = '';
	let errorMsg = '';
	let shouldCallApi = false;
	let dispatch = createEventDispatcher();

	const checkLicenseNo = ({ licenseNo, licenseType }) => {
		if (licenseNo != '' && !isNaN(licenseNo) && licenseType != 0) {
			shouldCallApi = true;
		} else {
			shouldCallApi = false;
		}
	};
	let show = false;
	$: checkLicenseNo({ licenseNo, licenseType });
	let district = '';
	$: console.log('selected district is:', district);
	const validForm = () => {
		if (district === '' || licenseType === '' || licenseNo === '' || isNaN(Number(licenseNo))) {
			errorMsg = 'You must select District, Licese Type and valid LicenseNo';
			return false;
		}
		return true;
	};
	const findCompany = async () => {
		errorMsg = '';
		if (!validForm()) {
			errorMsg = 'You must select District, Licese Type and valid LicenseNo';
			return false;
		}
		try {
			let reply = await api.findCompany({ district, licenseType, licenseNo });
			if (reply.error != 0) {
				errorMsg = reply.errorMsg;
				return;
			}
			dispatch('Found', reply.company);
			console.log('event Found raised');
		} catch (e) {}
	};
</script>

<div class="flex flex-col space-y-3 container w-1/3 mx-auto p-5 m-5 bg-gray-100 rounded shadow-xl">
	<div class="bg-blue-500 text-white font-semibold p-3 mb-3 rounded">Register - Locate Unit</div>

	<DistrictDropdown dropdownOptions={exciseDistricts} lable={'District'} bind:selected={district} />

	<LicenseDropdown dropdownOptions={licenses} lable={'License Type'} bind:selected={licenseType} />

	<div class="flex flex-col space-y-3">
		<TextInput
			bind:label={licenseNolabel}
			bind:value={licenseNo}
			validate={true}
			readonly={false}
			bind:error={errorLicenseNo}
			placeholderValue={'License No'}
			error_mt={false}
			bind:paddingsize
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
	<button
		on:click={findCompany}
		class="bg-navy-500 hover:bg-navy-700 text-white font-bold py-2 px-4 rounded"
	>
		Next
	</button>
	<button
		on:click={() => {
			dispatch('login', {});
		}}
		class="mt-2 w-full text-center bg-white shadow-lg text-navy-500 hover:text-navy-700 font-bold py-2 px-4 rounded border-2 border-navy-500 hover:border-navy-700"
	>
		Already have an account? Sign in instead
	</button>
</div>
