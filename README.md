
# Orbi Internet Fix
I have a custom setup that tracks every site from each device that is connected to my router.  This mainly allows me to ensure that the kids are behaving.  Anyways, the custom setup has a small conflict that sometimes blocks the internet from connecting to the devices unless the router is soft reset or a speed test is ran.  While those two options work this is a much faster work around.  You just connect to the page and click a button instead of going to the routers main page, logging in, selecting internet, selecting speed test.  This setup was mainly put in place to allow everyone in the household the ability to fix this.  So it needed to be easy.

## Setup

### Frontend
* VueJS
	* My favorite and most experience frontend setup.
* axios
	* Easy and light XHR library.
* vuejs-progress-bar
	* Fast solution to allow an understanding that the script is still working
### Backend
*	CORSjs
	*	This allows an easy CORS application to ExpressJS
*	ExpressJS
	*	Allows for a simple NodeJS Web Server setup.
*	Netgear
	*	A SOAP API Library this allows an easy connection to the API without having to manipulate webpages.

### Prerequisites
* PHP Web Server
* NodeJS
* git
	* Not requires however makes it easier

### Installing
Clone the repo
```
git clone https://github.com/DevJonTaylor/orbi-internet-fix.git
```


setup frontend

```
cd orbi-internet-fix/frontend
npm install
```
setup backend

```
cd orbi-internet-fix/backend
npm install
```

That should do it.  It will make one attempt to run the speed test and if it does not work then it will restart the server and if that does not work it will fail and tell you so in the front end.

Setup the front end and test it 
```
cd orbi-internet-fix/frontend
npm run serve
```
Set it up how you want it and then build it
```
cd orbi-internet-fix/frontend
npm run build
```
Move the contents of the dist folder that is built where you want to serve it and poof you have a speed test server setup with ease of access for your Orbi router.

## Built With
### Backend
* [Express](http://expressjs.com) - Allows access to the API of the router from the frontend.
* [CORSjs](https://github.com/expressjs/cors) - Easily apply CORS to Express
* [Netgearjs](https://www.npmjs.com/package/netgear) - SDK for connecting to Netgears SOAP API from NodeJS

### Frontend
* [VueJS](http://vuejs.org) - VueJS for the frontend framework.
* [axios](https://github.com/axios/axios) - XHR library
* [VueJS Progress Bar](https://www.npmjs.com/package/vuejs-progress-bar) - VueJS Component to show progress and give some UI.  
## Last Words
Add, change, build on, make it your own.  =)
If anything is missing or you feel there should be something else please let me know and I'll be more than happy to extend or help with doing so whenever I have a chance.