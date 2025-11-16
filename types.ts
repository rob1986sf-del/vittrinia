
export type ImageFile = {
  file: File;
  preview: string;
  base64: string;
  mimeType: string;
} | null;

export interface GenerationOptions {
  modelSize: string;
  backgroundType: string;
  modelAppearance: string;
  outputFormat: string;
  footwear: string;
  numberOfImages: number;
  pose: string;
}

// Fix: Add UserProfile interface.
export interface UserProfile {
  name: string;
  email: string;
  picture: string;
}
