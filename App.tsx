import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "expo-sqlite/kv-store";
import { useEffect, useState } from "react";

export default function App() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      console.log("Saved language:", savedLanguage);
      setLanguage(savedLanguage || "en");
    };

    loadLanguage();
  }, []);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    setLanguage(lang);
  };

  return (
    <View>
      <Text>{language}</Text>
      <StatusBar style="auto" />
      <View>
        {Object.entries({
          en: "English",
          fr: "French",
          es: "Spanish",
        }).map(([code, lang]) => (
          <Pressable key={code} onPress={() => changeLanguage(code)}>
            <Text>{lang}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
