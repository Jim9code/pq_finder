import { writable, get } from 'svelte/store';
import type { User } from '../types';

// Mock user - in production, this would come from authentication
const defaultUser: User | null = null;

export const userStore = writable<User | null>(defaultUser);

export function setUser(user: User | null) {
	userStore.set(user);
}

export function isAdmin(): boolean {
	const user = get(userStore);
	return user?.role === 'admin';
}

// Helper function to check if user can upload
export function canUpload(): boolean {
	return isAdmin();
}
