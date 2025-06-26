<script lang="ts">
	import { goto } from '$app/navigation';
	import { authToken } from '../../stores/auth';
	import '../../styles/header.css';

	const name = authToken.getPayload()?.name || 'User';

	function logout() {
		authToken.remove();
		goto('/login');
	}
</script>

<div class="header">
	<div class="user-name">
		{name}
	</div>

	<button class="logout-button" onclick={logout}> Log out </button>
</div>
