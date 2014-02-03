Next Big Sound Demo
===================
by Alan Johnson

The purpose of this project is to demonstrate the processing of metric and event data from the NBS API in an Angular app and visualize the data using D3.

Running
-------

To run, either spin up the grunt server by running `grunt serve` in the project root (which requires Grunt to be installed globally `npm install -g grunt`), or navigate to `dist/` and start a server (e.g. `python -m SimpleHTTPServer 8001`). Otherwise, browsers like Chrome will not allow XHR requests.

Methodology
-----------

I used Yeoman and its Angular app generator to automatically create the initial app template and the templates for additional pieces. For a project like this, Yeoman is an expedient way to get started. But on a real project, I would probably strip down the Yeoman skeleton a bit to get rid of unused dependencies.

Notes
-----

Besides some UI polish, the features I would add if I had the time are deep linking to particular charts and the ability to see metric and event details in a tooltip by mousing over the graphic.

One complication I had to work around was the fact that I did not have an API for retrieving artist data. Reloads of the app in routes other than the default route require the same artist data that a search returns, but without the ability to retrieve this information by API ID, I had to use artist name as my main artist identifier. This is definitely not something I would do in production. I tried to guess an API endpoint for getting artists by ID, but I was not successful.

Another complication I ran into was the unavailability of the API for a short time that I was working on the app. Fortunately, I still had API responses open in browser windows, which I copied into a module in the app and fed to angular-mock. This has the additional upside of removing API delays and not taxing the backend during development.

I normally test my code thoroughly, but given the time constraints, I did not take the time to write a test suite.