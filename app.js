require('es6-promise').polyfill();
require('isomorphic-fetch');

var express = require('express');

var app = express();

app.get('/home/:collaboratorid', function(req, res){
  Promise
    .all([
      fetch("http://collaboratorapi:8080/" + req.params.collaboratorid)
        .then(r => { return r.json(); }),
      fetch("http://locationapi:8080/collaborator/" + req.params.collaboratorid)
        .then(r => { return r.json(); }),
      fetch("http://teamapi:8080/collaborator/" + req.params.collaboratorid)
        .then(r => { return r.json(); })
    ])
    .then(values => {
      res.json({ collaborator: values[0], location: values[1], team: values[2] });
    })
    .catch(reason => {
      res.status(500).end();
    });
});

var server = app.listen(8080);
