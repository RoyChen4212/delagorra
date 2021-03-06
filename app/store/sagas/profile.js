import { all, takeLatest, call, put } from 'redux-saga/effects';

import { ProfileTypes, ProfileCreators } from '~/store/actions/profile';

function* updateProfile(api, { payload, resolve, reject }) {
  const response = yield call(api.profile.update, payload);

  if (response.ok && response.data.result === 'OK') {
    yield put(ProfileCreators.profileUpdateSuccess(response.data.data));
    resolve();
  } else {
    reject(response.data);
  }
}

function* getProfile(api, { payload, resolve, reject }) {
  const response = yield call(api.profile.getProfile, payload.profileId);

  if (response.ok && response.data.result === 'OK') {
    resolve(response.data.data.profile);
    if (payload.isMine) {
      yield put(ProfileCreators.profileUpdateSuccess({ user: response.data.data.profile }));
    }
  } else {
    reject(response.data);
  }
}

function* followProfile(api, { payload, resolve, reject }) {
  const response = yield call(api.profile.follow, payload);

  if (response.ok && response.data.result === 'OK') {
    resolve(response.data.data);
  } else {
    reject(response.data);
  }
}

export default function* main(api) {
  yield all([
    takeLatest(ProfileTypes.PROFILE_UPDATE_REQUEST, updateProfile, api),
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST, getProfile, api),
    takeLatest(ProfileTypes.PROFILE_FOLLOW_REQUEST, followProfile, api),
  ]);
}
