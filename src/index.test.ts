// index.test.ts

// Mock dependencies
jest.mock('express', () => {
  const useMock = jest.fn();
  const listenMock = jest.fn();
  const jsonMock = jest.fn();

  const express: any = {
    Router: jest.fn(() => express),
    use: useMock,
    listen: listenMock,
    json: jsonMock,
  };

  // Provide a more realistic implementation for express.json()
  express.json = jsonMock;

  // Mock express() as a function
  const expressFn: any = jest.fn().mockReturnValue(express);
  expressFn.Router = express.Router;

  return expressFn;
});

jest.mock('firebase-admin', () => ({
  // Mock firebase-admin methods or objects as needed
}));
jest.mock('./routers/auth/user', () => ({ router: jest.fn() }));
jest.mock('./routers/todo/todo', () => jest.fn());

import { app } from './app';
import http from 'http';

// Import and configure dotenv
import dotenv from 'dotenv';
dotenv.config();

// Mock console.log to prevent unnecessary output in the test results
jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock http.createServer to prevent server creation during tests
jest.mock('http', () => ({
  createServer: jest.fn(() => ({
    listen: jest.fn(),
  })),
}));

describe('Express App Initialization', () => {
  it('should initialize the Express app and start the server', () => {
    // Call your index.ts file
    require('./index');

    // Ensure that http.createServer is called with your app
    expect(http.createServer).toHaveBeenCalledWith(app);

    // Ensure that server.listen is called with the correct port
    expect(http.createServer().listen).toHaveBeenCalledWith(process.env.PORT, expect.any(Function));

    // Ensure that console.log is called with the correct message
    expect(console.log).toHaveBeenCalledWith(`Listening on http://localhost:${process.env.PORT}`);
  });
});
