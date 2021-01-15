import styled from 'styled-components/native';

import { Box, IconButton, Image } from '~/components/ui';
import { Colors } from '~/utils/theme';
import { personalBackground, backIcon, profileMessage } from '~/resources';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Loader, Image, AvatarCircle, Button } from '~/components/ui';
export { SimpleHeader } from '~/components/headers';

export const Container = styled(Box)`
  flex: 1;
  background-color: ${Colors.background};
`;

export const BackgroundImage = styled(Image).attrs({
  source: personalBackground,
})`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: undefined;
  width: 100%;
`;

export const Header = styled(Box)``;

export const RightButton = styled(IconButton).attrs({
  source: profileMessage,
  hitSlop: hitSlopArea(5),
  size: 26,
  pr: 17,
})``;

export const BackButton = styled(IconButton).attrs({
  source: backIcon,
  hitSlop: hitSlopArea(5),
  pl: 17,
  iconStyle: { width: 12, aspectRatio: 10 / 17, height: undefined },
  tintColor: 'white',
})``;

export const AvatarWrapper = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-top: -40px;
  margin-left: 16px;
`;

export const PointBox = styled(Box)``;
