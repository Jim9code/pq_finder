<script lang="ts">
	import DashboardSidebar from '$lib/components/DashboardSidebar.svelte';
	import MobileMenuButton from '$lib/components/MobileMenuButton.svelte';
	import PQCard from '$lib/components/PQCard.svelte';
	import AdBoard from '$lib/components/AdBoard.svelte';
	import { mockPQs } from '$lib/stores/mockData';
	import { FileText, Filter, Search } from 'lucide-svelte';

	// Mock user uploads
	const userUploads = mockPQs;
	const pendingCount = userUploads.filter((pq) => pq.status === 'pending').length;
	const verifiedCount = userUploads.filter((pq) => pq.status === 'verified').length;

	let filterStatus = $state<'all' | 'pending' | 'verified'>('all');
	let searchQuery = $state('');
	let sidebarOpen = $state(false);

	const filteredUploads = $derived.by(() => {
		let result = [...userUploads];

		if (filterStatus !== 'all') {
			result = result.filter((pq) => pq.status === filterStatus);
		}

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(pq) =>
					pq.course.toLowerCase().includes(query) ||
					pq.university.toLowerCase().includes(query)
			);
		}

		return result;
	});

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
		<div class="lg:col-span-3 space-y-8">
			<!-- Page Header -->
			<div>
				<h1 class="text-3xl font-bold text-[#1E3A8A] mb-2">My Uploads</h1>
				<p class="text-gray-600">Manage all your uploaded past questions</p>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div class="bg-white rounded-xl p-4 shadow-md paper-texture">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-gray-600 mb-1">Total Uploads</p>
							<p class="text-2xl font-bold text-[#1E3A8A]">{userUploads.length}</p>
						</div>
						<FileText size={32} class="text-[#1E3A8A] opacity-50" />
					</div>
				</div>
				<div class="bg-white rounded-xl p-4 shadow-md paper-texture">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-gray-600 mb-1">Verified</p>
							<p class="text-2xl font-bold text-[#22C55E]">{verifiedCount}</p>
						</div>
						<FileText size={32} class="text-[#22C55E] opacity-50" />
					</div>
				</div>
				<div class="bg-white rounded-xl p-4 shadow-md paper-texture">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-gray-600 mb-1">Pending</p>
							<p class="text-2xl font-bold text-orange-500">{pendingCount}</p>
						</div>
						<FileText size={32} class="text-orange-500 opacity-50" />
					</div>
				</div>
			</div>

			<!-- Filters and Search -->
			<div class="bg-white rounded-xl p-6 shadow-md paper-texture">
				<div class="flex flex-col md:flex-row gap-4 mb-4">
					<!-- Search -->
					<div class="flex-1">
						<div class="relative">
							<Search
								size={20}
								class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							/>
							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search by course or university..."
								class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
							/>
						</div>
					</div>

					<!-- Status Filter -->
					<div class="flex items-center gap-2">
						<Filter size={20} class="text-gray-600" />
						<select
							bind:value={filterStatus}
							class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
						>
							<option value="all">All Status</option>
							<option value="verified">Verified</option>
							<option value="pending">Pending</option>
						</select>
					</div>
				</div>

				<div class="text-sm text-gray-600">
					Showing {filteredUploads.length} of {userUploads.length} uploads
				</div>
			</div>

			<!-- Uploads List -->
			{#if filteredUploads.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each filteredUploads as pq}
						<PQCard {pq} />
					{/each}
				</div>
			{:else}
				<div class="bg-white rounded-xl p-12 text-center shadow-md paper-texture">
					<FileText size={64} class="text-gray-400 mx-auto mb-4" />
					<p class="text-xl text-gray-600 mb-2">No uploads found</p>
					<p class="text-gray-500 mb-6">
						{#if filterStatus !== 'all'}
							No uploads with {filterStatus} status
						{:else if searchQuery}
							No uploads match your search
						{:else}
							You haven't uploaded any past questions yet
						{/if}
					</p>
					<a
						href="/dashboard/upload"
						class="inline-block px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E40AF] font-medium"
					>
						Upload Your First PQ
					</a>
				</div>
			{/if}

			<!-- Ad Board -->
			<div class="mt-8">
				<AdBoard variant="sidebar" />
			</div>
		</div>
	</div>
</div>

