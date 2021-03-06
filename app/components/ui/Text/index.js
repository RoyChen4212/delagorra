import styled from 'styled-components/native';
import { width, space, color, fontSize, lineHeight, textAlign, flex } from 'styled-system';
import { capitalizeFirstLetter } from '~/utils/utils';

const Text = styled.Text`
  color: black;
  ${color}
  ${space}
  ${fontSize}
  ${lineHeight}
  ${textAlign}
  ${width}
  ${flex}
  font-family: ${(props) =>
    props.fontStyle ? `SFUIDisplay-${capitalizeFirstLetter(props.fontStyle)}` : 'SFUIDisplay-Regular'};
`;

export default Text;
