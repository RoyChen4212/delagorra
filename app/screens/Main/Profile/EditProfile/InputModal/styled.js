import styled from 'styled-components/native';
import ModalUI from 'react-native-modalbox';

import { Button, Box } from '~/components/ui';
import { Metrics } from '~/utils/theme';

export { Text, Box, Button } from '~/components/ui';

export const CancelButton = styled(Button).attrs({
  variant: 'text',
  textProps: { color: 'pink', fontStyle: 'regular' },
})``;

export const ConfirmButton = styled(CancelButton).attrs({
  textProps: { color: 'pink' },
})``;

export const Modal = styled(ModalUI)`
  height: auto;
  width: ${Metrics.screenWidth}px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 36px;
`;

export const InputWrapper = styled.TouchableWithoutFeedback``;

export const InputContainer = styled(Box)`
  background-color: rgba(196, 196, 196, 0.15);
  border-radius: 26px;
  padding-horizontal: 14px;
  margin-top: 25px;
`;
