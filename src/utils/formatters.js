import { CORRELATION_STRENGTH } from '../constants';

/**
 * Formata um número com 4 casas decimais
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado
 */
export const formatDecimal = (value) => {
    if (value === null || value === undefined) return '';
    return Number(value).toFixed(4);
};

/**
 * Determina a força da correlação
 * @param {number} r - Coeficiente de correlação
 * @returns {Object} Descrição da correlação
 */
export const getCorrelationDescription = (r) => {
    if (r === null || r === undefined) return { strength: '', type: '' };

    const strength = 
        Math.abs(r) > CORRELATION_STRENGTH.STRONG ? "forte" :
        Math.abs(r) > CORRELATION_STRENGTH.MODERATE ? "moderada" :
        "fraca";

    const type = r > 0 ? "positiva" : "negativa";

    return { strength, type };
};