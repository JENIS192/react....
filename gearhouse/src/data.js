const img = (s) => `https://picsum.photos/seed/${s}/700/700`;
const P = (id, name, cat, price, was, rating, stock, desc) => ({ id: String(id), name, cat, price, was, rating, stock, desc, image: img('gear' + id) });
export const CATEGORIES = ['All', 'Keyboards', 'Audio', 'Desk', 'Cables & Power', 'Bags'];
export const PRODUCTS = [
  P(1, 'Tenkeyless Mechanical Keyboard', 'Keyboards', 5499, 6999, 4.6, 14, 'Hot-swappable switches, PBT keycaps, USB-C and Bluetooth. Gasket-mounted for a softer typing feel.'),
  P(2, '65% Wireless Keyboard', 'Keyboards', 6999, null, 4.4, 8, 'Compact layout with a 3-month battery, per-key backlight and three-device pairing.'),
  P(3, 'Over-ear Studio Headphones', 'Audio', 7499, 8999, 4.7, 20, '40 mm drivers, detachable cable and 35-hour wireless playback. Folds flat for the bag.'),
  P(4, 'USB-C Desk Speakers', 'Audio', 3299, null, 4.2, 25, 'Powered by one USB-C cable. Clear mids, a front volume knob and a headphone jack.'),
  P(5, 'Motorised Standing Desk Frame', 'Desk', 18999, 21999, 4.5, 5, 'Dual motor, 4 memory presets, anti-collision. Supports 100 kg. Top sold separately.'),
  P(6, 'Aluminium Laptop Stand', 'Desk', 1799, 2199, 4.3, 40, 'Six height settings, fits 11–17 inch laptops, folds to 12 mm.'),
  P(7, 'Monitor Light Bar', 'Desk', 2499, null, 4.6, 18, 'Asymmetric optics keep glare off the screen. Adjustable warmth and brightness.'),
  P(8, '100W GaN Charger (4-port)', 'Cables & Power', 3999, 4799, 4.8, 30, 'Charges a laptop and three devices together. Foldable plug, travel friendly.'),
  P(9, 'Braided USB-C Cable 2 m', 'Cables & Power', 699, null, 4.1, 120, '240W rated, 480 Mbps data, reinforced strain relief.'),
  P(10, 'Thunderbolt 4 Dock', 'Cables & Power', 14999, 16999, 4.5, 0, 'Dual 4K display, 2.5G Ethernet, SD reader and 96W host charging.'),
  P(11, 'Water-resistant Backpack 22 L', 'Bags', 3499, 4299, 4.6, 16, 'Padded 16-inch laptop sleeve, hidden passport pocket and a luggage strap.'),
  P(12, 'Cable & Gadget Organiser', 'Bags', 899, null, 4.0, 60, 'Elastic loops and mesh pockets keep chargers, drives and adapters sorted.'),
];
export const byId = (id) => PRODUCTS.find((p) => p.id === String(id));
