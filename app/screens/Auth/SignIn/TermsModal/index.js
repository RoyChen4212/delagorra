import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { navigators } from '~/navigation/routeNames';

import * as Styled from './styled';

const TermsModal = (props) => {
  const navigation = useNavigation();
  const handlePrivacyClick = () => {
    navigation.navigate(navigators.privacyPolicy);
  };

  const handleDisAgree = () => {
    props.onClosed();
  };

  return (
    <Styled.Modal position="center" {...props}>
      <Styled.Box borderRadius={8} bg="white" px={47} pt={20} pb={30}>
        <Styled.Text fontSize={17} textAlign="center" fontStyle="semibold">
          请阅读并同意以下条款
        </Styled.Text>
        <Styled.LinkButton mt={20} text="《桃用户协议》" onPress={handlePrivacyClick} />
        <Styled.LinkButton mt={5} text="《樱桃隐私政策》" onPress={handlePrivacyClick} />
        <Styled.Button mt={15} onPress={props.handleAgree} text="同意并不同意" />
        <Styled.Button mt={15} text="不同意" variant="text" textProps={{ color: 'gray' }} onPress={handleDisAgree} />
      </Styled.Box>
    </Styled.Modal>
  );
};

export default TermsModal;
