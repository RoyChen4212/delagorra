import React from 'react';
import { ActionSheetIOS, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import * as Styled from './styled';

const ActionPicker = ({ children, options, onPressItem, disabled, ...props }) => {
  const handlePress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', ...options.map((option) => option.label)],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex !== 0) {
            onPressItem(options[buttonIndex - 1]);
          }
        },
      );
    }
  };

  if (Platform.OS === 'ios') {
    return (
      <Styled.Container disabled={disabled} {...props} onPress={handlePress}>
        {children}
      </Styled.Container>
    );
  }

  return (
    <RNPickerSelect
      onValueChange={onPressItem}
      items={options}
      placeholder={{}}
      touchableWrapperProps={{ activeOpacity: undefined }}
      disabled={disabled}>
      {children}
    </RNPickerSelect>
  );
};

export default ActionPicker;
