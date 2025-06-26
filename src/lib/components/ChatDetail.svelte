<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { API_HOST } from '../../constants';
	import '../../styles/chatDetails.css';

	let { chatId = '' }: { chatId?: string } = $props();

	let messages: { id: string; message: string; createdAt: number }[] = $state([]);
	let newMessage = $state('');
	let errorMessage: string | null = $state(null);
	let isLoading = $state(false);

	onMount(async () => {
		await loadMessages();
	});

	async function loadMessages() {
		try {
			const response = await axios.get(`${API_HOST}/api/v1/chat/${chatId}/message/`);
			messages = response.data.data;
		} catch (error) {
			errorMessage = 'Failed to get chat details. Please try again later.';
			console.error('Error fetching messages:', error);
		}
	}

	async function sendMessage() {
		isLoading = true;
		try {
			const response = await axios.post(`${API_HOST}/api/v1/chat/${chatId}/message/`, {
				message: newMessage
			});
			messages = [...messages, { message: newMessage, createdAt: Date.now() }, response.data.data];
			newMessage = '';
		} catch (error) {
			errorMessage = 'Failed to send message. Please try again later.';
			console.error('Error sending message:', error);
		}
		isLoading = false;
	}

	$effect(() => {
		if (chatId) {
			loadMessages();
		}
	});
</script>

<div class="chat-details-wrapper">
	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{/if}
	<ul>
		{#each messages as message (message.id)}
			<li>
				{message.message}
				<span>{new Date(message.createdAt).toLocaleTimeString()}</span>
			</li>
		{/each}
	</ul>
	<textarea bind:value={newMessage} placeholder="Type a message"></textarea>
	<button onclick={sendMessage} disabled={isLoading}>
		{#if isLoading}
			Sending...
		{:else}
			Send
		{/if}
	</button>
</div>
