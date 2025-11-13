export const menuCategories = [
  {
    id: "platters",
    name: "Platters",
    description:
      "Served over seasoned basmati rice with salad, toasted pita, and our signature sauces.",
  },
  {
    id: "wraps",
    name: "Wraps & Pitas",
    description: "Freshly baked pita stuffed with your choice of protein and toppings.",
  },
  {
    id: "naanwich",
    name: "Naanwiches",
    description: "Our Brooklyn-famous naanwiches, pressed with melted cheese and sauces.",
  },
  {
    id: "vegetarian",
    name: "Vegetarian Favorites",
    description: "Falafel, chickpeas, and veggie-forward specialties.",
  },
  {
    id: "sides",
    name: "Sides & Snacks",
    description: "Perfect add-ons to share — fries, hummus, and appetizers.",
  },
  {
    id: "desserts",
    name: "Desserts & Sweets",
    description: "Baklava, milkshakes, and sweet bites that finish the meal right.",
  },
  {
    id: "sauced",
    name: "SAÜCED Bottles",
    description: "Take home our legendary Mango, White, and Hot sauces.",
  },
];

export const menuItems = [
  {
    id: "chicken-gyro-platter",
    name: "Chicken Gyro Platter",
    category: "platters",
    price: 14.5,
    image: "/slideshow/Chicken Gyro Platter.png",
    description:
      "Marinated chicken gyro over rice with grilled onions, peppers, and our white sauce.",
    tags: ["halal", "fan favorite", "sauced"],
  },
  {
    id: "lamb-gyro-platter",
    name: "Lamb Gyro Platter",
    category: "platters",
    price: 15.5,
    image: "/slideshow/lamb gyro platter.png",
    description:
      "Thin-sliced lamb gyro, turmeric rice, crisp salad, and toasted pita.",
    tags: ["halal"],
  },
  {
    id: "mixed-grill-platter",
    name: "Mixed Grill Platter",
    category: "platters",
    price: 17,
    image: "/slideshow/mix gyro platter.png",
    description:
      "Chicken, lamb, and kofta kebab served over rice with peppers, onions, and sauces.",
    tags: ["halal", "shareable"],
  },
  {
    id: "chicken-curry-platter",
    name: "Chicken Curry Platter",
    category: "platters",
    price: 15,
    image: "/slideshow/Chicken Curry platter.png",
    description:
      "Slow-simmered curry chicken with chickpeas, seasonal salad, and warm pita.",
    tags: ["halal", "comfort food"],
  },
  {
    id: "falafel-platter",
    name: "Falafel Platter",
    category: "vegetarian",
    price: 13,
    image: "/slideshow/Falafel Platter.png",
    description:
      "Crispy falafel over rice, chickpea salad, pickled veggies, and tahini drizzle.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "curry-chickpeas-platter",
    name: "Curry Chickpeas Platter",
    category: "vegetarian",
    price: 12,
    image: "/slideshow/Curry Chickpeas platter.png",
    description:
      "Hearty chickpeas simmered with tomatoes, spices, and herbs over basmati rice.",
    tags: ["halal", "vegan"],
  },
  {
    id: "chicken-gyro-pita",
    name: "Chicken Gyro Pita",
    category: "wraps",
    price: 10.5,
    image: "/slideshow/chicken gyro pita.png",
    description:
      "Stuffed with shaved chicken gyro, lettuce, tomato, onions, and white sauce.",
    tags: ["halal"],
  },
  {
    id: "lamb-gyro-pita",
    name: "Lamb Gyro Pita",
    category: "wraps",
    price: 11,
    image: "/slideshow/lamb gyro pita.png",
    description:
      "Traditional lamb gyro, fresh veggies, and a double drizzle of sauces.",
    tags: ["halal"],
  },
  {
    id: "falafel-pita",
    name: "Falafel Pita",
    category: "wraps",
    price: 9.5,
    image: "/slideshow/falafel pita.png",
    description:
      "Golden falafel, pickled cabbage, cucumber, and tahini in warm pita.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "chicken-gyro-naanwich",
    name: "Chicken Gyro Naanwich",
    category: "naanwich",
    price: 12,
    image: "/slideshow/Chicken Gyro Naanwich.png",
    description:
      "Pressed naan stuffed with chicken gyro, melted cheese, and house sauces.",
    tags: ["halal"],
  },
  {
    id: "lamb-gyro-naanwich",
    name: "Lamb Gyro Naanwich",
    category: "naanwich",
    price: 12.5,
    image: "/slideshow/lamb gyro naanwich.png",
    description:
      "Crispy naan, lamb gyro, charred onions, and spicy red sauce.",
    tags: ["halal"],
  },
  {
    id: "falafel-naanwich",
    name: "Falafel Naanwich",
    category: "naanwich",
    price: 11,
    image: "/slideshow/Falafel Naanwich.png",
    description:
      "Falafel, crunchy slaw, and mango sauce pressed into warm naan.",
    tags: ["halal", "vegetarian"],
  },
  {
    id: "kofta-kebab-pita",
    name: "Kofta Kebab Pita",
    category: "wraps",
    price: 11.5,
    image: "/slideshow/kofta kebab pita.png",
    description:
      "Grilled kofta kebab, pickled onions, and roasted peppers with white sauce.",
    tags: ["halal"],
  },
  {
    id: "appetizers-sampler",
    name: "Appetizers Sampler",
    category: "sides",
    price: 8.5,
    image: "/slideshow/APPETIZERS.png",
    description:
      "Crispy bites of samosas, grape leaves, and falafel with dipping sauces.",
    tags: ["shareable", "halal"],
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    category: "sides",
    price: 9,
    image: "/slideshow/loaded friesn enhanced.jpg",
    description:
      "Hand-cut fries smothered in gyro meat, white sauce, and hot sauce.",
    tags: ["halal", "late night"],
  },
  {
    id: "loaded-nachos",
    name: "Loaded Nachos",
    category: "sides",
    price: 9.5,
    image: "/slideshow/LOADED NACHOES.jpg",
    description:
      "Crunchy pita chips topped with mango sauce, gyro meat, and jalapeños.",
    tags: ["halal", "shareable"],
  },
  {
    id: "baklava",
    name: "Baklava",
    category: "desserts",
    price: 6.5,
    image: "/template.jpeg",
    description: "Layers of flaky phyllo, pistachio, and honey syrup.",
    tags: ["halal", "sweet"],
  },
  {
    id: "milkshake",
    name: "Milkshake of the Night",
    category: "desserts",
    price: 7,
    image: "/template.jpeg",
    description:
      "A rotating lineup of creamy milkshakes — ask what we’re blending tonight.",
    tags: ["sweet"],
  },
  {
    id: "sauced-mango",
    name: "SAÜCED Mango Bottle",
    category: "sauced",
    price: 8.5,
    image: "/oroangesouce.jpeg",
    description:
      "Sweet-heat mango sauce bottled from the original Gyro Cafe recipe.",
    tags: ["sauced"],
  },
  {
    id: "sauced-white",
    name: "SAÜCED White Bottle",
    category: "sauced",
    price: 8.5,
    image: "/blacksouce.jpeg",
    description: "Creamy garlic-white sauce with a hint of citrus.",
    tags: ["sauced"],
  },
  {
    id: "sauced-hot",
    name: "SAÜCED Hot Bottle",
    category: "sauced",
    price: 8.5,
    image: "/RED_SAUCE.jpg",
    description:
      "Fiery hot sauce crafted to kick up platters, wraps, and everything in between.",
    tags: ["sauced", "spicy"],
  },
];

export const featuredSlides = [
  {
    id: "chicken-over-rice",
    name: "Chicken Over Rice",
    image: "/slideshow/Chicken Gyro Platter.png",
    description: "Classic late-night staple, drenched in white sauce.",
  },
  {
    id: "lamb-platter",
    name: "Lamb Gyro Platter",
    image: "/slideshow/lamb gyro platter.png",
    description: "Slow-roasted lamb sliced thin with a drizzle of hot sauce.",
  },
  {
    id: "falafel-wrap",
    name: "Falafel Wrap",
    image: "/slideshow/falafel pita.png",
    description: "Crunchy falafel, pickles, and tahini in warm pita.",
  },
  {
    id: "mixed-grill",
    name: "Mixed Grill Platter",
    image: "/slideshow/mix gyro platter.png",
    description: "Kofta kebab, chicken, and lamb — the full Gyro Cafe feast.",
  },
  {
    id: "baklava-milkshake",
    name: "Baklava & Milkshakes",
    image: "/slideshow/LOADED TOTS 2.jpg",
    description: "Sweet finishes and late-night cravings satisfied.",
  },
];

export const socialFeedItems = [
  {
    id: "post-1",
    image: "/slideshow/chicekn w fries platter.png",
    caption: "Chicken & fries platter hitting the grill.",
  },
  {
    id: "post-2",
    image: "/slideshow/BBQ chicken tikka platter.png",
    caption: "BBQ chicken tikka night. Smoky, saucy, perfect.",
  },
  {
    id: "post-3",
    image: "/slideshow/Fish Platter.png",
    caption: "Pescatarian platter, halal and fresh as always.",
  },
  {
    id: "post-4",
    image: "/slideshow/loaded friesn enhanced.jpg",
    caption: "Loaded fries for the late-night crew.",
  },
  {
    id: "post-5",
    image: "/slideshow/Chicken Gyro Naanwich.png",
    caption: "Naanwiches pressed with extra cheese — you’re welcome.",
  },
  {
    id: "post-6",
    image: "/slideshow/falafel pita.png",
    caption: "Falafel Fridays stay undefeated.",
  },
  {
    id: "post-7",
    image: "/slideshow/lamb curry platter.png",
    caption: "Comfort in a platter: Lamb curry over rice.",
  },
  {
    id: "post-8",
    image: "/slideshow/Falafel Platter.png",
    caption: "Plant-powered platters with all the sauces.",
  },
];

