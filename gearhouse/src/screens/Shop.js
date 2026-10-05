import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { CATEGORIES, PRODUCTS } from '../data';
import { ProductCard } from '../components';
import { c } from '../theme';

const SORTS = [['featured', 'Featured'], ['low', 'Price: low to high'], ['high', 'Price: high to low'], ['rating', 'Top rated']];

const Chip = ({ label, on, onPress }) => (
  <Pressable onPress={onPress} style={{ paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: on ? c.ink : c.card, borderWidth: 1, borderColor: on ? c.ink : c.line, marginRight: 8 }}>
    <Text style={{ color: on ? '#fff' : c.ink, fontWeight: '600' }}>{label}</Text>
  </Pressable>
);

export default function Shop({ navigation }) {
  const { width } = useWindowDimensions();
  const cols = width > 1100 ? 4 : width > 760 ? 3 : 2;
  const pad = 16, gap = 12, max = Math.min(width, 1200);
  const cardW = (max - pad * 2 - gap * (cols - 1)) / cols;
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('featured');

  const data = useMemo(() => {
    let r = PRODUCTS.filter((p) => (cat === 'All' || p.cat === cat) && p.name.toLowerCase().includes(q.trim().toLowerCase()));
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price);
    if (sort === 'rating') r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [q, cat, sort]);

  const header = (
    <View style={{ gap: 14, paddingBottom: 14 }}>
      <View style={{ backgroundColor: c.ink, borderRadius: 16, padding: 24, gap: 8 }}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: '800' }}>Desk gear that earns its space.</Text>
        <Text style={{ color: '#B9C6CF', fontSize: 15 }}>Free shipping over ₹2,999. Use GEAR10 for 10% off your first order.</Text>
      </View>
      <TextInput value={q} onChangeText={setQ} placeholder="Search keyboards, chargers, bags" placeholderTextColor={c.mute}
        style={{ backgroundColor: c.card, borderWidth: 1, borderColor: c.line, borderRadius: 10, padding: 12, fontSize: 16, color: c.ink }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((x) => <Chip key={x} label={x} on={cat === x} onPress={() => setCat(x)} />)}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {SORTS.map(([k, l]) => <Chip key={k} label={l} on={sort === k} onPress={() => setSort(k)} />)}
      </ScrollView>
      <Text style={{ color: c.mute }}>{data.length} product{data.length === 1 ? '' : 's'}</Text>
    </View>
  );

  return (
    <FlatList key={cols} numColumns={cols} data={data} keyExtractor={(p) => p.id}
      style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: pad, width: '100%', maxWidth: 1200, alignSelf: 'center' }}
      columnWrapperStyle={{ gap }} ItemSeparatorComponent={() => <View style={{ height: gap }} />}
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={{ color: c.mute, textAlign: 'center', padding: 40 }}>No products match. Clear the search or pick another category.</Text>}
      renderItem={({ item }) => <ProductCard p={item} width={cardW} onPress={() => navigation.navigate('Product', { id: item.id })} />} />
  );
}
