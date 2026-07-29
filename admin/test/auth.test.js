const test = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');
const authController = require('../controllers/authController');
const User = require('../models/User');

const originalFindOne = User.findOne;

test('returns 400 when credentials are missing', async () => {
  const req = { body: { email: 'test@example.com', password: '' } };
  let statusCode = 0;
  let payload;

  const res = {
    status(code) {
      statusCode = code;
      return {
        json(body) {
          payload = body;
        },
      };
    },
  };

  await authController.loginUser(req, res);

  assert.equal(statusCode, 400);
  assert.equal(payload.success, false);
  assert.match(payload.message, /required/i);
});

test('returns a token for valid credentials', async () => {
  const storedHash = await bcrypt.hash('secret123', 10);
  User.findOne = async () => ({
    _id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    password: storedHash,
    role: 'Analyst',
  });

  const req = { body: { email: 'test@example.com', password: 'secret123' } };
  let statusCode = 0;
  let payload;

  const res = {
    status(code) {
      statusCode = code;
      return {
        json(body) {
          payload = body;
        },
      };
    },
  };

  await authController.loginUser(req, res);

  assert.equal(statusCode, 200);
  assert.equal(payload.success, true);
  assert.ok(payload.token);
  assert.equal(payload.user.email, 'test@example.com');
});

test.afterEach(() => {
  User.findOne = originalFindOne;
});
