# test-technique
Technical test on Node.js :

2 inputs: 1 for the username and 1 for the user age
The information should be stored into the database and displayed on the page

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v13.11.0

    $ npm --version
    6.14.5

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g
    
If you need automatic reload of your app upon any update made to your files, you can install `nodemon` using `npm`:
    $ npm install -g nodemon

## Running the project
Choose one among these three:

    $ npm start       // node
    $ npm run dev     // nodemon
    $ npm run server  // nodemon
    
    
## .ENV variables

  DB_PORT

  MONGODB_URI
  SESSION_SECRET
