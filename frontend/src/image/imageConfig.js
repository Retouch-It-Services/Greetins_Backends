// Image Configuration and Constants

export const IMAGE_CONFIG = {
  // Upload settings
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxFileSizeMB: 5,
  
  // Accepted formats
  acceptedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  acceptedExtensions: '.jpg,.jpeg,.png,.gif,.webp',
  
  // Compression
  compressionQuality: 0.85,
  
  // Resizing
  maxWidth: 800,
  maxHeight: 600,
  
  // Team member images
  teamMemberMaxWidth: 400,
  teamMemberMaxHeight: 400,
  
  // Card images
  cardImageMaxWidth: 600,
  cardImageMaxHeight: 800
};

export const IMAGE_PATHS = {
  teamMembers: '/assets/team/',
  cardTemplates: '/assets/cards/',
  birthdays: '/assets/birthday/',
  uploads: '/uploads/'
};

export const IMAGE_DIMENSIONS = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  teamCard: { width: 400, height: 400 },
  greetingCard: { width: 600, height: 800 }
};

export const DEFAULT_IMAGES = {
  teamMember: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  card: 'https://images.unsplash.com/photo-1558636508-e0db3814a4ad?w=400&h=500&fit=crop',
  placeholder: 'https://via.placeholder.com/400x400?text=No+Image'
};
