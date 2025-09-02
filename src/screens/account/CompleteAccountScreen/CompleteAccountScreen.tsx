import React from 'react';
import {Animated, ScrollView, StyleSheet} from 'react-native';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import {useActionsCompleteAccount} from './useActions';
import {ViewEmailFragment} from './ViewEmailFragment';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {View} from 'react-native-ui-lib';
import {GradientButton, ProgressBar} from '@/components';
import _ from '@/@lodash/@lodash';
import {ViewBirthdayFragment} from './ViewBirthdayFragment';
import {ViewPhotoFragment} from './ViewPhotoFragment';
import {ViewSearchingsFragment} from './ViewSearchingsFragment';
import {ViewChurchFragment} from './ViewChurchFragment';
import {ViewDriversFragment} from './ViewDriversFragment';
import {ViewQuestionFragment} from './ViewQuestionFragment';
import {ViewStoryFragment} from './ViewStoryFragment';
import {ViewGenderFragment} from './ViewGenderFragment';
import {ViewLocationFragment} from './ViewLocationFragment';
import {ViewPermissionLocationFragment} from './ViewPermissionLocationFragment';
import {CheckCircleIcon, EyeIcon, LogoHeartIcon} from '@/assets/svg';
import {ViewPermissionNotificationFragment} from './ViewPermissionNotificationFragment';
import {ViewPermissionTrackingFragment} from './ViewPermissionTrackingFragment';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export const CompleteAccountScreen = (
  props: RootStackScreenProps<RootStackRoutes.COMPLETE_ACCOUNT>,
) => {
  const {
    ref,
    navigationPanel,
    pages,
    activePage,
    progress,
    loading,
    control,
    errors,
    imageSelect,
    imagesSelected,
    addChurch,
    sections,
    selectedCount,
    selectedBook,
    selectedChapter,
    selectedVerse,
    data,
    permissionLocation,
    permissionNotification,
    getValues,
    setValue,
    trigger,
    handleContinue,
    handleSaveInfo,
    setImageSelect,
    setImagesSelected,
    setAddChurch,
    setSections,
    setSelectedCount,
    setSelectedBook,
    setSelectedChapter,
    setSelectedVerse,
    setData,
    handleRequestPermissionLocation,
    handleRequestPermissionNotification,
    handleRequestTrackingPermission,
  } = useActionsCompleteAccount(props);

  const handleRenderButton = () => {
    switch (activePage) {
      case 0:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={!getValues('name')}
            style={styles.button}
            onPress={handleContinue}
          />
        );
      case 1:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={!getValues('birthday')}
            style={styles.button}
            onPress={handleContinue}
          />
        );
      case 2:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={!getValues('gender')}
            style={styles.button}
            onPress={handleContinue}
          />
        );
      case 3:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={!getValues('searching')}
            style={styles.button}
            onPress={handleContinue}
          />
        );
      case 4:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={!imageSelect}
            style={styles.button}
            onPress={handleContinue}
          />
        );
      case 5:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={addChurch && !getValues('church')}
            style={styles.button}
            onPress={handleContinue}
          />
        );
      case 6:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={selectedCount < 3}
            style={styles.button}
            onPress={handleContinue}
          />
        );
      case 7:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={!selectedBook && !selectedChapter && !selectedVerse}
            style={styles.button}
            onPress={handleContinue}
          />
        );
      case 8:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={!getValues('story')}
            style={styles.button}
            onPress={handleContinue}
          />
        );
      case 9:
        return (
          <GradientButton
            label="Continue"
            loading={loading}
            disabled={!getValues('location')}
            style={styles.button}
            onPress={handleSaveInfo}
          />
        );
      case 10:
        return (
          <GradientButton
            label="Enable location"
            loading={loading}
            style={styles.button}
            onPress={handleRequestPermissionLocation}
          />
        );
      case 11:
        return (
          <GradientButton
            label="Enable notification"
            loading={loading}
            style={styles.button}
            onPress={handleRequestPermissionNotification}
          />
        );
      case 12:
        return (
          <GradientButton
            label="Allow Tracking"
            loading={loading}
            style={styles.button}
            onPress={handleRequestTrackingPermission}
          />
        );
      default:
        return null;
    }
  };

  const handleRenderText = () => {
    switch (activePage) {
      case 0:
        return (
          <View row centerH marginB-16 centerV>
            <EyeIcon />
            <Text variant="caption" style={styles.text}>
              You cannot change your name later
            </Text>
          </View>
        );
      case 1:
        return (
          <View row centerH marginB-16>
            <Text variant="caption" style={styles.text}>
              Your possible connections only will see your age, not your birth
              date.
            </Text>
          </View>
        );
      case 2:
        return (
          <View row centerH marginB-16>
            <Text variant="caption" style={styles.text}>
              You can update this information later on your Account Settings.
            </Text>
          </View>
        );
      case 3:
        return (
          <View row centerH marginB-16>
            <Text variant="caption" style={styles.text}>
              You can update this information later on your Account Settings.
            </Text>
          </View>
        );
      case 5:
        return (
          <View row centerH marginB-16>
            <Text variant="caption" style={styles.text}>
              You can update this information later on your Account Settings.
            </Text>
          </View>
        );
      case 6:
        return (
          <View row centerH marginB-16 centerV>
            <CheckCircleIcon />
            <Text variant="caption" style={styles.text}>
              You have selected{' '}
              <Text variant="caption" style={styles.textCount}>
                {selectedCount}/9 interests.
              </Text>
            </Text>
          </View>
        );
      case 8:
        return (
          <View row centerH marginB-16>
            <Text variant="caption" style={styles.text}>
              You can update this information later on your profile
            </Text>
          </View>
        );
      case 9:
        return (
          <View row centerH marginB-16>
            <Text variant="caption" style={styles.text}>
              You can update this information later on your Account Settings.
            </Text>
          </View>
        );
      case 10:
        return (
          <View row centerH marginB-16>
            <Text variant="caption" style={styles.text}>
              We will use your location to show you possible connections near
              you.
            </Text>
          </View>
        );
      case 11:
        return (
          <View row centerH marginB-16>
            <Text variant="caption" style={styles.text}>
              We will keep you inform about your new connections and messages.
            </Text>
          </View>
        );
      case 12:
        return (
          <View row centerH marginB-16>
            <Text variant="caption" style={styles.text}>
              Please choose ‘Allow Tracking’ to access all of our features.
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.flex}>
        <View centerH marginB-24 marginT-32>
          <LogoHeartIcon />
        </View>
        <View marginH-16>
          <ProgressBar numberOfPages={pages.length} progress={progress} />
        </View>
        <AnimatedPagerView
          {...navigationPanel}
          ref={ref}
          style={styles.containerPager}
          scrollEnabled={false}
          initialPage={0}>
          <View paddingH-16>
            <ViewEmailFragment control={control} errors={errors} />
          </View>
          <View paddingH-16>
            <ViewBirthdayFragment
              control={control}
              errors={errors}
              getValues={getValues}
            />
          </View>
          <View>
            <ViewGenderFragment control={control} />
          </View>
          <View paddingH-16>
            <ViewSearchingsFragment setValue={setValue} />
          </View>
          <View paddingH-16>
            <ViewPhotoFragment
              imageSelect={imageSelect}
              imagesSelected={imagesSelected}
              setImageSelect={setImageSelect}
              setImagesSelected={setImagesSelected}
            />
          </View>
          <View>
            <ViewChurchFragment
              getValues={getValues}
              setValue={setValue}
              trigger={trigger}
              addChurch={addChurch}
              setAddChurch={setAddChurch}
            />
          </View>
          <View>
            <ViewDriversFragment
              sections={sections}
              selectedCount={selectedCount}
              setSections={setSections}
              setSelectedCount={setSelectedCount}
            />
          </View>
          <View>
            <ViewQuestionFragment
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              selectedVerse={selectedVerse}
              setSelectedBook={setSelectedBook}
              setSelectedChapter={setSelectedChapter}
              setSelectedVerse={setSelectedVerse}
              data={data}
              setData={setData}
            />
          </View>
          <View>
            <ViewStoryFragment control={control} errors={errors} />
          </View>
          <View>
            <ViewLocationFragment control={control} />
          </View>
          <View>
            <ViewPermissionLocationFragment />
          </View>
          <View>
            <ViewPermissionNotificationFragment />
          </View>
          <View>
            <ViewPermissionTrackingFragment />
          </View>
        </AnimatedPagerView>
      </ScrollView>
      <View width="100%" paddingH-16>
        {handleRenderText()}
        {handleRenderButton()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    // paddingHorizontal: 16,
  },
  containerPager: {
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingTop: 16,
  },
  button: {
    marginBottom: 20,
  },
  text: {
    marginLeft: 8,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    // flex: 1,
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
  },
  textCount: {
    fontFamily: 'Satoshi-Black',
  },
});
