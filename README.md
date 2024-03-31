## A Simple ChatApp, built with Django and ReactJs.

This is simple chat application which used django channels for realtime connection.

<div>&nbsp;</div>

Included features:
- :speech_balloon: chat
- :red_circle: online/offline friends status
- :abcd: "Is typing..." indicator
- :rabbit2: random profile picture generation
- :man::woman: user update and creation
- :lock: authentication


Tech Stack:
- :snake: Python 3.11 
- :notebook_with_decorative_cover: Sqlite
- :dart: Redis for caching
- :zap: Socket.IO for chat and online status
- :key:  Token Base Authentication
- :whale: Docker + docker-compose to ease deployment and development  


#### Deploy on your local machine with Docker
Open a shell and clone this repository:  
`https://github.com/BhuwanPandey/chatapp-fullstack.git`  

Navigate inside project docker folder:  
`cd chatapp-compose `  

Start all services:  
`docker compose up -d --build` (run this at first time or after making anychanges)
<div>&nbsp;</div>
Later you can use
`docker compose up`
After all visit at localhost:3000


### Locally without Docker
#### For Backend
```code
create virtual enviroment
python -m venv env
cd env/scripts ./activate (For Window)
source env/bin/activate  (For Linux)
pip install -r requirements.txt
python manage.py runserver
visit at localhost:8000  
```

#### For Frontend
```code
Change directory
cd chat-frontend
npm install
npm start
visit at localhost:3000
```
