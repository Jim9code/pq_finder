<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { GraduationCap, Search } from 'lucide-svelte';

	let searchQuery = $state('');
	const isLoggedIn = $state(false);

	function handleSearch(e: SubmitEvent) {
		e.preventDefault();
		if (searchQuery.trim()) {
			goto(`/pqs?q=${encodeURIComponent(searchQuery)}`);
		}
	}
</script>

<nav class="bg-white shadow-lg paper-texture sticky top-0 z-50 border-b-2 border-[#1E3A8A]/10 w-full">
	<div class="container mx-auto px-4 py-4 w-full">
		<div class="flex items-center justify-between gap-4">
			<!-- Logo - Library style -->
			<a href="/" class="flex items-center gap-3 text-[#1E3A8A] hover:opacity-90 transition-opacity group">
				<div class="p-2 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-lg shadow-md group-hover:shadow-lg transition-all">
					<GraduationCap size={28} class="text-white" />
				</div>
				<div>
					<h1 class="text-xl font-bold leading-tight">Past Question Finder</h1>
					<p class="text-xs text-gray-600 font-medium italic">"Find it. Learn it. Pass it."</p>
				</div>
			</a>

			<!-- Search Bar - Library catalog style -->
			<form onsubmit={handleSearch} class="flex-1 max-w-2xl mx-4 hidden md:block">
				<div class="relative">
					<Search
						size={20}
						class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1E3A8A] opacity-70 z-10"
					/>
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search past questions by university, course, or level..."
						class="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#1E3A8A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] shadow-sm library-card transition-all"
					/>
				</div>
			</form>

			<!-- Auth Links -->
			<div class="flex items-center gap-3">
				{#if isLoggedIn}
					<a
						href="/dashboard"
						class="px-4 py-2 text-[#1E3A8A] hover:text-[#1E40AF] font-medium"
					>
						Dashboard
					</a>
				{:else}
					<a
						href="/auth/login"
						class="px-4 py-2 text-[#1E3A8A] hover:text-[#1E40AF] font-medium"
					>
						Login
					</a>
					<a
						href="/auth/signup"
						class="px-4 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg hover:scale-105 font-medium"
					>
						Sign Up
					</a>
				{/if}
			</div>
		</div>

		<!-- Mobile Search -->
		<form onsubmit={handleSearch} class="mt-3 md:hidden">
			<div class="relative">
				<Search
					size={20}
					class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
				/>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search past questions..."
					class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
				/>
			</div>
		</form>
	</div>
</nav>

