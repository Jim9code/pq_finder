<script lang="ts">
	import { page } from '$app/stores';
	import PQCard from '$lib/components/PQCard.svelte';
	import AdBoard from '$lib/components/AdBoard.svelte';
	import { mockPQs, universities, courses, levels, years } from '$lib/stores/mockData';
	import { Filter, Search } from 'lucide-svelte';

	let selectedUniversity = $state('');
	let selectedCourse = $state('');
	let selectedLevel = $state('');
	let selectedYear = $state('');
	let searchQuery = $state($page.url.searchParams.get('q') || '');

	const filteredPQs = $derived.by(() => {
		let result = [...mockPQs];

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(pq) =>
					pq.university.toLowerCase().includes(query) ||
					pq.course.toLowerCase().includes(query) ||
					pq.level.toLowerCase().includes(query)
			);
		}

		if (selectedUniversity) {
			result = result.filter((pq) => pq.university === selectedUniversity);
		}

		if (selectedCourse) {
			result = result.filter((pq) => pq.course.includes(selectedCourse));
		}

		if (selectedLevel) {
			result = result.filter((pq) => pq.level === selectedLevel);
		}

		if (selectedYear) {
			result = result.filter((pq) => pq.year === selectedYear);
		}

		return result;
	});

	function clearFilters() {
		selectedUniversity = '';
		selectedCourse = '';
		selectedLevel = '';
		selectedYear = '';
		searchQuery = '';
	}
</script>

<div class="container mx-auto px-4 py-8 w-full max-w-[1400px]">
	<!-- Page Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-[#1E3A8A] mb-2">Browse Past Questions</h1>
		<p class="text-gray-600">Find past questions from various universities and courses</p>
	</div>

	<!-- Ad Board -->
	<div class="mb-8">
		<AdBoard variant="top" />
	</div>

	<!-- Filters -->
	<div class="bg-white rounded-xl p-6 shadow-md mb-8 paper-texture">
		<div class="flex items-center gap-2 mb-4">
			<Filter size={20} class="text-[#1E3A8A]" />
			<h2 class="text-xl font-semibold text-[#1E3A8A]">Filters</h2>
		</div>

		<!-- Search -->
		<div class="mb-4">
			<div class="relative">
				<Search
					size={20}
					class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
				/>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search by university, course, or level..."
					class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
				/>
			</div>
		</div>

		<!-- Filter Chips -->
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2">University</label>
				<select
					bind:value={selectedUniversity}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
				>
					<option value="">All Universities</option>
					{#each universities as uni}
						<option value={uni}>{uni}</option>
					{/each}
				</select>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2">Course</label>
				<select
					bind:value={selectedCourse}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
				>
					<option value="">All Courses</option>
					{#each courses as course}
						<option value={course}>{course}</option>
					{/each}
				</select>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2">Level</label>
				<select
					bind:value={selectedLevel}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
				>
					<option value="">All Levels</option>
					{#each levels as level}
						<option value={level}>{level}</option>
					{/each}
				</select>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
				<select
					bind:value={selectedYear}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
				>
					<option value="">All Years</option>
					{#each years as year}
						<option value={year}>{year}</option>
					{/each}
				</select>
			</div>
		</div>

		<button
			onclick={clearFilters}
			class="px-4 py-2 text-sm text-gray-600 hover:text-[#1E3A8A] underline"
			type="button"
		>
			Clear all filters
		</button>
	</div>

	<!-- Results Count -->
	<div class="mb-6">
		<p class="text-gray-600">
			Found <span class="font-semibold text-[#1E3A8A]">{filteredPQs.length}</span> past
			question{filteredPQs.length !== 1 ? 's' : ''}
		</p>
	</div>

	<!-- PQ Grid -->
	{#if filteredPQs.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			{#each filteredPQs as pq}
				<PQCard {pq} />
			{/each}
		</div>
	{:else}
		<div class="text-center py-16 bg-[#E2E8F0] rounded-xl paper-texture">
			<div class="text-6xl mb-4">📭</div>
			<p class="text-xl text-gray-700 mb-2">No past questions found</p>
			<p class="text-gray-600 mb-6">Try adjusting your filters or search query</p>
			<button
				onclick={clearFilters}
				class="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E40AF] font-medium"
				type="button"
			>
				Clear Filters
			</button>
		</div>
	{/if}

	<!-- Ad Board Bottom -->
	<div class="mt-8">
		<AdBoard variant="bottom" />
	</div>
</div>

