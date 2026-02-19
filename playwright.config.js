// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * 
 */
export default defineConfig({
  testDir: './tests',

  reporter: 'html',
 use: {
     browserName:"chromium",
    headless: false,
    slowMo: 5000,
    actionTimeout: 45000,
    navigationTimeout: 60000,
    expect: {
      timeout: 60000
    }
  }
 
 
});

