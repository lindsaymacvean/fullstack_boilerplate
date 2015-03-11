WARNING THIS REPO IS UNDER DEVELOPMENT AND UNLIKELY TO MAKE MUCH SENSE

# Fullstack web app Boilerplate
This codebase is designed with one very specific purpose in mind. Imagine you have an idea, you don't know if it would work very well but you just want to show your friends. Who know's, it might even be good enough to make a business. So you just want it to run and handle maybe a few thousand customers. But you don't want it to be impossible to improve and scale if you manage to get that far. This is my attempt at a stack for that scenario.

>"I have never seen a company die because it didn't scale fast enough" - Guy Kawasaki

## Strategic Goals
* It just needs to be good enough.
* Good enough for proof of concept but not really enterprise
* Good enough to show your friends and maybe some investors.
* Good enough to handle up to ~10,000 concurrent connections without falling over
* Should be able to run on cheap/free PaaS 
* Arranged so that a small team can get up to speed quickly
* Each part/module should require minimum skill-set to maintain.

## Principles and Constraints
* KISS - leave it if can be done by a much more qualified person in 1 year.
* Easily Scalable - that is to say you can run more workers and it handles more load.
* Complete testing frameworks and livereloading to speed up development
* No templates like Jade - just pure HTML5 for simplicity.
* Micro-services connected with messaging through Redis.
* Should be easily transportable to new developer environments (5 min install)
* Should incorporate any best practices that will make it easier and quicker to ship.

## Practices 
* Git(hub) Version Control - because who doesn't with web apps.
* MEAN stack - because javascript is ubiquitous and node is designed for concurrency.
* Mongo - because we can always implement a relational database later.
* SPA using Angular - because its seems to be less learning than ember.
* Grunt - because it kicks ass, and I can't see a viable alternative.
* RESTFUL API - because it needs to be repeatable to several workers.
* API works for web/mobile/3rd party apps.
* Redis - because we need to have a central session store and queue system.
* Heroku - because it is easily accessible from CLI
* Capable of being transferred to S3/EC2 with minimal fuss
* PassportJS - because it seems to be the defacto leader for authentication
* No Flash Messages because that can be done with ajax
* Logging everything in txt files so that it can be analyzed later
* Pulic front end and private frontend with boilerplate dashboard capabilities
* 

## Architecture
Based on this here is a current diagram showing the features in relation to one another.

![](https://docs.google.com/drawings/d/1tSR0bjQJglcT-38VVY8FT1DqkZZMFQ57_A02aRPiqEk/pub?w=961&h=581)

## How to install
Make sure to have installed:

* Node && npm
* Bower
* Grunt
* Heroku Toolbelt (including foreman)

``` 
npm install && bower install
foreman start
grunt bowercopy
```

## Directory Structure
/dist compiled files using grunt

/client holds all client side jade templates

/server holds all server side node files

**Using a MOVE structure**

Models - Typical

Operations - Handling all controller like behaviour with the DB etc

Views - Classic views are in the ../client directory. The server directory handles APIs

Events - Bubbling up from the client side through the routes and endpoints and to the operations.

## To Dos
Setup io emitting for default operations

Grunt compiling to /dist

## License
MIT