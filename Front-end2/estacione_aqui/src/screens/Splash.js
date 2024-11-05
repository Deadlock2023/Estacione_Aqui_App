import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';

const largura = Dimensions.get('screen').width
const altura = Dimensions.get('screen').height
 
const SplachScreen = () => {
  const navigation = useNavigation();
 
 
  const handleAnimationFinish = () => {
    navigation.navigate('Login');
  };
 
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Animations/Estacione aqui.json')}
        style={styles.animation}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: largura + 10,
    height: altura + 10,
  },
});
 
export default SplachScreen;