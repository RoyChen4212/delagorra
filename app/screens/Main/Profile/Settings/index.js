import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AuthCreators } from '~/store/actions/auth';
import { navigators, auth, profile } from '~/navigation/routeNames';

import * as Styled from './styled';

const ProfileSettings = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: <Styled.LeftButton text="Close" onPress={handleClose} />,
    });
  }, [navigation]);

  const handleSignOut = () => {
    navigation.reset({ index: 0, routes: [{ name: navigators.auth, params: { screen: auth.signIn } }] });
    dispatch(AuthCreators.logOutRequest());
  };

  const handleItemPress = (route) => {
    navigation.navigate(navigators.mainNav, { screen: route });
  };

  const renderItem = ({ item }) => (
    <Styled.Item onPress={() => handleItemPress(item.route)}>
      <Styled.Text flex={1}>{item.label}</Styled.Text>
      <Styled.RightArrow />
    </Styled.Item>
  );

  const renderSeparator = () => <Styled.Separator />;

  return (
    <Styled.Container>
      <Styled.List
        data={listData}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item) => item.label}
      />
      <Styled.Button my={50} mx={30} text="Sign Out" onPress={handleSignOut} />
    </Styled.Container>
  );
};

const listData = [
  {
    label: 'About Us',
    route: profile.about,
  },
  {
    label: 'Check version of the app',
    route: profile.checkVersion,
  },
];

export default ProfileSettings;
