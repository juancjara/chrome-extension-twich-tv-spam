#!/bin/bash

echo "building"

NODE_ENV=production browserify -e src/js/background/main.js | uglifyjs -c -m > build/js/bg-bundle.js
NODE_ENV=production browserify -e src/js/content-script/main.js | uglifyjs -c -m > build/js/cs-bundle.js

cd build/
rm app.zip
zip -r app.zip .
mv app.zip ../
