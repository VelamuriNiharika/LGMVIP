async function fetchNotes() {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  const list = document.getElementById('notesList');
  list.innerHTML = '';
  notes.forEach(n => {
    const li = document.createElement('li');
    li.textContent = n.text;
    list.appendChild(li);
  });
}

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;
  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  input.value = '';
  fetchNotes();
});

fetchNotes();
