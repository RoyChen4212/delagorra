import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Promisify } from '~/utils/promisify';
import { ChatCreators } from '~/store/actions/chat';
import { getAllMessagesByRoomId } from '~/store/selectors/chat';
import { user as userSelector } from '~/store/selectors/session';
import { convertToTimeString } from '~/utils/utils';
import { PostCreators } from '~/store/actions/post';

import * as Styled from './styled';
import PostItem from '../../Home/Main/PostItem';
import CommentsHeader from './CommentsHeader';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

const ChatRoom = ({ route, navigation }) => {
  const { otherUserId, post, type, comment } = route.params || {};

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector(userSelector);

  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);
  const allMessagesByRoomId = useSelector(getAllMessagesByRoomId);

  useLayoutEffect(() => {
    if (type === 'chat' && room) {
      navigation.setOptions({ title: room.otherUser.displayName });
    }
    if (type === 'post') {
      navigation.setOptions({
        title: post ? post.creator.displayName : 'Replies',
        headerRight: !post && <Styled.CloseButton onPress={handleClose} />,
      });
    }
  }, [navigation, room]);

  useEffect(() => {
    fetchRoom();
  }, []);

  useEffect(() => {
    if (room) {
      dispatch(ChatCreators.setActiveRoomIdSuccess(room._id));
      setLoading(false);
      const result = allMessagesByRoomId[room._id] || [];
      setMessages(result);
      if (result[0]) {
        dispatch(ChatCreators.readMessageRequest({ roomId: room._id, message: result[0] }));
      }
    }
  }, [room, JSON.stringify(allMessagesByRoomId)]);

  const fetchRoom = async () => {
    try {
      const result = await Promisify(dispatch, ChatCreators.getRoomRequest, {
        otherUserId,
        type,
        postId: post && post._id,
        commentId: comment && comment._id,
      });
      setRoom(result);
    } catch (e) {}
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const onSend = useCallback(
    (newMessages = []) => {
      let postId;
      if (type === 'post') {
        if (post) {
          postId = post._id;
        } else {
          postId = comment && comment.post._id;
        }
      }
      _.forEach(newMessages, async (newMsg) => {
        try {
          await Promisify(dispatch, ChatCreators.chatSendRequest, {
            text: newMsg.text,
            roomId: room._id,
            roomType: type === 'chat' ? 'chat' : 'comment',
            postId,
            isReplyRoom: type === 'post' && !post,
          });
        } catch (e) {}
      });
    },
    [room],
  );

  const handleShare = async (item) => {
    let imagePath = null;
    const shareOptions = { message: item.title };

    try {
      setLoading(true);
      if (item.image) {
        const resp = await RNFetchBlob.config({ fileCache: true }).fetch('GET', item.image);
        imagePath = resp.path();
        let base64Data = await resp.readFile('base64');
        base64Data = 'data:image/png;base64,' + base64Data;
        shareOptions.url = base64Data;
      }
      setLoading(false);
      await Share.open(shareOptions);

      if (imagePath) {
        RNFetchBlob.fs.unlink(imagePath);
      }

      dispatch(PostCreators.postUpdateStatusRequest({ postId: item._id, status: { share: true } }));
    } catch (err) {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <Styled.Box>
      {post ? <PostItem item={post} bookmarkEnabled onShare={handleShare} /> : <Styled.ReplyCommentItem currentMessage={comment} />}
      <CommentsHeader count={room && room.commentCount} title={post ? 'Comments' : 'Replies'} />
      {loading && <Styled.ActivityIndicator size="large" color="#0000aa" />}
    </Styled.Box>
  );

  const renderSeparator = () => type === 'post' && <Styled.Box height={1} bg="rgba(19,19,19,0.07)" ml={16} />;

  const renderDayTime = ({ currentMessage, nextMessage }) => {
    const timeString = convertToTimeString(currentMessage.createdAt);
    if (nextMessage && nextMessage.createdAt) {
      if (timeString === convertToTimeString(nextMessage.createdAt)) {
        return null;
      }
    }
    return (
      <Styled.Text my={5} textAlign="center" color="#898A8D">
        {timeString}
      </Styled.Text>
    );
  };

  const renderBubble = ({ containerStyle, onMessageLayout, ...props }) => <Styled.Bubble {...props} />;

  if (type === 'chat' && loading) {
    return <Styled.Loader loading />;
  }

  return (
    <Styled.Container>
      <Styled.Box style={StyleSheet.absoluteFill} alignItems="center" pt={50} bg="background" mb={getBottomSpace()}>
        {!loading && messages.length === 0 && (
          <Styled.Text fontSize={17} textAlign="center">
            No conversations
          </Styled.Text>
        )}
      </Styled.Box>
      <Styled.GiftedChat
        renderMessage={type === 'post' ? (params) => <Styled.CommentItem {...params} roomId={room._id} /> : undefined}
        messages={messages}
        onSend={onSend}
        user={{ _id: user._id }}
        showUserAvatar
        inverted={type === 'chat'}
        scrollToBottom={type === 'chat'}
        keyboardShouldPersistTaps="handled"
        renderLoadEarlier={renderHeader}
        loadEarlier={type === 'post'}
        listViewProps={{ ItemSeparatorComponent: renderSeparator }}
        renderTime={() => null}
        renderDay={renderDayTime}
        renderBubble={renderBubble}
      />
    </Styled.Container>
  );
};

export default ChatRoom;
