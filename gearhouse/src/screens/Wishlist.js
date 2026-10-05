import React from 'react';
import { FlatList, Text, View, useWindowDimensions } from 'react-native';
import { byId } from '../data';
import { ProductCard, Btn } from '../components';
import { useStore } from '../store';
import { c } from '../theme';

export default function Wishlist({ navigation }) {
  const { wish } = useStore();
  const { width } = useWindowDimensions();
  const cols = width > 1100 ? 4 : width > 760 ? 3 : 2;
  const cardW = (Math.min(width, 1200) - 32 - 12 * (cols - 1)) / cols;
  const items = wish.map(byId).filter(Boolean);
  if (!items.length) return (
    <View style={{ flex: 1, backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: c.ink }}>Nothing saved yet</Text>
      <Text style={{ color: c.mute }}>Tap the heart on any product to keep it here.</Text>
      <Btn title="Browse products" onPress={() => navigation.navigate('Shop')} />
    </View>
  );
  return (
    <FlatList key={cols} numColumns={cols} data={items} keyExtractor={(p) => p.id} style={{ backgroundColor: c.bg }}
      contentContainerStyle={{ padding: 16, width: '100%', maxWidth: 1200, alignSelf: 'center' }}
      columnWrapperStyle={{ gap: 12 }} ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => <ProductCard p={item} width={cardW} onPress={() => navigation.navigate('Product', { id: item.id })} />} />
  );
}
