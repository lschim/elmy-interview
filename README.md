# elmy-interview
The application was created using node v16.19.0 (unfortunately my Macbook pro is from 2010 and does not support the latest MacOS version, and thus further version of NodeJS)

I spent around 2h15 working on the project. 

The application does not match the requirements in that it only gather information from the 3 power supplies, but does not aggregate the data in a single array

Only the data incoming from Hawes is currently checked to avoid gaps

Error 500 that might come from the servers are not handled correctly for now.
My idea was to put in a place a retry process, where the number of retries is read in the conf, but for now, if an API returns an error 500, the Promise of the request will be rejected and thus the application will throw an error

I settled a test environment using mocha, but I missed time to implement relevent tests

# How to run the application

Checkout the git repository

Run 'npm install'

Run 'npm start *fromDate* *toDate* *outputFormat*'
