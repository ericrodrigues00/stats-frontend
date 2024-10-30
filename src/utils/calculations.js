/**
 * Gera os pontos para a linha de regressão
 * @param {Object} regression - Objeto com os coeficientes da regressão
 * @param {Array} data - Array de pontos de dados
 * @returns {Array} Pontos para desenhar a linha de regressão
 */
export const generateLinePoints = (regression, data) => {
    if (!regression || data.length < 2) return [];
    
    const xMin = Math.min(...data.map(p => Number(p.x)));
    const xMax = Math.max(...data.map(p => Number(p.x)));
    
    return [
        { x: xMin, y: Number(regression.slope) * xMin + Number(regression.intercept) },
        { x: xMax, y: Number(regression.slope) * xMax + Number(regression.intercept) }
    ];
};

/**
 * Calcula o erro médio absoluto
 * @param {Array} data - Array de pontos de dados
 * @param {Object} regression - Objeto com os coeficientes da regressão
 * @returns {number} Erro médio absoluto
 */
export const calculateMeanAbsoluteError = (data, regression) => {
    if (!regression || data.length < 2) return 0;
    
    return data.reduce((acc, point) => {
        const yEstimado = regression.slope * point.x + regression.intercept;
        return acc + Math.abs(point.y - yEstimado);
    }, 0) / data.length;
};