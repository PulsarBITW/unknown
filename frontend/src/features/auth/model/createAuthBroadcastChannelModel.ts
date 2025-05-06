import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
  Store,
  StoreWritable,
} from 'effector';
import {z} from 'zod';

import {ModelUserResponseDto} from '@shared/api';
import {createBoundEvent} from '@shared/lib/createBoundEvent';

const authChannelMessageSchema = z.object({
  action: z.enum(['LOGOUT', 'LOGIN']),
});

type AuthChannelMessage = z.infer<typeof authChannelMessageSchema>;

type CreateAuthBroadcastChannelModelParams = {
  $isAuth: Store<boolean>;
  $currentUser: StoreWritable<ModelUserResponseDto | null>;
};

function createAuthBroadcastChannelModel({
  $isAuth,
  $currentUser,
}: CreateAuthBroadcastChannelModelParams) {
  const AUTH_CHANNEL_NAME = 'AUTH_CHANNEL';

  const __INTERNAL_API = {
    /** call when message received from broadcast channel */
    __authChannelMessageReceived: createEvent<MessageEvent<unknown>>(),

    /** call only if user is authenticated*/
    __logoutByBroadcastChannel: createEvent(),

    /** call only if user is not authenticated*/
    __loginByBroadcastChannel: createEvent(),
  };

  const initAuthBroadcastChannelFx = createEffect(() => {
    const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);

    const boundAuthChannelMessageReceived = createBoundEvent(
      __INTERNAL_API.__authChannelMessageReceived,
    );

    channel.onmessage = (event) => {
      boundAuthChannelMessageReceived(event);
    };

    return channel;
  });

  const $authBroadcastChannel = createStore<BroadcastChannel | null>(null);

  const postMessageFx = attach({
    source: $authBroadcastChannel,
    effect: (channel, messageData: AuthChannelMessage) => {
      if (!channel) return;
      channel.postMessage(messageData);
    },
  });

  const handleAuthChannelMessageFx = attach({
    source: [$isAuth, $currentUser],
    effect: ([isAuth], messageEvent: MessageEvent<unknown>) => {
      const messageEventValidationResult = authChannelMessageSchema.safeParse(messageEvent.data);

      if (!messageEventValidationResult.success) {
        return;
      }

      const validatedMessageData = messageEventValidationResult.data;

      if (validatedMessageData.action === 'LOGOUT' && isAuth) {
        __INTERNAL_API.__logoutByBroadcastChannel();
      }

      if (validatedMessageData.action === 'LOGIN' && !isAuth) {
        __INTERNAL_API.__loginByBroadcastChannel();
      }
    },
  });

  // save channel instance
  sample({
    clock: initAuthBroadcastChannelFx.doneData,
    target: $authBroadcastChannel,
  });

  // handle channel messageEvent
  sample({
    clock: __INTERNAL_API.__authChannelMessageReceived,
    target: handleAuthChannelMessageFx,
  });

  // computed events for subscriptions
  const logoutedOutByBroadcastChannel = sample({clock: __INTERNAL_API.__logoutByBroadcastChannel});
  const loggedInByBroadcastChannel = sample({clock: __INTERNAL_API.__loginByBroadcastChannel});

  return {
    initAuthBroadcastChannelFx,
    postMessageFx,
    logoutedOutByBroadcastChannel,
    loggedInByBroadcastChannel,
  };
}

export {type AuthChannelMessage, authChannelMessageSchema, createAuthBroadcastChannelModel};
