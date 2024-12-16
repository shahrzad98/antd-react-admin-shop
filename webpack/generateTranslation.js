const fs = require('fs');
const path = require('path');
const jsonConcat = require('json-concat');

const mainTranslation = path.join(__dirname, '../src/core/i18n/En.json');
const authTranslation = path.join(__dirname, '../src/core/Authentication/translate/en.json');

const translationDir = path.join(__dirname, '../src/assets/locales/En.json');

const translations = [mainTranslation];

fs.readFile(authTranslation, 'utf8', async (err, data) => {
  if (data) {
    const AuthJSON = { Auth: JSON.parse(data) };
    translations.push(AuthJSON);

    jsonConcat({ src: translations, dest: translationDir }, () => {
      console.log(`Adding Global Translation !`);
    });
  }
});
