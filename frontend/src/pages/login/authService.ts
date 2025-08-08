const API_URL = 'http://localhost:3000';
export async function login(username: string, password: string): Promise<string> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Erro no login:', errorText);
    throw new Error('Usuário ou senha inválidos');
  }

  const data = await response.json();

  // ⬇️ Aqui está no lugar certo, após receber o token
  localStorage.setItem('token', data.access_token);

  return data.access_token;
}
/**
 * Busca os dados do usuário autenticado.
 * @param token Opcional: se fornecido, usa este token; caso contrário, lê do localStorage.
 */
export async function getMe(token?: string): Promise<any> {
  const accessToken = token ?? localStorage.getItem('token');
  console.log('Token usado em getMe:', accessToken); // 👈 Veja no console se bate com o token recebido

  if (!accessToken) throw new Error('Usuário não autenticado');

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Erro ao buscar dados do usuário:', errorText);
    throw new Error('Erro ao buscar dados do usuário');
  }

  return response.json();
}

