<script lang="ts">
	import type { PQ } from '../types';
	import { BookOpen, Download, CheckCircle2, Clock, University } from 'lucide-svelte';

	interface Props {
		pq: PQ;
	}

	let { pq }: Props = $props();
</script>

<a
	href="/pq/{pq.id}"
	class="block library-card rounded-lg p-6 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 {pq.status === 'verified'
		? 'border-l-[#22C55E]'
		: ''} paper-texture relative overflow-hidden group"
>
	<!-- Library catalog number effect -->
	<div class="absolute top-2 right-2 text-xs text-gray-400 font-mono opacity-50 group-hover:opacity-75 transition-opacity">
		PQ-{pq.id.padStart(4, '0')}
	</div>
	<div class="flex items-start justify-between mb-4 relative z-10">
		<div class="flex items-start gap-3 flex-1">
			<div class="p-2 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-lg shadow-md mt-1">
				<BookOpen size={20} class="text-white" />
			</div>
			<div class="flex-1">
				<h3 class="font-semibold text-lg text-[#1E3A8A] mb-1 leading-tight">{pq.course}</h3>
				<p class="text-sm text-gray-600 flex items-center gap-1.5 mt-1">
					<University size={14} class="text-[#1E3A8A] opacity-70" />
					<span class="font-medium">{pq.university}</span>
				</p>
			</div>
		</div>

		{#if pq.status === 'verified'}
			<div class="library-seal flex items-center gap-1 text-[#22C55E] bg-green-50 px-3 py-1.5 shrink-0">
				<CheckCircle2 size={14} />
				<span class="text-xs font-semibold">Verified</span>
			</div>
		{:else}
			<div class="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200 shrink-0">
				<Clock size={14} />
				<span class="text-xs font-semibold">Pending</span>
			</div>
		{/if}
	</div>

	<div class="flex flex-wrap gap-2 mb-4 relative z-10">
		<span
			class="px-3 py-1.5 bg-white rounded-md text-xs font-medium text-[#1E3A8A] border border-gray-200 shadow-sm"
			>{pq.level}</span
		>
		<span
			class="px-3 py-1.5 bg-white rounded-md text-xs font-medium text-[#1E3A8A] border border-gray-200 shadow-sm"
			>{pq.year}</span
		>
		{#if pq.semester}
			<span
				class="px-3 py-1.5 bg-white rounded-md text-xs font-medium text-[#1E3A8A] border border-gray-200 shadow-sm"
				>{pq.semester}</span
			>
		{/if}
	</div>

	<div class="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-200 relative z-10">
		<div class="flex items-center gap-2">
			<div class="p-1 bg-gray-100 rounded">
				<Download size={14} class="text-[#1E3A8A]" />
			</div>
			<span class="font-medium">{pq.downloads} downloads</span>
		</div>
		<span class="text-xs font-medium text-gray-500 italic">by {pq.uploader}</span>
	</div>
</a>

