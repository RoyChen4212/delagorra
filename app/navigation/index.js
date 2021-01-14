import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'react-native';
import _ from 'lodash';

import { Colors } from '~/utils/theme';
import ProgressScreen from '~/screens/Auth/Progress';
import { Toast } from '~/components/ui';
import { isRehydrated as isRehydratedSelector } from '~/store/selectors/app';
import { AppCreators } from '~/store/actions/app';
import { getJWTToken, getJWTHeader, isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import SocketService, { RECEIVE_MESSAGE, RECEIVE_INVITE, RECEIVE_NOTIFICATION } from '~/services/socket';
import { activeRoomId as activeRoomIdSelector } from '~/store/selectors/chat';
import { home, main } from '~/navigation/routeNames';
import { ChatCreators } from '~/store/actions/chat';

import RootNavigator from './root';

let socket;

const NavigationWrapper = () => {
  const isRehydrated = useSelector(isRehydratedSelector);
  const token = useSelector(getJWTToken);
  const jwtHeader = useSelector(getJWTHeader);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const activeRoomId = useSelector(activeRoomIdSelector);

  const isActiveNotiTab = useRef();
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const [appState, setAppState] = useState(AppState.currentState);
  const dispatch = useDispatch();

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState]);

  useEffect(() => {
    if (token && !socket) {
      initSocketService();
    }
  }, [token]);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      dispatch(AppCreators.refresh());
    }
    setAppState(nextAppState);
  };

  const initSocketService = () => {
    if (!token) {
      return;
    }

    socket = new SocketService({
      token,
      jwtHeader,
      onReceiveMessage: handleReceiveMessage,
      onReceiveNotification: handleReceiveNotification,
      onSocketDisconnect: handleSocketDisconnect,
      onSocketError: handleSocketError,
    });

    socket.connect();
  };

  const handleReceiveMessage = ({ room, message }) => {
    const read = activeRoomId === room.id;
    dispatch(ChatCreators.getMessageSuccess(room, message, read));
    // if (read) {
    //   dispatch(ChatCreators.onReadMessage({ roomId: room.id, messageId: message.id }));
    // }
  };

  const handleReceiveNotification = ({ notiValue }) => {
    // if (!_.find(notifications, { id: notiValue.id })) {
    //   onReceiveNotification(notiValue, isActiveNotiTab.current);
    //   if (isActiveNotiTab.current) {
    //     onReadNotification({ notiId: notiValue.id });
    //   }
    // }
  };

  const handleSocketDisconnect = () => {
    setTimeout(() => {
      if (socket && isAuthenticated) {
        socket.connect();
      }
    }, 1000);
  };

  const handleSocketError = () => {};

  const handleNavigationStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;

    if (previousRouteName !== currentRouteName) {
      if (currentRouteName !== home.chatRoom) {
        dispatch(ChatCreators.setActiveRoomIdSuccess(null));
      }
      isActiveNotiTab.current = currentRouteName === main.notification;
    }
    routeNameRef.current = currentRouteName;
  };

  if (!isRehydrated) {
    return <ProgressScreen />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
      theme={MyTheme}
      onStateChange={handleNavigationStateChange}>
      <RootNavigator />
      <Toast />
    </NavigationContainer>
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default NavigationWrapper;
