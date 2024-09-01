import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a tela de CountryListScreen ao iniciar o aplicativo
    router.replace('/screens/CountryListScreen');
  }, [router]);

  return <Slot />;
}
