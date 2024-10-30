import React from 'react';
import {
    Box,
    Paper,
    Typography,
    FormControlLabel,
    Checkbox,
    Alert // Adicionando o import do Alert
} from '@mui/material';
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Scatter,
    ResponsiveContainer
} from 'recharts';
import {
    Timeline as TimelineIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useResponsive } from '../../hooks/useResponsive';
import { generateLinePoints } from '../../utils/calculations';
import { formatDecimal } from '../../utils/formatters';

const RegressionChart = ({
    data,
    regression,
    showEstimatedLine,
    onToggleEstimatedLine
}) => {
    const { isMobile } = useResponsive();

    if (data.length < 2) {
        return (
            <Paper sx={{ p: isMobile ? 2 : 3 }}>
                <Alert severity="info">
                    Adicione pelo menos 2 pontos para calcular a regressão
                </Alert>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: isMobile ? 2 : 3 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                flexWrap: 'wrap',
                gap: 1
            }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showEstimatedLine}
                            onChange={(e) => onToggleEstimatedLine(e.target.checked)}
                            icon={<VisibilityOffIcon />}
                            checkedIcon={<VisibilityIcon />}
                            color="primary"
                        />
                    }
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TimelineIcon fontSize="small" />
                            <Typography variant={isMobile ? "body2" : "body1"}>
                                {showEstimatedLine ? "Esconder linha estimada" : "Mostrar linha estimada"}
                            </Typography>
                        </Box>
                    }
                />
                {regression && (
                    <Typography
                        variant={isMobile ? "body2" : "body1"}
                        color="text.secondary"
                    >
                        y = {formatDecimal(regression.slope)}x {regression.intercept >= 0 ? '+' : ''} {formatDecimal(regression.intercept)}
                    </Typography>
                )}
            </Box>

            <Box sx={{ width: '100%', height: isMobile ? 300 : 400 }}>
                <ResponsiveContainer>
                    <ComposedChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            type="number"
                            dataKey="x"
                            name="X"
                            label={{
                                value: 'X',
                                position: 'bottom',
                                offset: -5
                            }}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Y"
                            label={{
                                value: 'Y',
                                angle: -90,
                                position: 'left',
                                offset: -5
                            }}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload?.length) {
                                    return (
                                        <Paper sx={{ p: 1 }}>
                                            <Typography variant="body2">
                                                X: {payload[0].payload.x}
                                            </Typography>
                                            <Typography variant="body2">
                                                Y: {payload[0].payload.y}
                                            </Typography>
                                        </Paper>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Scatter name="Pontos" data={data} fill="#8884d8" />
                        {regression && showEstimatedLine && (
                            <Line
                                name="Linha Estimada"
                                data={generateLinePoints(regression, data)}
                                type="linear"
                                dataKey="y"
                                stroke="#ff7300"
                                strokeWidth={2}
                                dot={false}
                                activeDot={false}
                                isAnimationActive={false}
                            />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

export default RegressionChart;