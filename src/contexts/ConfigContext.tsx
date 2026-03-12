"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface SiteConfig {
  currency_symbol: string;
  currency_name: string;
  currency_position: 'before' | 'after';
}

interface ConfigContextType {
  config: SiteConfig;
  loading: boolean;
  formatPrice: (price: number) => string;
}

const defaultConfig: SiteConfig = {
  currency_symbol: 'FCFA',
  currency_name: 'Franc CFA',
  currency_position: 'after',
};

const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  loading: true,
  formatPrice: (price: number) => `${price.toLocaleString('fr-FR')} FCFA`,
});

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
        const response = await fetch(`${API_URL}/config`);
        
        if (response.ok) {
          const data = await response.json();
          setConfig({
            currency_symbol: data.currency_symbol || 'FCFA',
            currency_name: data.currency_name || 'Franc CFA',
            currency_position: data.currency_position || 'after',
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la config:', error);
        // Garder la config par défaut
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const formatPrice = (price: number): string => {
    const formattedNumber = price.toLocaleString('fr-FR');
    
    if (config.currency_position === 'before') {
      return `${config.currency_symbol} ${formattedNumber}`;
    } else {
      return `${formattedNumber} ${config.currency_symbol}`;
    }
  };

  return (
    <ConfigContext.Provider value={{ config, loading, formatPrice }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
}
