import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-ui-lib';
import {useActionsMatch} from './useActionsMatch';
import {
  CircleButton,
  ContainerSafeArea,
  IsEmptyMatch,
  ModalFilters,
  ModalPremium,
  PermissionsConfiguration,
} from '@/components';
import {colorsLight} from '@/theme/colorsLight';
import {ActivityIndicator} from '@react-native-material/core';
import {FilterIcon, ReloadIcon} from '@/assets/svg';
import {CardFragment} from './CardFragment';
import {ModalBackCard} from '@/components/ModalBackCard';

export const CardMatch = () => {
  const {
    data,
    filter,
    subscriptions,
    modalPremium,
    isLoading,
    haveLocationPermission,
    haveNotificationPermission,
    loadingMoreData,
    toggleModalFilters,
    setModalPremium,
    deleteCard,
    undoDeleteCard,
    handleNextPageMatch,
    handleOpenModalPremium,
  } = useActionsMatch();

  const renderLoading = useMemo(
    () => (
      <View
        flex-1
        center
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height}>
        <ActivityIndicator color={colorsLight.PRIMARY_COLOR} size={40} />
        <Text style={styles.textLoading}>Loading...</Text>
      </View>
    ),
    [],
  );

  const renderHeader = useMemo(
    () => (
      <View style={styles.containerHeader}>
        <CircleButton
          onPress={undoDeleteCard}
          backgroundColor="white"
          width={40}
          height={40}
          icon={<ReloadIcon />}
        />
        <Text style={styles.textHeader}>Start Matching </Text>
        <CircleButton
          onPress={toggleModalFilters}
          backgroundColor="white"
          width={40}
          height={40}
          icon={<FilterIcon />}
        />
        <ModalBackCard handleOpenModalPremium={handleOpenModalPremium} />
      </View>
    ),
    [toggleModalFilters, undoDeleteCard],
  );

  const renderLoadingMoreProfiles = useMemo(
    () => (
      <View
        backgroundColor={colorsLight.WHITE}
        width="100%"
        height="100%"
        flex-1
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colorsLight.PRIMARY_COLOR} size={35} />
        <Text style={styles.textLoading}>Loading more profiles</Text>
      </View>
    ),
    [],
  );

  const renderContent = useMemo(
    () => (
      <View flex>
        {!haveLocationPermission && !haveNotificationPermission ? (
          <PermissionsConfiguration title={'location and message'} />
        ) : (
          <>
            {data &&
              data.map((e, index) => (
                <CardFragment
                  deleteCard={deleteCard}
                  item={e}
                  key={e.id}
                  index={index}
                />
              ))}
          </>
        )}
        {data && data.length === 0 && (
          <IsEmptyMatch toggleModalFilters={toggleModalFilters} />
        )}
      </View>
    ),
    [
      data,
      haveLocationPermission,
      haveNotificationPermission,
      deleteCard,
      handleNextPageMatch,
    ],
  );

  return (
    <ContainerSafeArea>
      {isLoading && renderLoading}
      {isLoading ? null : renderHeader}
      {loadingMoreData && renderLoadingMoreProfiles}
      {!isLoading && !loadingMoreData && renderContent}
      <ModalFilters
        visible={filter}
        onClose={toggleModalFilters}
        onDone={toggleModalFilters}
        title="Filters"
      />
      {subscriptions.size > 0 && (
        <ModalPremium
          visible={modalPremium}
          title="Premium"
          data={Array.from(subscriptions.values())}
          onClose={() => setModalPremium(false)}
        />
      )}
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  textHeader: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Satoshi-Medium',
  },
  textLoading: {
    fontSize: 16,
    color: colorsLight.BLACK,
    fontFamily: 'Satoshi-Medium',
  },
});
