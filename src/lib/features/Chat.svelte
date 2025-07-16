<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authToken } from '../../stores/auth';
	import Header from '$lib/components/Header.svelte';
	import ListSideBar from '$lib/components/ListSideBar.svelte';
	import ChatDetail from '$lib/components/ChatDetail.svelte';
	import '../../styles/chat.css';

	let chatId: string | null = $state('');

	onMount(() => {
		if (!$authToken) {
			goto('/register');
		}
	});
</script>

<div>
	<Header></Header>
	<div class="container">
		<div class="chat-list-container">
			<ListSideBar {chatId} />
		</div>
		<div class="chat-container">
			{#if chatId}
				<ChatDetail />
			{/if}
		</div>
	</div>
</div>
