import { eventChannel, END } from "redux-saga";
import NetInfo from "@react-native-community/netinfo";

export const isConnected = () =>
  eventChannel(emitter => {
    NetInfo.isConnected
      .fetch()
      .then(emitter)
      .catch(err => {
        console.warn("NetInfo.catch", err);
      });

    const subscription = NetInfo.isConnected.addEventListener(
      "connectionChange",
      isConnected => emitter(isConnected)
    );

    return () => {
      subscription.remove();
      emitter(END);
    };
  });
