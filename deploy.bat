CD ./back-end
CALL npm install
START "" npm start
CD ..
CD ./front-end
CALL npm install
CALL npm run build
CALL npm install -g serve
npx serve -s build -l 5000
PAUSE
