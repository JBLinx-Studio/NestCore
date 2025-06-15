
export interface FileValidationConfig {
  maxSize: number; // in bytes
  allowedTypes: string[];
  maxFiles: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const DEFAULT_VALIDATION_CONFIG: FileValidationConfig = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ],
  maxFiles: 10
};

export const validateFiles = (
  files: File[],
  config: FileValidationConfig = DEFAULT_VALIDATION_CONFIG
): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check file count
  if (files.length > config.maxFiles) {
    errors.push(`Maximum ${config.maxFiles} files allowed. You selected ${files.length} files.`);
  }

  // Check each file
  files.forEach((file, index) => {
    // Check file size
    if (file.size > config.maxSize) {
      const maxSizeMB = (config.maxSize / (1024 * 1024)).toFixed(1);
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      errors.push(`File "${file.name}" is ${fileSizeMB}MB, but maximum allowed size is ${maxSizeMB}MB.`);
    }

    // Check file type
    if (!config.allowedTypes.includes(file.type)) {
      errors.push(`File type "${file.type}" is not supported for file "${file.name}".`);
    }

    // Check for duplicate names
    const duplicates = files.filter((f, i) => i !== index && f.name === file.name);
    if (duplicates.length > 0) {
      warnings.push(`Duplicate file name detected: "${file.name}"`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const getFileCategory = (file: File): string => {
  if (file.type.startsWith('image/')) return 'Marketing';
  if (file.type === 'application/pdf') return 'Legal';
  if (file.name.toLowerCase().includes('lease')) return 'Legal';
  if (file.name.toLowerCase().includes('utility') || file.name.toLowerCase().includes('bill')) return 'Utilities';
  if (file.name.toLowerCase().includes('maintenance') || file.name.toLowerCase().includes('repair')) return 'Maintenance';
  return 'Legal';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};
