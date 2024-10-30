// src/hooks/useResponsive.js
import { useTheme, useMediaQuery } from '@mui/material';

/**
 * Hook para lidar com responsividade
 * @returns {Object} Objeto com flags de responsividade
 */
export const useResponsive = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    return {
        isMobile,
        isTablet,
        isDesktop: !isMobile && !isTablet
    };
};

