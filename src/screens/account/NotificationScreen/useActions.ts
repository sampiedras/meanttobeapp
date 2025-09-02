import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useState} from 'react';

export const useActionsNotifications = (
  props: RootStackScreenProps<RootStackRoutes.NOTIFICATIONS>,
) => {
  const [enableNotifications, setEnableNotifications] = useState(false);

  const handleEnableNotifications = () => {
    setEnableNotifications(!enableNotifications);
  };

  return {
    enableNotifications,
    handleEnableNotifications,
  };
};
