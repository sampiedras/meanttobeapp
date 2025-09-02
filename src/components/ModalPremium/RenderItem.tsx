import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import {Tag} from '../Tag';
import {LocalSvg} from 'react-native-svg';
import {Platform, StyleSheet} from 'react-native';
import {getNameSubscription} from '@/utils/subscriptionsUtils';
import {Product} from 'react-native-qonversion';
type RenderItemType = {
  index: number;
  item: Product;
  planSelected: Product | null;
  handleSelectPlan: (plan: Product) => void;
};

export const RenderItem = ({
  index,
  item,
  planSelected,
  handleSelectPlan,
}: RenderItemType) => {
  return (
    <View center>
      <TouchableOpacity
        style={[
          {
            borderColor:
              item.qonversionID === planSelected?.qonversionID
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_LIGHT,
          },
          styles.buttonLicense,
        ]}
        onPress={() => handleSelectPlan(item)}>
        {index === 0 && (
          <Tag
            title="Most popular"
            backgroundColor={colorsLight.PRIMARY_COLOR}
            colorTitle={colorsLight.WHITE}
            width={96}
            height={28}
            style={styles.tagMostPopular}
            fontSize={12}
          />
        )}
        <View
          paddingV-12
          height={80}
          style={styles.containerLicenses}
          width="90%">
          <View row style={styles.containerRadioButton}>
            <Text
              style={styles.textDuration}
              color={colorsLight.SECONDARY_TEXT_COLOR}>
              {getNameSubscription(item.qonversionID)}
            </Text>
            {item.qonversionID === planSelected?.qonversionID ? (
              <LocalSvg
                asset={require('../../assets/svg/radio_button_check_icon.svg')}
              />
            ) : (
              <LocalSvg
                asset={require('../../assets/svg/radio_button_icon.svg')}
              />
            )}
          </View>
          <Text style={styles.textPrice} color={colorsLight.PRIMARY_TEXT_COLOR}>
            {item.prettyPrice} {item.currencyCode}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    left: 130,
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
});
