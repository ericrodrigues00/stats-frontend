import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useResponsive } from '../../hooks/useResponsive';
import { formatDecimal, getCorrelationDescription } from '../../utils/formatters';

/**
 * Componente para exibir os resultados da regressão
 */
const RegressionResults = ({ regression }) => {
    const { isMobile } = useResponsive();

    if (!regression) return null;

    const { strength, type } = getCorrelationDescription(regression.r);

    return (
        <Paper sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Resultados da Regressão Linear
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
                Equação: y = {formatDecimal(regression.slope)}x {regression.intercept >= 0 ? '+' : ''} {formatDecimal(regression.intercept)}
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
                R² = {formatDecimal(regression.r2)}
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
                r = {formatDecimal(regression.r)}
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
                Correlação {strength} e {type}
            </Typography>
        </Paper>
    );
};

export default RegressionResults;