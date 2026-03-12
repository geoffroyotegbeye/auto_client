const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

export function getImageUrl(imagePath: string | null | undefined, bustCache: boolean = false): string {
  if (!imagePath) {
    return '/assets/image/no_image.png';
  }
  
  // Si l'URL est déjà complète (commence par http)
  if (imagePath.startsWith('http')) {
    return bustCache ? `${imagePath}?t=${Date.now()}` : imagePath;
  }
  
  // Si c'est un chemin relatif qui commence par /uploads
  if (imagePath.startsWith('/uploads')) {
    const url = `${API_BASE_URL}${imagePath}`;
    return bustCache ? `${url}?t=${Date.now()}` : url;
  }
  
  // Si c'est juste un nom de fichier, construire le chemin complet
  // Détecter le type de fichier par son préfixe
  let folder = 'uploads';
  if (imagePath.startsWith('vehicle-')) {
    folder = 'uploads/vehicles';
  } else if (imagePath.startsWith('brand-')) {
    folder = 'uploads/brands';
  } else if (imagePath.startsWith('hero-')) {
    folder = 'uploads/hero';
  } else if (imagePath.startsWith('logo-')) {
    folder = 'uploads/config';
  }
  
  const url = `${API_BASE_URL}/${folder}/${imagePath}`;
  return bustCache ? `${url}?t=${Date.now()}` : url;
}
