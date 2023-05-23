<script>
	import { onMount } from 'svelte';
	import { api } from '../../api/api';
	import { page } from '$app/stores';
	import ResetPassword from '../../lib/Pages/ResetPassword.svelte';
	import ExpiredLink from '../../lib/Pages/ExpiredLink.svelte';
	import Loading from '../../common/Loading.svelte';
	import PasswordResetSuccess from '$lib/Pages/ResetPasswordSuccess.svelte';
	import { goto } from '$app/navigation';

	const { resetId } = $page.params;
	let valid = undefined;
	let error = undefined;
	let errorMsg = undefined;
	let login = undefined;
	let passwordReset = false;

	onMount(async () => {
		let result = await api.verifyResetPasswordId({ resetId });
		valid = result.valid;
		error = result.error;
		errorMsg = result.errorMsg;
		login = result.login;
	});
</script>

{#if valid === undefined}
	<Loading />
{:else if valid}
	{#if !passwordReset}
		<ResetPassword
			{valid}
			{error}
			{errorMsg}
			{login}
			{resetId}
			on:resetpasswordsuccess={() => (passwordReset = true)}
		/>
	{:else}
		<PasswordResetSuccess on:login={() => goto('/signin')} />
	{/if}
{:else}
	<ExpiredLink on:login={() => goto('/signin')} on:forgotPassword={() => goto('/forgotpassword')} />
{/if}
