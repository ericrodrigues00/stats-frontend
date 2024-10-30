import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Box
} from '@mui/material';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Componente de diálogo para edição de pontos
 */
const EditPointDialog = ({ 
    open, 
    point, 
    onClose, 
    onSave, 
    onChange 
}) => {
    const { isMobile } = useResponsive();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Ponto</DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Valor X"
                                type="number"
                                value={point?.x || ''}
                                onChange={(e) => onChange({ ...point, x: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Valor Y"
                                type="number"
                                value={point?.y || ''}
                                onChange={(e) => onChange({ ...point, y: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={onClose}
                    size={isMobile ? "small" : "medium"}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={onSave} 
                    variant="contained"
                    size={isMobile ? "small" : "medium"}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPointDialog;