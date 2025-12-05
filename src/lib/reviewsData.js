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
    name: "Charles",
    platform: "Grubhub",
    rating: 4,
    quote: "Every thing was great but Tseki sauce was not what I expected",
    date: "Today",
    orderDetails: "Lamb Gyro Sandwich, Kofta Kebab, Grape Leaves, Baklava",
  },
  {
    id: "grubhub-2",
    name: "Kris",
    platform: "Grubhub",
    rating: 4,
    quote:
      "The food here is actually great. Always fresh. But- it is never prepared the same way. It's so inconsistent that I'm never sure what is going to come. No matter what instructions I share or don't share. And that has been my expertise ordering day to day.",
    date: "3 days ago",
    orderDetails: "Baklava, Nachos A La Cafe",
    isTopReviewer: true,
  },
  {
    id: "grubhub-3",
    name: "Min Jung",
    platform: "Grubhub",
    rating: 5,
    quote: "Early delivery, food arrived warm, good value for how much food you get",
    date: "Jun 25, 2025",
    isTopReviewer: true,
  },
  {
    id: "grubhub-4",
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
      "The French Fries were more like potato wedges, absolutely loved them because they weren't crunchy to the point of just being really sharp in my mouth. The Chicken Gyro Platter was also awesome, no unnecessary ingredients. The large lasted me literally two days because I got full after eating some of it. The Chapli Kebabs are better elsewhere.",
    date: "Jan 1, 2023",
    isEmergingExpert: true,
  },
  {
    id: "doordash-2",
    name: "Kris A",
    platform: "DoorDash",
    rating: 4,
    quote:
      "I really think there has been an ownership change because the quality of the food is just so much better and the new menu items are great. There are still some issues with quality control like the hummus is sometimes spoiled and the meat is underseasoned. But when it's done right- the food is so so good here. Hot plates, crispy edges, crispy fries, fresh tomatoes in the salad! The meats are always fresh and the platter portions are great. Keep it up team!! It's easily one of the best fast and delicious choices in the neighborhood!",
    date: "Sep 30, 2025",
  },
  {
    id: "doordash-3",
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
    name: "Galina G.",
    platform: "Uber Eats",
    rating: 4,
    quote:
      "thank you very much, this is really delicious! I especially liked the baklava, it was very tender and melted in your mouth. It's a shame that I received 1 drink instead of 2, I can't know whose fault it was – the store or the delivery person, but it's a little unpleasant.",
    date: "Mar 18, 2024",
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
      "If u see people filling in here just kno u need to get right behind them! Fresh, well seasoned and filling. I'd recommend anything but the fried chicken, it just sits there. So I went back again after not having been in some time... I got the lamb chops this time... omg. The flavor the chargrilled bits.. they're so good! And I can't stress to you enough about the Curry lamb!!🤤🤤🤤",
    date: "11 months ago",
    isLocalGuide: true,
    reviewCount: 58,
    recommendedDishes: "Lamb over Rice Platter",
  },
  {
    id: "google-3",
    name: "Jefe Birkner",
    platform: "Google",
    rating: 5,
    quote:
      "The guys working the counter were inconsistent, one struggled to understand my request, the other jumped in to help. Ordered a combo of lamb gyro and falafel over salad, mixed veg, and some pickled peppers. All super yummy. 6:30 on a Saturday night, all seats are empty, I think most of the business is takeout. I'm not a fan of distracting TV while I eat, and watching an auction of $1 million+ cars is confusing, like who watches this, certainly few of the people that might be able to participate in such an auction. Wish I could just read, in the quiet....",
    date: "10 months ago",
    isLocalGuide: true,
    reviewCount: 142,
  },
];
