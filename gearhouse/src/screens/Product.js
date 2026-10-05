import React, { useState } from 'react';
import { Image, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { byId } from '../data';
import { Btn, Price, Stepper } from '../components';
import { useStore } from '../store';
import { c } from '../theme';

export default function Product({ route, navigation }) {
  const p = byId(route.params.id);
  const { add, toggleWish, wish } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const wide = useWindowDimensions().width > 800;
  if (!p) return <Text style={{ padding: 24 }}>This product no longer exists.</Text>;
  const out = p.stock === 0;
  const liked = wish.includes(p.id);

  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: 16, width: '100%', maxWidth: 1000, alignSelf: 'center' }}>
      <View style={{ flexDirection: wide ? 'row' : 'column', gap: 24 }}>
        <Image source={{ uri: p.image }} style={{ flex: wide ? 1 : undefined, width: wide ? undefined : '100%', aspectRatio: 1, borderRadius: 14, backgroundColor: c.line }} />
        <View style={{ flex: 1, gap: 12 }}>
          <Text style={{ color: c.mute }}>{p.cat}</Text>
          <Text style={{ fontSize: 26, fontWeight: '800', color: c.ink }}>{p.name}</Text>
          <Text style={{ color: c.mute }}>★ {p.rating.toFixed(1)}</Text>
          <Price p={p} big />
          <Text style={{ fontSize: 16, lineHeight: 24, color: c.ink }}>{p.desc}</Text>
          <Text style={{ color: out ? c.err : p.stock <= 8 ? c.sale : c.brand, fontWeight: '700' }}>
            {out ? 'Sold out' : p.stock <= 8 ? `Only ${p.stock} left` : 'In stock'}
          </Text>
          {!out && <Stepper value={qty} max={p.stock} onChange={(n) => setQty(Math.max(1, n))} />}
          <Btn title={out ? 'Sold out' : added ? 'Added. View cart' : 'Add to cart'} disabled={out}
            onPress={() => { if (added) return navigation.navigate('Tabs', { screen: 'Cart' }); add(p.id, qty); setAdded(true); }} />
          <Btn kind="outline" title={liked ? 'Remove from saved' : 'Save for later'} onPress={() => toggleWish(p.id)} />
        </View>
      </View>
    </ScrollView>
  );
}
