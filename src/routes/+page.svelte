<script lang="ts">
	import { onMount } from 'svelte';
	import { authToken } from '../stores/auth';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (!$authToken) {
			goto('/login');
		} else {
			goto('/chat');
		}
	});
</script>
