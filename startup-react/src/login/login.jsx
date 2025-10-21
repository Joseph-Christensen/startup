import React from 'react';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';

export function Login({ username, authState, onAuthChange }) {
  return (
    <main className="container-fluid text-center">
      {authState === AuthState.Authenticated && (
        <Authenticated username={username} />
      )}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated onLogin={(username) => onAuthChange(username, AuthState.Authenticated)} />
      )}
    </main>
  );
}