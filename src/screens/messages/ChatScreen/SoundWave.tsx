import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import { flex, sizes } from '@/theme/global';
import { colors } from '@/theme/theme';

type Props = {
  assetUrl: string;
  isMyMessage: boolean;
  currentPositionInSeconds: number;
  currentDurationInSeconds: number;
};

const BAR_AMOUNT = 18;
const BAR_MAX_SIZE = 34;

export default ({
  assetUrl,
  isMyMessage,
  currentPositionInSeconds,
  currentDurationInSeconds,
}: Props) => {
  const progressionPercentage = useMemo(
    () => (currentPositionInSeconds / currentDurationInSeconds) * 100,
    [currentDurationInSeconds, currentPositionInSeconds],
  );

  const wavePattern = useMemo(
    () => ({
      id: assetUrl,
      items: new Array(BAR_AMOUNT)
        .fill(null)
        .map((_, i) => Math.round(Math.random() * BAR_MAX_SIZE) + 2),
    }),
    [assetUrl],
  );

  return (
    <View style={styles.container}>
      <GeneratedWave
        assetUrl={assetUrl}
        progressionPercentage={progressionPercentage}
        wavePattern={wavePattern}
        isMyMessage={isMyMessage}
      />
      <View
        style={{
          ...styles.progressBall,
          backgroundColor: isMyMessage
            ? colors.dark.secondaryLight
            : colors.dark.active,
          left: `${progressionPercentage}%`,
        }}
      />
    </View>
  );
};

type GeneratedWaveProps = Pick<Props, 'assetUrl'> & {
  progressionPercentage: number;
  wavePattern: {
    id: string;
    items: number[];
  };
  isMyMessage: boolean;
};

const GeneratedWave = React.memo(
  ({
    assetUrl,
    progressionPercentage,
    wavePattern,
    isMyMessage,
  }: GeneratedWaveProps) => {
    const baseColor = 'rgba(0, 0, 0, 0.24)';
    const progressColor = isMyMessage
      ? 'rgba(255, 255, 255, 0.80)'
      : 'rgba(28, 28, 33, 1)';
    return (
      <View key={assetUrl} style={flex.directionRowItemsContentCenter}>
        {wavePattern.items.map((height, i) => {
          const progressThreshold = ((i + 1) / BAR_AMOUNT) * 100;
          return (
            <View
              key={i}
              style={{
                ...styles.barItem,
                height,
                backgroundColor:
                  progressionPercentage >= progressThreshold
                    ? progressColor
                    : baseColor,
              }}
            />
          );
        })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: sizes.xl,
    paddingVertical: sizes.s,
  },
  barItem: {
    width: sizes.sm,
    borderRadius: sizes.xxxl,
    marginHorizontal: 1,
  },
  progressBall: {
    position: 'absolute',
    width: sizes.ml,
    height: sizes.ml,
    borderRadius: sizes.xxl,
  },
});
