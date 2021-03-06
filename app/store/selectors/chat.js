import { createSelector } from 'reselect';
import _ from 'lodash';

const getRooms = (state) => state.chat.rooms;
const getMessages = (state) => state.chat.messagesByRoomId;
const getActiveRoomId = (state) => state.chat.activeRoomId;
const getState = (state) => state.chat;

export const getMessagesByRoomId = (roomId) => createSelector(getMessages, (state) => _.get(state, roomId) || []);

export const getAllMessagesByRoomId = createSelector(getMessages, (state) => state);

export const rooms = createSelector(getRooms, (state) => state);

export const activeRoomId = createSelector(getActiveRoomId, (state) => state);

export const totalCountUnread = createSelector(getState, (state) => _.get(state, 'totalCountUnread'));
