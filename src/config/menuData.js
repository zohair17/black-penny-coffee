/**
 * Structured menu data, keyed by booklet spread image number (2..13).
 * Each spread the 3D book shows has a matching list of orderable items so a
 * dish can be added to the cart without needing pixel hotspots on the artwork.
 *
 * Prices are in Turkish Lira (number). Transcribed from the booklet pages;
 * a few dense drink pages list the most popular items — extend as needed.
 */

const spread = (title, items) => ({
  title,
  items: items.map(([name, price], i) => ({
    id: `${title}-${i}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    price,
  })),
});

export const menuSpreads = {
  2: spread("Salads & Bowls", [
    ["Çıtır Tavuklu Salata", 560],
    ["Izgara Tavuklu Sezar Salata", 580],
    ["Füme Somon Salata", 660],
    ["Hellimli Salata", 560],
    ["Akdeniz Salatası", 460],
    ["Ton Balıklı Salata", 620],
    ["Detox Çorba", 300],
    ["Black Penny Salad", 600],
    ["Chicken Meatballs Bowl", 600],
    ["Felafel Bowl", 600],
    ["Somon Izgara", 950],
  ]),
  3: spread("Specials & Mini Burgers", [
    ["Crispy Chicken Plate", 630],
    ["Grilled Chicken Plate", 630],
    ["BP BBQ Chicken Plate", 650],
    ["Chicken Explosion", 650],
    ["Chicken Diana", 650],
    ["Şef'in Tavası", 650],
    ["Yoğurtlu Köfte", 650],
    ["Yoğurtlu Tavuk", 650],
    ["Antrikot Steak", 1050],
    ["6 Mini's", 650],
    ["12 Mini's", 1200],
    ["24 Mini's", 2200],
    ["6 Crispy Chicken Mini's", 600],
    ["12 Crispy Chicken Mini's", 1100],
  ]),
  4: spread("Gourmet Burgers & Pastas", [
    ["Classic Burger", 650],
    ["Cheeseburger", 690],
    ["Cheesy Chips Burger", 690],
    ["Cheese-Egg Burger", 690],
    ["BP Mushroom Burger", 690],
    ["BP Kıbrıs Burger", 690],
    ["Jalapeno Burger", 690],
    ["The BP Full House", 690],
    ["The BP Triple Tower", 1800],
    ["Vegetarian Burger", 630],
    ["Crispy Chicken Tower Burger", 630],
    ["Penne Arabiata", 520],
    ["Spaghetti alla Bolognese", 550],
    ["Sea Food Fettuccine", 620],
    ["Fettuccine Alfredo", 550],
  ]),
  5: spread("Sandwiches, Wraps & Pizzas", [
    ["Chicken Schnitzel Sandwich", 430],
    ["Roasted Vegetable 2 Cheese", 430],
    ["Grilled Chicken Sandwich", 430],
    ["Smoked Salmon Sandwich", 500],
    ["Tuna Fish Sandwich", 480],
    ["Chicken Wrap", 520],
    ["Steak Wrap", 650],
    ["Vegetarian Wrap", 500],
    ["Tantuni", 650],
    ["Margarita Pizza", 580],
    ["Vegetarian Pizza", 650],
    ["Four Cheese Pizza", 650],
    ["Chicken Supreme Pizza", 650],
    ["BP BBQ Steak Pizza", 680],
    ["Black Penny Pizza", 650],
    ["Kaşarlı Hellimli Pide", 550],
    ["Kıymalı Pide", 550],
  ]),
  6: spread("Kids Menu & Beer Plates", [
    ["Kids Meal 1 — Mini Burgers & Chips", 460],
    ["Kids Meal 2 — Fish Fingers & Chips", 460],
    ["Kids Meal 3 — Chicken Strips & Chips", 460],
    ["Black Penny Combo Platter", 900],
    ["Chicken Heaven Combo Platter", 1250],
    ["Black Penny Mega Combo Platter", 1500],
  ]),
  7: spread("Desserts & Coffee", [
    ["Chocolate Souffle", 320],
    ["Banana Split", 320],
    ["Waffle", 360],
    ["Krep", 360],
    ["Meyve Tabağı (1 Kişilik)", 400],
    ["Dondurma", 80],
    ["Americano", 230],
    ["Latte", 240],
    ["Flavoured Latte", 250],
    ["Cappuccino", 250],
    ["Turkish Coffee", 220],
    ["Filter Coffee", 235],
    ["Mocha", 260],
    ["Hot Chocolate", 250],
    ["Matcha Latte", 260],
    ["Irish Coffee", 360],
  ]),
  8: spread("Soft Drinks & Beer", [
    ["Milkshake", 300],
    ["Italian Soda", 250],
    ["Frozen Chillers", 300],
    ["Fresh Juice", 250],
    ["Coca-Cola", 120],
    ["Home Made Lemonade", 120],
    ["Ayran", 120],
    ["Red Bull", 200],
    ["Efes Draft", 200],
    ["Corona", 280],
    ["Heineken", 260],
    ["Tuborg", 250],
    ["Carlsberg", 250],
  ]),
  9: spread("Wines & Whisky", [
    ["House Red Wine", 290],
    ["House White Wine", 290],
    ["House Rose Wine", 290],
    ["Sangria", 380],
    ["J.W. Red Label", 300],
    ["J.W. Black Label", 400],
    ["Chivas (12year)", 400],
    ["Jack Daniel's", 350],
    ["Gentleman Jack", 380],
    ["Jameson", 300],
    ["Monkey Shoulder", 400],
    ["Glenfiddich (12year)", 450],
  ]),
  10: spread("Spirits & Aperitif", [
    ["Bacardi Carta Blanca", 350],
    ["Havana Especial", 350],
    ["Patron Silver", 400],
    ["Don Julio Blanco", 350],
    ["Jagermeister", 300],
    ["Baileys", 350],
    ["B52 Shot", 280],
    ["Tequila Shot", 270],
    ["Aperol", 400],
    ["Campari", 400],
    ["Grey Goose", 400],
    ["Hendrick's Gin", 400],
  ]),
  11: spread("Champagne & Cocktails", [
    ["Martini Prosecco", 350],
    ["Moet Brut", 7500],
    ["Hennessy VS", 450],
    ["Mojito", 480],
    ["Mai Tai", 480],
    ["Caipirinha", 480],
    ["Long Island Ice Tea", 480],
    ["Sex On The Beach", 480],
    ["Margarita", 480],
    ["Espresso Martini", 480],
  ]),
  12: spread("Signature & Frozen Cocktails", [
    ["Dry Martini", 480],
    ["Aperol Spritz", 480],
    ["Cosmopolitan", 480],
    ["Negroni", 480],
    ["Frozen Daiquiri", 480],
    ["Frozen Blue Hawaii", 480],
    ["Pina Colada", 480],
    ["Bahama Mama", 480],
    ["Black Penny Ultimate", 480],
    ["Long Island Electric Blue (Pitcher)", 2000],
  ]),
  13: spread("Digestive & Mocktails", [
    ["Black Russian", 480],
    ["White Russian", 480],
    ["Godfather", 480],
    ["Whisky Sour", 480],
    ["Vodka Martini", 480],
    ["Fruit Punch", 320],
    ["Virgin Colada", 320],
    ["Virgin Mojito", 320],
    ["Passion Fruit Spritzer", 320],
  ]),
};

/**
 * Menu-section cards — the horizontally scrolling showcase of categories.
 * Each entry carries a `title` (for labels/aria), the pre-broken `lines` shown
 * stacked on the card, and the `img` that becomes the large dish behind the
 * rail when this card is centred. Order matters: the section starts centred on
 * the middle entry, so the three picture cards sit either side of it.
 */
export const menuCategories = [
  { title: "Kahvalti Breakfasr", lines: ["Desserts", "&", "Coffee"], img: "/asset/breakfast/1.png" },
  { title: "Salads & Bowls", lines: ["Salads", "&", "Bowls"], img: "/asset/foods-bowls/5.png" },
  { title: "Specials & Mini Burgers", lines: ["Specials", "& Mini", "Burgers"], img: "/asset/mini-burgers/1.png" },
  { title: "Gourmet Burgers & Pastas", lines: ["Gourmet", "Burgers", "& Pastas"], img: "/asset/pasta/1.png" },
  { title: "Sandwiches, Wraps & Pizzas", lines: ["Sandwiches", "Wraps", "& Pizzas"], img: "/asset/wrap/1.png" },
  { title: "Kids Menu & Beer Plates", lines: ["Kids", "Menu", "& Beer Plates"], img: "/asset/kids/1.png" },
  { title: "Desserts & Coffee", lines: ["Desserts", "&", "Coffee"], img: "/asset/dessert/1.png" },
  { title: "Soft Drinks & Beer", lines: ["Soft", "Drinks", "& Beer"], img: "/asset/drink/1.png" },
  { title: "Wines & Whisky", lines: ["Wines", "&", "Whisky"], img: "/asset/wines/1.png" },

];

/** Items for the spread currently open at a given book position (or []). */
export function itemsForPosition(position) {
  return menuSpreads[position + 1]?.items ?? [];
}

/** Title for the spread currently open at a given book position. */
export function titleForPosition(position) {
  return menuSpreads[position + 1]?.title ?? "";
}

export const formatPrice = (n) => `${n.toLocaleString("en-US")} TL`;
