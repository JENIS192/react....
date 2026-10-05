import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StoreProvider, useStore } from './src/store';
import { c } from './src/theme';
import Shop from './src/screens/Shop';
import Wishlist from './src/screens/Wishlist';
import Cart from './src/screens/Cart';
import Product from './src/screens/Product';
import Checkout from './src/screens/Checkout';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  const { count, wish } = useStore();
  return (
    <Tab.Navigator screenOptions={{ headerTitleStyle: { color: c.ink, fontWeight: '800' }, tabBarActiveTintColor: c.brand, tabBarLabelStyle: { fontSize: 13, fontWeight: '600' }, tabBarIcon: () => null, tabBarIconStyle: { display: 'none' } }}>
      <Tab.Screen name="Shop" component={Shop} options={{ title: 'Gearhouse', tabBarLabel: 'Shop' }} />
      <Tab.Screen name="Wishlist" component={Wishlist} options={{ tabBarLabel: `Saved${wish.length ? ` (${wish.length})` : ''}` }} />
      <Tab.Screen name="Cart" component={Cart} options={{ tabBarLabel: `Cart${count ? ` (${count})` : ''}` }} />
    </Tab.Navigator>
  );
}

const linking = { prefixes: [], config: { screens: { Tabs: { screens: { Shop: '', Wishlist: 'saved', Cart: 'cart' } }, Product: 'product/:id', Checkout: 'checkout' } } };

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer linking={linking} fallback={<Text>Loading…</Text>}>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Product" component={Product} options={{ title: 'Product' }} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
