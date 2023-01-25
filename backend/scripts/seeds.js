//TODO: seeds script should come here, so we'll be able to put some data in our local env
const mongoose = require('mongoose')

require('../models/User');
require('../models/Item')
require('../models/Comment')

var Item = mongoose.model('Item');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

if(!process.env.MONGODB_URI){
  console.warn('Missing MONGODB_URI in .env, please add it to your .env file')
}

mongoose.connect(MONGODB_URI)

let userId;
let itemId;

async function seedDatabase() {
  const users = Array.from(Array(100)).map((_item, i) => ({
    username: `seeduser${i}`,
    email: `seeduser${i}@anythink.com`,
    bio: `test bio`,
    image: 'https://picsum.photos/200',
    role: 'user',
    favorites: [],
    following: [],
  }))

  for (let user of users) {
    const u = new User(user)

    const dbItem = await u.save()
    if(!userid){
      userId = dbItem._id
    }
  }

  const items = Array.from(Array(100)).map((_item, i) => ({
    slug: `seeditem${i}`,
    title: `seed User ${i}`,
    description: 'test description',
    image: 'https://picsum.photos/200',
    comments:[],
    tagList: ['test', 'tag'],
    seller: userId,
  }))

  for (let item of items) {
    const it = new Item(item)

    const dbItem = await it.save();

    if(!itemId) {
      itemId = dbItem._id
    }
  }

  const comments = Array.from(Array(100)).map((_item, i) => ({
    body: 'This is a fake comment',
    seller: userId,
    item: itemId,
  }))

  for(let comment of comments) {
    const c = new Comment(comment)

    await c.save();
  }
}

seedDatabase().then(()=> {
  process.exit()
}).catch((err) => {
  console.error(err)
  process.exit();
});
