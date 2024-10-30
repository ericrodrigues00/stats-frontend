// src/hooks/useRegression.js
import { useState } from 'react';
import { api } from '../utils/api';

/**
 * Hook para gerenciar os dados e cálculos da regressão
 * @returns {Object} Estado e funções para manipular os dados da regressão
 */
export const useRegression = () => {
    const [data, setData] = useState([]);
    const [regression, setRegression] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.fetchRegression();
            setData(response.points || []);
            setRegression(response.coefficients);
            setError(null);
        } catch (err) {
            setError('Erro ao buscar dados da regressão');
            console.error(err);
        }
    };

    const addPoint = async (x, y) => {
        try {
            await api.addPoint(parseFloat(x), parseFloat(y));
            await fetchData();
            return true;
        } catch (err) {
            setError('Erro ao adicionar ponto');
            console.error(err);
            return false;
        }
    };

    const updatePoint = async (id, x, y) => {
        try {
            await api.updatePoint(id, parseFloat(x), parseFloat(y));
            await fetchData();
            return true;
        } catch (err) {
            setError('Erro ao atualizar ponto');
            console.error(err);
            return false;
        }
    };

    const deletePoint = async (id) => {
        try {
            await api.deletePoint(id);
            await fetchData();
            return true;
        } catch (err) {
            setError('Erro ao deletar ponto');
            console.error(err);
            return false;
        }
    };

    const clearAllPoints = async () => {
        try {
            await api.clearAllPoints();
            setData([]);
            setRegression(null);
            setError(null);
            return true;
        } catch (err) {
            setError('Erro ao limpar dados');
            console.error(err);
            return false;
        }
    };

    return {
        data,
        regression,
        error,
        fetchData,
        addPoint,
        updatePoint,
        deletePoint,
        clearAllPoints
    };
};