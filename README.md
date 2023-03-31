# Public Git Repository for my OpenClassrooms Seventh Project

Environments used for the development: Visual Studio Code for the programming, UniServer Zero for the database hosting. 

Link to the repository: https://github.com/ifdzbenet/Project-7/

Dependencies needed to run the code: Node.js, Vue CLI

npm install -g @vue/cli
npm install -g @vue/cli-service
npm install -g @vue/cli-plugin-babel
npm install -g @vue/cli-plugin-router


Add the node_modules folder to the project, as its not uploaded to github.

npm install -g node-modules


Steps to run the environment:

*Terminal 1*
In main directory (Project-7): npm run serve -> it will be available in http://localhost:8080/

*Terminal 2*
In the backend directory (Project-7 -> cd backend): node server -> it will listen in PORT 3000 (http://localhost:3000/)

*Warning* The application will run but it will crash if the API is needed for an action. The reason for this is because this project's database is hosted locally and it needs the connection to run. 
If you want my database files to be able to run it in your machine, the link to download them are in https://github.com/ifdzbenet/project-7-database