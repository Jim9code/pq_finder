import type { PQ, User } from '../types';

export const mockPQs: PQ[] = [
	{
		id: '1',
		university: 'University of Lagos',
		course: 'Computer Science 101',
		level: '100 Level',
		year: '2023',
		semester: 'First Semester',
		uploader: 'John Doe',
		fileUrl: '/sample-pq.pdf',
		status: 'verified',
		downloads: 245,
		uploadDate: '2024-01-15'
	},
	{
		id: '2',
		university: 'University of Ibadan',
		course: 'Mathematics 201',
		level: '200 Level',
		year: '2022',
		semester: 'Second Semester',
		uploader: 'Jane Smith',
		fileUrl: '/sample-pq.pdf',
		status: 'verified',
		downloads: 189,
		uploadDate: '2024-02-10'
	},
	{
		id: '3',
		university: 'Obafemi Awolowo University',
		course: 'Physics 301',
		level: '300 Level',
		year: '2024',
		semester: 'First Semester',
		uploader: 'Mike Johnson',
		fileUrl: '/sample-pq.pdf',
		status: 'pending',
		downloads: 42,
		uploadDate: '2024-03-20'
	},
	{
		id: '4',
		university: 'University of Lagos',
		course: 'Chemistry 101',
		level: '100 Level',
		year: '2023',
		semester: 'First Semester',
		uploader: 'Sarah Williams',
		fileUrl: '/sample-pq.pdf',
		status: 'verified',
		downloads: 312,
		uploadDate: '2024-01-08'
	},
	{
		id: '5',
		university: 'Ahmadu Bello University',
		course: 'Engineering Mathematics',
		level: '200 Level',
		year: '2022',
		semester: 'Second Semester',
		uploader: 'David Brown',
		fileUrl: '/sample-pq.pdf',
		status: 'verified',
		downloads: 156,
		uploadDate: '2024-02-25'
	},
	{
		id: '6',
		university: 'University of Ibadan',
		course: 'Biology 201',
		level: '200 Level',
		year: '2023',
		semester: 'First Semester',
		uploader: 'Emma Davis',
		fileUrl: '/sample-pq.pdf',
		status: 'verified',
		downloads: 278,
		uploadDate: '2024-01-30'
	}
];

export const universities = [
	'University of Lagos',
	'University of Ibadan',
	'Obafemi Awolowo University',
	'Ahmadu Bello University',
	'University of Nigeria',
	'Covenant University',
	'Lagos State University'
];

export const courses = [
	'Computer Science',
	'Mathematics',
	'Physics',
	'Chemistry',
	'Biology',
	'Engineering Mathematics',
	'Statistics'
];

export const levels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level'];

export const years = ['2024', '2023', '2022', '2021', '2020'];

