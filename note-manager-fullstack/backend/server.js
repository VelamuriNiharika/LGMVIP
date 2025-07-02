const express = require('express');
const path = require('path');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/api/notes', notesRouter);

// Front‑end
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
