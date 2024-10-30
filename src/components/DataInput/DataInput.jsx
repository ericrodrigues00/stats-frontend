// src/components/DataInput/DataInput.jsx
import React, { useState } from 'react';
import { Paper, TextField, Button, Grid } from '@mui/material';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Componente para entrada de dados (pontos X e Y)
 */
const DataInput = ({ onAddPoint }) => {
    const { isMobile } = useResponsive();
    const [x, setX] = useState('');
    const [y, setY] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onAddPoint(x, y)) {
            setX('');
            setY('');
        }
    };

    return (
        <Paper sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Valor X"
                            type="number"
                            value={x}
                            onChange={(e) => setX(e.target.value)}
                            fullWidth
                            required
                            size={isMobile ? "small" : "medium"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Valor Y"
                            type="number"
                            value={y}
                            onChange={(e) => setY(e.target.value)}
                            fullWidth
                            required
                            size={isMobile ? "small" : "medium"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size={isMobile ? "small" : "medium"}
                        >
                            Adicionar Ponto
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default DataInput;
