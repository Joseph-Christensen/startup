const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');

const weapons = [
  { name: 'Liberator', category: 'Primary', type: 'Assault Rifle', damage: 90, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Liberator Penetrator', category: 'Primary', type: 'Assault Rifle', damage: 65, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Liberator Concussive', category: 'Primary', type: 'Assault Rifle', damage: 75, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'StA-52 Assault Rifle', category: 'Primary', type: 'Assault Rifle', damage: 80, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Pacifier', category: 'Primary', type: 'Assault Rifle', damage: 55, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Stun'] },
  { name: 'Coyote', category: 'Primary', type: 'Assault Rifle', damage: 75, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Incendiary'] },
  { name: 'MA5C Assault Rifle', category: 'Primary', type: 'Assault Rifle', damage: 90, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Liberator Carbine', category: 'Primary', type: 'Assault Rifle', damage: 90, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Tenderizer', category: 'Primary', type: 'Assault Rifle', damage: 105, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Adjudicator', category: 'Primary', type: 'Assault Rifle', damage: 95, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Amendment', category: 'Primary', type: 'Marksman Rifle', damage: 200, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Constitution', category: 'Primary', type: 'Marksman Rifle', damage: 180, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Rounds Reload'] },
  { name: 'Deadeye', category: 'Primary', type: 'Marksman Rifle', damage: 300, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Rounds Reload'] },
  { name: 'Diligence', category: 'Primary', type: 'Marksman Rifle', damage: 165, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Diligence Counter Sniper', category: 'Primary', type: 'Marksman Rifle', damage: 200, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Knight', category: 'Primary', type: 'Submachine Gun', damage: 90, armorPen: 'Light (2)', armorPenValue: 2, traits: ['One Handed'] },
  { name: 'StA-11 SMG', category: 'Primary', type: 'Submachine Gun', damage: 90, armorPen: 'Light (2)', armorPenValue: 2, traits: ['One Handed'] },
  { name: 'M7S SMG', category: 'Primary', type: 'Submachine Gun', damage: 70, armorPen: 'Light (2)', armorPenValue: 2, traits: ['One Handed', 'Suppressed'] },
  { name: 'Reprimand', category: 'Primary', type: 'Submachine Gun', damage: 135, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Defender', category: 'Primary', type: 'Submachine Gun', damage: 100, armorPen: 'Light (2)', armorPenValue: 2, traits: ['One Handed'] },
  { name: 'Pummeler', category: 'Primary', type: 'Submachine Gun', damage: 85, armorPen: 'Light (2)', armorPenValue: 2, traits: ['One Handed'] },
  { name: 'Punisher', category: 'Primary', type: 'Shotgun', damage: 405, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Rounds Reload'] },
  { name: 'Slugger', category: 'Primary', type: 'Shotgun', damage: 330, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Rounds Reload'] },
  { name: 'Halt', category: 'Primary', type: 'Shotgun', damage: 385, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Rounds Reload'] },
  { name: 'Cookout', category: 'Primary', type: 'Shotgun', damage: 320, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Rounds Reload', 'Incendiary'] },
  { name: 'M90A Shotgun', category: 'Primary', type: 'Shotgun', damage: 605, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Rounds Reload'] },
  { name: 'Breaker', category: 'Primary', type: 'Shotgun', damage: 330, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Breaker Spray&Pray', category: 'Primary', type: 'Shotgun', damage: 240, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Breaker Incendiary', category: 'Primary', type: 'Shotgun', damage: 240, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Incendiary'] },
  { name: 'Exploding Crossbow', category: 'Primary', type: 'Explosive', damage: 620, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Explosive', 'One Handed'] },
  { name: 'Eruptor', category: 'Primary', type: 'Explosive', damage: 455, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Explosive'] },
  { name: 'Punisher Plasma', category: 'Primary', type: 'Energy-Based', damage: 225, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Explosive'] },
  { name: 'Accelerator Rifle', category: 'Primary', type: 'Energy-Based', damage: 350, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Explosive'] },
  { name: 'Blitzer', category: 'Primary', type: 'Energy-Based', damage: 250, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Scythe', category: 'Primary', type: 'Energy-Based', damage: 450, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Beam', 'Heat'] },
  { name: 'Sickle', category: 'Primary', type: 'Energy-Based', damage: 60, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Heat'] },
  { name: 'Double-Edge Sickle', category: 'Primary', type: 'Energy-Based', damage: 70, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Heat'] },
  { name: 'Scorcher', category: 'Primary', type: 'Energy-Based', damage: 200, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Explosive'] },
  { name: 'Purifier', category: 'Primary', type: 'Energy-Based', damage: 500, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Chargeup', 'Explosive'] },
  { name: 'Variable', category: 'Primary', type: 'Special', damage: 85, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Torcher', category: 'Primary', type: 'Special', damage: 150, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Incendiary'] },
  { name: 'Dominator', category: 'Primary', type: 'Special', damage: 275, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Warrant', category: 'Secondary', type: 'Pistol', damage: 80, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Guided'] },
  { name: 'Peacemaker', category: 'Secondary', type: 'Pistol', damage: 95, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Redeemer', category: 'Secondary', type: 'Pistol', damage: 70, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Verdict', category: 'Secondary', type: 'Pistol', damage: 135, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'M6C/SOCOM Pistol', category: 'Secondary', type: 'Pistol', damage: 110, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Suppressed'] },
  { name: 'Senator', category: 'Secondary', type: 'Pistol', damage: 200, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Rounds Reload'] },
  { name: 'Stun Lance', category: 'Secondary', type: 'Melee', damage: 110, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Stun'] },
  { name: 'Saber', category: 'Secondary', type: 'Melee', damage: 125, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Stun Baton', category: 'Secondary', type: 'Melee', damage: 50, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Stun'] },
  { name: 'Combat Hatchet', category: 'Secondary', type: 'Melee', damage: 160, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Machete', category: 'Secondary', type: 'Melee', damage: 200, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['None'] },
  { name: 'Stim Pistol', category: 'Secondary', type: 'Special', damage: 0, armorPen: 'None (0)', armorPenValue: 0, traits: ['Rounds Reload', 'Stimulative'] },
  { name: 'Bushwhacker', category: 'Secondary', type: 'Special', damage: 405, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Rounds Reload'] },
  { name: 'Talon', category: 'Secondary', type: 'Special', damage: 200, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Heat'] },
  { name: 'Crisper', category: 'Secondary', type: 'Special', damage: 150, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Incendiary'] },
  { name: 'Grenade Pistol', category: 'Secondary', type: 'Special', damage: 650, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Explosive'] },
  { name: 'Dagger', category: 'Secondary', type: 'Special', damage: 350, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Beam', 'Heat'] },
  { name: 'Ultimatum', category: 'Secondary', type: 'Special', damage: 3000, armorPen: 'Anti-Tank II (6)', armorPenValue: 6, traits: ['Explosive'] },
  { name: 'Loyalist', category: 'Secondary', type: 'Special', damage: 375, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Chargeup', 'Explosive'] },
  { name: 'Machine Gun', category: 'Support', type: 'Heavy Weapon', damage: 90, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Stationary Reload'] },
  { name: 'Anti-Materiel Rifle', category: 'Support', type: 'Anti-Armor Precision', damage: 450, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['None'] },
  { name: 'Stalwart', category: 'Support', type: 'Heavy Weapon', damage: 90, armorPen: 'Light (2)', armorPenValue: 2, traits: ['None'] },
  { name: 'Expendable Anti-Tank', category: 'Support', type: 'Anti-Tank', damage: 2150, armorPen: 'Anti-Tank II (6)', armorPenValue: 6, traits: ['Expendable'] },
  { name: 'Recoilless Rifle', category: 'Support', type: 'Anti-Tank', damage: 3350, armorPen: 'Anti-Tank II (6)', armorPenValue: 6, traits: ['Backpack', 'Stationary Reload'] },
  { name: 'Flamethrower', category: 'Support', type: 'Heavy Weapon', damage: 150, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Incendiary'] },
  { name: 'Autocannon', category: 'Support', type: 'Heavy Explosive', damage: 475, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Backpack', 'Stationary Reload'] },
  { name: 'Heavy Machine Gun', category: 'Support', type: 'Heavy Weapon', damage: 150, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Stationary Reload'] },
  { name: 'Airburst Rocket Launcher', category: 'Support', type: 'Rocket Launcher', damage: 500, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Backpack', 'Stationary Reload'] },
  { name: 'Commando', category: 'Support', type: 'Missiles', damage: 1250, armorPen: 'Anti-Tank II (6)', armorPenValue: 6, traits: ['Expendable'] },
  { name: 'Railgun', category: 'Support', type: 'Anti-Armor Precision', damage: 1500, armorPen: 'Anti-Tank I (5)', armorPenValue: 5, traits: ['Chargeup'] },
  { name: 'Spear', category: 'Support', type: 'Missiles', damage: 4200, armorPen: 'Anti-Tank III (7)', armorPenValue: 7, traits: ['Backpack', 'Stationary Reload', 'Guided'] },
  { name: 'WASP Launcher', category: 'Support', type: 'Missiles', damage: 800, armorPen: 'Anti-Tank II (6)', armorPenValue: 6, traits: ['Backpack', 'Stationary Reload', 'Guided'] },
  { name: 'Grenade Launcher', category: 'Support', type: 'Heavy Explosive', damage: 400, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Explosive'] },
  { name: 'Laser Cannon', category: 'Support', type: 'Heavy Energy-Based', damage: 450, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Heat', 'Beam'] },
  { name: 'Arc Thrower', category: 'Support', type: 'Heavy Energy-Based', damage: 250, armorPen: 'Anti-Tank III (7)', armorPenValue: 7, traits: ['Chargeup'] },
  { name: 'Quasar Cannon', category: 'Support', type: 'Heavy Energy-Based', damage: 2150, armorPen: 'Anti-Tank II (6)', armorPenValue: 6, traits: ['Chargeup'] },
  { name: 'Break-Action Shotgun', category: 'Support', type: 'Shotgun', damage: 585, armorPen: 'Light (2)', armorPenValue: 2, traits: ['Rounds Reload'] },
  { name: 'Entrenchment Tool', category: 'Support', type: 'Melee', damage: 110, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['One Handed'] },
  { name: 'Sterilizer', category: 'Support', type: 'Heavy Weapon', damage: 30, armorPen: 'Anti-Tank I (5)', armorPenValue: 5, traits: ['Caustic'] },
  { name: 'One True Flag', category: 'Support', type: 'Melee', damage: 110, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['One Handed'] },
  { name: 'De-Escalator', category: 'Support', type: 'Tesla', damage: 100, armorPen: 'Heavy (4)', armorPenValue: 4, traits: ['Stun'] },
  { name: 'Epoch', category: 'Support', type: 'Heavy Weapon', damage: 1600, armorPen: 'Anti-Tank I (5)', armorPenValue: 5, traits: ['Chargeup', 'Explosive'] },
  { name: 'Speargun', category: 'Support', type: 'Anti-Armor Precision', damage: 675, armorPen: 'Anti-Tank I (5)', armorPenValue: 5, traits: ['Caustic'] },
  { name: 'Expendable Napalm', category: 'Support', type: 'Rocket Launcher', damage: 500, armorPen: 'Medium (3)', armorPenValue: 3, traits: ['Expendable', 'Incendiary'] },
  { name: 'Solo Silo', category: 'Support', type: 'Missile', damage: 4000, armorPen: 'Anti-Tank V (9)', armorPenValue: 9, traits: ['Targeting'] },
];

const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = [];
let allScores = [];
let gameStates = {};
let dailyQuote = {
  text: "Loading...",
  author: "Unknown",
};
let dailyWeapon = { 
  name: 'Unknown', 
  category: 'Unknown', 
  type: 'Unknown', 
  damage: 0, 
  armorPen: 'Unknown', 
  armorPenValue: 0, 
  traits: ['None'] 
};

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return res.status(400).send({ msg: 'Missing username or password' });
  }
  if (await findUser('username', username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(username, password);
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const {username, password} = req.body;
  const user = await findUser('username', username);
  if (user && await bcrypt.compare(password, user.password)) {
    user.token = uuid.v4();
    await DB.updateUser(user);
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
    return;
  } 
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetScores
apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, (req, res) => {
  const {name, score} = req.body;
  if (!name || score == null) {
    return res.status(400).send({ msg: 'Invalid score data' }); 
  }

  scores.push({name, score})
  res.send(scores);
});

// clearScores
apiRouter.delete('/scores', verifyAuth, (_req, res) => {
  scores = [];
  console.log('[Scores Reset], manually cleared');
  res.status(204).end();
});

// setQuote
apiRouter.post('/quote', async (_req, res) => {
  await fetchQuote();
  res.send(dailyQuote);
});

// getQuote
apiRouter.get('/quote', (_req, res) => {
  res.send(dailyQuote);
});

// setWeapon
apiRouter.post('/weapon', async (_req, res) => {
  setDailyWeapon();
  res.send(dailyWeapon);
});

// getWeapon
apiRouter.get('/weapon', (_req, res) => {
  res.send(dailyWeapon);
});

// Save or update a user's game state
apiRouter.post('/gameState', verifyAuth, (req, res) => {
  const { username, gameState } = req.body;
  if (!username || !gameState) {
    return res.status(400).send({ msg: 'Invalid game state data' });
  }

  gameStates[username] = gameState;
  res.status(200).send({ msg: 'Game state saved successfully' });
});

// Get a user's game state
apiRouter.get('/gameState/:username', verifyAuth, (req, res) => {
  const username = req.params.username;
  const state = gameStates[username];

  if (!state) {
    return res.status(404).send({ msg: 'No saved game state found' });
  }

  res.send(state);
});

apiRouter.get('/scores/alltime', verifyAuth, async (req, res) => {
  const user = findUser('token', req.cookies[authCookieName]);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });

  const userScores = allScores.filter(s => s.name === user.username);
  res.send(userScores);
});

function scheduleDailyReset() {
  const now = new Date();
  const mtNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Denver" }));

  const nextMidnight = new Date(mtNow);
  nextMidnight.setDate(mtNow.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);

  const msUntilMidnight = nextMidnight - mtNow;

  console.log(`[Scheduler] Next automatic reset in ${Math.round(msUntilMidnight / 1000 / 60)} minutes.`);

  setTimeout(() => {
    allScores.push(...scores);

    scores = [];
    gameStates = {};
    fetchQuote();
    setDailyWeapon();

    console.log(`[Scheduler] Everthing automatically reset for a new day (${nextMidnight.toISOString().slice(0, 10)})`);
    scheduleDailyReset(); // Reschedule for the next day
  }, msUntilMidnight);
}

fetchQuote();
setDailyWeapon();
scheduleDailyReset();

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

async function fetchQuote() {
  try {
    const response = await fetch(
      'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
    );

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.warn("[Quote] JSON parse issue. Raw text:", text);
      return;
    }

    dailyQuote = {
      text: data.quoteText || "We are what we think. All that we are arises with our thoughts. With our thoughts, we make the world.",
      author: data.quoteAuthor || "Buddha",
    };

    console.log(`[Quote] Updated: "${dailyQuote.text}" — ${dailyQuote.author}`);
  } catch (err) {
    console.error('[Quote] Fetch failed:', err);
  }
}

function setDailyWeapon() {
  const index = Math.floor(Math.random() * weapons.length);
  dailyWeapon = weapons[index];
  console.log(`[Weapon] Daily weapon set: ${dailyWeapon.name}`);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});