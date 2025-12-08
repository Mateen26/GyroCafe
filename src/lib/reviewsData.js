export const platformLinks = {
  grubhub: "https://www.grubhub.com/restaurant/gyro-cafe-580-coney-island-ave-brooklyn/442936",
  doordash: "https://www.doordash.com/store/gyro-cafe-brooklyn-144956/1261218/?srsltid=AfmBOortroiw4sg1bvPjK8OuCfjln1stnhSgwmHVvqYFApnS8UoXokbP",
  ubereats: "https://www.ubereats.com/store/gyro-cafe-kensington-coney-island/sKOKD2u1T6a8rd72XqsPng?ps=1",
  google: "https://www.google.com/search?sca_esv=33d7c6e47e76292a&cs=0&q=Gyro+Cafe&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s_cr44RnMQoNPNkepZsL4bM5z1KB-aOp4VZl9xrYOWIeQyieTFn89dM0eNcW5GZpnpYVzKLMWAUJjRB0g_y0FTW3pB2l&sa=X&ved=2ahUKEwiDh_2ih6KRAxUDhf0HHammDJIQrrQLegQIHBAA&biw=1396&bih=632&dpr=1.38",
};

export const platformStats = {
  grubhub: {
    name: "Grubhub",
    rating: 4.8,
    count: 1120,
    url: platformLinks.grubhub,
  },
  doordash: {
    name: "DoorDash",
    rating: 4.5,
    count: 2000,
    url: platformLinks.doordash,
    countLabel: "2,000+",
  },
  ubereats: {
    name: "Uber Eats",
    rating: 4.6,
    count: 5000,
    url: platformLinks.ubereats,
    countLabel: "5,000+",
  },
  google: {
    name: "Google",
    rating: 5.0,
    count: 590,
    url: platformLinks.google,
  },
};

export const reviewsSummary = {
  rating: 4.8,
  count: 8710,
  platforms: ["Google", "Grubhub", "UberEats", "DoorDash"],
  platformStats: platformStats,
};

export const reviews = [
  // Grubhub Reviews
  {
    id: "grubhub-1",
    name: "Min Jung",
    platform: "Grubhub",
    rating: 5,
    quote: "Early delivery, food arrived warm, good value for how much food you get",
    date: "Jun 25, 2025",
    isTopReviewer: true,
  },
  {
    id: "grubhub-2",
    name: "Michelle",
    platform: "Grubhub",
    rating: 5,
    quote:
      "They forgot to include the fried chicken thighs in my order so I called the restaurant. The staff was sincerely apologetic, the delivery man was friendly and the food was delicious. I intend on ordering from Gyro Cafe again.",
    date: "Apr 02, 2025",
    isTopReviewer: true,
  },
  // DoorDash Reviews
  {
    id: "doordash-1",
    name: "Sumaya J",
    platform: "DoorDash",
    rating: 5,
    quote:
      "The French Fries were more like potato wedges, absolutely loved them because they weren't crunchy to the point of just being really sharp in my mouth. The Chicken Gyro Platter was also awesome, no unnecessary ingredients. The large lasted me literally two days because I got full after eating some of it.",
    date: "Jan 1, 2023",
    isEmergingExpert: true,
  },
  {
    id: "doordash-2",
    name: "Coleman B",
    platform: "DoorDash",
    rating: 5,
    quote:
      "amazingly perfectly seasoned meat and fluffy pita with generous portions of veggies and great service! winner!",
    date: "Jun 2, 2023",
  },
  // Uber Eats Reviews
  {
    id: "ubereats-1",
    name: "Tanvir Meah",
    platform: "Uber Eats",
    rating: 5,
    quote:
      "I order from gyro cafe using uber eats all the time and they never disappoint. The food is always fresh and tastes great. My go to are the lamb gyro pita wrap and baklava.",
    date: "7 months ago",
    isLocalGuide: true,
    reviewCount: 21,
  },
  {
    id: "ubereats-2",
    name: "Amber M.",
    platform: "Uber Eats",
    rating: 5,
    quote:
      "In my entire 14yrs of living in NYC, this is hands-down the BEST tasting gyro that I've had in the entire city! I was pleasantly surprised at how authentic the flavors were. I'll definitely ONLY be getting my gyros from here, from now on!",
    date: "Mar 29, 2024",
  },
  // Google Reviews
  {
    id: "google-1",
    name: "Ben GG",
    platform: "Google",
    rating: 5,
    quote:
      "I've been coming here since 2009. Best gyro platters in BK. If you like middle eastern stand on 86th street or the halal guys than this will hands down be your next favorite",
    date: "a month ago",
    isLocalGuide: true,
    reviewCount: 133,
  },
  {
    id: "google-2",
    name: "London Kelly",
    platform: "Google",
    rating: 5,
    quote:
      "If u see people filling in here just kno u need to get right behind them! Fresh, well seasoned and filling. So I went back again after not having been in some time... I got the lamb chops this time... omg. The flavor the chargrilled bits.. they're so good! And I can't stress to you enough about the Curry lamb!!🤤🤤🤤",
    date: "11 months ago",
    isLocalGuide: true,
    reviewCount: 58,
    recommendedDishes: "Lamb over Rice Platter",
  },
  {
    id: "google-3",
    name: "Tanvir Meah",
    platform: "Google",
    rating: 5,
    quote:
      "I order from gyro cafe using uber eats all the time and they never disappoint. The food is always fresh and tastes great. My go to are the lamb gyro pita wrap and baklava.",
    date: "7 months ago",
    isLocalGuide: true,
    reviewCount: 21,
  },
  {
    id: "google-4",
    name: "gunsbound",
    platform: "Google",
    rating: 5,
    quote:
      "The lamb gyro nanwich I had was very big. Kind of unwieldy to eat with out meat and stuff spilling out. I like it.",
    date: "2 months ago",
    isLocalGuide: true,
    reviewCount: 414,
  },
  {
    id: "google-5",
    name: "Monirul Mohamed Alam",
    platform: "Google",
    rating: 5,
    quote:
      "Really really great food. Even after many years, still highly recommended for quick grab bites. Especially for takeouts, an excellent 👌 choice.",
    date: "6 months ago",
    isLocalGuide: true,
    reviewCount: 101,
  },
  {
    id: "google-6",
    name: "Muheed Ali",
    platform: "Google",
    rating: 5,
    quote: "Amazing food! Very homey feel, great people",
    date: "3 months ago",
    reviewCount: 9,
  },
  {
    id: "google-7",
    name: "Simas Urbonas",
    platform: "Google",
    rating: 5,
    quote:
      "The best halal spot for me, period. I've been coming here for years and after traveling so much, this is where I always come back to for a lamb gyro 🥙",
    date: "5 months ago",
    isLocalGuide: true,
    reviewCount: 42,
  },
  {
    id: "google-8",
    name: "Vinny Wang",
    platform: "Google",
    rating: 5,
    quote:
      "I've been ordering online from here for over a year now and I've gotten their mixed platter dish every time so I'll only speak to that specific dish. It is DELICIOUS!! I love this place and I've probably had the mixed platter close to 10 times.",
    date: "9 months ago",
    isLocalGuide: true,
    reviewCount: 91,
  },
  {
    id: "google-9",
    name: "Ayaan P",
    platform: "Google",
    rating: 5,
    quote:
      "My favorite halal place in new york. Tasty meat with good ratio of veggies. Slightly pricy but worth it. Would recommend for sure.",
    date: "5 years ago",
    reviewCount: 1,
  },
  {
    id: "google-10",
    name: "Mehmet SİVAS",
    platform: "Google",
    rating: 5,
    quote:
      "Always nice, clean, big portions, smiling brothers working here whenever i am close i visit",
    date: "2 years ago",
    isLocalGuide: true,
    reviewCount: 59,
  },
  {
    id: "google-11",
    name: "Online User",
    platform: "Google",
    rating: 5,
    quote: "Always fast service and good food",
    date: "7 months ago",
    isLocalGuide: true,
    reviewCount: 44,
  },
  {
    id: "google-12",
    name: "cheetah 1",
    platform: "Google",
    rating: 5,
    quote: "Always the best and consistent taste... one of brooklyns best..",
    date: "2 months ago",
    isLocalGuide: true,
    reviewCount: 64,
  },
];
