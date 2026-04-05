import { BrowserRouter } from 'react-router-dom';
import AppProviders from './app/AppProviders';
import AppRoutes from './app/AppRoutes';
import ChatNuna from './components/features/ChatNuna';
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Layout>
          <AppRoutes />
          <ChatNuna />
        </Layout>
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
