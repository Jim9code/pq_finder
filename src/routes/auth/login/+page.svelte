<script lang="ts">
	import { goto } from '$app/navigation';
	import { BookOpen, Mail, Lock } from 'lucide-svelte';

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;
		// Simulate login
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
				<div class="text-8xl mb-6">📚</div>
				<h2 class="text-3xl font-bold text-[#1E3A8A] mb-4">
					Welcome Back, Scholar!
				</h2>
				<p class="text-lg text-gray-600 mb-6">
					Join our contributors and earn for helping others learn.
				</p>
				<div class="bg-[#E2E8F0] rounded-xl p-6 paper-texture">
					<div class="text-left space-y-4">
						<div class="flex items-center gap-3">
							<div class="text-3xl">✅</div>
							<p class="text-gray-700">Track your uploads and earnings</p>
						</div>
						<div class="flex items-center gap-3">
							<div class="text-3xl">💰</div>
							<p class="text-gray-700">Earn verified income from uploads</p>
						</div>
						<div class="flex items-center gap-3">
							<div class="text-3xl">📊</div>
							<p class="text-gray-700">View detailed analytics and stats</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Side - Login Form -->
			<div class="bg-white rounded-xl shadow-xl p-8 paper-texture max-w-md mx-auto lg:mx-0">
				<div class="text-center mb-8">
					<div class="inline-block p-4 bg-[#1E3A8A] rounded-full mb-4">
						<BookOpen size={32} class="text-white" />
					</div>
					<h1 class="text-3xl font-bold text-[#1E3A8A] mb-2">Login</h1>
					<p class="text-gray-600">Sign in to your uploader account</p>
				</div>

				<form onsubmit={handleSubmit} class="space-y-6">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							<div class="flex items-center gap-2">
								<Mail size={16} />
								Email Address
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
								<Lock size={16} />
								Password
							</div>
						</label>
						<input
							type="password"
							bind:value={password}
							required
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
							placeholder="Enter your password"
						/>
					</div>

					<div class="flex items-center justify-between">
						<label class="flex items-center gap-2 text-sm text-gray-600">
							<input type="checkbox" class="rounded" />
							<span>Remember me</span>
						</label>
						<a href="/auth/forgot" class="text-sm text-[#1E3A8A] hover:underline"
							>Forgot password?</a
						>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						class="w-full px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-all"
					>
						{isLoading ? 'Signing in...' : 'Sign In'}
					</button>
				</form>

				<div class="mt-6 text-center">
					<p class="text-gray-600">
						Don't have an account?
						<a href="/auth/signup" class="text-[#1E3A8A] hover:underline font-medium"
							>Become an uploader</a
						>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

