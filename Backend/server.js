const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// MongoDB-Verbindung herstellen
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Verbindung zur MongoDB hergestellt');
  }).catch((error) => {
    console.log('Fehler bei der Verbindung zur MongoDB:', error);
  });

// Definition des Eintrag-Schemas
const eintragSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  submissionDate: {
    type: String,
    required: true
  }
});

// Erstellung des Eintrag-Modells
const Eintrag = mongoose.model('Eintrag', eintragSchema);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hallo, Server läuft!');
});

app.post('/speichern', (req, res) => {
  const eintrag = new Eintrag({
    name: req.body.name,
    description: req.body.description,
    submissionDate: req.body.submissionDate
  });

   eintrag.save().then((response) => {
    //  if (err) {
    //    console.log('Fehler beim Speichern des Eintrags:', err);
    //    res.sendStatus(500);
    //  } else {
    //    console.log('Eintrag erfolgreich gespeichert');
    //    res.sendStatus(200);
    //  }
      console.log('eintrag erfolgreich gespeichert', response);
      res.status(200);    
   }).catch((error) => {
      console.error(error);
   });
 });

app.get('/eintraege', (req, res) => {
  console.log("Getting /eintraege")
  // Eintrag.find({}, (err, eintraege) => {
  //   if (err) {
  //     console.log('Fehler beim Abrufen der Einträge:', err);
  //     res.sendStatus(500);
  //   } else {
  //     res.json(eintraege);
  //   }
  // });
  Eintrag.find({}).then((data) => {
    console.log(data);
    res.json(data);
  }).catch((error) => {
    console.error(error);
  });

});

app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});
