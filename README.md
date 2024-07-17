# Node Projects

This is the repository where I would put my NodeJS learnings, and in extension, my ExpressJS learnings.

## [Tutorial on Basics](./tutorial-on-basics/)

This is where I learn the basics of NodeJS and ExpressJS from [this freeCodeCamp course](https://youtu.be/Oe421EPjeBE?si=NOR2QafiTV5RUjYG) on YouTube.

### Topics covered under NodeJS

- Writing [basic JS](./tutorial-on-basics/basics/app.js) on Node platform.
- Using [built-in modules](./tutorial-on-basics/basics/02-built-in-modules.js).
- Creating [custom modules](./tutorial-on-basics/basics/01-custom-modules.js).
- Using the filesystem with `fs` - both [sync](./tutorial-on-basics/basics/03-filesystems.js) and [async](./tutorial-on-basics/basics/05-filesystems-async-await.js).
- Setting up a [server](./tutorial-on-basics/basics/04-http-modules.js) with the `http` module.
- Triggering custom events with [event emitters](./tutorial-on-basics/basics/06-event-emitters.js).
- Handling [streams](./tutorial-on-basics/basics/07-streams.js) of data.

### Topics covered under ExpressJS

- Serving a complete front-end app [without ExpressJS](./tutorial-on-basics/express-tutorial/01-serving-navbar-app-without-express.js), thereby highlighting its need.

### Dev Dependencies

- Nodemon
  ```sh
  # Installation
  npm i nodemon
  ```

### CLI commands

- To run the app requiring restart on code changes (basic `node` tool).
  ```sh
  # Syntax: `node filename.js` (.js is optional)
  node app.js # example 1
  node app # example 2
  ```
- To run the app that reruns automatically on code changes (with Nodemon).
  ```sh
  nodemon app.js # or: nodemon app
  ```
- To hit server with URL (GET request) using `curl`:
  ```sh
  # Syntax: curl urlendpoint
  curl localhost:3000/users # example
  ```
