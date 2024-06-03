'use server';
import axios from 'axios';

export async function addFileXMl(file) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();
    formData.append('xml_file', file);

    try {
        const response = await axios.post(`${apiUrl}/upload-xml`, formData, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to upload XML file');
        }
    } catch (error) {
        console.error('Error uploading XML file:', error);
        throw error;
    }
}
