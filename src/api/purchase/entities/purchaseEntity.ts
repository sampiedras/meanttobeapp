export interface PurchaseEntity {
  id: string;
  qonversionId: string;
  identityId: string;
  productId: string;
  isActive: boolean;
  startedDate?: Date;
  expirationDate?: Date;
}
