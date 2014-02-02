Next Big Sound Demo
by Alan Johnson

The purpose of this project is to demonstrate the processing of metric and event data from the NBS API in an Angular app and visualize the data using D3.

I used Yeoman and its Angular app generator to automatically create the initial app template and the templates for additional pieces. For a project like this, Yeoman is an expedient way to get started. But on a real project, I would probably strip down the Yeoman skeleton a bit to get rid of unused dependencies.

One complication I had to work around was the fact that I did not have an API for retrieving artist data. Reloads of the app in routes other than the default route require the same artist data that a search returns, but without the ability to retrieve this information by API ID, I had to use artist name as my main artist identifier. This is definitely not something I would do in production. I tried to guess an API endpoint for getting artists by ID, but I was not successful.

Another complication I ran into was the inavailability of the API for a short time that I was working on the app. Fortunately, I still had API responses open in browser windows, which I copied into a module in the app and fed to angular-mock. This has the additional upside of removing API delays during development.