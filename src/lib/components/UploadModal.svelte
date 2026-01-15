<script lang="ts">
	import { X, Upload as UploadIcon, FileText } from 'lucide-svelte';
	import { userStore } from '$lib/stores/userStore';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open = false, onClose }: Props = $props();

	const user = $derived.by(() => {
		let currentUser = null;
		userStore.subscribe((value) => {
			currentUser = value;
		})();
		return currentUser;
	});

	const isAdmin = $derived(user?.role === 'admin');

	let university = $state('');
	let course = $state('');
	let level = $state('');
	let year = $state('');
	let semester = $state('');
	let file: File | null = $state(null);
	let isDragging = $state(false);
	let uploadProgress = $state(0);
	let isUploading = $state(false);

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		const droppedFile = e.dataTransfer?.files[0];
		if (droppedFile) {
			file = droppedFile;
		}
	}

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files?.[0]) {
			file = target.files[0];
		}
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		
		if (!isAdmin) {
			alert('Only administrators can upload past questions.');
			return;
		}

		if (!file || !university || !course || !level || !year) {
			alert('Please fill in all required fields');
			return;
		}

		isUploading = true;
		// Simulate upload progress
		for (let i = 0; i <= 100; i += 10) {
			uploadProgress = i;
			await new Promise((resolve) => setTimeout(resolve, 200));
		}
		isUploading = false;
		alert('Upload successful! Your PQ is pending verification.');
		onClose();
	}
</script>

{#if open}
	<div
		class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
		onclick={onClose}
		role="presentation"
	>
		<div
			class="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="flex items-center justify-between mb-6">
				<div class="flex items-center gap-3">
					<FileText size={28} class="text-[#1E3A8A]" />
					<h2 class="text-2xl font-bold text-[#1E3A8A]">Submit Your PQ</h2>
				</div>
				<button
					onclick={onClose}
					class="text-gray-400 hover:text-gray-600 transition-colors"
					type="button"
				>
					<X size={24} />
				</button>
			</div>

			<form onsubmit={handleSubmit} class="space-y-6">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							University <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							bind:value={university}
							required
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
							placeholder="University name"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Course <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							bind:value={course}
							required
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
							placeholder="Course name"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Level <span class="text-red-500">*</span>
						</label>
						<select
							bind:value={level}
							required
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
						>
							<option value="">Select level</option>
							<option value="100 Level">100 Level</option>
							<option value="200 Level">200 Level</option>
							<option value="300 Level">300 Level</option>
							<option value="400 Level">400 Level</option>
							<option value="500 Level">500 Level</option>
						</select>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Year <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							bind:value={year}
							required
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
							placeholder="e.g., 2024"
						/>
					</div>

					<div class="md:col-span-2">
						<label class="block text-sm font-medium text-gray-700 mb-2">Semester</label>
						<select
							bind:value={semester}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
						>
							<option value="">Select semester (optional)</option>
							<option value="First Semester">First Semester</option>
							<option value="Second Semester">Second Semester</option>
						</select>
					</div>
				</div>

				<!-- Drag and Drop Zone -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						File Upload <span class="text-red-500">*</span>
					</label>
					<div
						class="border-2 border-dashed rounded-xl p-8 text-center transition-all {isDragging
							? 'border-[#1E3A8A] bg-blue-50'
							: 'border-gray-300 bg-[#E2E8F0]'} paper-texture"
						ondragover={handleDragOver}
						ondragleave={handleDragLeave}
						ondrop={handleDrop}
					>
						{#if file}
							<div class="flex items-center justify-center gap-3">
								<FileText size={32} class="text-[#1E3A8A]" />
								<div class="text-left">
									<p class="font-medium text-gray-800">{file.name}</p>
									<p class="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
								</div>
							</div>
						{:else}
							<UploadIcon size={48} class="mx-auto text-gray-400 mb-4" />
							<p class="text-gray-600 mb-2">Drag and drop your PQ file here</p>
							<p class="text-sm text-gray-500 mb-4">or</p>
							<label
								class="inline-block px-6 py-2 bg-[#1E3A8A] text-white rounded-lg cursor-pointer hover:bg-[#1E40AF] transition-colors"
							>
								Browse Files
								<input
									type="file"
									accept=".pdf,.png,.jpg,.jpeg"
									class="hidden"
									onchange={handleFileSelect}
								/>
							</label>
						{/if}
					</div>
				</div>

				<!-- Upload Progress -->
				{#if isUploading}
					<div>
						<div class="flex justify-between text-sm text-gray-600 mb-2">
							<span>Uploading...</span>
							<span>{uploadProgress}%</span>
						</div>
						<div class="w-full bg-gray-200 rounded-full h-2">
							<div
								class="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] h-2 rounded-full transition-all duration-300"
								style="width: {uploadProgress}%"
							></div>
						</div>
					</div>
				{/if}

				<div class="flex gap-4 pt-4">
					<button
						type="button"
						onclick={onClose}
						class="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isUploading}
						class="flex-1 px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
					>
						{isUploading ? 'Uploading...' : 'Submit PQ'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

