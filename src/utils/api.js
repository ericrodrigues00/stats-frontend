import axios from 'axios';
import { API_URL } from '../constants';

/**
 * Funções de API para manipulação dos pontos de dados
 */
export const api = {
    // Busca todos os pontos e calcula a regressão
    fetchRegression: async () => {
        const response = await axios.get(`${API_URL}/regression`);
        return response.data;
    },

    // Adiciona um novo ponto
    addPoint: async (x, y) => {
        const response = await axios.post(`${API_URL}/data-points`, { x, y });
        return response.data;
    },

    // Atualiza um ponto existente
    updatePoint: async (id, x, y) => {
        const response = await axios.put(`${API_URL}/data-points/${id}`, { x, y });
        return response.data;
    },

    // Remove um ponto
    deletePoint: async (id) => {
        const response = await axios.delete(`${API_URL}/data-points/${id}`);
        return response.data;
    },

    // Remove todos os pontos
    clearAllPoints: async () => {
        const response = await axios.delete(`${API_URL}/data-points`);
        return response.data;
    }
};
