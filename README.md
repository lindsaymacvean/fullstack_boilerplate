# fullstack_boilerplate
Express fullstack web app boilerplate

## How to install
Make sure to have installed:

* Node && npm
* Bower
* Grunt
* Heroku Toolbelt (including foreman)

``` 
npm install && bower install
foreman start
```

## Structure
/dist compiled files using grunt

/client holds all client side jade templates

/server holds all server side node files

Using a MOVE structure

Models - Typical

Operations - Handling all controller like behaviour with the DB etc

Views - Classic views are in the ../client directory. The server directory handles APIs

Events - Bubbling up from the client side through the routes and endpoints and to the operations.

## To Dos
Setup io emitting for default operations
Grunt compiling to /dist

## License
MIT