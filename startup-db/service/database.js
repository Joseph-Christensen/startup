const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('diverdle');
const userCollection = db.collection('users');
const scoreCollection = db.collection('scores');
const allScoreCollection = db.collection('allScores');
const gameStateCollection = db.collection('gameStates');
const dailyQuoteCollection = db.collection('dailyQuote');
const dailyWeaponCollection = db.collection('dailyWeapon');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// returning user by username
function getUser(username) {
  return userCollection.findOne({ username: username });
}

// returning user by token
function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

// adding user to the db
async function addUser(user) {
  await userCollection.insertOne(user);
}

// updating user info (auth)
async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

// adding score to db
async function addScore(score) {
  await scoreCollection.insertOne(score);
}

// returning scores from db
async function getScores() {
  return scoreCollection.find().toArray();
}

// clearing scores
async function clearScores() {
  await scoreCollection.deleteMany({});
}

// code for updating the allScores every reset
async function updateAllScores(scores) {
  if (scores.length > 0) {
    await allScoreCollection.insertMany(scores);
  }
}

// returns allScores
async function getAllScores(username) {
  return allScoreCollection.find({ name: username }).toArray();
}

// saves the gameState for a user
async function saveGameState(username, state) {
  await gameStateCollection.updateOne(
    { username },
    { $set: { username, state } },
    { upsert: true }
  );
}

// returns the gameState for a user
async function getGameState(username) {
  return gameStateCollection.findOne({ username });
}

// clears all gameStates at reset
async function clearGameStates() {
  await gameStateCollection.deleteMany({});
}

// setting the dailyQuote
async function setDailyQuote(quote) {
  await dailyQuoteCollection.updateOne(
    {},
    { $set: quote },
    { upsert: true }
  );
}

// returns dailyQuote
async function getDailyQuote() {
    return dailyQuoteCollection.findOne({});
}

// setting the dailyWeapon
async function setDailyWeapon(weapon) {
    await dailyWeaponCollection.updateOne(
        {},
        { $set: weapon },
        { upsert: true }
    );
}

async function getDailyWeapon() {
    return dailyWeaponCollection.findOne({});
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addScore,
    getScores,
    clearScores,
    updateAllScores,
    getAllScores,
    saveGameState,
    getGameState,
    clearGameStates,
    setDailyQuote,
    getDailyQuote,
    setDailyWeapon,
    getDailyWeapon,
};