export async function fetchHabits(userId) {
  try {
    const res = await fetch(`/api/habits?userId=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch habits');
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createHabit(name, userId) {
  try {
    const res = await fetch('/api/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, userId }),
    });
    if (!res.ok) throw new Error('Failed to create habit');
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateHabit(id, action, data) {
  try {
    const res = await fetch('/api/habits', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action, data }),
    });
    if (!res.ok) throw new Error('Failed to update habit');
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteHabit(id) {
  try {
    const res = await fetch('/api/habits', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error('Failed to delete habit');
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}