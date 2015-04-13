# Crossroads

a [Sails](http://sailsjs.org) application

To install: npm install sails -g


If you want to use mongo, go into /config/connections.js and uncomment out the mongo setup I have. 
Make sure mongod is running, type mongod
Also run npm install sails-mongo to get the adapter

For local Development without mongo
----------------
In config/Models.js replace connection: 'MongoDb', with connection: 'localDiskDb'


To Run type sails lift


List of things to do
---------------------

* Finish basic functionality