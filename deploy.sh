cd ./back-end
npm install
npm start &

cd ..

cd ./front-end
yarn install
yarn build
serve -s build
