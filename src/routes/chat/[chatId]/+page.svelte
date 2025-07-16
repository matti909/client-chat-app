<script lang="ts">
	import '../../../styles/chatDetails.css';
	import type { PageProps } from './$types';
	import { API_HOST } from '../../../constants';
	import axios from 'axios';

	let { data }: PageProps = $props();
	$inspect(data.message);

	const messages = data.message;
	let newMessage = $state('');
	let errorMessage: string | null = $state(null);
	let isLoading = $state(false);

	async function sendMessage() {
		isLoading = true;
		try {
			const response = await axios.post(`${API_HOST}/api/v1/chat/${data.chatId}/message/`, {
				message: newMessage
			});
			console.log(response);
			//			messages = [...messages, { message: newMessage, createdAt: Date.now() }, response.data.data];
			newMessage = '';
		} catch (error) {
			errorMessage = 'Failed to send message. Please try again later.';
			console.error('Error sending message:', error);
		}
		isLoading = false;
	}
</script>

<section>
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
</section>
