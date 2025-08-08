import React, { useState, SVGProps } from 'react';
import * as FaIcons from 'react-icons/fa';

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string; color?: string };

const FaLock = FaIcons.FaLock as React.FC<IconProps>;
const FaSignInAlt = FaIcons.FaSignInAlt as React.FC<IconProps>;

interface LoginScreenProps {
  onLogin: (username: string, password: string) => Promise<void>;
  loading?: boolean;
  errorMessage?: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  loading = false,
  errorMessage = null,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localMessage, setLocalMessage] = useState('');

  // Mensagem para exibir (validação local ou erro do backend)
  const displayMessage = localMessage || errorMessage || '';

  // Handle submit login
  const submit = async () => {
    if (!username.trim() || !password.trim()) {
      setLocalMessage('Por favor, preencha usuário e senha.');
      return;
    }
    setLocalMessage('');
    try {
      await onLogin(username.trim(), password.trim());
      // Não setar mensagem sucesso aqui, pois o fluxo geralmente navega para outra tela
    } catch {
      // Erro tratado no componente pai, só aqui pra evitar crash
    }
  };

  // Permitir envio com Enter no campo senha
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      submit();
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
        role="form"
        aria-labelledby="login-title"
        style={{
          background: 'white',
          padding: 48,
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
          aria-hidden="true"
        >
          <FaLock size={72} />
        </div>

        <h2
          id="login-title"
          style={{
            color: '#3730a3',
            marginBottom: 24,
            fontWeight: '700',
            fontSize: '1.8rem',
            letterSpacing: 1,
          }}
        >
          Bem-vindo ao RIS
        </h2>

        {/* Label + Input Usuário */}
        <label
          htmlFor="username"
          style={{ 
            display: 'block', 
            textAlign: 'left', 
            marginBottom: 6, 
            fontWeight: 600, 
            color: '#4f46e5' 
          }}
        >
          Usuário
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Digite seu usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px',
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
          autoComplete="username"
          disabled={loading}
        />

        {/* Label + Input Senha */}
        <label
          htmlFor="password"
          style={{ 
            display: 'block', 
            textAlign: 'left', 
            marginBottom: 6, 
            fontWeight: 600, 
            color: '#4f46e5' 
          }}
        >
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px',
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
          autoComplete="current-password"
          onKeyDown={onKeyDown}
          disabled={loading}
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
            if (!loading)
              e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #4f46e5)';
          }}
          onMouseLeave={(e) => {
            if (!loading)
              e.currentTarget.style.background = 'linear-gradient(to right, #4f46e5, #3b82f6)';
          }}
          aria-disabled={loading}
        >
          {loading ? (
            <span>Entrando...</span>
          ) : (
            <>
              <FaSignInAlt size={22} aria-hidden="true" /> Entrar
            </>
          )}
        </button>

        {displayMessage && (
          <p
            role="alert"
            style={{
              marginTop: 26,
              color: displayMessage.includes('sucesso') ? '#22c55e' : '#ef4444',
              fontWeight: '700',
              fontSize: 16,
              minHeight: 24,
              userSelect: 'none',
            }}
            aria-live="polite"
          >
            {displayMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
