// src/utils/predicateEncryption.ts

export const encryptPOIData = (plainData: string): string => {
  // Apply custom predicate-based encryption here, or just a stub
  return Buffer.from(plainData, 'utf-8').toString('base64');
};

export const decryptPOIData = (encData: string): string => {
  // Decrypt according to your scheme (just stub/base64 for demo)
  return Buffer.from(encData, 'base64').toString('utf-8');
};
