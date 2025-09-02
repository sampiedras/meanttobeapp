import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import React, {useState} from 'react';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {CircleButton} from '../CircleButton';
import {LocalSvg} from 'react-native-svg';
import {colorsLight} from '@/theme/colorsLight';
import {GradientButton} from '../GradientButton';
import {RenderItem} from './RenderItem';
import {useActions} from './useActions';
import {getNameSubscription} from '@/utils/subscriptionsUtils';
import Qonversion, {
  Entitlement,
  Product,
  PurchaseModel,
  PurchaseUpdateModel,
} from 'react-native-qonversion';
import {useAuthProvider} from '@/context/AuthContext';

interface Props {
  visible: boolean;
  title?: string;
  onClose?: () => void;
  data: Product[];
}

export const ModalPremium = ({visible, title, data, onClose}: Props) => {
  const {
    isSubscriptionActive,
    userSubscription,
    setIsLoading,
    checkUserIsAuth,
  } = useAuthProvider();
  const {planSelected, handleSelectPlan} = useActions(data);
  const [loading, setLoading] = useState(false);

  const handleMakePurchase = async () => {
    try {
      if (planSelected) {
        setLoading(true);
        const purchaseModel: PurchaseModel = new PurchaseModel(
          planSelected.qonversionID,
        );
        const entitlements: Map<string, Entitlement> =
          await Qonversion.getSharedInstance().purchase(purchaseModel);
        setIsLoading(true);

        await checkUserIsAuth();
      }
    } catch (e: any) {
      if (e.userCanceled) {
        // Purchase canceled by the user
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePurchase = async () => {
    try {
      if (planSelected) {
        setLoading(true);
        const purchaseUpdateModel: PurchaseUpdateModel =
          new PurchaseUpdateModel(
            planSelected.qonversionID,
            userSubscription?.productId || '',
          );

        const entitlements: Map<string, Entitlement> | null =
          await Qonversion.getSharedInstance().updatePurchase(
            purchaseUpdateModel,
          );

        setIsLoading(true);

        await checkUserIsAuth();
      }
    } catch (e: any) {
      if (e.userCanceled) {
        // Purchase canceled by the user
      }
    } finally {
      setLoading(false);
    }
  };

  const getItem = (data: Product[], index: number) => {
    return data[index];
  };

  const getItemCount = (data: Product[]) => {
    return data.length;
  };
  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerModal}>
          <View style={styles.containerHeader}>
            <CircleButton
              style={styles.closeButton}
              onPress={onClose}
              backgroundColor={colorsLight.FILL_COLOR_LIGHT}
              height={30}
              width={30}
              icon={
                <LocalSvg
                  asset={require('../../assets/svg/close_disabled.svg')}
                />
              }
            />
            <View style={styles.titleModalContainer}>
              <Text color={colorsLight.BLACK} style={styles.titleModal}>
                {title}
              </Text>
            </View>
            <View style={styles.separator} />
          </View>
          <VirtualizedList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <View>
                  <LocalSvg
                    asset={require('../../assets/svg/line_dashed.svg')}
                  />
                  <View row style={styles.containerImages}>
                    <LocalSvg
                      style={styles.images}
                      asset={require('../../assets/svg/person_one.svg')}
                    />
                    <LocalSvg
                      style={styles.images}
                      asset={require('../../assets/svg/person_two.svg')}
                    />
                    <LocalSvg
                      asset={require('../../assets/svg/person_three.svg')}
                    />
                  </View>
                </View>
                <View marginB-20>
                  <View center>
                    <Text
                      style={styles.title}
                      color={colorsLight.PRIMARY_TEXT_COLOR}>
                      See who likes you
                    </Text>
                    <LocalSvg
                      asset={require('../../assets/svg/m2b_icon_tab_bar.svg')}
                    />
                    <Text
                      color={colorsLight.NEUTRAL_50}
                      style={styles.subtitle}>
                      Going premium will give you unlimitted access to see who
                      likes you, message people you've matched with, and
                      backtrack to the previous profiles.
                    </Text>
                  </View>
                  <Text style={styles.textSelect} color={colorsLight.BLACK}>
                    Select a duration:
                  </Text>
                </View>
              </>
            }
            data={data}
            renderItem={({item, index}: {item: Product; index: number}) => (
              <RenderItem
                key={index}
                index={index}
                item={item}
                planSelected={planSelected}
                handleSelectPlan={handleSelectPlan}
              />
            )}
            getItemCount={() => getItemCount(data)}
            getItem={(data, index) => getItem(data, index)}
            keyExtractor={(item, index) => `key-${index}`}
            ListFooterComponent={
              planSelected && (
                <GradientButton
                  style={styles.button}
                  label={`Get ${getNameSubscription(
                    planSelected?.qonversionID || '',
                  )} for ${planSelected?.prettyPrice || ''}`}
                  height={54}
                  onPress={
                    isSubscriptionActive && Platform.OS === 'android'
                      ? handleUpdatePurchase
                      : handleMakePurchase
                  }
                  loading={loading}
                />
              )
            }
            style={styles.list}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  containerModal: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: colorsLight.WHITE,
    paddingHorizontal: 14,
    flex: 1,
  },
  containerHeader: {
    position: 'relative',
    marginTop: 16,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    left: 0,
    bottom: 4,
  },
  titleModalContainer: {
    alignItems: 'center',
  },
  titleModal: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    marginTop: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colorsLight.FILL_COLOR_MEDIUM,
    width: '100%',
    marginTop: 24,
  },
  containerImages: {
    position: 'absolute',
    right: 46,
    bottom: 40,
  },
  images: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Satoshi-Black',
  },
  subtitle: {
    fontSize: 16,
    width: '90%',
    textAlign: 'center',
    marginTop: 24,
    fontFamily: 'Satoshi-Regular',
  },
  button: {
    marginTop: 20,
    marginBottom: 24,
  },
  // Item
  buttonLicense: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 20,
    flexDirection: 'column',
    borderWidth: 2,
    backgroundColor: colorsLight.GRAY_LIGHT,
    alignItems: 'center',
  },
  tagMostPopular: {
    position: 'absolute',
    top: -12,
    right: 130,
  },
  containerLicenses: {
    alignContent: 'center',
    alignSelf: 'center',
  },
  containerRadioButton: {
    justifyContent: 'space-between',
  },
  textDuration: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
  },
  textPrice: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Satoshi-Black',
  },
  tagNoSubscribe: {
    marginTop: 16,
  },
  textSelect: {
    fontSize: 16,
    marginTop: 22,
    fontFamily: 'Satoshi-Black',
    lineHeight: 20.8,
    fontWeight: '500',
  },
});
