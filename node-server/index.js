import { readFile, writeFile } from 'fs';
import { resolve } from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

const makeMessages = (filePath) => {
  const read = () => new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(err);
      try {
        return resolve(JSON.parse(data));
      } catch (err) {
        return resolve([]);
      }
    });
  });

  const write = (data) => new Promise((resolve, reject) => {
    writeFile(filePath, JSON.stringify(data, null, 2), { encoding: 'utf8', flag: 'w' }, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });

  const append = (message) =>
    read()
      .then(messages => [message].concat(messages))
      .then(write);

  return { read, append };
};

const messages = makeMessages(resolve(__dirname, 'messages.json'));

app.get('/', (req, res) => {
  const after = req.query.after ? parseInt(req.query.after, 10) : 0;
  console.log('getting messages after', after);

  const filter = (messages) => {
    const index = messages.findIndex(m => m.createdAt < after);
    return messages
      .slice(Math.max(index - 100, 0), index)
  }

  messages.read()
    .catch((err) => {
      console.log('Unable to read messages, sending empty array', err);
      return [];
    })
    .then(filter)
    .then(messages => {
      console.log('sending', messages);
      return messages;
    })
    .then(messages => res.status(200).json({ messages }).end());
});

app.post('/', async (req, res) => {
  try {
    let { name, text, createdAt } = req.body;
    createdAt = createdAt || Date.now();
    if (!name) throw new Error("Missing required field 'name'");
    if (!text) throw new Error("Missing required field 'text'");

    await messages.append({ name, text, createdAt });

    return res.status(200).json({ success: true }).end();
  } catch (err) {
    console.log('Error posting message', err, { body: req.body });
    return res.status(400).json({ success: false, error: err.toString() }).end();
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
