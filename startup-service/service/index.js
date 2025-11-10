const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = [];
let quote = {
  text: "Loading...",
  author: "Unknown",
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

function scheduleDailyReset() {
  const now = new Date();
  const mtNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Denver" }));

  const nextMidnight = new Date(mtNow);
  nextMidnight.setDate(mtNow.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);

  const msUntilMidnight = nextMidnight - mtNow;

  console.log(`[Scheduler] Next automatic score reset in ${Math.round(msUntilMidnight / 1000 / 60)} minutes.`);

  setTimeout(() => {
    scores = [];
    fetchQuote();
    console.log(`[Scheduler] Scores automatically reset for a new day (${nextMidnight.toISOString().slice(0, 10)})`);
    scheduleDailyReset(); // Reschedule for the next day
  }, msUntilMidnight);
}

fetchQuote();
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
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
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