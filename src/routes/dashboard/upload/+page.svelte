<script lang="ts">
	import DashboardSidebar from '$lib/components/DashboardSidebar.svelte';
	import MobileMenuButton from '$lib/components/MobileMenuButton.svelte';
	import UploadModal from '$lib/components/UploadModal.svelte';
	import AdBoard from '$lib/components/AdBoard.svelte';

	let showUploadModal = $state(false);
	let sidebarOpen = $state(false);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}
</script>

<div class="container mx-auto px-4 py-8 w-full max-w-[1400px]">
	<!-- Mobile Menu Button -->
	<MobileMenuButton onClick={toggleSidebar} />

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
		<!-- Sidebar -->
		<div class="lg:col-span-1">
			<DashboardSidebar open={sidebarOpen} onClose={closeSidebar} />
		</div>

		<!-- Main Content -->
		<div class="lg:col-span-3">
			<!-- Page Header -->
			<div class="mb-8">
				<h1 class="text-3xl font-bold text-[#1E3A8A] mb-2">Upload Past Question</h1>
				<p class="text-gray-600">
					Submit your past questions and help students succeed while earning.
				</p>
			</div>

			<!-- Upload Instructions -->
			<div class="bg-[#E2E8F0] rounded-xl p-8 mb-8 paper-texture">
				<h2 class="text-2xl font-semibold text-[#1E3A8A] mb-4">Upload Guidelines</h2>
				<div class="space-y-4 text-gray-700">
					<div class="flex items-start gap-3">
						<div class="text-xl">✅</div>
						<p>Ensure the PQ has a clear header with university name and course</p>
					</div>
					<div class="flex items-start gap-3">
						<div class="text-xl">✅</div>
						<p>Upload high-quality scanned documents (PDF, PNG, or JPEG)</p>
					</div>
					<div class="flex items-start gap-3">
						<div class="text-xl">✅</div>
						<p>Verify that the PQ is not a duplicate before uploading</p>
					</div>
					<div class="flex items-start gap-3">
						<div class="text-xl">✅</div>
						<p>Fill in all required fields accurately (University, Course, Level, Year)</p>
					</div>
				</div>
			</div>

			<!-- Upload Button -->
			<div class="bg-white rounded-xl p-8 shadow-md paper-texture text-center">
				<div class="text-6xl mb-4">📤</div>
				<h2 class="text-2xl font-semibold text-[#1E3A8A] mb-4">
					Ready to Submit Your PQ?
				</h2>
				<p class="text-gray-600 mb-8">
					Click the button below to start uploading your past question. Make sure you have all
					the required information ready.
				</p>
				<button
					onclick={() => (showUploadModal = true)}
					class="px-8 py-4 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold text-lg"
					type="button"
				>
					Start Upload
				</button>
			</div>

			<!-- Ad Board -->
			<div class="mt-8">
				<AdBoard variant="sidebar" />
			</div>
		</div>
	</div>
</div>

<UploadModal open={showUploadModal} onClose={() => (showUploadModal = false)} />

