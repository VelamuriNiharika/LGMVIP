const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '..', 'data', 'notes.json');

function load() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function save(notes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

// GET /api/notes
router.get('/', (req, res) => {
  res.json(load());
});

// POST /api/notes
router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  const notes = load();
  const note = { id: Date.now(), text, date: new Date().toISOString() };
  notes.push(note);
  save(notes);
  res.status(201).json(note);
});

module.exports = router;
