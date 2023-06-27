const express = require('express');
const router = express.Router();
const Eintrag = require('./eintrag');

router.post('/', (req, res) => {
  const eintrag = req.body;

  const neuerEintrag = new Eintrag(eintrag);
  neuerEintrag.save((err) => {
    if (err) {
      console.error('Fehler beim Speichern des Eintrags:', err);
      res.sendStatus(500); // Interner Serverfehler
    } else {
      console.log('Eintrag erfolgreich gespeichert');
      res.sendStatus(200); // Erfolgreich gespeichert
    }
  });
});

module.exports = router;