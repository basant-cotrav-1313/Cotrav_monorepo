import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../mocks/server';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom'


beforeAll(() => {
  server.listen({ 
    onUnhandledRequest: 'warn' // Log unhandled requests instead of erroring
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});