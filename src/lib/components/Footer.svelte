<script lang="ts">
	import { GraduationCap } from 'lucide-svelte';
</script>

<footer class="bg-white border-t border-gray-200 paper-texture mt-auto w-full">
	<div class="container mx-auto px-4 py-8 w-full">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- Brand -->
			<div class="col-span-1 md:col-span-2">
				<div class="flex items-center gap-2 text-[#1E3A8A] mb-4">
					<GraduationCap size={28} />
					<h3 class="text-lg font-bold">Past Question Finder</h3>
				</div>
				<p class="text-gray-600 text-sm mb-4">Find it. Learn it. Pass it.</p>
				<p class="text-gray-500 text-xs">
					Helping students succeed through accessible past questions.
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="font-semibold text-[#1E3A8A] mb-4">Quick Links</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/pqs" class="text-gray-600 hover:text-[#1E3A8A]">Browse PQs</a>
					</li>
					<li>
						<a href="/help" class="text-gray-600 hover:text-[#1E3A8A]">Help</a>
					</li>
					<li>
						<a href="/auth/signup" class="text-gray-600 hover:text-[#1E3A8A]"
							>Become an Uploader</a
						>
					</li>
				</ul>
			</div>

			<!-- Legal -->
			<div>
				<h4 class="font-semibold text-[#1E3A8A] mb-4">Legal</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/terms" class="text-gray-600 hover:text-[#1E3A8A]">Terms</a>
					</li>
					<li>
						<a href="/privacy" class="text-gray-600 hover:text-[#1E3A8A]">Privacy</a>
					</li>
					<li>
						<a href="/about" class="text-gray-600 hover:text-[#1E3A8A]">About</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
			<p>&copy; {new Date().getFullYear()} Past Question Finder. All rights reserved.</p>
		</div>
	</div>
</footer>

