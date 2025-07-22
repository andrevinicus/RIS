import React, { useState, SVGProps } from 'react';
import * as FaIcons from 'react-icons/fa';

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

const FaLock = FaIcons.FaLock as React.FC<IconProps>;
const FaSignInAlt = FaIcons.FaSignInAlt as React.FC<IconProps>;

interface LoginScreenProps {
  onLogin: (username: string, password: string) => Promise<void>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username || !password) {
      setMessage('Por favor, preencha usuário e senha.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await onLogin(username.trim(), password.trim());
      setMessage('Login realizado com sucesso!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Erro no login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        background: 'linear-gradient(to bottom, #e0e7ff, #bfdbfe)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: 'white',
          padding: 55,
          borderRadius: 20,
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          transition: 'transform 0.3s ease',
        }}
        tabIndex={-1}
      >
        <div
          style={{
            marginBottom: 24,
            color: '#4f46e5',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FaLock size={72} />
        </div>

        <h2
          style={{
            color: '#3730a3',
            marginBottom: 20,
            fontWeight: '700',
            fontSize: '1.8rem',
            letterSpacing: 1,
          }}
        >
          Bem-vindo ao RIS
        </h2>

        <input
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 16px',
            borderRadius: 12,
            border: '1.8px solid #cbd5e1',
            marginBottom: 20,
            fontSize: 17,
            outlineColor: '#4f46e5',
            transition: 'border-color 0.3s ease',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
          onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
        />

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 16px',
            borderRadius: 12,
            border: '1.8px solid #cbd5e1',
            marginBottom: 30,
            fontSize: 17,
            outlineColor: '#4f46e5',
            transition: 'border-color 0.3s ease',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
          onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
        />

        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 12,
            background: loading
              ? 'linear-gradient(to right, #a5b4fc, #818cf8)'
              : 'linear-gradient(to right, #4f46e5, #3b82f6)',
            color: 'white',
            fontWeight: '700',
            fontSize: 18,
            cursor: loading ? 'not-allowed' : 'pointer',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            boxSizing: 'border-box',
            boxShadow: '0 6px 15px rgba(79, 70, 229, 0.4)',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #4f46e5)';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.background = 'linear-gradient(to right, #4f46e5, #3b82f6)';
          }}
        >
          {loading ? (
            <span>Entrando...</span>
          ) : (
            <>
              <FaSignInAlt size={22} /> Entrar
            </>
          )}
        </button>

        {message && (
          <p
            style={{
              marginTop: 26,
              color: message.includes('sucesso') ? '#22c55e' : '#ef4444',
              fontWeight: '700',
              fontSize: 16,
              minHeight: 24,
              userSelect: 'none',
            }}
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
