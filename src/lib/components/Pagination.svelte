<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Props {
		currentPage: number;
		totalPages: number;
		onPageChange: (page: number) => void;
	}

	let { currentPage = 1, totalPages = 1, onPageChange }: Props = $props();

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	}
</script>

{#if totalPages > 1}
	<div class="flex items-center justify-center gap-2 mt-8">
		<button
			onclick={() => goToPage(currentPage - 1)}
			disabled={currentPage === 1}
			class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			type="button"
		>
			<ChevronLeft size={20} />
		</button>

		{#each Array(totalPages) as _, i}
			{@const page = i + 1}
			{#if page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)}
				<button
					onclick={() => goToPage(page)}
					class="px-4 py-2 border rounded-lg transition-colors {page === currentPage
						? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
						: 'border-gray-300 hover:bg-[#E2E8F0]'}"
					type="button"
				>
					{page}
				</button>
			{:else if page === currentPage - 2 || page === currentPage + 2}
				<span class="px-2 text-gray-400">...</span>
			{/if}
		{/each}

		<button
			onclick={() => goToPage(currentPage + 1)}
			disabled={currentPage === totalPages}
			class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			type="button"
		>
			<ChevronRight size={20} />
		</button>
	</div>
{/if}

