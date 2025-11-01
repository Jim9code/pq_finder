<script lang="ts">
	import { page } from '$app/stores';
	import { FileText, Upload, DollarSign, Settings, LayoutDashboard, X } from 'lucide-svelte';

	interface Props {
		open?: boolean;
		onClose?: () => void;
	}

	let { open = false, onClose }: Props = $props();

	const menuItems = [
		{ icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
		{ icon: FileText, label: 'My Uploads', href: '/dashboard/uploads' },
		{ icon: Upload, label: 'Upload PQ', href: '/dashboard/upload' },
		{ icon: DollarSign, label: 'Earnings', href: '/dashboard/earnings' },
		{ icon: Settings, label: 'Settings', href: '/settings' }
	];

	function isActive(href: string): boolean {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}

	function handleLinkClick() {
		if (onClose) {
			onClose();
		}
	}
</script>

<!-- Mobile Overlay -->
{#if open}
	<div
		class="fixed inset-0 bg-gray-900 bg-opacity-10 z-40 lg:hidden transition-opacity backdrop-blur-[2px]"
		onclick={onClose}
		role="presentation"
	></div>
{/if}

<!-- Sidebar -->
<aside
	class="bg-white rounded-none lg:rounded-xl p-6 shadow-md paper-texture transition-transform duration-300 ease-in-out fixed lg:static left-0 top-0 h-screen w-full lg:w-64 z-50 lg:z-auto overflow-y-auto lg:translate-x-0 {open
		? 'translate-x-0'
		: '-translate-x-full lg:translate-x-0'}"
>
	<!-- Mobile Close Button -->
	<div class="flex items-center justify-between mb-4 lg:hidden">
		<h3 class="font-semibold text-[#1E3A8A] text-lg">Navigation</h3>
		<button
			onclick={onClose}
			class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
			type="button"
			aria-label="Close menu"
		>
			<X size={24} class="text-gray-600" />
		</button>
	</div>

	<!-- Desktop Title -->
	<h3 class="font-semibold text-[#1E3A8A] mb-4 text-lg hidden lg:block">Navigation</h3>

	<nav class="space-y-2">
		{#each menuItems as item}
			<a
				href={item.href}
				onclick={handleLinkClick}
				class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all {isActive(item.href)
					? 'bg-[#1E3A8A] text-white'
					: 'text-gray-700 hover:bg-[#E2E8F0]'}"
			>
				<svelte:component this={item.icon} size={20} />
				<span class="font-medium">{item.label}</span>
			</a>
		{/each}
	</nav>
</aside>
