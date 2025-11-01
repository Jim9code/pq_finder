<script lang="ts">
	import { goto } from '$app/navigation';
	import { GraduationCap, User, Mail, School, Lock } from 'lucide-svelte';

	let fullName = $state('');
	let email = $state('');
	let school = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let isLoading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		isLoading = true;
		// Simulate signup
		await new Promise((resolve) => setTimeout(resolve, 1000));
		isLoading = false;
		// Redirect to dashboard
		goto('/dashboard');
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-white paper-texture py-12 w-full">
	<div class="container mx-auto px-4 w-full max-w-[1400px]">
		<div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
			<!-- Left Side - Illustration/Info -->
			<div class="hidden lg:block text-center">
				<div class="text-8xl mb-6">🎓</div>
				<h2 class="text-3xl font-bold text-[#1E3A8A] mb-4">
					Join Our Contributors
				</h2>
				<p class="text-lg text-gray-600 mb-6">
					Earn verified income by helping students succeed. Every genuine upload
					contributes to our learning community.
				</p>
				<div class="bg-[#E2E8F0] rounded-xl p-6 paper-texture">
					<div class="text-left space-y-4">
						<div class="flex items-center gap-3">
							<div class="text-3xl">📤</div>
							<p class="text-gray-700">Upload past questions easily</p>
						</div>
						<div class="flex items-center gap-3">
							<div class="text-3xl">✅</div>
							<p class="text-gray-700">Get verified and paid for quality uploads</p>
						</div>
						<div class="flex items-center gap-3">
							<div class="text-3xl">📈</div>
							<p class="text-gray-700">Track your earnings and withdraw anytime</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Side - Signup Form -->
			<div class="bg-white rounded-xl shadow-xl p-8 paper-texture max-w-md mx-auto lg:mx-0">
				<div class="text-center mb-8">
					<div class="inline-block p-4 bg-[#1E3A8A] rounded-full mb-4">
						<GraduationCap size={32} class="text-white" />
					</div>
					<h1 class="text-3xl font-bold text-[#1E3A8A] mb-2">Create Account</h1>
					<p class="text-gray-600">Join our contributors and earn for helping others learn.</p>
				</div>

				<form onsubmit={handleSubmit} class="space-y-5">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							<div class="flex items-center gap-2">
								<User size={16} />
								Full Name <span class="text-red-500">*</span>
							</div>
						</label>
						<input
							type="text"
							bind:value={fullName}
							required
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
							placeholder="John Doe"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							<div class="flex items-center gap-2">
								<Mail size={16} />
								Email Address <span class="text-red-500">*</span>
							</div>
						</label>
						<input
							type="email"
							bind:value={email}
							required
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
							placeholder="your.email@example.com"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							<div class="flex items-center gap-2">
								<School size={16} />
								School/University <span class="text-red-500">*</span>
							</div>
						</label>
						<input
							type="text"
							bind:value={school}
							required
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
							placeholder="University of Lagos"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							<div class="flex items-center gap-2">
								<Lock size={16} />
								Password <span class="text-red-500">*</span>
							</div>
						</label>
						<input
							type="password"
							bind:value={password}
							required
							minlength="6"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
							placeholder="Minimum 6 characters"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							<div class="flex items-center gap-2">
								<Lock size={16} />
								Confirm Password <span class="text-red-500">*</span>
							</div>
						</label>
						<input
							type="password"
							bind:value={confirmPassword}
							required
							minlength="6"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
							placeholder="Confirm your password"
						/>
					</div>

					<div class="flex items-start gap-2">
						<input type="checkbox" required class="mt-1 rounded" />
						<label class="text-sm text-gray-600">
							I agree to the
							<a href="/terms" class="text-[#1E3A8A] hover:underline">Terms of Service</a>
							and
							<a href="/privacy" class="text-[#1E3A8A] hover:underline">Privacy Policy</a>
						</label>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						class="w-full px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-all"
					>
						{isLoading ? 'Creating account...' : 'Create Account'}
					</button>
				</form>

				<div class="mt-6 text-center">
					<p class="text-gray-600">
						Already have an account?
						<a href="/auth/login" class="text-[#1E3A8A] hover:underline font-medium">Login</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

