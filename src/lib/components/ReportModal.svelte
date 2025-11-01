<script lang="ts">
	import { X, AlertTriangle } from 'lucide-svelte';

	interface Props {
		open: boolean;
		onClose: () => void;
		pqId?: string;
	}

	let { open = false, onClose, pqId }: Props = $props();

	let reportText = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (reportText.trim()) {
			alert('Thank you for your report. We will review it shortly.');
			reportText = '';
			onClose();
		}
	}
</script>

{#if open}
	<div
		class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
		onclick={onClose}
		role="presentation"
	>
		<div
			class="bg-white rounded-xl p-8 max-w-md w-full"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="flex items-center justify-between mb-6">
				<div class="flex items-center gap-3">
					<AlertTriangle size={28} class="text-orange-500" />
					<h2 class="text-2xl font-bold text-[#1E3A8A]">Something wrong with this PQ?</h2>
				</div>
				<button
					onclick={onClose}
					class="text-gray-400 hover:text-gray-600 transition-colors"
					type="button"
				>
					<X size={24} />
				</button>
			</div>

			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Please describe the issue
					</label>
					<textarea
						bind:value={reportText}
						required
						rows="5"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] resize-none"
						placeholder="e.g., File is corrupted, wrong course, duplicate content..."
					></textarea>
				</div>

				<div class="flex gap-4 pt-4">
					<button
						type="button"
						onclick={onClose}
						class="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="flex-1 px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg font-medium"
					>
						Submit Report
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

