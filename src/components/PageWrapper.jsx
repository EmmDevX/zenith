export default function PageWrapper({ children }) {
  return (
    <main className="min-h-screen bg-blue-100/10 text-white">
      {children}
    </main>
  );
}