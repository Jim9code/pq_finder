<script lang="ts">
	import { MessageSquare, BookOpen } from 'lucide-svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let submitted = $state(false);

	const faqs = [
		{
			question: 'How do I search for past questions?',
			answer:
				'You can use the search bar on the homepage or navigate to the Browse page. Filter by university, course, level, or year to find exactly what you need.'
		},
		{
			question: 'Are the past questions free?',
			answer: 'Yes! All past questions are completely free for students to download and use.'
		},
		{
			question: 'How do I become an uploader?',
			answer:
				'Simply click "Upload & Earn" or "Become an Uploader" and sign up. Once verified, you can start uploading past questions and earning.'
		},
		{
			question: 'How do I earn as an uploader?',
			answer:
				'When your uploaded past questions are verified and downloaded by students, you earn income. You can withdraw once you reach the minimum threshold (₦5,000).'
		},
		{
			question: 'What file formats are accepted?',
			answer:
				'We accept PDF, PNG, and JPEG formats. Ensure files are clear and legible for best results.'
		},
		{
			question: 'How long does verification take?',
			answer:
				'Verification typically takes 1-3 business days. We verify authenticity, clarity, and ensure no duplicates.'
		},
		{
			question: 'What should I do if I find a duplicate or incorrect PQ?',
			answer:
				'Click the "Report Issue" button on the PQ page and describe the problem. Our team will review and take appropriate action.'
		}
	];

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitted = true;
		setTimeout(() => {
			submitted = false;
			name = '';
			email = '';
			message = '';
		}, 3000);
	}
</script>

<div class="container mx-auto px-4 py-8 w-full max-w-[1400px]">
	<!-- Hero Section -->
	<div class="text-center mb-12">
		<div class="text-6xl mb-4">📚</div>
		<h1 class="text-4xl font-bold text-[#1E3A8A] mb-4">Help & Support</h1>
		<p class="text-lg text-gray-600 max-w-2xl mx-auto">
			We're here to help! Find answers to common questions or reach out to us directly.
		</p>
	</div>

	<!-- FAQs -->
	<section class="mb-16">
		<h2 class="text-3xl font-bold text-[#1E3A8A] mb-8 text-center flex items-center justify-center gap-3">
			<BookOpen size={32} />
			Frequently Asked Questions
		</h2>
		<div class="max-w-4xl mx-auto space-y-4">
			{#each faqs as faq}
				<div class="bg-white rounded-xl p-6 shadow-md paper-texture">
					<h3 class="text-xl font-semibold text-[#1E3A8A] mb-2">{faq.question}</h3>
					<p class="text-gray-700">{faq.answer}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Contact Form -->
	<section class="max-w-2xl mx-auto">
		<div class="bg-white rounded-xl p-8 shadow-md paper-texture">
			<div class="text-center mb-8">
				<div class="inline-block p-4 bg-[#1E3A8A] rounded-full mb-4">
					<MessageSquare size={32} class="text-white" />
				</div>
				<h2 class="text-2xl font-bold text-[#1E3A8A] mb-2">Still Need Help?</h2>
				<p class="text-gray-600">Send us a message and we'll get back to you soon.</p>
			</div>

			{#if submitted}
				<div class="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
					<div class="text-4xl mb-2">✅</div>
					<p class="text-green-700 font-medium">Thank you for contacting us!</p>
					<p class="text-sm text-green-600 mt-2">We'll get back to you soon.</p>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="space-y-6">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
						<input
							type="text"
							bind:value={name}
							required
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
							placeholder="John Doe"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
						<input
							type="email"
							bind:value={email}
							required
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
							placeholder="your.email@example.com"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
						<textarea
							bind:value={message}
							required
							rows="6"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent resize-none"
							placeholder="How can we help you?"
						></textarea>
					</div>

					<button
						type="submit"
						class="w-full px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg font-semibold text-lg transition-all"
					>
						Send Message
					</button>
				</form>
			{/if}
		</div>
	</section>
</div>

