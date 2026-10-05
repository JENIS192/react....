import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Btn } from '../components';
import { useStore } from '../store';
import { c, money } from '../theme';

const FIELDS = [
  ['name', 'Full name', 'default', (v) => (v.trim().length < 2 ? 'Enter your full name.' : '')],
  ['email', 'Email', 'email-address', (v) => (/^\S+@\S+\.\S+$/.test(v) ? '' : 'Enter a valid email address.')],
  ['phone', 'Mobile number', 'phone-pad', (v) => (/^[6-9]\d{9}$/.test(v) ? '' : 'Enter a 10-digit mobile number.')],
  ['address', 'Address', 'default', (v) => (v.trim().length < 8 ? 'Enter your full address.' : '')],
  ['city', 'City', 'default', (v) => (v.trim() ? '' : 'Enter your city.')],
  ['pin', 'PIN code', 'number-pad', (v) => (/^\d{6}$/.test(v) ? '' : 'Enter a 6-digit PIN code.')],
];
const PAY = ['UPI', 'Card', 'Cash on delivery'];

export default function Checkout({ navigation }) {
  const st = useStore();
  const [f, setF] = useState({ name: '', email: '', phone: '', address: '', city: '', pin: '' });
  const [errs, setErrs] = useState({});
  const [pay, setPay] = useState('UPI');
  const [order, setOrder] = useState(null);

  if (order) return (
    <View style={{ flex: 1, backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: '800', color: c.ink }}>Order placed</Text>
      <Text style={{ color: c.mute, textAlign: 'center' }}>Order {order.id} for {money(order.total)} is confirmed. A receipt is on its way to {f.email}.</Text>
      <Btn title="Continue shopping" onPress={() => navigation.popToTop()} />
    </View>
  );
  if (!st.lines.length) return <Text style={{ padding: 24, color: c.mute }}>Your cart is empty. Add something before checking out.</Text>;

  const place = () => {
    const e = {};
    FIELDS.forEach(([k, , , check]) => { const m = check(f[k]); if (m) e[k] = m; });
    setErrs(e);
    if (Object.keys(e).length) return;
    // Frontend-only: swap this for a POST to your API later.
    setOrder({ id: 'GH' + Date.now().toString().slice(-7), total: st.total });
    st.clear();
  };

  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: 16, gap: 12, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: '800', color: c.ink }}>Delivery details</Text>
      {FIELDS.map(([k, label, kb]) => (
        <View key={k} style={{ gap: 4 }}>
          <Text style={{ color: c.mute, fontSize: 13 }}>{label}</Text>
          <TextInput value={f[k]} keyboardType={kb} autoCapitalize={k === 'email' ? 'none' : 'words'} onChangeText={(t) => { setF({ ...f, [k]: t }); if (errs[k]) setErrs({ ...errs, [k]: '' }); }}
            style={{ backgroundColor: c.card, borderWidth: 1, borderColor: errs[k] ? c.err : c.line, borderRadius: 10, padding: 12, fontSize: 16, color: c.ink }} />
          {!!errs[k] && <Text style={{ color: c.err, fontSize: 13 }}>{errs[k]}</Text>}
        </View>
      ))}
      <Text style={{ fontSize: 18, fontWeight: '800', color: c.ink, marginTop: 8 }}>Payment</Text>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {PAY.map((p) => (
          <Pressable key={p} onPress={() => setPay(p)} style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1.5, borderColor: pay === p ? c.brand : c.line, backgroundColor: pay === p ? '#E6F4F2' : c.card }}>
            <Text style={{ fontWeight: '600', color: c.ink }}>{p}</Text>
          </Pressable>
        ))}
      </View>
      <View style={{ backgroundColor: c.card, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: c.line, marginTop: 8 }}>
        <Text style={{ color: c.mute }}>{st.count} item{st.count > 1 ? 's' : ''} · shipping {st.shipping ? money(st.shipping) : 'free'}</Text>
        <Text style={{ fontSize: 20, fontWeight: '800', color: c.ink }}>Total {money(st.total)}</Text>
      </View>
      <Btn title={`Place order · ${money(st.total)}`} onPress={place} />
    </ScrollView>
  );
}
