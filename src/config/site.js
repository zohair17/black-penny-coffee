 /**
 * Single source of truth for hero content.
 * Keeping copy/links here lets the presentational components stay reusable
 * and makes future edits (new event, extra nav link) a one-line change.
 */
export const siteConfig = {
  name: "The Black Penny",
  /** Brand title rendered as stacked lines, matching the hero design. */
  titleLines: ["The Black Penny"],
  tagline: "Coffee House & Kitchen",

  nav: [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Location", href: "#location" },
  ],

  event: {
    heading: "Event",
    lines: ["Live Music", "Oguzhan & Mehmet", "21:30", "28 Şubat"],
  },

  about: {
    centerLabel: "About",
    centerLabelSub: "Us",
    story: {
      heading: "Our Story",
      // Placeholder copy — swap for the real Black Penny story when ready.
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Born from a love of great coffee and honest food, The Black Penny is where craft meets community. Every cup is poured with care, every plate made to bring people together.",
    },
    values: {
      heading: "Our Value",
      items: [
        { label: "Quality Ingredients", icon: "leaf" },
        { label: "Made with love", icon: "heart" },
        { label: "Community first", icon: "users" },
        { label: "Experience That Last", icon: "coffee" },
      ],
    },
  },

  location: {
    heading: "Find Us",
    intro:
      "Come and experience The Black Penny in person — great coffee, warm food and a welcoming table.",
    coords: { lat: 35.3342037, lng: 33.3316774 },
    address: {
      name: "The Black Penny",
      lines: ["İskenderun Caddesi No. 5", "Gazimağusa (Famagusta)", "North Cyprus"],
    },
    hours: [
      { days: "Monday – Thursday", time: "08:00 – 23:00" },
      { days: "Friday – Saturday", time: "08:00 – 01:00" },
      { days: "Sunday", time: "09:00 – 23:00" },
    ],
    contact: {
      phone: "+90 533 000 00 00",
      email: "hello@theblackpenny.com",
    },
  },

  social: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  ],

  copyright: `© ${new Date().getFullYear()} The Black Penny Coffee House & Kitchen. All rights reserved.`,
};

export const assets = {
  /** Top-down table shot that backs the hero. */
  heroBackground: "/asset/backgroundImg.png",
  logo: { src: "/asset/logo.png", width: 772, height: 747 },
};
