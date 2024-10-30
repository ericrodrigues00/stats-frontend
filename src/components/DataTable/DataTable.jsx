// src/components/DataTable/DataTable.jsx
import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    IconButton,
    Collapse
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import { useResponsive } from '../../hooks/useResponsive';
import { calculateMeanAbsoluteError } from '../../utils/calculations';
import { formatDecimal } from '../../utils/formatters';

/**
 * Componente de tabela expansível para exibição dos pontos
 */
const DataTable = ({
    data,
    regression,
    tableOpen,
    onToggleTable,
    onEditPoint,
    onDeletePoint
}) => {
    const { isMobile } = useResponsive();

    const renderEstimatedY = (point) => {
        if (!regression || !point) return null;
        return formatDecimal(regression.slope * point.x + regression.intercept);
    };

    return (
        <Paper sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                    },
                    borderRadius: 1,
                    p: 1
                }}
                onClick={onToggleTable}
            >
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    Pontos Inseridos ({data.length})
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        sx={{ ml: 1 }}
                    >
                        {tableOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {tableOpen ? "Clique para esconder" : "Clique para expandir"}
                </Typography>
            </Box>

            <Collapse in={tableOpen} timeout="auto" unmountOnExit>
                <Box sx={{ mt: 2 }}>
                    <TableContainer>
                        <Table size={isMobile ? "small" : "medium"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>X</TableCell>
                                    <TableCell>Y</TableCell>
                                    {regression && (
                                        <TableCell>Y estimado</TableCell>
                                    )}
                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((point) => (
                                    <TableRow key={point._id}>
                                        <TableCell>{point.x}</TableCell>
                                        <TableCell>{point.y}</TableCell>
                                        {regression && (
                                            <TableCell>{renderEstimatedY(point)}</TableCell>
                                        )}
                                        <TableCell align="right">
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditPoint(point);
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeletePoint(point._id);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {regression && data.length >= 2 && (
                                    <TableRow>
                                        <TableCell colSpan={2} align="right">
                                            <strong>Erro Médio Absoluto:</strong>
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            {formatDecimal(calculateMeanAbsoluteError(data, regression))}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Collapse>
        </Paper>
    );
};

export default DataTable;