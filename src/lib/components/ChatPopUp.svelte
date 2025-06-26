<script lang="ts">
	import axios from 'axios';
	import { API_HOST } from '../../constants';
	import '../../styles/chatPopup.css';

	interface Props {
		onCreate: (newChatId: string) => void;
		onClose: () => void;
	}

	let { onCreate, onClose }: Props = $props();

	let chatName = $state('');
	let errorMessage = $state('');

	async function createChat() {
		try {
			const response = await axios.post(`${API_HOST}/api/v1/chat/`, { name: chatName });
			onCreate(response.data.data.id);
		} catch (error) {
			console.error('Error creating chat:', error);
			errorMessage = 'Failed to create chat. Please try again later.';
		}
	}
</script>

<div class="popup">
	<button class="close-button" onclick={onClose}>X</button>
	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{/if}
	<input type="text" bind:value={chatName} placeholder="Enter chat name" />
	<button disabled={!chatName.length} onclick={createChat}>Create</button>
</div>
