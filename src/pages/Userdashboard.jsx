// In your Dashboard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Userdashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('gymUser');
    if (!user) {
      // If no data in local storage, kick them back to login
      navigate('/users');
    }
  }, [navigate]);

  return <div>Welcome to your Fitness Dashboard!</div>;
};
export default Userdashboard;