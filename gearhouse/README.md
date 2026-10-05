# Gearhouse – React Native (Expo) storefront, frontend only
One codebase: runs in the browser (react-native-web), Android and iOS.

    bash setup.sh      # installs Expo + dependencies (once)
    npm run web        # opens http://localhost:8081

Features: product grid with search / category / sort, product detail, wishlist,
cart with quantity stepper, promo code (GEAR10), free shipping over ₹2,999,
validated checkout (UPI / card / COD), order confirmation, state saved in AsyncStorage,
real URLs on web (/product/3, /cart, /checkout).

Mock data lives in src/data.js. To connect a backend later, replace PRODUCTS
with a fetch and the placeOrder step in src/screens/Checkout.js with a POST.
