<script lang="ts">
	import DashboardSidebar from '$lib/components/DashboardSidebar.svelte';
	import MobileMenuButton from '$lib/components/MobileMenuButton.svelte';
	import AdBoard from '$lib/components/AdBoard.svelte';
	import { DollarSign, TrendingUp, Calendar, Download, ArrowUpRight } from 'lucide-svelte';

	// Mock earnings data
	const currentBalance = 8500;
	const totalEarnings = 12500;
	const thisMonthEarnings = 2300;
	const pendingWithdrawal = 0;
	const withdrawalThreshold = 5000;

	const earningsHistory = [
		{
			id: '1',
			date: '2024-03-15',
			description: 'Computer Science 101 - University of Lagos',
			amount: 500,
			downloads: 25,
			type: 'earning'
		},
		{
			id: '2',
			date: '2024-03-10',
			description: 'Mathematics 201 - University of Ibadan',
			amount: 400,
			downloads: 20,
			type: 'earning'
		},
		{
			id: '3',
			date: '2024-03-05',
			description: 'Physics 301 - Obafemi Awolowo University',
			amount: 300,
			downloads: 15,
			type: 'earning'
		},
		{
			id: '4',
			date: '2024-02-28',
			description: 'Chemistry 101 - University of Lagos',
			amount: 600,
			downloads: 30,
			type: 'earning'
		},
		{
			id: '5',
			date: '2024-02-20',
			description: 'Withdrawal',
			amount: -5000,
			downloads: 0,
			type: 'withdrawal'
		}
	];

	let sidebarOpen = $state(false);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}

	function handleWithdrawal() {
		if (currentBalance >= withdrawalThreshold) {
			alert(
				`Withdrawal request submitted! ₦${currentBalance.toLocaleString()} will be processed within 3-5 business days.`
			);
		} else {
			alert(
				`Minimum withdrawal amount is ₦${withdrawalThreshold.toLocaleString()}. You need ₦${(
					withdrawalThreshold - currentBalance
				).toLocaleString()} more.`
			);
		}
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
				<h1 class="text-3xl font-bold text-[#1E3A8A] mb-2">Earnings</h1>
				<p class="text-gray-600">Track your earnings and withdrawal history</p>
			</div>

			<!-- Earnings Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<!-- Current Balance -->
				<div
					class="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-xl p-6 text-white shadow-lg paper-texture"
				>
					<div class="flex items-center justify-between mb-4">
						<DollarSign size={32} class="opacity-80" />
						<span class="text-sm opacity-80">Current Balance</span>
					</div>
					<p class="text-3xl font-bold mb-1">₦{currentBalance.toLocaleString()}</p>
					<p class="text-sm opacity-80">Available for withdrawal</p>
				</div>

				<!-- Total Earnings -->
				<div class="bg-[#E2E8F0] rounded-xl p-6 shadow-md paper-texture">
					<div class="flex items-center justify-between mb-4">
						<TrendingUp size={32} class="text-[#22C55E]" />
						<span class="text-sm text-gray-600">Total Earnings</span>
					</div>
					<p class="text-3xl font-bold text-[#1E3A8A] mb-1">
						₦{totalEarnings.toLocaleString()}
					</p>
					<p class="text-sm text-gray-600">All time</p>
				</div>

				<!-- This Month -->
				<div class="bg-[#E2E8F0] rounded-xl p-6 shadow-md paper-texture">
					<div class="flex items-center justify-between mb-4">
						<Calendar size={32} class="text-[#1E3A8A]" />
						<span class="text-sm text-gray-600">This Month</span>
					</div>
					<p class="text-3xl font-bold text-[#1E3A8A] mb-1">
						₦{thisMonthEarnings.toLocaleString()}
					</p>
					<p class="text-sm text-gray-600">March 2024</p>
				</div>

				<!-- Pending -->
				<div class="bg-[#E2E8F0] rounded-xl p-6 shadow-md paper-texture">
					<div class="flex items-center justify-between mb-4">
						<Download size={32} class="text-orange-500" />
						<span class="text-sm text-gray-600">Pending</span>
					</div>
					<p class="text-3xl font-bold text-[#1E3A8A] mb-1">
						₦{pendingWithdrawal.toLocaleString()}
					</p>
					<p class="text-sm text-gray-600">In processing</p>
				</div>
			</div>

			<!-- Withdrawal Section -->
			<div class="bg-white rounded-xl p-6 shadow-md paper-texture">
				<h2 class="text-2xl font-semibold text-[#1E3A8A] mb-4">Withdrawal Request</h2>
				<div class="bg-[#E2E8F0] rounded-lg p-4 mb-4">
					<div class="flex items-center justify-between mb-2">
						<span class="text-gray-700 font-medium">Current Balance:</span>
						<span class="text-2xl font-bold text-[#1E3A8A]"
							>₦{currentBalance.toLocaleString()}</span
						>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-sm text-gray-600">Minimum withdrawal:</span>
						<span class="text-sm font-medium text-gray-700"
							>₦{withdrawalThreshold.toLocaleString()}</span
						>
					</div>
				</div>

				{#if currentBalance >= withdrawalThreshold}
					<button
						onclick={handleWithdrawal}
						class="w-full px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg font-semibold text-lg transition-all"
						type="button"
					>
						<ArrowUpRight size={20} class="inline mr-2" />
						Request Withdrawal
					</button>
				{:else}
					<div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
						<p class="text-sm text-orange-700">
							You need ₦{(withdrawalThreshold - currentBalance).toLocaleString()} more to
							reach the withdrawal threshold of ₦{withdrawalThreshold.toLocaleString()}.
						</p>
					</div>
				{/if}
			</div>

			<!-- Earnings History -->
			<div class="bg-white rounded-xl p-6 shadow-md paper-texture">
				<h2 class="text-2xl font-semibold text-[#1E3A8A] mb-4">Earnings History</h2>
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead>
							<tr class="border-b border-gray-200">
								<th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
								<th class="text-left py-3 px-4 text-sm font-semibold text-gray-700"
									>Description</th
								>
								<th class="text-left py-3 px-4 text-sm font-semibold text-gray-700"
									>Downloads</th
								>
								<th class="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
							</tr>
						</thead>
						<tbody>
							{#each earningsHistory as item}
								<tr class="border-b border-gray-100 hover:bg-gray-50">
									<td class="py-3 px-4 text-sm text-gray-600">
										{new Date(item.date).toLocaleDateString()}
									</td>
									<td class="py-3 px-4 text-sm text-gray-700">{item.description}</td>
									<td class="py-3 px-4 text-sm text-gray-600">
										{item.downloads > 0 ? `${item.downloads} downloads` : '-'}
									</td>
									<td
										class="py-3 px-4 text-sm font-semibold text-right {item.type === 'withdrawal'
											? 'text-red-600'
											: 'text-[#22C55E]'}"
									>
										{item.amount > 0 ? '+' : ''}₦{Math.abs(item.amount).toLocaleString()}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<!-- Ad Board -->
			<div class="mt-8">
				<AdBoard variant="sidebar" />
			</div>
		</div>
	</div>
</div>

