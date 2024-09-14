import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Image, Form, Input, Button,
} from 'antd';
import useStore from '../store/index'; // Import the zustand store
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function UserProfile() {
  const { endorse, refer } = useStore();
  const {
    user, getProfile, isLoading, error, setError,
  } = useStore();

  const navigate = useNavigate();
  const goToUserProfile = (userID) => {
    console.log('were here');
    navigate('/otherProfile', { state: { userID } });
  };

  // Endorsement form handler (Form 1)
  const handleEndorse = async (values) => {
    const { email, msg } = values;
    try {
      const result = await endorse(email, msg); // Send to first backend endpoint
      console.log(result);
    } catch {
      setError('Endorsement failed.');
    }
  };

  // Referral form handler (Form 2)
  const handleReferral = async (values) => {
    const { email1, email2 } = values;
    try {
      const result = await refer(email1, email2); // Send to second backend endpoint
      console.log(result);
    } catch {
      setError('Referral failed.');
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <Image src="https://via.placeholder.com/150" />
      <h2>Name: {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Major: {user.major}</p>
      <p>Minor: {user.minor}</p>
      <p>Skills: {user.skills.join(', ')}</p>
      <p>Interests: {user.interests.join(', ')}</p>
      <p>Tindar Index: {user.tindarIndex}</p>
      <p>Endorsements: {user.endorsements}</p>
      <p>Endorsements Remaining: {user.endorsementsRemaining}</p>
      <p>Referrals Remaining: {user.referralsRemaining}</p>
      <h1>Some Page</h1>
      <button type="submit" onClick={() => goToUserProfile(49486)}>Go to User 49468s Profile</button>
      {/* Form 1: Endorsement */}
      <h2>Endorse a User</h2>
      <Form layout="vertical" onFinish={handleEndorse}>
        <Form.Item
          label="Enter Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter a valid email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Enter msg"
          name="msg"
          rules={[{ required: true, message: 'Please enter a message' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Endorse
          </Button>
        </Form.Item>
      </Form>

      {/* Form 2: Referral */}
      <h2>Send a Referral</h2>
      <Form layout="vertical" onFinish={handleReferral}>
        <Form.Item
          label="Email1"
          name="email1"
          rules={[{ required: true, message: 'Please enter a valid dartmouth email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email2"
          name="email2"
          rules={[{ required: true, message: 'Please enter a valid dartmouth email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Send Referral
          </Button>
        </Form.Item>
      </Form>

      <NavBar />
    </div>
  );
}

export default UserProfile;
