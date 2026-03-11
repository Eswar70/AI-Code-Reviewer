import axios from 'axios';
import type { ReviewResponse, HistoryItem } from '../types/reviewTypes';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ??
    'http://localhost:8000/api/v1';

export const api = {
    async reviewCode(code: string, language: string): Promise<ReviewResponse> {
        const response = await axios.post(`${API_BASE_URL}/review-code`, { code, language });
        return response.data;
    },

    async getHistory(): Promise<HistoryItem[]> {
        const response = await axios.get(`${API_BASE_URL}/history`);
        return response.data;
    },

    async reviewCodeStream(code: string, language: string, onChunk: (chunk: string) => void) {
        const response = await fetch(`${API_BASE_URL}/review-code-stream`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, language }),
        });

        if (!response.body) return;

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            onChunk(chunk);
        }
    },

    async deleteHistoryItem(id: string): Promise<void> {
        await axios.delete(`${API_BASE_URL}/history/${id}`);
    }
};
