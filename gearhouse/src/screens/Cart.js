import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Btn, Stepper } from '../components';
import { useStore } from '../store';
import { c, money, FREE_SHIP } from '../theme';

const Row = ({ k, v, bold, color }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text style={{ color: bold ? c.ink : c.mute, fontWeight: bold ? '800' : '400', fontSize: bold ? 18 : 15 }}>{k}</Text>
    <Text style={{ color: color || c.ink, fontWeight: bold ? '800' : '600', fontSize: bold ? 18 : 15 }}>{v}</Text>
  </View>
);

export default function Cart({ navigation }) {
  const st = useStore();
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  if (!st.lines.length) return (
    <View style={{ flex: 1, backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: c.ink }}>Your cart is empty</Text>
      <Btn title="Browse products" onPress={() => navigation.navigate('Shop')} />
    </View>
  );
  const away = FREE_SHIP - (st.subtotal - st.discount);
  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: 16, gap: 12, width: '100%', maxWidth: 720, alignSelf: 'center' }}>
      {st.lines.map(({ product: p, qty }) => (
        <View key={p.id} style={{ flexDirection: 'row', gap: 12, backgroundColor: c.card, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: c.line }}>
          <Pressable onPress={() => navigation.navigate('Product', { id: p.id })}>
            <Image source={{ uri: p.image }} style={{ width: 84, height: 84, borderRadius: 8, backgroundColor: c.line }} />
          </Pressable>
          <View style={{ flex: 1, gap: 6 }}>
            <Text style={{ fontWeight: '600', color: c.ink }}>{p.name}</Text>
            <Text style={{ color: c.mute }}>{money(p.price)} each</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <Stepper value={qty} max={p.stock} onChange={(n) => st.setQty(p.id, n)} />
              <Pressable onPress={() => st.setQty(p.id, 0)}><Text style={{ color: c.err, fontWeight: '600' }}>Remove</Text></Pressable>
            </View>
          </View>
          <Text style={{ fontWeight: '800', color: c.ink }}>{money(p.price * qty)}</Text>
        </View>
      ))}

      <View style={{ backgroundColor: c.card, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: c.line, gap: 8 }}>
        {st.promo ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: c.brand, fontWeight: '700' }}>{st.promo} applied</Text>
            <Pressable onPress={st.removePromo}><Text style={{ color: c.err, fontWeight: '600' }}>Remove</Text></Pressable>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput value={code} onChangeText={(t) => { setCode(t); setMsg(''); }} autoCapitalize="characters" placeholder="Promo code" placeholderTextColor={c.mute}
              style={{ flex: 1, borderWidth: 1, borderColor: c.line, borderRadius: 10, padding: 10, color: c.ink }} />
            <Btn kind="outline" title="Apply" onPress={() => setMsg(st.applyPromo(code) ? '' : 'That code is not valid.')} style={{ paddingVertical: 10 }} />
          </View>
        )}
        {!!msg && <Text style={{ color: c.err }}>{msg}</Text>}
      </View>

      <View style={{ backgroundColor: c.card, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: c.line, gap: 10 }}>
        <Row k="Subtotal" v={money(st.subtotal)} />
        {st.discount > 0 && <Row k="Discount" v={'−' + money(st.discount)} color={c.brand} />}
        <Row k="Shipping" v={st.shipping ? money(st.shipping) : 'Free'} />
        {away > 0 && <Text style={{ color: c.mute, fontSize: 13 }}>Add {money(away)} more for free shipping.</Text>}
        <View style={{ height: 1, backgroundColor: c.line }} />
        <Row k="Total" v={money(st.total)} bold />
      </View>
      <Btn title="Go to checkout" onPress={() => navigation.navigate('Checkout')} />
    </ScrollView>
  );
}
