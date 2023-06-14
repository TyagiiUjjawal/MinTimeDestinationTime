import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

const SplashScreenComponent = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
    </View>
  );
};

export default SplashScreenComponent;
