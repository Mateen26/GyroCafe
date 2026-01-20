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
    id: "wings",
    name: "Wings",
    description: "Fresh never frozen wings cooked to order and sauced your way.",
  },
  {
    id: "salads",
    name: "Salads",
    description: "Fresh, crisp salads with Mediterranean flair.",
  },
  {
    id: "desserts",
    name: "Desserts & Sweets",
    description: "Baklava and sweet bites that finish the meal right.",
  },
  {
    id: "pookie",
    name: "Pookie (Big Body Cookies)",
    description:
      "Pookie is the home of the Big-Body Cookie— Thicc, bold, 6 oz Cookies made to hit every time. We don't just bake treats; we create moments. From giant chocolate-packed cookies bakery staples, Pookie brings the fun back into dessert. Loud flavors, real quality, and a vibe that feels like NYC in every bite.",
  },
  {
    id: "milkshakes",
    name: "Milkshakes",
    description: "Creamy, hand-blended milkshakes in delicious flavors.",
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
    price: 12.0,
    image: "/menu/GYRO PLATTERS/Chicken Gyro Platter.png",
    description:
      "Served with basmati brown rice, lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "lamb-gyro-platter",
    name: "Lamb Gyro Platter",
    category: "platters",
    price: 12.0,
    image: "/menu/GYRO PLATTERS/lamb gyro platter.png",
    description:
      "Served with basmati brown rice, lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "mixed-grill-platter",
    name: "Mixed Gyro Platter",
    category: "platters",
    price: 12.0,
    image: "/menu/GYRO PLATTERS/mix gyro platter.png",
    description:
      "Served with basmati brown rice, lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "bbq-chicken-tikka-platter",
    name: "BBQ Chicken Tikka Platter",
    category: "platters",
    price: 11,
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
    id: "beef-adana-platter",
    name: "Beef Adana Kebab Platter",
    category: "platters",
    price: 16.0,
    image: "/menu/GYRO PLATTERS/Beef adana platter large.jpg",
    description:
      "Beef Adana Kebab seasoned to perfection cooked over a fire pit served with brown basmati rice with lettuce, tomatoes, cucumbers, onions, and cabbage.",
    tags: [],
  },
  {
    id: "kofta-kebab-platter-small",
    name: "Kofta Kebab Platter",
    category: "platters",
    price: 11.0,
    image: "/menu/GYRO PLATTERS/kofta kebab w fries platter.png",
    description:
      "Served with basmati brown rice, lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: [],
  },
  {
    id: "chicken-shish-platter-small",
    name: "Chicken Shish Kebab Platter",
    category: "platters",
    price: 13.0,
    image: "/menu/GYRO PLATTERS/chicken shsih plater small.jpg",
    description:
      "Served with basmati brown rice, lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "lamb-chop-platter",
    name: "Lamb Chop Platter",
    category: "platters",
    price: 15.0,
    image: "/menu/GYRO PLATTERS/lamb chop platter.png",
    description:
      "Lamb chops served in a platter with lettuce, cucumber, tomato, onion, and cabbage with rice and topped with white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "steam-chicken-leg-platter",
    name: "Steamed Chicken Leg Platter",
    category: "platters",
    price: 11,
    image: "/menu/GYRO PLATTERS/steam chicken leg platter.png",
    description:
      "Tender steamed chicken leg over rice with vegetables and sauces.",
    tags: ["halal"],
  },
  {
    id: "fish-platter",
    name: "Fish Platter",
    category: "platters",
    price: 13.0,
    image: "/menu/GYRO PLATTERS/Fish Platter.png",
    description:
      "Served with basmati brown rice, lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: [],
  },
  {
    id: "hummus-platter",
    name: "Hummus Platter",
    category: "platters",
    price: 8.99,
    image: "/menu/GYRO PLATTERS/hummus platter.png",
    description:
      "Served with lettuce, cucumber, tomato, cabbage, and onion with rice and hummus spread across. (No meat)",
    tags: [],
  },
  {
    id: "falafel-platter",
    name: "Falafel Platter",
    category: "platters",
    price: 11.0,
    image: "/menu/GYRO PLATTERS/Falafel Platter.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },

  // PITA SANDWICHES
  {
    id: "chicken-gyro-pita",
    name: "Chicken Gyro Pita Sandwich",
    category: "wraps",
    price: 10.0,
    image: "/menu/GYRO PITA SANDWICHES/chicken gyro pita.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "lamb-gyro-pita",
    name: "Lamb Gyro Pita Sandwich",
    category: "wraps",
    price: 10.0,
    image: "/menu/GYRO PITA SANDWICHES/lamb gyro pita.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "mix-gyro-pita",
    name: "Mix Gyro Pita Sandwich",
    category: "wraps",
    price: 10.0,
    image: "/menu/GYRO PITA SANDWICHES/mix gyro pita.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "falafel-pita",
    name: "Falafel Pita Sandwich",
    category: "wraps",
    price: 9.5,
    image: "/menu/GYRO PITA SANDWICHES/falafel pita.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "kofta-kebab-pita",
    name: "Kofta Kebab Pita Sandwich",
    category: "wraps",
    price: 7.0,
    image: "/menu/GYRO PITA SANDWICHES/kofta kebab pita.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: [],
  },
  {
    id: "chicken-shish-kebab-pita",
    name: "Chicken Shish Kebab Pita Sandwich",
    category: "wraps",
    price: 11.0,
    image: "/menu/GYRO PITA SANDWICHES/chicken shish kebab pita.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "beef-kofta-pita",
    name: "Beef Kofta Pita",
    category: "wraps",
    price: 13,
    image: "/menu/GYRO PITA SANDWICHES/beef kofta pita.jpg",
    description:
      "Grilled beef kofta wrapped in warm pita with vegetables and sauces.",
    tags: ["halal"],
  },
  {
    id: "fish-pita",
    name: "Fish Pita Sandwich",
    category: "wraps",
    price: 10.0,
    image: "/menu/GYRO PITA SANDWICHES/fish pita.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: [],
  },

  // NAANWICHES
  {
    id: "chicken-gyro-naanwich",
    name: "Chicken Gyro Nanwich",
    category: "naanwich",
    price: 12.0,
    image: "/menu/GYRO NAANWICHES/Chicken Gyro Naanwich.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "lamb-gyro-naanwich",
    name: "Lamb Gyro Nanwich",
    category: "naanwich",
    price: 12.0,
    image: "/menu/GYRO NAANWICHES/lamb gyro naanwich.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "mix-gyro-naanwich",
    name: "Mixed Gyro Nanwich",
    category: "naanwich",
    price: 12.0,
    image: "/menu/GYRO NAANWICHES/mix gyro naanwich.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["fan favorite"],
  },
  {
    id: "falafel-naanwich",
    name: "Falafel Naanwich",
    category: "naanwich",
    price: 12,
    image: "/menu/GYRO NAANWICHES/Falafel Naanwich.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "fish-naanwich",
    name: "Fish Naanwich",
    category: "naanwich",
    price: 11.5,
    image: "/menu/GYRO NAANWICHES/Fish Naanwich.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["halal", "pescatarian"],
  },
  {
    id: "beef-adana-naanwich",
    name: "Beef Adana Kebab Naanwich",
    category: "naanwich",
    price: 14,
    image: "/menu/GYRO NAANWICHES/beef adana kebab nanwich.jpg",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["halal"],
  },
  {
    id: "potato-patty-naanwich",
    name: "Potato Patty Naanwich",
    category: "naanwich",
    price: 7,
    image: "/menu/GYRO NAANWICHES/Potatoe patty naanwich.png",
    description:
      "Served with lettuce, tomatoes, cucumbers, cabbage, onions, and finished with our signature white sauce and hot sauce.",
    tags: ["halal", "vegetarian"],
  },

  // CURRY IN A HURRY
  {
    id: "chicken-curry-platter",
    name: "Chicken Curry Platter",
    category: "curry",
    price: 13.0,
    image: "/menu/GYRO CURRY IN A HURRY/chicken curry.jpeg",
    description:
      "Curry Chicken served in a platter with lettuce, cucumber, tomato, onion, and cabbage with rice",
    tags: [],
  },
  {
    id: "lamb-curry-platter",
    name: "Lamb Curry Platter",
    category: "curry",
    price: 13.0,
    image: "/menu/GYRO CURRY IN A HURRY/lamb curry.jpeg",
    description:
      "Served with lettuce, cucumbers, tomatoes, cabbage, and onions with basmati brown rice",
    tags: ["fan favorite"],
  },
  {
    id: "curry-chickpeas-platter",
    name: "Curry Chick Peas Platter",
    category: "curry",
    price: 10.0,
    image: "/menu/GYRO CURRY IN A HURRY/curry chic peas.jpeg",
    description:
      "Served with lettuce, cucumbers, tomatoes, cabbage, and onions with basmati brown rice",
    tags: [],
  },

  // APPETIZERS & SIDES
  {
    id: "falafel-appetizer",
    name: "Falafel",
    category: "appetizers",
    price: 5,
    image: "/menu/GYRO APPETIZERS-SIDES/falafel.png",
    description:
      "Golden crispy falafel served with tahini sauce.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "grape-leaves",
    name: "Grape Leaves",
    category: "appetizers",
    price: 4.5,
    image: "/menu/GYRO APPETIZERS-SIDES/grape leaves.png",
    description:
      "Stuffed grape leaves with rice and herbs, served with lemon.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "potato-patty",
    name: "Potato Patty",
    category: "appetizers",
    price: 2,
    image: "/menu/GYRO APPETIZERS-SIDES/potatoe patty.png",
    description:
      "Crispy potato patties seasoned with herbs and spices.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "kofta-kebab-appetizer",
    name: "Kofta Kebab",
    category: "appetizers",
    price: 2,
    image: "/menu/GYRO APPETIZERS-SIDES/kofta kebab.png",
    description:
      "Grilled kofta kebab served as an appetizer with sauces.",
    tags: ["halal"],
  },
  {
    id: "bbq-chicken-tikka-appetizer",
    name: "BBQ Chicken Tikka",
    category: "appetizers",
    price: 5,
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
    description: "French Fries",
    tags: ["fan favorite"],
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
    price: 10,
    image: "/menu/GYRO APPETIZERS-SIDES/hummus and lamb.webp",
    description:
      "Creamy hummus topped with tender lamb pieces and pita.",
    tags: ["halal"],
  },
  {
    id: "fried-chicken-leg",
    name: "Fried Chicken Leg",
    category: "appetizers",
    price: 1.5,
    image: "/menu/GYRO APPETIZERS-SIDES/fried chicken leg.jpeg",
    description:
      "Crispy fried chicken leg, perfectly seasoned.",
    tags: ["halal"],
  },
  {
    id: "fried-chicken-thigh",
    name: "Fried Chicken Thigh",
    category: "appetizers",
    price: 2,
    image: "/menu/GYRO APPETIZERS-SIDES/fried chicken tigh.jpeg",
    description:
      "Juicy fried chicken thigh with crispy skin.",
    tags: ["halal"],
  },
  {
    id: "steam-chicken-leg",
    name: "Steamed Chicken Leg",
    category: "appetizers",
    price: 4.5,
    image: "/menu/GYRO APPETIZERS-SIDES/steam chicken leg.png",
    description:
      "Tender steamed chicken leg, perfectly cooked.",
    tags: ["halal"],
  },
  {
    id: "extra-meat",
    name: "Extra Meat",
    category: "appetizers",
    price: 2,
    image: "/menu/GYRO APPETIZERS-SIDES/extra meat.jpeg",
    description:
      "Add extra gyro meat to any order.",
    tags: ["halal"],
  },
  {
    id: "beef-adana-stick",
    name: "Beef Adana (Stick Only)",
    category: "appetizers",
    price: 8,
    image: "/menu/GYRO CURRY IN A HURRY/BEEF ADANA (STIKC ONLY).jpg",
    description:
      "Spiced beef adana kebab on a stick, perfect as a side or snack.",
    tags: ["halal"],
  },

  // HOUSE SPECIALS
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    category: "house-specials",
    price: 13,
    image: "/menu/GYRO CAFE HOUSE SPECIALS/loaded friesn enhanced.jpg",
    description:
      "Hand-cut fries smothered in gyro meat, white sauce, and hot sauce.",
    tags: ["halal", "late night"],
  },
  {
    id: "loaded-nachos",
    name: "Loaded Nachos",
    category: "house-specials",
    price: 13,
    image: "/menu/GYRO CAFE HOUSE SPECIALS/LOADED NACHOES.jpg",
    description:
      "Crunchy pita chips topped with mango sauce, gyro meat, and jalapeños.",
    tags: ["halal", "shareable"],
  },
  {
    id: "loaded-tots",
    name: "Loaded Tots",
    category: "house-specials",
    price: 13,
    image: "/menu/GYRO CAFE HOUSE SPECIALS/LOADED TOTS 2.jpg",
    description:
      "Crispy tater tots loaded with gyro meat, cheese, and sauces.",
    tags: ["halal", "shareable"],
  },

  // SALADS
  {
    id: "greek-salad",
    name: "Greek Salad",
    category: "salads",
    price: 8,
    image: "/menu/GYRO CAFE SALADS/greek salad.jpg",
    description:
      "Fresh tomatoes, cucumbers, olives, feta, and herbs with olive oil.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "shepherd-salad",
    name: "Shepherd Salad",
    category: "salads",
    price: 9.5,
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
    price: 1.75,
    image: "/menu/GYRO DESSERTS/pistachio baklava.png",
    description: "Layers of flaky phyllo, pistachio, and honey syrup.",
    tags: ["halal", "sweet", "fan favorite"],
  },

  // POOKIE
  // IN STOCK COOKIES
  {
    id: "big-body-chocolate-chip",
    name: "Big Body Chocolate Chip (Cookie)",
    category: "pookie",
    price: 5.0,
    image: "/menu/cookies/BIG BODY CHOCOLATE CHIP COOKIE.png",
    description:
      "A Fresh-baked thicc & gooey, 6 oz Chocolate Chip Cookie with crispy edges and a soft, melty center. Pure big-body bliss in every bite.",
    tags: ["sweet"],
  },
  {
    id: "big-body-nutella-chocolate-chip",
    name: "Big Body Nutella Cookie",
    category: "pookie",
    price: 5.0,
    image: "/menu/cookies/BIG BODY NUTELLA COOKIE.png",
    description:
      "Fresh-Baked heavyweight 6 oz Nutella Chocolate Chip Cookie loaded with rich, nutella chocolate chunks. Bold, warm, and seriously satisfying.",
    tags: ["sweet"],
  },
  {
    id: "big-body-white-black-oreo",
    name: "BIG BODY OREO COOKIE",
    category: "pookie",
    price: 5.0,
    image: "/menu/cookies/BIG BODY OREO COOKIE.png",
    description:
      "6 oz Big Body Cookie filled with white and dark chocolate chips, topped with Oreos. Warm them up for 20 seconds for the gooeist bite :)",
    tags: ["sweet"],
  },
  {
    id: "big-body-reeses-peanut-butter",
    name: "Big Body Reese's Peanut Butter Cookie",
    category: "pookie",
    price: 5.0,
    image: "/menu/cookies/BIG BODY REESE'S PEANUT BUTTER COOKIE.png",
    description:
      "Fresh-Baked heavyweight 6 oz Reese's Peanut Butter Cookie loaded with rich Reese's pieces and peanut butter chips. Bold, warm, and seriously satisfying.",
    tags: ["sweet"],
  },
  {
    id: "decadent-assortment",
    name: "Decadent Assortment",
    category: "pookie",
    price: 18.0,
    image: "/menu/cookies/DECADENT ASSORTMENT.png",
    description:
      "Indecisive on flavor? Try all four of our 6 oz Big Body Cookies. Warm them up for 20 seconds for the gooeist bite :)",
    tags: ["sweet"],
    outOfStock: false,
  },
  {
    id: "big-body-white-chocolate-lava",
    name: "Big Body White Chocolate Lava Cookie",
    category: "pookie",
    price: 4.0,
    image: "/menu/cookies/BIG BODY NUTELLA COOKIE.png",
    description:
      "Fresh-Baked heavyweight 6 oz White Chocolate Lava Cookie with a molten white chocolate center. Bold, warm, and seriously satisfying.",
    tags: ["sweet"],
  },
  {
    id: "chocolate-chip-muffin",
    name: "Chocolate Chip Muffin",
    category: "pookie",
    price: 3.0,
    image: "/menu/cookies/choclate chip.png",
    description:
      "Fresh-baked muffin loaded with rich chocolate chips. Moist, tender, and perfectly sweet. A classic treat that hits every time.",
    tags: ["sweet"],
    outOfStock: true,
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Muffin",
    category: "pookie",
    price: 3.0,
    image: "/menu/cookies/blueberry-mufin-new.png",
    description:
      "Fresh-baked muffin bursting with juicy blueberries. Light, fluffy, and naturally sweet. A timeless favorite that never disappoints.",
    tags: ["sweet"],
    outOfStock: true,
  },
  // OUT OF STOCK COOKIES
  {
    id: "big-body-dark-chocolate-peanut-butter",
    name: "Big Body Dark Chocolate Peanut Butter (Cookie)",
    category: "pookie",
    price: 5.0,
    image: "/menu/GYRO DESSERTS/BIG BODY CHOCCHIP-DARKCHOC.png",
    description:
      "Fresh-Baked heavyweight 6 oz Peanut Butter Cookie loaded with rich, dark chocolate chunks and peanut butter chips. Bold, warm, and seriously satisfying.",
    tags: ["sweet"],
    outOfStock: true,
  },
  {
    id: "big-body-oatmeal-raisin",
    name: "Big Body Oatmeal Raisin (Cookie)",
    category: "pookie",
    price: 5.0,
    image: "/menu/GYRO DESSERTS/BIG BODY CHOCCHIP-DARKCHOC.png",
    description:
      "Fresh-Baked heavyweight 6 oz Oatmeal Raisin Cookie. Bold, warm, and seriously satisfying.",
    tags: ["sweet"],
    outOfStock: true,
  },

  // WINGS
  {
    id: "wings-6",
    name: "6 Wings",
    category: "wings",
    price: 9.99,
    image: "/menu/wings/WINGS.png",
    description:
      "A small batch of fresh never frozen wings cooked to order and tossed in your choice of sauce. Perfect for a quick bite or solo snack.",
    tags: [],
    requiresFlavor: true,
  },
  {
    id: "wings-10",
    name: "10 Wings",
    category: "wings",
    price: 14.99,
    image: "/menu/wings/WINGS.png",
    description:
      "Our most popular portion of fresh never frozen wings cooked to order and sauced your way. Great for one hungry person or light sharing.",
    tags: ["fan favorite"],
    requiresFlavor: true,
  },
  {
    id: "wings-15",
    name: "15 Wings",
    category: "wings",
    price: 20.99,
    image: "/menu/wings/WINGS.png",
    description:
      "A generous serving of fresh never frozen wings cooked to order and tossed in your choice of sauce. Ideal for sharing or when you are extra hungry.",
    tags: [],
    requiresFlavor: true,
  },
  {
    id: "wings-20",
    name: "20 Wings",
    category: "wings",
    price: 26.99,
    image: "/menu/wings/WINGS.png",
    description:
      "A share ready order of fresh never frozen wings cooked to order and sauced to your liking. Feeds two to three people comfortably.",
    tags: [],
    requiresFlavor: true,
  },
  {
    id: "wings-30",
    name: "30 Wings",
    category: "wings",
    price: 38.99,
    image: "/menu/wings/WINGS.png",
    description:
      "A party friendly spread of fresh never frozen wings cooked to order and tossed in your choice of sauce. Perfect for small groups or game nights.",
    tags: [],
    requiresFlavor: true,
  },
  {
    id: "wings-60",
    name: "60 Wings",
    category: "wings",
    price: 74.99,
    image: "/menu/wings/WINGS.png",
    description:
      "A crowd pleasing platter of fresh never frozen wings cooked to order and sauced your way. Ideal for parties gatherings or events.",
    tags: [],
    requiresFlavor: true,
  },
  {
    id: "wings-100",
    name: "100 Wings",
    category: "wings",
    price: 119.99,
    image: "/menu/wings/WINGS.png",
    description:
      "Our largest wing offering featuring fresh never frozen wings cooked to order and finished in your choice of sauce. Best for large events offices or serious wing lovers.",
    tags: [],
    requiresFlavor: true,
  },

  // MILKSHAKES
  {
    id: "nutella-milkshake",
    name: "Nutella Milkshake",
    category: "milkshakes",
    price: 8,
    image: "/menu/GYRO CAFE HOUSE SPECIALS/nutella ms.webp",
    description:
      "Creamy milkshake blended with rich Nutella.",
    tags: ["sweet"],
  },
  {
    id: "vanilla-milkshake",
    name: "Vanilla Milkshake",
    category: "milkshakes",
    price: 8,
    image: "/menu/GYRO MILKSHAKES/vanilla-milkshake.webp",
    description:
      "Classic creamy vanilla milkshake, smooth and refreshing.",
    tags: ["sweet"],
  },
  {
    id: "mango-milkshake",
    name: "Mango Milkshake",
    category: "milkshakes",
    price: 8,
    image: "/menu/GYRO MILKSHAKES/mango-milkshake.webp",
    description:
      "Tropical mango milkshake with a burst of fresh mango flavor.",
    tags: ["sweet"],
  },
  {
    id: "cookies-n-cream-milkshake",
    name: "Cookies N Cream Milkshake",
    category: "milkshakes",
    price: 8,
    image: "/menu/GYRO MILKSHAKES/cookies-n-cream-milkshake.webp",
    description:
      "Rich vanilla milkshake loaded with crushed chocolate cookies.",
    tags: ["sweet"],
  },

  // DRINKS
  {
    id: "coke-can",
    name: "Coca-Cola (Can)",
    category: "drinks",
    price: 2,
    image: "/menu/GYRO DRINKS/coke can.webp",
    description: "Refreshing Coca-Cola in a can.",
    tags: [],
  },
  {
    id: "coke-bottle",
    name: "Coca-Cola (Bottle)",
    category: "drinks",
    price: 4.5,
    image: "/menu/GYRO DRINKS/coke glass bottle.webp",
    description: "Coca-Cola in a glass bottle.",
    tags: [],
  },
  {
    id: "coke-2-liter",
    name: "Coca-Cola (2 Liter)",
    category: "drinks",
    price: 3,
    image: "/menu/GYRO DRINKS/2liter coke.jpeg",
    description: "Large 2-liter bottle of Coca-Cola.",
    tags: [],
  },
  {
    id: "diet-coke-can",
    name: "Diet Coke (Can)",
    category: "drinks",
    price: 2,
    image: "/menu/GYRO DRINKS/diet coke can.jpeg",
    description: "Diet Coke in a can.",
    tags: [],
  },
  {
    id: "sprite-can",
    name: "Sprite (Can)",
    category: "drinks",
    price: 2,
    image: "/menu/GYRO DRINKS/sprite can.jpeg",
    description: "Refreshing Sprite in a can.",
    tags: [],
  },
  {
    id: "sprite-glass",
    name: "Sprite (Glass)",
    category: "drinks",
    price: 4.5,
    image: "/menu/GYRO DRINKS/sprite glass.jpeg",
    description: "Sprite served in a glass.",
    tags: [],
  },
  {
    id: "fanta-glass",
    name: "Fanta (Glass)",
    category: "drinks",
    price: 4.5,
    image: "/menu/GYRO DRINKS/fanta glasss.jpeg",
    description: "Fanta orange soda in a glass.",
    tags: [],
  },
  {
    id: "fanta-bottle",
    name: "Fanta (Bottle)",
    category: "drinks",
    price: 4.5,
    image: "/menu/GYRO DRINKS/fanta glassbottle.jpeg",
    description: "Fanta in a glass bottle.",
    tags: [],
  },
  {
    id: "sunkist-can",
    name: "Sunkist (Can)",
    category: "drinks",
    price: 2,
    image: "/menu/GYRO DRINKS/sunkist can.jpeg",
    description: "Sunkist orange soda in a can.",
    tags: [],
  },
  {
    id: "ginger-ale-can",
    name: "Ginger Ale (Can)",
    category: "drinks",
    price: 2,
    image: "/menu/GYRO DRINKS/ginger ale can.jpeg",
    description: "Ginger ale in a can.",
    tags: [],
  },
  {
    id: "pepsi-glass",
    name: "Pepsi (Glass)",
    category: "drinks",
    price: 4.5,
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
    price: 2.5,
    image: "/menu/GYRO DRINKS/big arizona.jpeg",
    description: "Large Arizona iced tea.",
    tags: [],
  },
  {
    id: "poland-spring",
    name: "Poland Spring Water",
    category: "drinks",
    price: 1.5,
    image: "/menu/GYRO DRINKS/poland sspring.jpeg",
    description: "Bottled Poland Spring water.",
    tags: [],
  },
  {
    id: "hot-coffee",
    name: "Large Coffee/Tea (Hot)",
    category: "drinks",
    price: 2,
    image: "/menu/GYRO DRINKS/HOT COFEE.jpeg",
    description: "Large hot coffee or tea.",
    tags: [],
  },
  {
    id: "small-hot-coffee-tea",
    name: "Small Coffee/Tea (Hot)",
    category: "drinks",
    price: 1.5,
    image: "/menu/GYRO DRINKS/HOT COFEE.jpeg",
    description: "Small hot coffee or tea.",
    tags: [],
  },

  // SAUCED BOTTLES
  {
    id: "sauced-mango",
    name: "SAÜCED Mango Bottle",
    category: "sauced",
    price: 7,
    image: "/menu/GYRO SAUCES/MANGO.jpg",
    description:
      "Sweet-heat mango sauce bottled from the original Gyro Cafe recipe.",
    tags: ["sauced"],
  },
  {
    id: "sauced-white",
    name: "SAÜCED White Bottle",
    category: "sauced",
    price: 6,
    image: "/menu/GYRO SAUCES/WHITE SAUCE.jpg",
    description: "Creamy garlic-white sauce with a hint of citrus.",
    tags: ["sauced"],
  },
  {
    id: "sauced-hot",
    name: "SAÜCED Hot Bottle",
    category: "sauced",
    price: 6,
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
    id: "bbq-chicken-tikka",
    name: "BBQ Chicken Tikka",
    image: "/menu/GYRO PLATTERS/BBQ chicken tikka platter.png",
    description: "Smoky, charred chicken tikka over basmati rice.",
  },
  {
    id: "chicken-naanwich",
    name: "Chicken Gyro Naanwich",
    image: "/menu/GYRO NAANWICHES/Chicken Gyro Naanwich.png",
    description: "Pressed naanwich with melted cheese and our signature sauces.",
  },
  {
    id: "lamb-chop",
    name: "Lamb Chop Platter",
    image: "/menu/GYRO PLATTERS/lamb chop platter.png",
    description: "Grilled lamb chops over rice with grilled vegetables.",
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    image: "/menu/GYRO CAFE HOUSE SPECIALS/loaded friesn enhanced.jpg",
    description: "Crispy fries topped with gyro meat, white sauce, and hot sauce.",
  },
  {
    id: "fish-platter",
    name: "Fish Platter",
    image: "/menu/GYRO PLATTERS/Fish Platter.png",
    description: "Grilled fish over rice with fresh salad and lemon.",
  },
  {
    id: "baklava-milkshake",
    name: "Baklava & Milkshakes",
    image: "/menu/GYRO DESSERTS/pistachio baklava.png",
    description: "Sweet finishes and late-night cravings satisfied.",
  },
];

// Helper function to generate poster path from video path
function getPosterPath(videoPath) {
  // Only generate poster for local videos (not Instagram URLs)
  if (!videoPath || videoPath.startsWith('http')) {
    return null;
  }
  // Extract filename without extension and create poster path
  const filename = videoPath.split('/').pop();
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  return `/videos/posters/${nameWithoutExt}.jpg`;
}

// All social feed items (kept for backward compatibility)
export const socialFeedItems = [
  // You can use either local videos or Instagram URLs:
  // For local videos: { id: "...", video: "/videos/1.MOV", caption: "..." }
  // For Instagram posts: { id: "...", instagramUrl: "https://www.instagram.com/p/ABC123/", caption: "..." }
  // Or use video field with Instagram URL: { id: "...", video: "https://www.instagram.com/p/ABC123/", caption: "..." }
  {
    id: "video-1",
    video: "/videos/3MUHEED ONLY IN NYC.MOV",
    poster: "/videos/posters/3MUHEED ONLY IN NYC.jpg",
    caption: "Loaded fries getting the full treatment — gyro meat, white sauce, hot sauce.",
  },
  {
    id: "video-3",
    video: "/videos/2GYROS THE CAFE WAY.MOV",
    poster: "/videos/posters/2GYROS THE CAFE WAY.jpg",
    caption: "Fresh gyro meat spinning on the grill — the heart of every platter.",
  },
  {
    id: "video-2",
    video: "/videos/1BIG ORDER.MOV",
    poster: "/videos/posters/1BIG ORDER.jpg",
    caption: "Behind the scenes: Our signature sauces being mixed fresh daily.",
  },
  
  {
    id: "video-4",
    video: "/videos/4.MOV",
    poster: "/videos/posters/4.jpg",
    caption: "Naanwiches being pressed to perfection — crispy outside, melty inside.",
  },
  {
    id: "video-5",
    video: "/videos/5.MOV",
    poster: "/videos/posters/5.jpg",
    caption: "Late-night vibes: The grill stays hot until 1 AM.",
  },
  {
    id: "video-6",
    video: "/videos/6.MOV",
    poster: "/videos/posters/6.jpg",
    caption: "Falafel being fried fresh — crispy golden perfection.",
  },
  
  {
    id: "video-9",
    video: "/videos/9.MOV",
    poster: "/videos/posters/9.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
  {
    id: "video-10",
    video: "/videos/10.MOV",
    poster: "/videos/posters/10.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
  {
    id: "video-11",
    video: "/videos/11.MOV",
    poster: "/videos/posters/11.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
  {
    id: "video-12",
    video: "/videos/12.MOV",
    poster: "/videos/posters/12.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
  {
    id: "video-13",
    video: "/videos/13.mp4",
    poster: "/videos/posters/13.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
  {
    id: "video-14",
    video: "/videos/14.MOV",
    poster: "/videos/posters/14.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
  {
    id: "video-15",
    video: "/videos/15.MOV",
    poster: "/videos/posters/15.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },    
  {
    id: "video-16",
    video: "/videos/16.MOV",
    poster: "/videos/posters/16.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
  {
    id: "video-17",
    video: "/videos/17.MOV",
    poster: "/videos/posters/17.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
  {
    id: "video-18",
    video: "/videos/18.MOV",
    poster: "/videos/posters/18.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
  {
    id: "video-19",
    video: "/videos/19.MOV",
    poster: "/videos/posters/19.jpg",
    caption: "The Gyro Cafe way: Fresh ingredients, family recipes, Brooklyn love.",
  },
];

// Featured videos (top 3) for the featured slider section
export const featuredVideos = socialFeedItems.slice(0, 3);

// Remaining videos for the video slider section
export const remainingVideos = socialFeedItems.slice(3);

/**
 * Get menu items suitable for marquee (platters, kababs, etc.)
 */
function getMarqueeMenuItems() {
  return menuItems.filter(
    (item) =>
      (item.category === "platters" ||
        item.category === "wraps" ||
        item.category === "naanwich" ||
        item.category === "house-specials") &&
      item.image
  );
}

/**
 * Creates alternating array of videos and menu item images for marquee
 * Pattern: [video, menuImage, video, menuImage, ...]
 */
export function getMarqueeItems() {
  const menuItemsForMarquee = getMarqueeMenuItems();
  const marqueeItems = [];
  
  // Interleave videos with menu images
  remainingVideos.forEach((videoItem, index) => {
    // Add video
    marqueeItems.push(videoItem);
    
    // Add menu image after each video (cycle through menu items)
    if (menuItemsForMarquee.length > 0) {
      const menuIndex = index % menuItemsForMarquee.length;
      const menuItem = menuItemsForMarquee[menuIndex];
      marqueeItems.push({
        id: `menu-${menuItem.id}`,
        image: menuItem.image,
        caption: menuItem.name,
        isMenuImage: true,
      });
    }
  });
  
  return marqueeItems;
}
