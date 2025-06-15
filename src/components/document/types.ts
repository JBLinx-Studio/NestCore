
export interface BaseDocument {
  id: number;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadDate: string;
  property: string;
  tenant: string;
  status: string;
  fileType: string;
  url: string;
  tags: string[];
}

export interface LeaseDocument extends BaseDocument {
  expiryDate: string;
  amount?: undefined;
  score?: undefined;
  photoCount?: undefined;
  itemCount?: undefined;
  uploadedBy?: undefined;
}

export interface UtilityDocument extends BaseDocument {
  amount: string;
  expiryDate?: undefined;
  score?: undefined;
  photoCount?: undefined;
  itemCount?: undefined;
  uploadedBy?: undefined;
}

export interface ApplicationDocument extends BaseDocument {
  score: string;
  expiryDate?: undefined;
  amount?: undefined;
  photoCount?: undefined;
  itemCount?: undefined;
  uploadedBy?: undefined;
}

export interface PhotoDocument extends BaseDocument {
  photoCount: number;
  expiryDate?: undefined;
  amount?: undefined;
  score?: undefined;
  itemCount?: undefined;
  uploadedBy?: undefined;
}

export interface FolderDocument extends BaseDocument {
  itemCount: number;
  expiryDate?: undefined;
  amount?: undefined;
  score?: undefined;
  photoCount?: undefined;
  uploadedBy?: undefined;
}

export interface UploadedDocument extends BaseDocument {
  uploadedBy: string;
  expiryDate?: undefined;
  amount?: undefined;
  score?: undefined;
  photoCount?: undefined;
  itemCount?: undefined;
}

export type Document = 
  | LeaseDocument 
  | UtilityDocument 
  | ApplicationDocument 
  | PhotoDocument 
  | FolderDocument 
  | UploadedDocument;
