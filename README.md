# Crossroads

a [Sails](http://sailsjs.org) application

If you want to use mongo, go into /config/connections.js and uncomment out the mongo setup I have. 
Make sure mongod is running
Also run npm install sails-mongo to get the adapter

List of things to do
---------------------

* Finish basic functionality
* Add alerts to stop accidental deletion of user/company
* Create company profiles
* Update user profile
* Implement multiple administration tiers
* Implement live analytics from https://18f.gsa.gov/2015/03/19/how-we-built-analytics-usa-gov/
* Hook into WP
* logo? favicon
* Convert to bourbon 


TODO1
--------------	
Condense company create into user creation - ask if user wants to create a company,
	if yes, use js to add "create company fields"
	else, have user join a company

TODO2
-----------
When user is deleted, also delete session and force a log out sequence

TODO3
----------
Clean up error messages - less cryptic