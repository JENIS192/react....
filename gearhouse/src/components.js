import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { c, money } from './theme';
import { useStore } from './store';

export function Btn({ title, onPress, kind = 'solid', disabled, style }) {
  const solid = kind === 'solid';
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress}
      style={({ pressed }) => [s.btn, solid ? { backgroundColor: pressed ? c.brandDark : c.brand } : { borderWidth: 1.5, borderColor: c.brand }, disabled && { opacity: 0.45 }, style]}>
      <Text style={[s.btnText, !solid && { color: c.brand }]}>{title}</Text>
    </Pressable>
  );
}

export function Stepper({ value, onChange, max = 99 }) {
  return (
    <View style={s.stepper}>
      <Pressable accessibilityLabel="Decrease" onPress={() => onChange(value - 1)} style={s.stepBtn}><Text style={s.stepTxt}>−</Text></Pressable>
      <Text style={s.stepVal}>{value}</Text>
      <Pressable accessibilityLabel="Increase" disabled={value >= max} onPress={() => onChange(value + 1)} style={[s.stepBtn, value >= max && { opacity: 0.35 }]}><Text style={s.stepTxt}>+</Text></Pressable>
    </View>
  );
}

export function Price({ p, big }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
      <Text style={{ fontSize: big ? 24 : 16, fontWeight: '800', color: c.ink }}>{money(p.price)}</Text>
      {p.was ? <Text style={{ fontSize: big ? 16 : 13, color: c.mute, textDecorationLine: 'line-through' }}>{money(p.was)}</Text> : null}
      {p.was ? <Text style={{ fontSize: big ? 14 : 12, color: c.sale, fontWeight: '700' }}>{Math.round((1 - p.price / p.was) * 100)}% off</Text> : null}
    </View>
  );
}

export function ProductCard({ p, onPress, width }) {
  const { toggleWish, wish } = useStore();
  const liked = wish.includes(p.id);
  return (
    <Pressable onPress={onPress} accessibilityRole="link" style={[s.card, { width }]}>
      <Image source={{ uri: p.image }} style={{ width: '100%', aspectRatio: 1, backgroundColor: c.line }} />
      <Pressable accessibilityLabel={liked ? 'Remove from saved' : 'Save'} onPress={() => toggleWish(p.id)} style={s.heart}>
        <Text style={{ fontSize: 18, color: liked ? c.sale : c.mute }}>{liked ? '♥' : '♡'}</Text>
      </Pressable>
      <View style={{ padding: 12, gap: 4 }}>
        <Text numberOfLines={2} style={{ fontSize: 15, fontWeight: '600', color: c.ink, minHeight: 40 }}>{p.name}</Text>
        <Text style={{ fontSize: 13, color: c.mute }}>★ {p.rating.toFixed(1)}{p.stock === 0 ? '  ·  Sold out' : p.stock <= 8 ? `  ·  Only ${p.stock} left` : ''}</Text>
        <Price p={p} />
      </View>
    </Pressable>
  );
}

export const s = StyleSheet.create({
  btn: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  stepper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: c.line, borderRadius: 10, alignSelf: 'flex-start', backgroundColor: c.card },
  stepBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  stepTxt: { fontSize: 20, color: c.ink },
  stepVal: { minWidth: 28, textAlign: 'center', fontWeight: '700', color: c.ink },
  card: { backgroundColor: c.card, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: c.line },
  heart: { position: 'absolute', top: 8, right: 8, width: 36, height: 36, borderRadius: 18, backgroundColor: '#fffe', alignItems: 'center', justifyContent: 'center' },
});
