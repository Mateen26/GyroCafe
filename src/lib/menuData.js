export const menuCategories = [
  {
    id: "platters",
    name: "Platters",
    description:
      "Served over seasoned basmati rice with salad, toasted pita, and our signature sauces.",
  },
  {
    id: "wraps",
    name: "Pita Sandwiches",
    description: "Freshly baked pita stuffed with your choice of protein and toppings.",
  },
  {
    id: "naanwich",
    name: "Naanwiches",
    description: "Our Brooklyn-famous naanwiches, pressed with melted cheese and sauces.",
  },
  {
    id: "curry",
    name: "Curry in a Hurry",
    description: "Slow-simmered curries served over rice with fresh sides.",
  },
  {
    id: "appetizers",
    name: "Appetizers & Sides",
    description: "Perfect starters and add-ons to share — fries, hummus, and crispy bites.",
  },
  {
    id: "house-specials",
    name: "House Specials",
    description: "Loaded fries, nachos, salads, and signature creations.",
  },
  {
    id: "salads",
    name: "Salads",
    description: "Fresh, crisp salads with Mediterranean flair.",
  },
  {
    id: "desserts",
    name: "Desserts & Sweets",
    description: "Baklava, milkshakes, and sweet bites that finish the meal right.",
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Soft drinks, coffee, and refreshing beverages.",
  },
  {
    id: "sauced",
    name: "SAÜCED Bottles",
    description: "Take home our legendary Mango, White, and Hot sauces.",
  },
];

export const menuItems = [
  // PLATTERS
  {
    id: "chicken-gyro-platter",
    name: "Chicken Gyro Platter",
    category: "platters",
    price: 14.5,
    image: "/menu/GYRO PLATTERS/Chicken Gyro Platter.png",
    description:
      "Marinated chicken gyro over rice with grilled onions, peppers, and our white sauce.",
    tags: ["halal", "fan favorite", "sauced"],
  },
  {
    id: "lamb-gyro-platter",
    name: "Lamb Gyro Platter",
    category: "platters",
    price: 15.5,
    image: "/menu/GYRO PLATTERS/lamb gyro platter.png",
    description:
      "Thin-sliced lamb gyro, turmeric rice, crisp salad, and toasted pita.",
    tags: ["halal"],
  },
  {
    id: "mixed-grill-platter",
    name: "Mixed Grill Platter",
    category: "platters",
    price: 17,
    image: "/menu/GYRO PLATTERS/mix gyro platter.png",
    description:
      "Chicken, lamb, and kofta kebab served over rice with peppers, onions, and sauces.",
    tags: ["halal", "shareable"],
  },
  {
    id: "chicken-w-fries-platter",
    name: "Chicken Gyro Platter w/ Fries",
    category: "platters",
    price: 15.5,
    image: "/menu/GYRO PLATTERS/chicekn w fries platter.png",
    description:
      "Chicken gyro platter served with crispy golden fries on the side.",
    tags: ["halal"],
  },
  {
    id: "lamb-w-fries-platter",
    name: "Lamb Gyro Platter w/ Fries",
    category: "platters",
    price: 16.5,
    image: "/menu/GYRO PLATTERS/lamb gyro w fries platter.png",
    description:
      "Lamb gyro platter with a side of hand-cut fries and sauces.",
    tags: ["halal"],
  },
  {
    id: "bbq-chicken-tikka-platter",
    name: "BBQ Chicken Tikka Platter",
    category: "platters",
    price: 16,
    image: "/menu/GYRO PLATTERS/BBQ chicken tikka platter.png",
    description:
      "Smoky BBQ chicken tikka over basmati rice with grilled vegetables.",
    tags: ["halal"],
  },
  {
    id: "bbq-tikka-platter",
    name: "BBQ Tikka Platter",
    category: "platters",
    price: 16.5,
    image: "/menu/GYRO PLATTERS/bbq tikka platter.png",
    description:
      "Grilled tikka pieces with rice, salad, and signature sauces.",
    tags: ["halal"],
  },
  {
    id: "beef-adana-platter-large",
    name: "Beef Adana Platter (Large)",
    category: "platters",
    price: 18,
    image: "/menu/GYRO PLATTERS/Beef adana platter large.jpg",
    description:
      "Spiced beef adana kebab over rice with fresh salad and pita.",
    tags: ["halal"],
  },
  {
    id: "beef-kofta-platter-small",
    name: "Beef Kofta Kebab Platter (Small)",
    category: "platters",
    price: 15,
    image: "/menu/GYRO PLATTERS/beef kofta kebab platter small.jpg",
    description:
      "Grilled beef kofta served over rice with vegetables and sauces.",
    tags: ["halal"],
  },
  {
    id: "chicken-shish-platter-small",
    name: "Chicken Shish Kebab Platter (Small)",
    category: "platters",
    price: 15.5,
    image: "/menu/GYRO PLATTERS/chicken shsih plater small.jpg",
    description:
      "Tender chicken shish kebab with rice, salad, and warm pita.",
    tags: ["halal"],
  },
  {
    id: "kofta-kebab-w-fries-platter",
    name: "Kofta Kebab Platter w/ Fries",
    category: "platters",
    price: 16,
    image: "/menu/GYRO PLATTERS/kofta kebab w fries platter.png",
    description:
      "Kofta kebab platter with crispy fries and all the sauces.",
    tags: ["halal"],
  },
  {
    id: "lamb-chop-platter",
    name: "Lamb Chop Platter",
    category: "platters",
    price: 19,
    image: "/menu/GYRO PLATTERS/lamb chop platter.png",
    description:
      "Grilled lamb chops over rice with grilled vegetables and sauces.",
    tags: ["halal"],
  },
  {
    id: "lamb-chop-w-fries-platter",
    name: "Lamb Chop Platter w/ Fries",
    category: "platters",
    price: 20,
    image: "/menu/GYRO PLATTERS/lamb chop w fries platter.png",
    description:
      "Lamb chops with fries, rice, and all the fixings.",
    tags: ["halal"],
  },
  {
    id: "lamb-chops-platter",
    name: "Lamb Chops Platter",
    category: "platters",
    price: 19,
    image: "/menu/GYRO PLATTERS/lamb chops platter.png",
    description:
      "Tender lamb chops served over seasoned rice with fresh sides.",
    tags: ["halal"],
  },
  {
    id: "steam-chicken-leg-platter",
    name: "Steamed Chicken Leg Platter",
    category: "platters",
    price: 14,
    image: "/menu/GYRO PLATTERS/steam chicken leg platter.png",
    description:
      "Tender steamed chicken leg over rice with vegetables and sauces.",
    tags: ["halal"],
  },
  {
    id: "fish-platter",
    name: "Fish Platter",
    category: "platters",
    price: 16,
    image: "/menu/GYRO PLATTERS/Fish Platter.png",
    description:
      "Grilled fish over rice with fresh salad and lemon.",
    tags: ["halal", "pescatarian"],
  },
  {
    id: "hummus-platter",
    name: "Hummus Platter",
    category: "platters",
    price: 12,
    image: "/menu/GYRO PLATTERS/hummus platter.png",
    description:
      "Creamy hummus served with warm pita, olives, and vegetables.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "falafel-platter",
    name: "Falafel Platter",
    category: "platters",
    price: 13,
    image: "/menu/GYRO PLATTERS/Falafel Platter.png",
    description:
      "Crispy falafel over rice, chickpea salad, pickled veggies, and tahini drizzle.",
    tags: ["halal", "vegetarian"],
  },

  // PITA SANDWICHES
  {
    id: "chicken-gyro-pita",
    name: "Chicken Gyro Pita",
    category: "wraps",
    price: 10.5,
    image: "/menu/GYRO PITA SANDWICHES/chicken gyro pita.png",
    description:
      "Stuffed with shaved chicken gyro, lettuce, tomato, onions, and white sauce.",
    tags: ["halal"],
  },
  {
    id: "lamb-gyro-pita",
    name: "Lamb Gyro Pita",
    category: "wraps",
    price: 11,
    image: "/menu/GYRO PITA SANDWICHES/lamb gyro pita.png",
    description:
      "Traditional lamb gyro, fresh veggies, and a double drizzle of sauces.",
    tags: ["halal"],
  },
  {
    id: "mix-gyro-pita",
    name: "Mixed Gyro Pita",
    category: "wraps",
    price: 11.5,
    image: "/menu/GYRO PITA SANDWICHES/mix gyro pita.png",
    description:
      "Chicken and lamb gyro combined in one pita with all the toppings.",
    tags: ["halal"],
  },
  {
    id: "falafel-pita",
    name: "Falafel Pita",
    category: "wraps",
    price: 9.5,
    image: "/menu/GYRO PITA SANDWICHES/falafel pita.png",
    description:
      "Golden falafel, pickled cabbage, cucumber, and tahini in warm pita.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "kofta-kebab-pita",
    name: "Kofta Kebab Pita",
    category: "wraps",
    price: 11.5,
    image: "/menu/GYRO PITA SANDWICHES/kofta kebab pita.png",
    description:
      "Grilled kofta kebab, pickled onions, and roasted peppers with white sauce.",
    tags: ["halal"],
  },
  {
    id: "chicken-shish-kebab-pita",
    name: "Chicken Shish Kebab Pita",
    category: "wraps",
    price: 11.5,
    image: "/menu/GYRO PITA SANDWICHES/chicken shish kebab pita.png",
    description:
      "Tender chicken shish kebab with fresh vegetables and sauces in pita.",
    tags: ["halal"],
  },
  {
    id: "beef-kofta-pita",
    name: "Beef Kofta Pita",
    category: "wraps",
    price: 12,
    image: "/menu/GYRO PITA SANDWICHES/beef kofta pita.jpg",
    description:
      "Grilled beef kofta wrapped in warm pita with vegetables and sauces.",
    tags: ["halal"],
  },
  {
    id: "fish-pita",
    name: "Fish Pita",
    category: "wraps",
    price: 11,
    image: "/menu/GYRO PITA SANDWICHES/fish pita.png",
    description:
      "Grilled fish with fresh vegetables and lemon in warm pita.",
    tags: ["halal", "pescatarian"],
  },

  // NAANWICHES
  {
    id: "chicken-gyro-naanwich",
    name: "Chicken Gyro Naanwich",
    category: "naanwich",
    price: 12,
    image: "/menu/GYRO NAANWICHES/Chicken Gyro Naanwich.png",
    description:
      "Pressed naan stuffed with chicken gyro, melted cheese, and house sauces.",
    tags: ["halal"],
  },
  {
    id: "lamb-gyro-naanwich",
    name: "Lamb Gyro Naanwich",
    category: "naanwich",
    price: 12.5,
    image: "/menu/GYRO NAANWICHES/lamb gyro naanwich.png",
    description:
      "Crispy naan, lamb gyro, charred onions, and spicy red sauce.",
    tags: ["halal"],
  },
  {
    id: "mix-gyro-naanwich",
    name: "Mixed Gyro Naanwich",
    category: "naanwich",
    price: 13,
    image: "/menu/GYRO NAANWICHES/mix gyro naanwich.png",
    description:
      "Chicken and lamb gyro pressed in naan with cheese and sauces.",
    tags: ["halal"],
  },
  {
    id: "falafel-naanwich",
    name: "Falafel Naanwich",
    category: "naanwich",
    price: 11,
    image: "/menu/GYRO NAANWICHES/Falafel Naanwich.png",
    description:
      "Falafel, crunchy slaw, and mango sauce pressed into warm naan.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "fish-naanwich",
    name: "Fish Naanwich",
    category: "naanwich",
    price: 11.5,
    image: "/menu/GYRO NAANWICHES/Fish Naanwich.png",
    description:
      "Grilled fish pressed in naan with fresh vegetables and sauces.",
    tags: ["halal", "pescatarian"],
  },
  {
    id: "beef-adana-naanwich",
    name: "Beef Adana Kebab Naanwich",
    category: "naanwich",
    price: 13,
    image: "/menu/GYRO NAANWICHES/beef adana kebab nanwich.jpg",
    description:
      "Spiced beef adana kebab pressed in naan with cheese and sauces.",
    tags: ["halal"],
  },
  {
    id: "beef-kofta-naanwich",
    name: "Beef Kofta Kebab Naanwich",
    category: "naanwich",
    price: 12.5,
    image: "/menu/GYRO NAANWICHES/beef kofta kebab nanwich.jpeg",
    description:
      "Grilled beef kofta pressed in naan with vegetables and sauces.",
    tags: ["halal"],
  },
  {
    id: "potato-patty-naanwich",
    name: "Potato Patty Naanwich",
    category: "naanwich",
    price: 10,
    image: "/menu/GYRO NAANWICHES/Potatoe patty naanwich.png",
    description:
      "Crispy potato patty pressed in naan with vegetables and sauces.",
    tags: ["halal", "vegetarian"],
  },

  // CURRY IN A HURRY
  {
    id: "chicken-curry-platter",
    name: "Chicken Curry Platter",
    category: "curry",
    price: 15,
    image: "/menu/GYRO CURRY IN A HURRY/chicken curry.jpeg",
    description:
      "Slow-simmered curry chicken with chickpeas, seasonal salad, and warm pita.",
    tags: ["halal", "comfort food"],
  },
  {
    id: "lamb-curry-platter",
    name: "Lamb Curry Platter",
    category: "curry",
    price: 16,
    image: "/menu/GYRO CURRY IN A HURRY/lamb curry.jpeg",
    description:
      "Tender lamb curry simmered with spices, served over rice with fresh sides.",
    tags: ["halal", "comfort food"],
  },
  {
    id: "curry-chickpeas-platter",
    name: "Curry Chickpeas Platter",
    category: "curry",
    price: 12,
    image: "/menu/GYRO CURRY IN A HURRY/curry chic peas.jpeg",
    description:
      "Hearty chickpeas simmered with tomatoes, spices, and herbs over basmati rice.",
    tags: ["halal", "vegan"],
  },
  {
    id: "beef-adana-stick",
    name: "Beef Adana (Stick Only)",
    category: "curry",
    price: 8,
    image: "/menu/GYRO CURRY IN A HURRY/BEEF ADANA (STIKC ONLY).jpg",
    description:
      "Spiced beef adana kebab on a stick, perfect as a side or snack.",
    tags: ["halal"],
  },

  // APPETIZERS & SIDES
  {
    id: "appetizers-sampler",
    name: "Appetizers Sampler",
    category: "appetizers",
    price: 8.5,
    image: "/menu/GYRO APPETIZERS-SIDES/appeitzer tile.jpeg",
    description:
      "Crispy bites of samosas, grape leaves, and falafel with dipping sauces.",
    tags: ["shareable", "halal"],
  },
  {
    id: "falafel-appetizer",
    name: "Falafel",
    category: "appetizers",
    price: 6,
    image: "/menu/GYRO APPETIZERS-SIDES/falafel.png",
    description:
      "Golden crispy falafel served with tahini sauce.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "grape-leaves",
    name: "Grape Leaves",
    category: "appetizers",
    price: 6.5,
    image: "/menu/GYRO APPETIZERS-SIDES/grape leaves.png",
    description:
      "Stuffed grape leaves with rice and herbs, served with lemon.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "potato-samosa",
    name: "Potato Samosa",
    category: "appetizers",
    price: 5.5,
    image: "/menu/GYRO APPETIZERS-SIDES/potato somasa.png",
    description:
      "Crispy fried samosas filled with spiced potatoes.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "potato-patty",
    name: "Potato Patty",
    category: "appetizers",
    price: 5,
    image: "/menu/GYRO APPETIZERS-SIDES/potatoe patty.png",
    description:
      "Crispy potato patties seasoned with herbs and spices.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "kofta-kebab-appetizer",
    name: "Kofta Kebab",
    category: "appetizers",
    price: 7,
    image: "/menu/GYRO APPETIZERS-SIDES/kofta kebab.png",
    description:
      "Grilled kofta kebab served as an appetizer with sauces.",
    tags: ["halal"],
  },
  {
    id: "bbq-chicken-tikka-appetizer",
    name: "BBQ Chicken Tikka",
    category: "appetizers",
    price: 7.5,
    image: "/menu/GYRO APPETIZERS-SIDES/bbq chicken tikka.png",
    description:
      "Smoky BBQ chicken tikka pieces, perfect for sharing.",
    tags: ["halal"],
  },
  {
    id: "french-fries",
    name: "French Fries",
    category: "appetizers",
    price: 4.5,
    image: "/menu/GYRO APPETIZERS-SIDES/French Fries.png",
    description:
      "Crispy golden fries, perfectly seasoned.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "hummus-w-pita",
    name: "Hummus w/ Pita",
    category: "appetizers",
    price: 6.5,
    image: "/menu/GYRO APPETIZERS-SIDES/Hummus w Pita.png",
    description:
      "Creamy hummus served with warm pita bread.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "hummus-and-lamb",
    name: "Hummus & Lamb",
    category: "appetizers",
    price: 9,
    image: "/menu/GYRO APPETIZERS-SIDES/hummus and lamb.webp",
    description:
      "Creamy hummus topped with tender lamb pieces and pita.",
    tags: ["halal"],
  },
  {
    id: "fried-chicken-leg",
    name: "Fried Chicken Leg",
    category: "appetizers",
    price: 6.5,
    image: "/menu/GYRO APPETIZERS-SIDES/fried chicken leg.jpeg",
    description:
      "Crispy fried chicken leg, perfectly seasoned.",
    tags: ["halal"],
  },
  {
    id: "fried-chicken-thigh",
    name: "Fried Chicken Thigh",
    category: "appetizers",
    price: 6.5,
    image: "/menu/GYRO APPETIZERS-SIDES/fried chicken tigh.jpeg",
    description:
      "Juicy fried chicken thigh with crispy skin.",
    tags: ["halal"],
  },
  {
    id: "steam-chicken-leg",
    name: "Steamed Chicken Leg",
    category: "appetizers",
    price: 6,
    image: "/menu/GYRO APPETIZERS-SIDES/steam chicken leg.png",
    description:
      "Tender steamed chicken leg, perfectly cooked.",
    tags: ["halal"],
  },
  {
    id: "extra-meat",
    name: "Extra Meat",
    category: "appetizers",
    price: 5,
    image: "/menu/GYRO APPETIZERS-SIDES/extra meat.jpeg",
    description:
      "Add extra gyro meat to any order.",
    tags: ["halal"],
  },

  // HOUSE SPECIALS
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    category: "house-specials",
    price: 9,
    image: "/menu/GYRO CAFE HOUSE SPECIALS/loaded friesn enhanced.jpg",
    description:
      "Hand-cut fries smothered in gyro meat, white sauce, and hot sauce.",
    tags: ["halal", "late night"],
  },
  {
    id: "loaded-nachos",
    name: "Loaded Nachos",
    category: "house-specials",
    price: 9.5,
    image: "/menu/GYRO CAFE HOUSE SPECIALS/LOADED NACHOES.jpg",
    description:
      "Crunchy pita chips topped with mango sauce, gyro meat, and jalapeños.",
    tags: ["halal", "shareable"],
  },
  {
    id: "loaded-tots",
    name: "Loaded Tots",
    category: "house-specials",
    price: 9,
    image: "/menu/GYRO CAFE HOUSE SPECIALS/LOADED TOTS 2.jpg",
    description:
      "Crispy tater tots loaded with gyro meat, cheese, and sauces.",
    tags: ["halal", "shareable"],
  },
  {
    id: "nutella-milkshake",
    name: "Nutella Milkshake",
    category: "house-specials",
    price: 8,
    image: "/menu/GYRO CAFE HOUSE SPECIALS/nutella ms.webp",
    description:
      "Creamy milkshake blended with rich Nutella.",
    tags: ["sweet"],
  },
  {
    id: "shepherd-salad-special",
    name: "Shepherd Salad",
    category: "house-specials",
    price: 10,
    image: "/menu/GYRO CAFE HOUSE SPECIALS/sheppard salad.webp",
    description:
      "Fresh chopped vegetables with herbs, olive oil, and lemon.",
    tags: ["halal", "vegetarian"],
  },

  // SALADS
  {
    id: "greek-salad",
    name: "Greek Salad",
    category: "salads",
    price: 10,
    image: "/menu/GYRO CAFE SALADS/greek salad.jpg",
    description:
      "Fresh tomatoes, cucumbers, olives, feta, and herbs with olive oil.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "shepherd-salad",
    name: "Shepherd Salad",
    category: "salads",
    price: 10,
    image: "/menu/GYRO CAFE SALADS/shepherd salad.jpg",
    description:
      "Chopped fresh vegetables with herbs, olive oil, and lemon dressing.",
    tags: ["halal", "vegetarian"],
  },

  // DESSERTS
  {
    id: "baklava",
    name: "Pistachio Baklava",
    category: "desserts",
    price: 6.5,
    image: "/menu/GYRO DESSERTS/pistachio baklava.png",
    description: "Layers of flaky phyllo, pistachio, and honey syrup.",
    tags: ["halal", "sweet"],
  },
  {
    id: "baklava-2",
    name: "Baklava",
    category: "desserts",
    price: 6.5,
    image: "/menu/GYRO DESSERTS/pistachio baklava (2).png",
    description: "Traditional baklava with layers of phyllo and honey.",
    tags: ["halal", "sweet"],
  },

  // DRINKS
  {
    id: "coke-can",
    name: "Coca-Cola (Can)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/coke can.webp",
    description: "Refreshing Coca-Cola in a can.",
    tags: [],
  },
  {
    id: "coke-bottle",
    name: "Coca-Cola (Bottle)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/coke glass bottle.webp",
    description: "Coca-Cola in a glass bottle.",
    tags: [],
  },
  {
    id: "coke-2-liter",
    name: "Coca-Cola (2 Liter)",
    category: "drinks",
    price: 4,
    image: "/menu/GYRO DRINKS/2liter coke.jpeg",
    description: "Large 2-liter bottle of Coca-Cola.",
    tags: [],
  },
  {
    id: "diet-coke-can",
    name: "Diet Coke (Can)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/diet coke can.jpeg",
    description: "Diet Coke in a can.",
    tags: [],
  },
  {
    id: "sprite-can",
    name: "Sprite (Can)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/sprite can.jpeg",
    description: "Refreshing Sprite in a can.",
    tags: [],
  },
  {
    id: "sprite-glass",
    name: "Sprite (Glass)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/sprite glass.jpeg",
    description: "Sprite served in a glass.",
    tags: [],
  },
  {
    id: "fanta-glass",
    name: "Fanta (Glass)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/fanta glasss.jpeg",
    description: "Fanta orange soda in a glass.",
    tags: [],
  },
  {
    id: "fanta-bottle",
    name: "Fanta (Bottle)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/fanta glassbottle.jpeg",
    description: "Fanta in a glass bottle.",
    tags: [],
  },
  {
    id: "sunkist-can",
    name: "Sunkist (Can)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/sunkist can.jpeg",
    description: "Sunkist orange soda in a can.",
    tags: [],
  },
  {
    id: "ginger-ale-can",
    name: "Ginger Ale (Can)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/ginger ale can.jpeg",
    description: "Ginger ale in a can.",
    tags: [],
  },
  {
    id: "pepsi-glass",
    name: "Pepsi (Glass)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/pepsi glass.jpeg",
    description: "Pepsi served in a glass.",
    tags: [],
  },
  {
    id: "snapple-bottle",
    name: "Snapple",
    category: "drinks",
    price: 3,
    image: "/menu/GYRO DRINKS/snapple bottle.jpeg",
    description: "Assorted Snapple flavors.",
    tags: [],
  },
  {
    id: "arizona-small",
    name: "Arizona (Small)",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/small arizona.jpeg",
    description: "Small Arizona iced tea.",
    tags: [],
  },
  {
    id: "arizona-big",
    name: "Arizona (Big)",
    category: "drinks",
    price: 3.5,
    image: "/menu/GYRO DRINKS/big arizona.jpeg",
    description: "Large Arizona iced tea.",
    tags: [],
  },
  {
    id: "poland-spring",
    name: "Poland Spring Water",
    category: "drinks",
    price: 2,
    image: "/menu/GYRO DRINKS/poland sspring.jpeg",
    description: "Bottled Poland Spring water.",
    tags: [],
  },
  {
    id: "hot-coffee",
    name: "Hot Coffee",
    category: "drinks",
    price: 2.5,
    image: "/menu/GYRO DRINKS/HOT COFEE.jpeg",
    description: "Freshly brewed hot coffee.",
    tags: [],
  },

  // SAUCED BOTTLES
  {
    id: "sauced-mango",
    name: "SAÜCED Mango Bottle",
    category: "sauced",
    price: 8.5,
    image: "/menu/GYRO SAUCES/MANGO.jpg",
    description:
      "Sweet-heat mango sauce bottled from the original Gyro Cafe recipe.",
    tags: ["sauced"],
  },
  {
    id: "sauced-white",
    name: "SAÜCED White Bottle",
    category: "sauced",
    price: 8.5,
    image: "/menu/GYRO SAUCES/WHITE SAUCE.jpg",
    description: "Creamy garlic-white sauce with a hint of citrus.",
    tags: ["sauced"],
  },
  {
    id: "sauced-hot",
    name: "SAÜCED Hot Bottle",
    category: "sauced",
    price: 8.5,
    image: "/menu/GYRO SAUCES/RED SAUCE.jpg",
    description:
      "Fiery hot sauce crafted to kick up platters, wraps, and everything in between.",
    tags: ["sauced", "spicy"],
  },
];

export const featuredSlides = [
  {
    id: "chicken-over-rice",
    name: "Chicken Over Rice",
    image: "/menu/GYRO PLATTERS/Chicken Gyro Platter.png",
    description: "Classic late-night staple, drenched in white sauce.",
  },
  {
    id: "lamb-platter",
    name: "Lamb Gyro Platter",
    image: "/menu/GYRO PLATTERS/lamb gyro platter.png",
    description: "Slow-roasted lamb sliced thin with a drizzle of hot sauce.",
  },
  {
    id: "falafel-wrap",
    name: "Falafel Wrap",
    image: "/menu/GYRO PITA SANDWICHES/falafel pita.png",
    description: "Crunchy falafel, pickles, and tahini in warm pita.",
  },
  {
    id: "mixed-grill",
    name: "Mixed Grill Platter",
    image: "/menu/GYRO PLATTERS/mix gyro platter.png",
    description: "Kofta kebab, chicken, and lamb — the full Gyro Cafe feast.",
  },
  {
    id: "baklava-milkshake",
    name: "Baklava & Milkshakes",
    image: "/menu/GYRO DESSERTS/pistachio baklava.png",
    description: "Sweet finishes and late-night cravings satisfied.",
  },
];

export const socialFeedItems = [
  {
    id: "post-1",
    image: "/menu/GYRO PLATTERS/chicekn w fries platter.png",
    caption: "Chicken & fries platter hitting the grill.",
  },
  {
    id: "post-2",
    image: "/menu/GYRO PLATTERS/BBQ chicken tikka platter.png",
    caption: "BBQ chicken tikka night. Smoky, saucy, perfect.",
  },
  {
    id: "post-3",
    image: "/menu/GYRO PLATTERS/Fish Platter.png",
    caption: "Pescatarian platter, halal and fresh as always.",
  },
  {
    id: "post-4",
    image: "/menu/GYRO CAFE HOUSE SPECIALS/loaded friesn enhanced.jpg",
    caption: "Loaded fries for the late-night crew.",
  },
  {
    id: "post-5",
    image: "/menu/GYRO NAANWICHES/Chicken Gyro Naanwich.png",
    caption: "Naanwiches pressed with extra cheese — you're welcome.",
  },
  {
    id: "post-6",
    image: "/menu/GYRO PITA SANDWICHES/falafel pita.png",
    caption: "Falafel Fridays stay undefeated.",
  },
  {
    id: "post-7",
    image: "/menu/GYRO CURRY IN A HURRY/lamb curry.jpeg",
    caption: "Comfort in a platter: Lamb curry over rice.",
  },
  {
    id: "post-8",
    image: "/menu/GYRO PLATTERS/Falafel Platter.png",
    caption: "Plant-powered platters with all the sauces.",
  },
];
