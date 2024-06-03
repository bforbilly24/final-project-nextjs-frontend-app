'use server';
import axios from 'axios';

export async function getDataXml() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await axios.get(`${apiUrl}/xml-data`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch XML data');
        }
    } catch (error) {
        console.error('Error fetching XML data:', error);
        throw error;
    }
}
