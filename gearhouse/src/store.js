import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { byId } from './data';
import { FREE_SHIP, SHIPPING } from './theme';

const KEY = 'gearhouse:v1';
const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);
export const PROMOS = { GEAR10: 0.1 };

function reducer(s, a) {
  switch (a.type) {
    case 'load': return { ...s, ...a.data };
    case 'add': {
      const max = byId(a.id)?.stock ?? 0;
      const qty = Math.min(max, (s.cart[a.id] || 0) + (a.qty || 1));
      return qty ? { ...s, cart: { ...s.cart, [a.id]: qty } } : s;
    }
    case 'setQty': {
      const cart = { ...s.cart };
      const max = byId(a.id)?.stock ?? 0;
      if (a.qty <= 0) delete cart[a.id]; else cart[a.id] = Math.min(max, a.qty);
      return { ...s, cart };
    }
    case 'wish': return { ...s, wish: s.wish.includes(a.id) ? s.wish.filter((x) => x !== a.id) : [...s.wish, a.id] };
    case 'promo': return { ...s, promo: a.code };
    case 'clear': return { ...s, cart: {}, promo: '' };
    default: return s;
  }
}

export function StoreProvider({ children }) {
  const [s, dispatch] = useReducer(reducer, { cart: {}, wish: [], promo: '' });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => { if (v) dispatch({ type: 'load', data: JSON.parse(v) }); }).catch(() => {}).finally(() => setReady(true));
  }, []);
  useEffect(() => { if (ready) AsyncStorage.setItem(KEY, JSON.stringify(s)).catch(() => {}); }, [s, ready]);

  const value = useMemo(() => {
    const lines = Object.entries(s.cart).map(([id, qty]) => ({ product: byId(id), qty })).filter((l) => l.product);
    const subtotal = lines.reduce((t, l) => t + l.product.price * l.qty, 0);
    const rate = PROMOS[s.promo] || 0;
    const discount = subtotal * rate;
    const shipping = subtotal === 0 || subtotal - discount >= FREE_SHIP ? 0 : SHIPPING;
    return {
      ...s, lines, subtotal, discount, shipping, total: subtotal - discount + shipping,
      count: lines.reduce((t, l) => t + l.qty, 0),
      add: (id, qty = 1) => dispatch({ type: 'add', id, qty }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      toggleWish: (id) => dispatch({ type: 'wish', id }),
      applyPromo: (code) => { const k = code.trim().toUpperCase(); if (PROMOS[k]) { dispatch({ type: 'promo', code: k }); return true; } return false; },
      removePromo: () => dispatch({ type: 'promo', code: '' }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [s]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
