import { useConfig } from '@/contexts/ConfigContext';

/**
 * Hook pour formater les prix avec la devise configurée
 * Utilise automatiquement la configuration du site (FCFA par défaut)
 */
export function usePrice() {
  const { formatPrice, config } = useConfig();
  
  return {
    formatPrice,
    currency: config.currency_symbol,
    currencyName: config.currency_name,
    currencyPosition: config.currency_position,
  };
}
