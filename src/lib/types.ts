export interface PQ {
	id: string;
	university: string;
	course: string;
	level: string;
	year: string;
	semester?: string;
	uploader: string;
	fileUrl: string;
	status: 'pending' | 'verified';
	downloads: number;
	uploadDate?: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	school?: string;
	balance: number;
	role: 'student' | 'uploader';
}

export interface SearchFilters {
	university?: string;
	course?: string;
	level?: string;
	year?: string;
}

