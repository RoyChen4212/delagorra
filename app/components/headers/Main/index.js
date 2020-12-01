// import React, { isValidElement } from 'react';
// import { View, StatusBar, StyleSheet, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { isTablet } from 'react-native-device-info';
//
// import { Colors } from '~/utils/theme';
// import IconButton from '../IconButton';
// import * as Styled from './styled';
//
// const variants = {
//   main: {
//     bg: Colors.bg,
//     title: Colors.transparent,
//   },
//   light: {
//     bg: Colors.light,
//   },
// };
//
// const Main = ({ variant = 'main', scene, navigation, previous, sideLarge = false, heightHigh = false }) => {
//   const { options } = scene.descriptor;
//   const vart = variants[variant] || variants.main;
//
//   const handleBackPress = () => {
//     navigation.goBack(null);
//   };
//
//   const renderBack = () => (
//     <IconButton
//       style={styles.back}
//       name="chevron-left"
//       color={vart.title || 'black'}
//       size={L3}
//       onPress={handleBackPress}
//     />
//   );
//
//   const renderLeft = () => {
//     const leftStyle = [styles.left, { width: sideLarge ? 'auto' : L8 }];
//
//     if (isValidElement(options.headerLeft)) {
//       return <View style={leftStyle}>{options.headerLeft}</View>;
//     }
//
//     return <View style={leftStyle}>{previous && renderBack()}</View>;
//   };
//
//   const renderRight = () => {
//     const rightStyle = [styles.right, { width: sideLarge ? 'auto' : L8 }];
//
//     if (isValidElement(options.headerRight)) {
//       return <View style={rightStyle}>{options.headerRight}</View>;
//     }
//
//     return <View style={rightStyle} />;
//   };
//
//   const renderTitle = () => <Text style={[{ color: vart.title }, styles.title]}>{options.title}</Text>;
//
//   return (
//     <Styled.Container style={{ backgroundColor: vart.bg }}>
//       <StatusBar barStyle={variant === 'main' ? 'light-content' : 'dark-content'} backgroundColor={vart.bg} />
//
//       <View style={[styles.content, !isTablet() && heightHigh && { height: 60 }]}>
//         {renderLeft()}
//         {renderTitle()}
//         {renderRight()}
//       </View>
//     </Styled.Container>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     overflow: 'hidden',
//   },
//   content: {
//     flexDirection: 'row',
//     height: isTablet() ? 60 : 44,
//     alignItems: 'center',
//   },
//   left: {},
//   right: {},
//   title: {
//     ...Styles.regular,
//     ...Styles.font20,
//     flex: 1,
//     textAlign: 'center',
//   },
//   back: {
//     paddingHorizontal: L2,
//     height: '100%',
//     justifyContent: 'center',
//   },
// });
//
// export default Main;
