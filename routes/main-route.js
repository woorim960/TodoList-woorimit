const express = require('express'),
  router = express.Router(),
  fs = require('fs');

router.get('/', (req, res) => {
  res.render('main');
});

router.get('/read', (req, res) => {
  fs.exists('./list.json', (exists) => {
    if (exists) {
      fs.readFile('./list.json', {
        'encoding': 'utf-8'
      }, (err, data) => {
        res.json(data);
      });

    } else {
      const list = {
        list : []
      }

      fs.writeFile('./list.json', JSON.stringify(list), (err) => {
        res.json(list);
      }
      );
    }
  });
});

router.post('/create', (req, res) => {
  fs.readFile('./list.json', {
    'encoding' : 'utf-8'
  }, (err, data) => {
    data = JSON.parse(data)
    data.list.push( { 'title' : req.body.title });

    fs.writeFile('./list.json', JSON.stringify(data), (err) => {
      res.json(true);
    });
  });
});

router.post('/complet', (req, res) => {
  fs.readFile('./list.json', {
    'encoding' : 'utf-8'
  }, (err, data) => {
    data = JSON.parse(data)
    data.list[req.body.index] = { 
      title : data.list[req.body.index].title,
      complet : true
    };

    fs.writeFile('./list.json', JSON.stringify(data), (err) => {
      res.json(true);
    });
  });
});

router.post('/delete', (req, res) => {
  fs.readFile('./list.json', {
    'encoding' : 'utf-8'
  }, (err, data) => {
    data = JSON.parse(data)
    data.list[req.body.index] = null;
    data.list = data.list.filter(val => val !== null);

    fs.writeFile('./list.json', JSON.stringify(data), (err) => {
      res.json(true);
    });
  });
});

module.exports = router;