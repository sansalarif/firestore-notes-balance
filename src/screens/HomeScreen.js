import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

import db from '../utils/firebase';

const HomeScreen = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await db.collection('accounts').doc('user_id').get();
      setBalance(response.data().balance);
    };
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Your Current Balance: {balance}</Text>
    </View>
  );
};

export default HomeScreen;
