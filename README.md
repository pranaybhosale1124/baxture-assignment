# baxture-assignment

Language used : Javascript
Framework : ExpressJS

endpoint :  http://localhost:4200/api/users/@@@@@

Mandatory points :

1. Endpoints created

2. used User Entity with properties asked
    check models/ user.js

3.	Invalid requests and server-side errors handled with proper error code and corresponding human-friendly messages
    - used winston package for logging.
    - check logs/logger.js
        - location of logs created -> logs/error.log
        - info & warning level logs are not preserved

4. port value is saved in .env

5. two modes to run an application (package.json)
    development     -> npm run start:dev
    production      -> npm run start:prod
    load balanced   -> npm run start:multi


Bonus Points : Partially

6. input validations are in place :
    used "express-validator" package
    check models/user-validator.js
    used middlewre chaining for validations
    handeled invalid response within models/user-validator.js itself;

7. Horizontal Scaling is implemented using cluster module.
    have not written a custom logic (round -robbin) for distributing a load & for port numbers.
    cluster module by default uses round-robbin for distributing a load (as per research)
    number of worker threads = num of CPUs

    in order to use clustering seperate cluster.js is writtenn in /bin

    steps to test load balancing :
        start application using     ->  npm run start:multi
        open another terminal & run ->  node test-cluster
                                        this will send total 500 requests to 'index' router.
                                        index API is designed to take 500ms to process each request
        check "error.log" file to see process.ids that each request was resolved by (or was distributed to) 