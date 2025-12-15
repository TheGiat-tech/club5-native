import { AppProvider } from './context/AppContext';
import { MainApp } from './components/MainApp';

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
