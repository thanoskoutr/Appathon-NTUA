CD ./back-end
CALL npm install
START "" npm start
CD ..
CD ./front-end
CALL yarn install
CALL yarn build
CALL npm install -g serve
serve -s build -l 5000
PAUSE
