# elmy-interview V2

I spent more time working on the application, bringing the total of hours to 4.
Because of the time requirement that was presented as fixed to 2 hours, I had to rush some part of the development in the first version. In particular, I setup the mocha environment for tests, but decided that I could not spend that much time writing them, so I just wrote a few cases to show it would be part of the development process as I was not sure if I could reach and interesting point for the application. For the same reason, when I realized the 2 hours were already spent, I wanted to start having a few things after calling the APIs, and so I rushed a small part to reach the point of starting to parse and fill the gaps in the response from APIs.

When I finished the first version, I was right at the point of development that would start to become interesting : being able to call APIs, and automate the aggregation. So this is what I did in the second version : I took my time writing tests instead of rushing toward a technical goal, refactored the parts that were rushed in V1, to have a way cleaner solution, which would be more representative of what I would lean toward.

Obviously, even the V2 is not finished. The ouput is not correctly printed in the requested format, the API in csv are not parsed, and there could be way more tests to be written (for instance mocking the APIs and returning error 500), but again, I also had to make choices to avoid spending too much time on the V2. If I had to do a V3, I would start looking at the optimization of the application. In particular, I would try to find a solution working aroud streams if that is possible, I am not 100% convinced by the choice of using maps, in particular the aggregation seems too naive.

## elmy-interview V1


The application was created using node v16.19.0 (unfortunately my Macbook pro is from 2010 and does not support the latest MacOS version, and thus further version of NodeJS)

I spent around 2h15 working on the project. 

The application does not match the requirements in that it only gather information from the 3 power supplies, but does not aggregate the data in a single array

Only the data incoming from Hawes is currently checked to avoid gaps

Error 500 that might come from the servers are not handled correctly for now.
My idea was to put in a place a retry process, where the number of retries is read in the conf, but for now, if an API returns an error 500, the Promise of the request will be rejected and thus the application will throw an error

I settled a test environment using mocha, but I missed time to implement relevent tests

I used as few external modules as possible, I only have a dependency on mocha for the tests, and on pinto for the logging process

# How to run the application

Checkout the git repository

Run 'npm install'

Run 'npm start *fromDate* *toDate* *outputFormat*'

To run the tests, use 'npm test'

# Troubleshooting

Make sure the folder for logs provided in the configuration file (conf/default-conf.json) exists in the system. By default, the logs are written where the project was cloned.
