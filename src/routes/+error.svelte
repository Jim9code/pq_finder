<script lang="ts">
	import { page } from '$app/stores';
	import { BookOpen, Home } from 'lucide-svelte';
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1F5F9] to-white paper-texture">
	<div class="text-center px-4">
		<div class="text-8xl mb-6">📚</div>
		<div class="bg-[#E2E8F0] rounded-xl p-8 shadow-lg paper-texture max-w-md mx-auto">
			<div class="inline-block p-4 bg-red-100 rounded-full mb-4">
				<BookOpen size={48} class="text-red-600" />
			</div>
			<h1 class="text-4xl font-bold text-[#1E3A8A] mb-4">Oops! Page Not Found</h1>
			<p class="text-gray-600 mb-6">
				Looks like this page has fallen off the shelf. Let's get you back on track!
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/"
					class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg font-medium transition-all"
				>
					<Home size={20} />
					Go Home
				</a>
				<button
					onclick={() => window.history.back()}
					class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] border-2 border-[#1E3A8A] rounded-lg hover:bg-[#1E3A8A] hover:text-white font-medium transition-all"
					type="button"
				>
					Go Back
				</button>
			</div>
		</div>
	</div>
</div>

