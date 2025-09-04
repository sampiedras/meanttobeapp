import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import Share from "react-native-share";
import { TouchableOpacity } from "react-native-ui-lib";
import { useLazyGetVerseReferenceByIdQuery } from "@/core/data/remote/bibleApi";
import { VerseEntity } from "@/core/data/remote/entities/bibleEntity";
import { colorsLight } from "@/core/theme";
import { VerseType } from "@/verse/data/remote/entities/verseEntity";
import { useGetVerseByIdQuery } from "@/verse/data/remote/verseApi";

type ViewModelContextType = {
  isFetching: boolean;
  data: VerseType | undefined;
  verseReference: VerseEntity | undefined;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { setOptions } = useNavigation();
  const { data, isFetching } = useGetVerseByIdQuery(id);

  const [triggerGetVerseRef, { data: verseReference }] =
    useLazyGetVerseReferenceByIdQuery();

  useEffect(() => {
    (async () => {
      console.log("data🤮🤮🤮🤮🤮🤮🤮", data);
      console.log("data 🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢", verseReference?.reference);
      if (data) {
        try {
          const response = await fetch(data?.shareImg);

          const blob = await response.blob();

          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result;
            if (typeof dataUrl === "string" && verseReference?.reference) {
              const base64 = dataUrl.split(",")[1];
              setOptions({
                // eslint-disable-next-line react/no-unstable-nested-components
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => {
                      Share.open({
                        message: `${data.name}\n\n${
                          verseReference?.reference
                        }\n\n${
                          Platform.OS === "ios"
                            ? "https://apps.apple.com/co/app/meant-to-be/id6463029847"
                            : "https://play.google.com/store/apps/details?id=com.meanttobe&pli=1"
                        }`,
                        url: `data:image/jpeg;base64,${base64}`,
                      });
                    }}
                  >
                    <Text color={colorsLight.PRIMARY_COLOR} style={styles.text}>
                      Share
                    </Text>
                  </TouchableOpacity>
                ),
              });
            }
          };
          reader.readAsDataURL(blob);
          await triggerGetVerseRef(data.verseQuote.split("&")[0] || "");
        } catch (error) {}
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, verseReference]);

  return (
    <ViewModelContext.Provider value={{ data, verseReference, isFetching }}>
      {children}
    </ViewModelContext.Provider>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontFamily: "Satoshi-Medium",
    marginRight: Platform.OS === "ios" ? 18 : 16,
  },
});

export function useViewModelProvider() {
  const context = useContext(ViewModelContext);
  if (context === undefined) {
    throw new Error("Publication View Model Provider");
  }
  return context;
}
