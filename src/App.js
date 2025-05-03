
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Camera from './components/Camera';
import Ingredients from './components/Ingredients';
import SignIn from './components/SignIn';
import BeautyBuddy from './components/BeautyBuddy';
import { AuthProvider } from './AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/beauty-buddy" element={<BeautyBuddy />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
