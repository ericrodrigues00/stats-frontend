import axios from 'axios';
import { API_URL } from '../constants';

export const api = {
    fetchRegression: async () => {
        try {
            const response = await axios.get(`${API_URL}/regression`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar regressão:', error);
            throw error;
        }
    },

    addPoint: async (x, y) => {
        try {
            const response = await axios.post(`${API_URL}/data-points`, { x, y });
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar ponto:', error);
            throw error;
        }
    },

    updatePoint: async (id, x, y) => {
        try {
            const response = await axios.put(`${API_URL}/data-points/${id}`, { x, y });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar ponto:', error);
            throw error;
        }
    },

    deletePoint: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/data-points/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar ponto:', error);
            throw error;
        }
    },

    clearAllPoints: async () => {
        try {
            const response = await axios.delete(`${API_URL}/data-points`);
            return response.data;
        } catch (error) {
            console.error('Erro ao limpar pontos:', error);
            throw error;
        }
    }
};