export async function fetchHabits() {
  const res = await fetch('/api/habits');
  if (!res.ok) throw new Error('Failed to fetch habits');
  return res.json();
}

export async function createHabit(name) {
  const res = await fetch('/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create habit');
  return res.json();
}

export async function updateHabit(id, action, data = {}) {
  const res = await fetch('/api/habits', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, action, ...data }),
  });
  if (!res.ok) throw new Error('Failed to update habit');
  return res.json();
}

export async function deleteHabit(id) {
  const res = await fetch(`/api/habits?id=${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete habit');
}