//TODO: seeds script should come here, so we'll be able to put some data in our local env
const mongoose = require('mongoose');

require('../models/User');
require('../models/Item');
require('../models/Comment');

var Item = mongoose.model('Item');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

mongoose.connect('mongodb://mongodb-node:27017/anythink-market');

let userId;
let itemId;

async function seedDatabase() {
  const users = Array.from(Array(100)).map((_item, i) => ({
    username: `seeduser${i}anythink`,
    email: `seeduser${i}@anythinks.com`,
    bio: `test bio`,
    image: 'https://picsum.photos/200',
    role: 'user',
    favorites: [],
    following: [],
  }));

  for (let user of users) {
    const u = new User(user);

    const dbItem = await u.save();
    if (!userId) {
      userId = dbItem._id;
    }
  }

  const items = Array.from(Array(100)).map((_item, i) => ({
    slug: `seeditem${i}`,
    title: `seed User ${i}`,
    description: 'test description',
    image: 'https://picsum.photos/200',
    comments: [],
    tagList: ['test', 'tag'],
    seller: userId,
  }));

  for (let item of items) {
    const it = new Item(item);

    const dbItem = await it.save();

    if (!itemId) {
      itemId = dbItem._id;
    }
  }

  const comments = Array.from(Array(100)).map((_item, i) => ({
    body: 'This is a fake comment',
    seller: userId,
    item: itemId,
  }));

  for (let comment of comments) {
    const c = new Comment(comment);

    await c.save();
  }
}

seedDatabase()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
