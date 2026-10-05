#!/usr/bin/env bash
# Run once from the folder that contains this file:  bash setup.sh
set -e
npm init -y >/dev/null
npm i expo@latest react@latest react-native@latest
npx expo install react-dom react-native-web @expo/metro-runtime \
  @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
  react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage
node -e "const f=require('./package.json');f.main='node_modules/expo/AppEntry.js';f.scripts={start:'expo start',web:'expo start --web',android:'expo start --android',ios:'expo start --ios'};require('fs').writeFileSync('package.json',JSON.stringify(f,null,2))"
echo '{"expo":{"name":"Gearhouse","slug":"gearhouse","web":{"bundler":"metro"}}}' > app.json
echo "Done. Start with: npm run web"
