<script lang="ts">
	import { Menu } from 'lucide-svelte';

	interface Props {
		onClick: () => void;
	}

	let { onClick }: Props = $props();
</script>

<button
	onclick={onClick}
	class="lg:hidden fixed top-24 left-4 z-50 p-3 bg-[#1E3A8A] text-white rounded-lg shadow-lg hover:bg-[#1E40AF] hover:shadow-xl transition-all"
	type="button"
	aria-label="Toggle menu"
>
	<Menu size={24} />
</button>

