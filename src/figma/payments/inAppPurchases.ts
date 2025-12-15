export const PRODUCT_IDS = ['club5_premium_monthly', 'club5_premium_annual'] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

type PremiumCallback = () => void;

let onPremiumPurchased: PremiumCallback | null = null;

export const setOnPremiumPurchasedCallback = (callback: PremiumCallback | null) => {
  onPremiumPurchased = callback;
};

export async function initInAppPurchases(): Promise<void> {
  // RevenueCat handles initialization elsewhere (see src/lib/revenuecat).
  // This stub keeps legacy calls from crashing if invoked.
  void onPremiumPurchased;
}

export async function getAvailableProducts() {
  return [];
}

export async function purchaseProduct(productId: ProductId): Promise<void> {
  void productId;
}

export async function restorePurchases(): Promise<boolean> {
  return false;
}
