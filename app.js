const express = require('express');
const ejs = require('ejs');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const request = require('request');
const async = require('async');
const moment = require('moment');
const _ = require('lodash');

const ErgastClient = require('ergast-client');
const ergast = new ErgastClient();

const app = express();

const bearerToken = 'e44a7092586a4cfb8d7890f56837000f';

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
   res.render('main/main');
});

app.get('/leagues', (req, res) => {

   async.parallel([
        function (next) {
            request('http://api.football-data.org/v1/competitions/445/leagueTable', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns1 = JSON.parse(body);

                     return next(null, uns1);
                  };
                  console.log(error);

                  next(error);
               });
                     },
                     function (next) {
            request('http://api.football-data.org/v1/competitions/455/leagueTable', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns2 = JSON.parse(body);

                     return next(null, uns2);
                  };
                  console.log(error);

                  next(error);
               });
                     },
                     function (next) {
            request('http://api.football-data.org/v1/competitions/456/leagueTable', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns3 = JSON.parse(body);

                     return next(null, uns3);
                  };
                  console.log(error);

                  next(error);
               });
                     },
                     function (next) {
            request('http://api.football-data.org/v1/competitions/452/leagueTable', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns4 = JSON.parse(body);

                     return next(null, uns4);
                  };
                  console.log(error);

                  next(error);
               });
                     },
                     function (next) {
            request('http://api.football-data.org/v1/competitions/450/leagueTable', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns5 = JSON.parse(body);

                     return next(null, uns5);
                  };
                  console.log(error);

                  next(error);
               });
                     },
                     function (next) {
            request('http://api.football-data.org/v1/competitions/457/leagueTable', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns6 = JSON.parse(body);

                     return next(null, uns6);
                  };
                  console.log(error);

                  next(error);
               });
                     },
                     function (next) {
            request('http://api.football-data.org/v1/competitions/449/leagueTable', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns7 = JSON.parse(body);

                     return next(null, uns7);
                  };
                  console.log(error);

                  next(error);
               });
                     },

                  ],
      function (err, results) {
         // console.log(JSON.stringify(results, null, 2));
         res.render("main/leagues", {
            results,
            moment
         });
      });

});

app.get('/teams/:id', (req, res) => {
   var id = req.params.id
   async.parallel([
      function (next) {
            request('http://api.football-data.org/v1/teams/' + id, {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns1 = JSON.parse(body);
                     return next(null, uns1);
                  };
                  console.log(error);

                  next(error);
               });
                     },
            function (next) {
            request('http://api.football-data.org/v1/teams/' + id + '/fixtures?timeFrame=p99', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns2 = JSON.parse(body);

                     return next(null, uns2);
                  };
                  console.log(error);

                  next(error);
               });
                     },
      function (next) {
            request('http://api.football-data.org/v1/teams/' + id + '/fixtures?timeFrame=n99', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns3 = JSON.parse(body);

                     return next(null, uns3);
                  };
                  console.log(error);

                  next(error);
               });
                     },
      function (next) {
            request('http://api.football-data.org/v1/teams/' + id + '/players', {
                  'headers': {
                     'X-Auth-Token': bearerToken
                  }
               },
               function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     var uns4 = JSON.parse(body);
                     return next(null, uns4);
                  };
                  console.log(error);
                  next(error);
               });
                     },
                              ],
      function (err, results) {

         const fixtures = _.take(_.filter(results[2].fixtures, function (match) {
            return match.status === 'SCHEDULED';
         }), 8)

         const played = _.take(_.filter(results[1].fixtures, function (match) {
            return match.status === 'FINISHED';
         }), 8)

         console.log(JSON.stringify(results[3], null, 2));
         res.render("main/teams", {
            results,
            fixtures,
            played,
            moment
         });
      });
});

//app.get('/teams/:id', (req, res) => {
//
//                     var id = req.params.id
//                     request('http://api.football-data.org/v1/teams/' + id, {
//                        'headers': {
//                           'X-Auth-Token': bearerToken
//                        }
//                     }, (error, response, body) => {
//                        if (!error && response.statusCode === 200) {
//                           body = JSON.parse(body);
//
//
//                           res.render('main/teams', {
//                              body
//                           });
//                        }
//                     });
//                  });

app.listen(port, () => {
   console.log(`Server started on ${port}`);
});
