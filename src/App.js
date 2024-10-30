// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Alert, Button } from '@mui/material';

// Componentes
import DataInput from './components/DataInput/DataInput';
import RegressionResults from './components/RegressionResults/RegressionResults';
import DataTable from './components/DataTable/DataTable';
import RegressionChart from './components/RegressionChart/RegressionChart';
import EditPointDialog from './components/EditPointDialog/EditPointDialog';

// Hooks
import { useRegression } from './hooks/useRegression';
import { useResponsive } from './hooks/useResponsive';

/**
 * Componente principal da aplicação
 * Gerencia o estado global e a comunicação entre componentes
 */
function App() {
    // Hooks personalizados
    const { isMobile } = useResponsive();
    const {
        data,
        regression,
        error,
        fetchData,
        addPoint,
        updatePoint,
        deletePoint,
        clearAllPoints
    } = useRegression();

    // Estados locais
    const [tableOpen, setTableOpen] = useState(false);
    const [showEstimatedLine, setShowEstimatedLine] = useState(true);
    const [editPoint, setEditPoint] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    // Carrega os dados iniciais
    useEffect(() => {
        fetchData();
    }, []);

    /**
     * Handlers para ações do usuário
     */
    const handleAddPoint = async (x, y) => {
        const success = await addPoint(x, y);
        if (success) setTableOpen(true);
        return success;
    };

    const handleEditPoint = (point) => {
        setEditPoint(point);
        setEditDialogOpen(true);
    };

    const handleSaveEdit = async () => {
        if (!editPoint) return;
        
        const success = await updatePoint(editPoint._id, editPoint.x, editPoint.y);
        if (success) {
            setEditDialogOpen(false);
            setEditPoint(null);
        }
    };

    const handleDeletePoint = async (pointId) => {
        await deletePoint(pointId);
    };

    return (
        <Container maxWidth="lg" sx={{ pb: 4 }}>
            <Box sx={{ my: isMobile ? 2 : 4 }}>
                {/* Título */}
                <Typography 
                    variant={isMobile ? "h5" : "h4"} 
                    component="h1" 
                    gutterBottom
                    align="center"
                >
                    Regressão Linear
                </Typography>

                {/* Mensagens de erro */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Formulário de entrada */}
                <DataInput onAddPoint={handleAddPoint} />

                {/* Resultados da Regressão */}
                {regression && data.length >= 2 && (
                    <RegressionResults regression={regression} />
                )}

                {/* Tabela de Dados */}
                {data.length > 0 && (
                    <DataTable
                        data={data}
                        regression={regression}
                        tableOpen={tableOpen}
                        onToggleTable={() => setTableOpen(!tableOpen)}
                        onEditPoint={handleEditPoint}
                        onDeletePoint={handleDeletePoint}
                    />
                )}

                {/* Gráfico de Regressão */}
                {data.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <RegressionChart
                            data={data}
                            regression={regression}
                            showEstimatedLine={showEstimatedLine}
                            onToggleEstimatedLine={setShowEstimatedLine}
                        />
                        
                        {/* Botão Limpar Dados */}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={clearAllPoints}
                                size={isMobile ? "small" : "medium"}
                            >
                                Limpar Dados
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* Dialog de Edição */}
                <EditPointDialog
                    open={editDialogOpen}
                    point={editPoint}
                    onClose={() => {
                        setEditDialogOpen(false);
                        setEditPoint(null);
                    }}
                    onSave={handleSaveEdit}
                    onChange={setEditPoint}
                />
            </Box>
        </Container>
    );
}

export default App;