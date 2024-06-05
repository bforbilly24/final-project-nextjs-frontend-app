'use client';
import { useEffect } from 'react';
import { authors } from '@/utils/authors';

function Credit() {
	useEffect(() => {
		if (typeof window !== undefined) {
			window.next = null;
			window.cit = authors;
		}
	}, []);
}

export { Credit };
