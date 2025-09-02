import {useMakePurchaseMutation} from '@/api/purchase/purchaseApi';
import {useState} from 'react';
import {Product} from 'react-native-qonversion';

export const useActions = (data: Product[]) => {
  const [handleMakePurchaseMutation] = useMakePurchaseMutation();
  const [planSelected, setPlanSelected] = useState<Product | null>(null);

  const handleSelectPlan = (plan: Product) => setPlanSelected(plan);

  return {planSelected, handleSelectPlan, handleMakePurchaseMutation};
};
