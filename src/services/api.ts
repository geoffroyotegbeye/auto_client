const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Fonction helper pour les requêtes
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  // Ne pas ajouter Content-Type pour FormData (le navigateur le fait automatiquement)
  const isFormData = options.body instanceof FormData;
  
  const headers: HeadersInit = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Une erreur est survenue' }));
    throw new Error(error.error || error.message || 'Erreur réseau');
  }

  return response.json();
}

// Véhicules
export const vehiclesAPI = {
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/vehicles${queryString}`);
  },
  getById: (id: string) => fetchAPI(`/vehicles/${id}`),
  create: (data: FormData) => 
    fetchAPI('/vehicles', {
      method: 'POST',
      body: data,
    }),
  update: (id: string, data: FormData) =>
    fetchAPI(`/vehicles/${id}`, {
      method: 'PUT',
      body: data,
    }),
  delete: (id: string) => fetchAPI(`/vehicles/${id}`, { method: 'DELETE' }),
};

// Rendez-vous
export const appointmentsAPI = {
  create: (data: any) => fetchAPI('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/appointments${queryString}`);
  },
  getById: (id: string) => fetchAPI(`/appointments/${id}`),
  update: (id: string, data: any) =>
    fetchAPI(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/appointments/${id}`, { method: 'DELETE' }),
};

// Devis
export const quotesAPI = {
  create: (data: any) => fetchAPI('/quotes', { method: 'POST', body: JSON.stringify(data) }),
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/quotes${queryString}`);
  },
  getById: (id: string) => fetchAPI(`/quotes/${id}`),
  update: (id: string, data: any) =>
    fetchAPI(`/quotes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/quotes/${id}`, { method: 'DELETE' }),
};

// Contact
export const contactAPI = {
  create: (data: any) => fetchAPI('/contact', { method: 'POST', body: JSON.stringify(data) }),
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/contact${queryString}`);
  },
  getById: (id: string) => fetchAPI(`/contact/${id}`),
  update: (id: string, data: any) =>
    fetchAPI(`/contact/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/contact/${id}`, { method: 'DELETE' }),
};

// Avis
export const reviewsAPI = {
  create: (data: any) => fetchAPI('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  getApproved: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/reviews${queryString}`);
  },
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/reviews/all${queryString}`);
  },
  approve: (id: string) => fetchAPI(`/reviews/${id}/approve`, { method: 'PUT' }),
  reject: (id: string) => fetchAPI(`/reviews/${id}/reject`, { method: 'PUT' }),
  delete: (id: string) => fetchAPI(`/reviews/${id}`, { method: 'DELETE' }),
};

// Services
export const servicesAPI = {
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/services${queryString}`);
  },
  create: (data: any) => fetchAPI('/services', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    fetchAPI(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/services/${id}`, { method: 'DELETE' }),
};

// Authentification
export const authAPI = {
  login: async (email: string, password: string) => {
    const data = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token && typeof window !== 'undefined') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },
  register: (email: string, password: string, name: string) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },
  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  },
};

// Utilisateurs
export const usersAPI = {
  getAll: () => fetchAPI('/users'),
  create: (data: any) => fetchAPI('/users', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchAPI(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/users/${id}`, { method: 'DELETE' }),
};

// Configuration
export const configAPI = {
  get: () => fetchAPI('/config'),
  update: (data: any) => {
    // Si c'est un FormData, l'envoyer directement, sinon JSON.stringify
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return fetchAPI('/config', { method: 'PUT', body });
  },
  getPriceRange: () => fetchAPI('/config/price-range'),
};

// Marques
export const brandsAPI = {
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/brands${queryString}`);
  },
  getById: (id: string) => fetchAPI(`/brands/${id}`),
  create: (data: FormData) =>
    fetchAPI('/brands', {
      method: 'POST',
      body: data,
    }),
  update: (id: string, data: FormData) =>
    fetchAPI(`/brands/${id}`, {
      method: 'PUT',
      body: data,
    }),
  delete: (id: string) => fetchAPI(`/brands/${id}`, { method: 'DELETE' }),
};

// Hero
export const heroAPI = {
  getSettings: () => fetchAPI('/hero/settings'),
  getStats: () => fetchAPI('/hero/stats'),
  updateSettings: (data: FormData) =>
    fetchAPI('/hero/settings', {
      method: 'PUT',
      body: data,
    }),
};
