import {GradientBanner, GradientButton, ModalPremium} from '@/components';
import {useAuthProvider} from '@/context/AuthContext';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Qonversion, {Product} from 'react-native-qonversion';
import {LocalSvg} from 'react-native-svg';
import {View} from 'react-native-ui-lib';
import {ModalPlan} from './ModalPlan';

export const ViewPricing = () => {
  const {isSubscriptionActive, userSubscription} = useAuthProvider();
  const [modalPremium, setModalPremium] = useState(false);
  const [modalPlan, setModalPlan] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Product[]>([]);
  const [subscriptionsToCompare, setSubscriptionsToCompare] = useState<
    Product[]
  >([]);

  useEffect(() => {
    fetchProductsItems();
  }, []);

  const fetchProductsItems = async () => {
    try {
      const products: Map<string, Product> =
        await Qonversion.getSharedInstance().products();
      if (products?.size > 0) {
        setSubscriptionsToCompare(Array.from(products.values()));
        const productsArray = Array.from(products.values())
          .sort(
            (a, b) =>
              parseFloat(a?.price?.toString() || '0') -
              parseFloat(b.price?.toString() || '0'),
          )
          .filter(prod => userSubscription?.productId !== prod?.qonversionID);

        setSubscriptions(productsArray);
      }
    } catch (e) {
      // TODO: handle error
    }
  };

  return (
    <View marginB-95>
      <View center marginT-24>
        <GradientBanner
          title="Super Meant!"
          text="Unlock all of our features to be in complete control of your experience."
          labelButton={
            isSubscriptionActive
              ? `Activate until ${format(
                  userSubscription?.expirationDate || 0,
                  'MMMM d, yyyy',
                )}`
              : 'Activate 150.00 MXN'
          }
          width={isSubscriptionActive ? '90%' : 165}
          onPress={() => setModalPremium(true)}
        />
      </View>
      {isSubscriptionActive ? (
        <View marginB-24 marginT-24 height={236} style={styles.containerItems}>
          <View marginB-20 center row style={styles.container}>
            <Text style={styles.title}>What you get</Text>
            <View row>
              <Text style={[{marginRight: 20}, styles.title]}>Premium</Text>
              <Text style={styles.titleDisabled}>Current</Text>
            </View>
          </View>

          <View marginB-20 row center style={styles.container}>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}>
              See who likes you
            </Text>
            <LocalSvg
              style={styles.iconPremium}
              asset={require('../../../assets/svg/check.svg')}
            />
          </View>

          <View marginB-20 row style={styles.container}>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}>
              Unlimited backtracks
            </Text>
            <LocalSvg
              style={styles.iconPremium}
              asset={require('../../../assets/svg/check.svg')}
            />
          </View>

          <View marginB-20 row center style={styles.container}>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}>
              Unlimited matches
            </Text>
            <LocalSvg
              style={styles.iconPremium}
              asset={require('../../../assets/svg/check.svg')}
            />
          </View>
        </View>
      ) : (
        <View marginB-24 marginT-24 height={236} style={styles.containerItems}>
          <View marginB-20 center row style={styles.container}>
            <Text style={styles.title}>What you get</Text>
            <View row>
              <Text style={[{marginRight: 20}, styles.titleDisabled]}>
                Premium
              </Text>
              <Text style={styles.title}>Current</Text>
            </View>
          </View>

          <View marginB-20 row center style={styles.container}>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}>
              See who likes you
            </Text>
            <LocalSvg
              style={styles.iconPremium}
              asset={require('../../../assets/svg/check.svg')}
            />
          </View>

          <View marginB-20 row style={styles.container}>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}>
              Unlimited backtracks
            </Text>
            <LocalSvg
              style={styles.iconPremium}
              asset={require('../../../assets/svg/check.svg')}
            />
          </View>

          <View marginB-20 row center style={styles.container}>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}>
              Unlimited matches
            </Text>
            <LocalSvg
              style={styles.iconPremium}
              asset={require('../../../assets/svg/check.svg')}
            />
          </View>
        </View>
      )}
      {userSubscription && userSubscription?.productId === 'year' ? (
        <GradientButton
          label="Full access"
          style={styles.buttonPremium}
          onPress={() => setModalPremium(true)}
          height={54}
          disabled
        />
      ) : (
        <GradientButton
          label={isSubscriptionActive ? 'Update my plan' : 'Get premium'}
          style={styles.buttonPremium}
          onPress={() => setModalPremium(true)}
          height={54}
        />
      )}
      {subscriptions.length > 0 && (
        <ModalPremium
          visible={modalPremium}
          title="Premium"
          data={subscriptions}
          onClose={() => setModalPremium(false)}
        />
      )}
      {isSubscriptionActive &&
        modalPlan &&
        userSubscription &&
        subscriptionsToCompare.length > 0 && (
          <ModalPlan
            visible={modalPlan}
            onClose={() => setModalPlan(false)}
            subscriptions={subscriptionsToCompare}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  containerItems: {
    flexDirection: 'column',
    height: 'auto',
  },
  textItems: {
    fontSize: 14,
    color: '#1C1C21',
    fontFamily: 'Satoshi-Regular',
  },
  title: {
    fontSize: 14,
    color: '#1C1C21',
    fontFamily: 'Satoshi-Medium',
  },
  titleDisabled: {
    fontSize: 14,
    color: '#BABBBF',
    fontFamily: 'Satoshi-Medium',
  },
  iconPremium: {
    marginRight: 94,
  },
  iconCheck: {
    marginRight: 40,
  },
  iconDisabled: {
    marginLeft: 32,
    marginRight: 10,
  },
  buttonPremium: {
    marginBottom: 20,
  },
});