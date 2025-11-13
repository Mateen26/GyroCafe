export const siteConfig = {
  name: "Gyro Cafe",
  tagline: "Gyros, The Cafe Way.",
  since: "Since 2007",
  address: "580 Coney Island Ave, Brooklyn, NY 11218",
  phone: "718-438-0860",
  email: "gyrocafe1992@gmail.com",
  hours: "Open 7 Days a Week · 10 AM – 1 AM",
  halalCertified: true,
  deliveryUrl:
    process.env.NEXT_PUBLIC_DELIVERY_URL ||
    "https://www.ubereats.com/store/gyro-cafe-kensington-coney-island/sKOKD2u1T6a8rd72XqsPng?srsltid=AfmBOooeocbY2XSV2nDtSf3Mx2UBpcCsBtjdXUdj4EXof8h928EKW6SK",
  googleReviewUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
    "https://maps.google.com/?cid=gyro-cafe-review-placeholder",
  social: [
    {
      label: "Instagram",
      href: "https://instagram.com/gyrocafebk",
      handle: "@GyroCafeBK",
    },
    {
      label: "Facebook",
      href: "https://facebook.com/gyrocafe",
    },
  ],
  navLinks: [
    { label: "About Us", href: "/about" },
    { label: "Menu", href: "/menu" },
    { label: "Sauced", href: "/sauced" },
    { label: "Catering", href: "/catering" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact Us", href: "/contact" },
  ],
  ctas: {
    pickup: { label: "Order Pickup", href: "/order-pickup" },
    delivery: { label: "Order Delivery" },
  },
  map: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.5109800122!2d-73.97444902353211!3d40.64067277140792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGyro%20Cafe!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus",
    link: "https://maps.google.com/?q=Gyro+Cafe+Brooklyn",
  },
};

export const quickFacts = [
  "Open Late",
  "Family-Owned",
  "Serving Brooklyn Since 2007",
  "Halal Certified",
];

