<script lang="ts">
	import { page } from '$app/stores';
	import { Download, FileText, AlertTriangle, CheckCircle2, Clock, University, BookOpen, User } from 'lucide-svelte';
	import PQCard from '$lib/components/PQCard.svelte';
	import ReportModal from '$lib/components/ReportModal.svelte';
	import AdBoard from '$lib/components/AdBoard.svelte';
	import { mockPQs } from '$lib/stores/mockData';

	const pqId = $page.params.id;
	const pq = mockPQs.find((p) => p.id === pqId) || mockPQs[0];
	const relatedPQs = mockPQs.filter((p) => p.id !== pqId).slice(0, 3);

	let showReportModal = $state(false);

	function handleDownload(quality: '720p' | '1080p') {
		alert(`Downloading ${quality} version...`);
		// In a real app, this would trigger the download
	}

	function handleReport() {
		showReportModal = true;
	}
</script>

<div class="container mx-auto px-4 py-8 w-full max-w-[1400px]">
	<!-- Ad Board Top -->
	<div class="mb-8">
		<AdBoard variant="top" />
	</div>

	<!-- PQ Details -->
	<div class="bg-white rounded-xl p-8 shadow-md mb-8 paper-texture">
		<div class="flex flex-col md:flex-row gap-8">
			<!-- Preview Section -->
			<div class="flex-1">
				<div class="bg-[#E2E8F0] rounded-xl p-8 border-4 border-[#1E3A8A] paper-texture mb-6">
					<div class="flex items-center justify-center h-96">
						<div class="text-center">
							<FileText size={80} class="text-[#1E3A8A] mx-auto mb-4" />
							<p class="text-gray-600 text-lg">PQ Preview</p>
							<p class="text-sm text-gray-500 mt-2">
								In a real application, this would show the PDF/image preview
							</p>
						</div>
					</div>
				</div>

				<!-- Download Buttons -->
				<div class="grid grid-cols-2 gap-4 mb-6">
					<button
						onclick={() => handleDownload('720p')}
						class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
						type="button"
					>
						<Download size={20} />
						Download (720p)
					</button>
					<button
						onclick={() => handleDownload('1080p')}
						class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
						type="button"
					>
						<Download size={20} />
						Download (1080p)
					</button>
				</div>

				<!-- Report Button -->
				<button
					onclick={handleReport}
					class="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all font-medium"
					type="button"
				>
					<AlertTriangle size={20} />
					Report Issue
				</button>
			</div>

			<!-- Details Section -->
			<div class="flex-1">
				<div class="space-y-6">
					<!-- Title & Status -->
					<div>
						<h1 class="text-3xl font-bold text-[#1E3A8A] mb-4">{pq.course}</h1>
						<div class="flex items-center gap-3 mb-4">
							{#if pq.status === 'verified'}
								<div
									class="flex items-center gap-2 px-4 py-2 bg-green-50 text-[#22C55E] rounded-full"
								>
									<CheckCircle2 size={18} />
									<span class="font-medium">Verified</span>
								</div>
							{:else}
								<div
									class="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-500 rounded-full"
								>
									<Clock size={18} />
									<span class="font-medium">Pending Verification</span>
								</div>
							{/if}
						</div>
					</div>

					<!-- Information Cards -->
					<div class="space-y-4">
						<div class="bg-[#E2E8F0] rounded-lg p-4 paper-texture">
							<div class="flex items-center gap-3 mb-2">
								<University size={20} class="text-[#1E3A8A]" />
								<span class="text-sm font-medium text-gray-600">University</span>
							</div>
							<p class="text-lg font-semibold text-[#1E3A8A]">{pq.university}</p>
						</div>

						<div class="bg-[#E2E8F0] rounded-lg p-4 paper-texture">
							<div class="flex items-center gap-3 mb-2">
								<BookOpen size={20} class="text-[#1E3A8A]" />
								<span class="text-sm font-medium text-gray-600">Level & Year</span>
							</div>
							<p class="text-lg font-semibold text-[#1E3A8A]">
								{pq.level} • {pq.year}
							</p>
							{#if pq.semester}
								<p class="text-sm text-gray-600 mt-1">{pq.semester}</p>
							{/if}
						</div>

						<div class="bg-[#E2E8F0] rounded-lg p-4 paper-texture">
							<div class="flex items-center gap-3 mb-2">
								<User size={20} class="text-[#1E3A8A]" />
								<span class="text-sm font-medium text-gray-600">Uploader</span>
							</div>
							<p class="text-lg font-semibold text-[#1E3A8A]">{pq.uploader}</p>
						</div>

						<div class="bg-[#E2E8F0] rounded-lg p-4 paper-texture">
							<div class="flex items-center gap-3 mb-2">
								<Download size={20} class="text-[#1E3A8A]" />
								<span class="text-sm font-medium text-gray-600">Downloads</span>
							</div>
							<p class="text-lg font-semibold text-[#1E3A8A]">{pq.downloads}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Related PQs -->
	<div class="mb-8">
		<h2 class="text-2xl font-bold text-[#1E3A8A] mb-6">You might also like</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each relatedPQs as relatedPQ}
				<PQCard pq={relatedPQ} />
			{/each}
		</div>
	</div>

	<!-- Ad Board Bottom -->
	<div class="mt-8">
		<AdBoard variant="bottom" />
	</div>
</div>

<ReportModal open={showReportModal} onClose={() => (showReportModal = false)} pqId={pqId} />

