<script lang="ts">
	import { User, Mail, Lock, Bell } from 'lucide-svelte';

	let fullName = $state('John Doe');
	let email = $state('john.doe@example.com');
	let school = $state('University of Lagos');
	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let notificationsEnabled = $state(true);

	function handleProfileUpdate(e: SubmitEvent) {
		e.preventDefault();
		alert('Profile updated successfully!');
	}

	function handlePasswordChange(e: SubmitEvent) {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			alert('New passwords do not match');
			return;
		}
		alert('Password changed successfully!');
		currentPassword = '';
		newPassword = '';
		confirmPassword = '';
	}
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl w-full">
	<h1 class="text-3xl font-bold text-[#1E3A8A] mb-8">Settings</h1>

	<div class="space-y-8">
		<!-- Profile Settings -->
		<div class="bg-white rounded-xl p-8 shadow-md paper-texture">
			<div class="flex items-center gap-3 mb-6">
				<User size={24} class="text-[#1E3A8A]" />
				<h2 class="text-2xl font-semibold text-[#1E3A8A]">Profile Information</h2>
			</div>

			<form onsubmit={handleProfileUpdate} class="space-y-6">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						<div class="flex items-center gap-2">
							<User size={16} />
							Full Name
						</div>
					</label>
					<input
						type="text"
						bind:value={fullName}
						required
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
					/>
				</div>

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
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						<div class="flex items-center gap-2">
							<User size={16} />
							School/University
						</div>
					</label>
					<input
						type="text"
						bind:value={school}
						required
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
					/>
				</div>

				<button
					type="submit"
					class="px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg font-medium"
				>
					Update Profile
				</button>
			</form>
		</div>

		<!-- Password Change -->
		<div class="bg-white rounded-xl p-8 shadow-md paper-texture">
			<div class="flex items-center gap-3 mb-6">
				<Lock size={24} class="text-[#1E3A8A]" />
				<h2 class="text-2xl font-semibold text-[#1E3A8A]">Change Password</h2>
			</div>

			<form onsubmit={handlePasswordChange} class="space-y-6">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Current Password
					</label>
					<input
						type="password"
						bind:value={currentPassword}
						required
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
					<input
						type="password"
						bind:value={newPassword}
						required
						minlength="6"
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Confirm New Password
					</label>
					<input
						type="password"
						bind:value={confirmPassword}
						required
						minlength="6"
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
					/>
				</div>

				<button
					type="submit"
					class="px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:shadow-lg font-medium"
				>
					Change Password
				</button>
			</form>
		</div>

		<!-- Notifications -->
		<div class="bg-white rounded-xl p-8 shadow-md paper-texture">
			<div class="flex items-center gap-3 mb-6">
				<Bell size={24} class="text-[#1E3A8A]" />
				<h2 class="text-2xl font-semibold text-[#1E3A8A]">Notifications</h2>
			</div>

			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium text-gray-800">Email Notifications</p>
					<p class="text-sm text-gray-600">
						Receive email updates about your uploads and earnings
					</p>
				</div>
				<label class="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						bind:checked={notificationsEnabled}
						class="sr-only peer"
					/>
					<div
						class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1E3A8A] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A8A]"
					></div>
				</label>
			</div>
		</div>
	</div>
</div>

