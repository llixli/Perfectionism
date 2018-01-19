var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {
	// Read
	app.get('/notes/read/:id', (req, res) => {
	    const id = req.params.id;
	    const details = { '_id': new ObjectID(id) };
	    db.collection('notes').findOne(details, (err, item) => {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send(item);
	      } 
	    });
	});

	// Create
	app.post('/notes/create', (req, res) => {
	    const note = { text: req.body.body, title: req.body.title };
	    db.collection('notes').insert(note, (err, result) => {
	      if (err) { 
	        res.send({ 'error': 'An error has occurred' }); 
	      } else {
	        res.send(result.ops[0]);
	      }
	    });
	  });
	

	// Delete
	app.delete('/notes/delete/:id', (req, res) => {
	    const id = req.params.id;
	    const details = { '_id': new ObjectID(id) };
	    db.collection('notes').remove(details, (err, item) => {
			if (err) {
			res.send({'error':'An error has occurred'});
			} else {
			res.send('Note ' + id + ' deleted!');
			} 
	    });
 	});
 	
	// Update
	app.put ('/notes/update/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
};