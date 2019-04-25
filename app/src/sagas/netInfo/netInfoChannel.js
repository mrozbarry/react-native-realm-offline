import { eventChannel, END } from "redux-saga";
import NetInfo from "@react-native-community/netinfo";

export const isConnected = () =>
  eventChannel(emitter => {
    const subscription = NetInfo.isConnected.addEventListener(
      "connectionChange",
      isConnected => emitter(isConnected)
    );

    return () => {
      subscription.remove();
      emitter(END);
    };
  });
