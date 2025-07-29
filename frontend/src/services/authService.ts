const API_URL = 'http://localhost:3000'; // Ajuste se backend estiver em outra porta/host

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Usuário ou senha inválidos');
  }

  const data = await response.json();
  localStorage.setItem('token', data.access_token); // Guarda token
  return data.access_token;
}

export function logout() {
  localStorage.removeItem('token');
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

