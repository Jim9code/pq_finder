<script lang="ts">
	import { goto } from '$app/navigation';
	import { Search, Upload, BookOpen, TrendingUp, Users, Award } from 'lucide-svelte';
	import PQCard from '$lib/components/PQCard.svelte';
	import AdBoard from '$lib/components/AdBoard.svelte';
	import { mockPQs } from '$lib/stores/mockData';

	let searchQuery = $state('');
	const featuredPQs = mockPQs.slice(0, 6);

	function handleSearch(e: SubmitEvent) {
		e.preventDefault();
		if (searchQuery.trim()) {
			goto(`/pqs?q=${encodeURIComponent(searchQuery)}`);
		} else {
			goto('/pqs');
		}
	}

	const testimonials = [
		{
			name: 'Sarah Johnson',
			school: 'University of Lagos',
			text: 'Found all my exam materials in one place! This platform saved me so much time.',
			avatar: '👩‍🎓'
		},
		{
			name: 'David Okonkwo',
			school: 'University of Ibadan',
			text: 'As an uploader, I earned enough to cover my textbooks. Great way to help others while earning!',
			avatar: '👨‍🎓'
		},
		{
			name: 'Chioma Eze',
			school: 'Obafemi Awolowo University',
			text: 'The search feature is amazing. Found exactly what I needed in seconds.',
			avatar: '👩‍🎓'
		}
	];

	const features = [
		{
			icon: BookOpen,
			title: 'Vast Library',
			description: 'Access past questions from major universities across Nigeria'
		},
		{
			icon: TrendingUp,
			title: 'Verified Content',
			description: 'All PQs are verified for authenticity and quality'
		},
		{
			icon: Upload,
			title: 'Earn as You Help',
			description: 'Upload PQs and earn verified income for genuine contributions'
		},
		{
			icon: Users,
			title: 'Student Community',
			description: 'Join thousands of students helping each other succeed'
		},
		{
			icon: Award,
			title: 'Free Access',
			description: 'All past questions are free for students to download'
		},
		{
			icon: Search,
			title: 'Smart Search',
			description: 'Find exactly what you need with our advanced search filters'
		}
	];
</script>

<div class="min-h-screen w-full">
	<!-- Hero Section -->
	<section class="bg-gradient-to-b from-[#F1F5F9] via-white to-[#F8FAFC] py-20 md:py-28 paper-texture relative overflow-hidden w-full">
		<!-- Subtle decorative elements -->
		<div class="absolute top-10 left-10 text-6xl opacity-5 text-[#1E3A8A]">📚</div>
		<div class="absolute bottom-20 right-10 text-6xl opacity-5 text-[#1E3A8A]">📖</div>
		<div class="absolute top-1/2 left-20 text-4xl opacity-5 text-[#22C55E]">🎓</div>
		
		<div class="container mx-auto px-4 w-full max-w-[1400px] relative z-10">
			<div class="text-center max-w-4xl mx-auto">
				<!-- Library badge style -->
				<div class="inline-block mb-6 px-4 py-2 bg-[#1E3A8A] text-white rounded-full text-sm font-semibold shadow-lg">
					University Past Questions Library
				</div>
				<h1 class="text-5xl md:text-7xl font-bold text-[#1E3A8A] mb-4 leading-tight">
					Past Question Finder
				</h1>
				<p class="text-2xl md:text-3xl text-gray-700 mb-6 font-medium italic">
					"Find it. Learn it. Pass it."
				</p>
				<p class="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
					Your digital library of verified university past questions. Search, download, and
					help others succeed.
				</p>

				<!-- Search Bar - Library catalog style -->
				<form onsubmit={handleSearch} class="mb-8">
					<div class="relative max-w-3xl mx-auto">
						<div class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
							<Search size={24} class="text-[#1E3A8A] opacity-70" />
						</div>
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search past questions by university, course, or level..."
							class="w-full pl-14 pr-6 py-4 text-lg bg-white border-2 border-[#1E3A8A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] shadow-lg library-card transition-all"
						/>
						<div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-mono">
							Press Enter
						</div>
					</div>
				</form>

				<!-- CTA Buttons - Academic style -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<button
						onclick={() => goto('/pqs')}
						class="px-8 py-4 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-2xl hover:scale-105 font-semibold text-lg transition-all relative overflow-hidden group"
					>
						<span class="relative z-10">Find Past Questions</span>
						<div class="absolute inset-0 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity"></div>
					</button>
					<button
						onclick={() => goto('/auth/signup')}
						class="px-8 py-4 bg-white text-[#1E3A8A] border-2 border-[#1E3A8A] rounded-lg hover:bg-[#1E3A8A] hover:text-white hover:shadow-xl font-semibold text-lg transition-all library-card"
					>
						Upload & Earn
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Ad Board Top -->
	<section class="w-full">
		<div class="container mx-auto px-4 py-8 w-full max-w-[1400px]">
			<AdBoard variant="top" />
		</div>
	</section>

	<!-- Featured Past Questions -->
	<section class="py-16 bg-white relative w-full">
		<div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/20 to-transparent"></div>
		<div class="container mx-auto px-4 w-full max-w-[1400px]">
			<div class="text-center mb-12">
				<div class="inline-block px-4 py-1 bg-[#1E3A8A]/10 rounded-full mb-4">
					<span class="text-sm font-semibold text-[#1E3A8A]">FEATURED COLLECTION</span>
				</div>
				<h2 class="text-4xl font-bold text-[#1E3A8A] mb-4">Featured Past Questions</h2>
				<p class="text-gray-600 max-w-2xl mx-auto">
					Carefully curated collection of verified past questions from top universities
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each featuredPQs as pq}
					<PQCard {pq} />
				{/each}
			</div>
			<div class="text-center mt-8">
				<a
					href="/pqs"
					class="inline-block px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E40AF] font-medium"
				>
					View All Past Questions
				</a>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-16 bg-[#F1F5F9] paper-texture w-full">
		<div class="container mx-auto px-4 w-full max-w-[1400px]">
			<h2 class="text-3xl font-bold text-[#1E3A8A] mb-12 text-center">Why Choose Us?</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each features as feature}
					<div
						class="bg-[#E2E8F0] rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all paper-texture"
					>
						<div class="flex items-center gap-4 mb-4">
							<div class="p-3 bg-[#1E3A8A] rounded-lg">
								<svelte:component this={feature.icon} size={24} class="text-white" />
							</div>
							<h3 class="text-xl font-semibold text-[#1E3A8A]">{feature.title}</h3>
						</div>
						<p class="text-gray-700">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="py-16 bg-white w-full">
		<div class="container mx-auto px-4 w-full max-w-[1400px]">
			<h2 class="text-3xl font-bold text-[#1E3A8A] mb-12 text-center">What Students Say</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each testimonials as testimonial}
					<div
						class="library-card rounded-lg p-6 hover:shadow-xl transition-all paper-texture relative"
					>
						<div class="quote-mark">"</div>
						<div class="flex items-center gap-4 mb-4 relative z-10">
							<div class="text-5xl">{testimonial.avatar}</div>
							<div>
								<h4 class="font-bold text-[#1E3A8A] text-lg">{testimonial.name}</h4>
								<p class="text-sm text-gray-600 font-medium">{testimonial.school}</p>
							</div>
						</div>
						<p class="text-gray-700 italic text-base leading-relaxed relative z-10">"{testimonial.text}"</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Ad Board Bottom -->
	<section class="w-full">
		<div class="container mx-auto px-4 py-8 w-full max-w-[1400px]">
			<AdBoard variant="bottom" />
		</div>
	</section>
</div>
