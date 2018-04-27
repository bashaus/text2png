/* global expect */
/* eslint no-console:0 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const text2png = require('../index.js');
const looksSame = require('looks-same');

describe('text2png', () => {
  glob.sync(path.resolve(__dirname, 'testcases', '*.json')).forEach(filePath => {
    const fileName = path.basename(filePath, '.json');

    it('matches ' + fileName, () => {
      const config = JSON.parse(fs.readFileSync(filePath));

      return new Promise((resolve, reject) => {
        looksSame(
          text2png.apply(text2png, config),
          fs.readFileSync(path.join(__dirname, 'expected', fileName + '.png')),
          { ignoreAntialiasing: true },
          (error, match) => {
            if (error) reject(error);

            expect(match).toBe(true, 'generated image does not match');
            resolve();
          }
        );
      });
    });
  });
});
