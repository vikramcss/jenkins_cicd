<script>
	import RegisterLocateUnit from '$lib/Pages/RegisterLocateUnit.svelte';
	import RegisterVerifyUnit from '$lib/Pages/RegisterVerifyUnit.svelte';
	import RegisterContactDetails from '$lib/Pages/RegisterContactDetails.svelte';
	import RegisterVerificationCode from '$lib/Pages/RegisterVerificationCode.svelte';
	import RegisterLogin from '$lib/Pages/RegisterLogin.svelte';
	import PasswordInput from '../../common/PasswordInput.svelte';
	import { goto } from '$app/navigation'

	let step = 'locate';
	let company = null;
	let gstNo = null;
	let registeredUser = null;
	const handleFound = (e) => {
		company = e.detail;
		step = 'verify';
		console.log('in Register route:', company);
	};
	const handleVerified = (e) => {
		gstNo = e.detail.gstNo;
		step = 'contactdetails';
	};
	const handleUserRegistered = (e) => {
		registeredUser = e.detail;
		step = 'verificationcode';
	};
	const handleUserVerified = (e) => {
		step = 'registerlogin';
	};
	const handlePrevious = () => {
		switch (step) {
			case 'locate':
				step = 'locate'; // first step nowhere else to go
				break;
			case 'verify':
				step = 'locate';
				break;
			case 'contactdetails':
				step = 'verify';
				break;
			case 'verificationcode':
				step = 'contactdetails';
				break;
			case 'registerlogin':
				step = 'verificationcode';
				break;
		}
	};
</script>

<svelte:head>
	<title>Register</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

	{#if step === 'locate'}
		<RegisterLocateUnit on:Found={handleFound} on:login={()=>{goto('/signin')}}/>
	{:else if step === 'verify'}
		<RegisterVerifyUnit {company} on:Verified={handleVerified} on:Previous={handlePrevious} />
	{:else if step === 'contactdetails'}
		<RegisterContactDetails
			{company}
			{gstNo}
			on:UserRegistered={handleUserRegistered}
			on:Previous={handlePrevious}
		/>
	{:else if step === 'verificationcode'}
		<RegisterVerificationCode
			{company}
			{gstNo}
			{registeredUser}
			on:UserVerified={handleUserVerified}
			on:Previous={handlePrevious}
		/>
	{:else if step === 'registerlogin'}
		<RegisterLogin
			{company}
			{gstNo}
			{registeredUser}
			on:UserVerified={handleUserVerified}
			on:Previous={handlePrevious}
		/>
	{/if}
	;
