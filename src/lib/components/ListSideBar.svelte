<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { API_HOST } from '../../constants';
	import ChatPopUp from './ChatPopUp.svelte';
	import '../../styles/chatList.css';

	let chats: { id: string; name: string }[] = $state([]);
	let errorMessage: string | null = $state(null);

	let { chatId }: { chatId: string | null } = $props();

	async function getData() {
		try {
			const response = await axios.get(`${API_HOST}/api/v1/chat/`);
			chats = response.data.data;
		} catch (error) {
			console.error('Error fetching chats:', error);
			errorMessage = 'Failed to fetch chats. Please try again later.';
		}
	}

	onMount(async () => {
		await getData();
	});

	let isCreatingNewChat = $state(false);

	function selectChat(chatId: string) {
		goto(`/chat/${chatId}`);
	}

	function createNewChat() {
		isCreatingNewChat = true;
	}

	async function onCreate(newChatId: string) {
		onClose();
		goto(`/${newChatId}`);
		await getData();
	}

	function onClose() {
		isCreatingNewChat = false;
	}
</script>

<div class="chat-list-container">
	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{/if}
	{#if isCreatingNewChat}
		<ChatPopUp {onCreate} {onClose} />
	{/if}
	{#if chats.length === 0}
		<div class="no-chats">No chats available. Create a new one!</div>
	{/if}
	<div class="chat-list">
		{#each chats as chat (chat.id)}
			<button
				class="class-list-item"
				class:selected={chat.id === chatId}
				onclick={() => selectChat(chat.id)}
				onkeydown={(event: any) => event.key === 'Enter' && selectChat(chat.id)}
				tabindex="0"
			>
				{chat.name}
			</button>
		{/each}
	</div>
	<button onclick={() => createNewChat()}>New Chat</button>
</div>
