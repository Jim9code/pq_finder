<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Past Question Finder - Find it. Learn it. Pass it.</title>
	<meta name="description" content="Find past questions from universities across Nigeria. Search, download, and upload past questions." />
</svelte:head>

<div class="min-h-screen flex flex-col bg-[#F1F5F9] w-full overflow-x-hidden">
	<Navbar />
	<main class="flex-1 w-full flex flex-col items-center">
		<div class="w-full">
			{@render children()}
		</div>
	</main>
	<Footer />
</div>

