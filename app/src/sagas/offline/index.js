import { fork } from "redux-saga/effects";
import Realm from "realm";

import reader from "./reader";
import writer from "./writer";

const MessageModel = {
  name: "Messages",
  properties: {
    source: "string",
    name: "string",
    text: "string",
    createdAt: "int"
  }
};

const schema = [MessageModel];

export default function*(sharedChannel) {
  const database = new Realm({
    schema,
    schemaVersion: 1
  });

  const write = schemaName => data => {
    database.write(() => {
      database.create(schemaName, data);
    });
  };

  const read = schemaName => realmObject => {
    const current = schema.find(s => s.name === schemaName);
    return Object.keys(current.properties).reduce((pojo, key) => {
      return { ...pojo, [key]: realmObject[key] };
    }, {});
  };

  yield fork(
    reader,
    sharedChannel,
    database.objects(MessageModel.name),
    read(MessageModel.name)
  );
  yield fork(writer, write(MessageModel.name));
}
