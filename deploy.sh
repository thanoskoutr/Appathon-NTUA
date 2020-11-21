cd ./back-end
npm install
npm start &

cd ..

cd ./front-end
npm install
npm run build
npx serve -s build -l 5000
