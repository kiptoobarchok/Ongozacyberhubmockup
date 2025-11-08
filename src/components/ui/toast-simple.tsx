import { Toaster as Sonner } from 'sonner@2.0.3';

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        style: {
          background: '#1e293b',
          color: '#f1f5f9',
          border: '1px solid #334155',
        },
      }}
    />
  );
}
