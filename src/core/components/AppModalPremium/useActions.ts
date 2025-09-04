import { useCallback, useEffect, useState } from "react";
import Qonversion, {
  Entitlement,
  Product,
  PurchaseModel,
  PurchaseUpdateModel,
} from "react-native-qonversion";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch } from "@/core/hooks/useRedux";
import { setVisible } from "@/core/slices/alertPremiumSlice";

export const useActions = () => {
  const dispatch = useAppDispatch();
  const {
    userSubscription,
    setIsLoading,
    currentSession,
    handleCheckSubscription,
  } = useAuthProvider();

  const [planSelected, setPlanSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Map<string, Product>>(
    new Map<string, Product>(),
  );

  const handleSelectPlan = useCallback((plan: Product) => {
    setPlanSelected(plan);
  }, []);

  const handleMakePurchase = useCallback(async () => {
    try {
      if (planSelected) {
        setLoading(true);
        const purchaseModel: PurchaseModel = new PurchaseModel(
          planSelected.qonversionID,
        );
        const entitlements: Map<string, Entitlement> =
          await Qonversion.getSharedInstance().purchase(purchaseModel);
        console.log("🚀 ~ handleMakePurchase ~ entitlements:", entitlements);
        setIsLoading(true);

        dispatch(setVisible(false));
        await handleCheckSubscription();
        await currentSession();
      }
    } catch (e: any) {
      if (e.userCanceled) {
        // Purchase canceled by the user
      }
      dispatch(setVisible(false));
    } finally {
      setLoading(false);
    }
  }, [
    currentSession,
    dispatch,
    handleCheckSubscription,
    planSelected,
    setIsLoading,
  ]);

  const handleUpdatePurchase = useCallback(async () => {
    try {
      if (planSelected) {
        setLoading(true);
        const purchaseUpdateModel: PurchaseUpdateModel =
          new PurchaseUpdateModel(
            planSelected.qonversionID,
            userSubscription?.productId || "",
          );

        const entitlements: Map<string, Entitlement> | null =
          await Qonversion.getSharedInstance().updatePurchase(
            purchaseUpdateModel,
          );
        console.log("🚀 ~ handleUpdatePurchase ~ entitlements:", entitlements);

        setIsLoading(true);
        dispatch(setVisible(false));
        await handleCheckSubscription();
        await currentSession();
      }
    } catch (e: any) {
      if (e.userCanceled) {
        // Purchase canceled by the user
      }
      dispatch(setVisible(false));
    } finally {
      setLoading(false);
    }
  }, [
    currentSession,
    dispatch,
    handleCheckSubscription,
    planSelected,
    setIsLoading,
    userSubscription?.productId,
  ]);

  const handleOnClose = useCallback(async () => {
    dispatch(setVisible(false));
  }, [dispatch]);

  const fetchProductsItems = async () => {
    try {
      const products: Map<string, Product> =
        await Qonversion.getSharedInstance().products();
      if (products?.size > 0) {
        const productsArray = Array.from(products.values());
        productsArray.sort(
          (a, b) =>
            parseFloat(a?.price?.toString() || "0") -
            parseFloat(b.price?.toString() || "0"),
        );
        setSubscriptions(
          new Map(
            productsArray.map((product) => [product.qonversionID, product]),
          ),
        );
      }
    } catch (e) {
      // TODO: handle error
      console.log("$$$$$$$$", e);
    }
  };

  useEffect(() => {
    fetchProductsItems();
  }, []);

  return {
    loading,
    planSelected,
    subscriptions: Array.from(subscriptions.values()),
    handleOnClose,
    handleSelectPlan,
    handleMakePurchase,
    handleUpdatePurchase,
  };
};
