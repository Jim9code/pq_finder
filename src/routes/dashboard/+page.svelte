<script lang="ts">
	import DashboardSidebar from '$lib/components/DashboardSidebar.svelte';
	import MobileMenuButton from '$lib/components/MobileMenuButton.svelte';
	import PQCard from '$lib/components/PQCard.svelte';
	import AdBoard from '$lib/components/AdBoard.svelte';
	import { mockPQs } from '$lib/stores/mockData';
	import { userStore } from '$lib/stores/userStore';
	import { DollarSign, TrendingUp, FileText, CheckCircle2 } from 'lucide-svelte';

	// Mock user data
	const userBalance = 8500;
	const totalEarnings = 12500;
	const pendingPQs = 2;
	const verifiedPQs = 8;

	const userPQs = mockPQs.slice(0, 5);

	const user = $derived.by(() => {
		let currentUser = null;
		userStore.subscribe((value) => {
			currentUser = value;
		})();
		return currentUser;
	});

	const isAdmin = $derived(user?.role === 'admin');

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
		<div class="lg:col-span-3 space-y-8">
			<!-- Page Header -->
			<div>
				<h1 class="text-3xl font-bold text-[#1E3A8A] mb-2">Dashboard</h1>
				<p class="text-gray-600">Welcome back! Here's your overview.</p>
			</div>

			<!-- Stats Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<!-- Balance Card -->
				<div
					class="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-xl p-6 text-white shadow-lg paper-texture"
				>
					<div class="flex items-center justify-between mb-4">
						<DollarSign size={32} class="opacity-80" />
						<span class="text-sm opacity-80">Balance</span>
					</div>
					<p class="text-3xl font-bold mb-1">₦{userBalance.toLocaleString()}</p>
					<p class="text-sm opacity-80">Total Earnings: ₦{totalEarnings.toLocaleString()}</p>
				</div>

				<!-- Verified PQs -->
				<div class="bg-[#E2E8F0] rounded-xl p-6 shadow-md paper-texture">
					<div class="flex items-center justify-between mb-4">
						<CheckCircle2 size={32} class="text-[#22C55E]" />
						<span class="text-sm text-gray-600">Verified</span>
					</div>
					<p class="text-3xl font-bold text-[#1E3A8A] mb-1">{verifiedPQs}</p>
					<p class="text-sm text-gray-600">Past Questions</p>
				</div>

				<!-- Pending PQs -->
				<div class="bg-[#E2E8F0] rounded-xl p-6 shadow-md paper-texture">
					<div class="flex items-center justify-between mb-4">
						<FileText size={32} class="text-orange-500" />
						<span class="text-sm text-gray-600">Pending</span>
					</div>
					<p class="text-3xl font-bold text-[#1E3A8A] mb-1">{pendingPQs}</p>
					<p class="text-sm text-gray-600">Under Review</p>
				</div>

				<!-- Earnings Trend -->
				<div class="bg-[#E2E8F0] rounded-xl p-6 shadow-md paper-texture">
					<div class="flex items-center justify-between mb-4">
						<TrendingUp size={32} class="text-[#22C55E]" />
						<span class="text-sm text-gray-600">Trend</span>
					</div>
					<p class="text-3xl font-bold text-[#1E3A8A] mb-1">+12%</p>
					<p class="text-sm text-gray-600">This Month</p>
				</div>
			</div>

			{#if isAdmin}
				<!-- Withdrawal Request -->
				<div class="bg-[#E2E8F0] rounded-xl p-6 shadow-md paper-texture">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-xl font-semibold text-[#1E3A8A]">Withdrawal Request</h2>
						<DollarSign size={24} class="text-[#1E3A8A]" />
					</div>
					<p class="text-gray-600 mb-4">
						Your current balance: <span class="font-semibold">₦{userBalance.toLocaleString()}</span>
					</p>
					<p class="text-sm text-gray-600 mb-4">
						Minimum withdrawal threshold: ₦5,000
					</p>
					{#if userBalance >= 5000}
						<button
							class="px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg font-medium"
							type="button"
						>
							Request Withdrawal
						</button>
					{:else}
						<p class="text-sm text-orange-600">
							You need ₦{(5000 - userBalance).toLocaleString()} more to reach the withdrawal threshold.
						</p>
					{/if}
				</div>

				<!-- My Uploads -->
				<div>
					<h2 class="text-2xl font-bold text-[#1E3A8A] mb-6">My Uploads</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each userPQs as pq}
							<PQCard {pq} />
						{/each}
					</div>
					<div class="mt-6 text-center">
						<a
							href="/dashboard/upload"
							class="inline-block px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E40AF] font-medium"
						>
							Upload New PQ
						</a>
					</div>
				</div>
			{:else}
				<!-- Student View -->
				<div class="bg-[#E2E8F0] rounded-xl p-8 shadow-md paper-texture text-center">
					<h2 class="text-2xl font-bold text-[#1E3A8A] mb-4">Welcome, Student!</h2>
					<p class="text-gray-600 mb-6">
						You can browse and download past questions. Only administrators can upload new questions.
					</p>
					<a
						href="/pqs"
						class="inline-block px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg font-medium"
					>
						Browse Past Questions
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

