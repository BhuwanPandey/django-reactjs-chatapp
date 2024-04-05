## A Simple ChatApp, built with Django and ReactJs.

![Screenshot 2024-03-31 135859](https://github.com/BhuwanPandey/chatapp-fullstack/assets/46397975/0afb75c5-9783-4be1-985e-cb154a16894f)
<div>&nbsp;</div>

Included features:
- :speech_balloon: Chat
- :red_circle: Online/Offline friends status
- :abcd: "Is typing..." status
- :rabbit2: Random profile picture generation
- :man::woman: User Creation and Update
- :lock: Authentication and Permission


Tech Stack:
- :snake: Python 3.11 
- :notebook_with_decorative_cover: Sqlite
- :dart: Redis for caching
- :zap: Django Channels for chat and online status
- :key:  Token Base Authentication
- :whale: Docker + docker-compose to ease deployment and development  


#### Deploy on your local machine with Docker
Open a shell and clone this repository:  
`https://github.com/BhuwanPandey/chatapp-fullstack.git`  

Navigate inside project docker folder:  
`cd chatapp-compose `  

Start all services:  
`docker compose up -d --build` (Run this one time of creation)
<div>&nbsp;</div>

Later you can use:
`docker compose up`
After,visit at localhost:3000


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
create .env add
REACT_APP_BACKEND_API=
REACT_APP_CHAT_API=
npm start
visit at localhost:3000
```

## Note 
This product isnot eligible for Production use, Here are the reason
  - It used sqlite as database 
  - It didnot include testcases
  - Still there are lot of validation Required
  - Website isnot fully responsive

## Support
Show your support by 🌟 the project!!
