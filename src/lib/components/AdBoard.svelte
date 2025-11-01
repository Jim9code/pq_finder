<script lang="ts">
	interface Props {
		variant?: 'top' | 'sidebar' | 'bottom';
	}

	let { variant = 'top' }: Props = $props();

	const variantStyles = {
		top: 'w-full h-32',
		sidebar: 'w-full h-96',
		bottom: 'w-full h-32'
	};
</script>

<div
	class="bg-[#E2E8F0] border-2 border-dashed border-[#1E3A8A] rounded-xl flex items-center justify-center paper-texture {variantStyles[variant]}"
>
	<div class="text-center p-6">
		<div class="text-4xl mb-2">📋</div>
		<p class="text-sm text-gray-600 font-medium">Announcement Board</p>
		<p class="text-xs text-gray-500 mt-1">Ad space available</p>
	</div>
</div>

