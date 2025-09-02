export type SubscriptionType = {
  qonversionID: string;
  storeID: string;
  basePlanID: string | number | null;
  skuDetails: string | number | null;
  storeDetails: string | number | null;
  skProduct: {
    localizedDescription: string;
    localizedTitle: string;
    price: string;
    localeIdentifier: string;
    productIdentifier: string;
    isDownloadable: boolean;
    downloadContentVersion: string;
    downloadContentLengths: any;
    subscriptionPeriod: {numberOfUnits: number; unit: string};
    subscriptionGroupIdentifier: string;
    isFamilyShareable: boolean;
    currencyCode: string;
  };
  offeringId: string | number | null;
  subscriptionPeriod: {unitCount: number; unit: string; iso: string};
  trialPeriod: string | number | null;
  type: string;
  prettyPrice: string;
  price: number;
  currencyCode: string;
  storeTitle: string;
  storeDescription: string;
};

export type SubscriptionsType = SubscriptionType[];
