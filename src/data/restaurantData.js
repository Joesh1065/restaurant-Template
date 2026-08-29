export const restaurantData = {
  name: "Luna Bistro",
  badge: "Award-Winning Modern Indian Fine Dining",
  tagline: "Contemporary Culinary Artistry",
  subtitle: "Blending centuries of regional Indian heritage with contemporary gastronomy, seasonal produce, crafted botanical cocktails, and warm hospitality.",
  intro: {
    title: "A Culinary Note From Luna",
    subtitle: "Crafted to Share • Rooted in Heritage • Elevated by Innovation",
    description: "At Luna Bistro, dining is a multi-sensory journey. Our menu captures the soul of India's diverse spice routes, reimagined with precision, modern technique, and beautiful aesthetic presentation."
  },
  heroImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=85&auto=format&fit=crop",
  featuredDishes: [
    {
      id: "featured-1",
      title: "Smoky Tandoori Cauliflower",
      tag: "Chef's Special",
      price: "₹380",
      description: "Wood-fired cauliflower steak marinated in saffron yogurt, finished with curry leaf emulsion and toasted sesame.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=85&auto=format&fit=crop"
    },
    {
      id: "featured-2",
      title: "Heritage Butter Chicken",
      tag: "Signature Bestseller",
      price: "₹520",
      description: "Charcoal-smoked free-range chicken in velvet tomato & wild fenugreek reduction, paired with sourdough garlic naan.",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=85&auto=format&fit=crop"
    },
    {
      id: "featured-3",
      title: "Saffron & Rose Panna Cotta",
      tag: "Seasonal Dessert",
      price: "₹260",
      description: "Silky Kashmiri saffron custard topped with edible rose petals, gold leaf, and roasted pistachio crumb.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=85&auto=format&fit=crop"
    }
  ],
  menuCategories: [
    { id: "starters", label: "Small Plates & Starters" },
    { id: "mains", label: "Main Courses" },
    { id: "desserts", label: "Desserts & Sweets" },
    { id: "drinks", label: "Craft Cocktails & Elixirs" }
  ],
  menuItems: {
    starters: [
      {
        id: "s1",
        name: "Crisp Truffle Paneer Chaat",
        badge: "Vegetarian",
        price: "₹320",
        description: "Artisanal cottage cheese crispies, tamarind glaze, smoked mint gel, truffle snow."
      },
      {
        id: "s2",
        name: "Charcoal Tandoori Cauliflower",
        badge: "Chef's Pick",
        price: "₹380",
        description: "Saffron yogurt marinade, gunpowder spice blend, curry leaf emulsion."
      },
      {
        id: "s3",
        name: "Malabar Pepper Prawns",
        badge: "Seafood",
        price: "₹420",
        description: "Jumbo prawns tossed with Tellicherry black pepper, curry leaves, and Meyer lemon."
      }
    ],
    mains: [
      {
        id: "m1",
        name: "Heritage Velvet Butter Chicken",
        badge: "Signature",
        price: "₹520",
        description: "San Marzano tomatoes, organic fenugreek, aged ghee — includes garlic tandoori naan."
      },
      {
        id: "m2",
        name: "Goan Kingfish Kokum Curry",
        badge: "Coastal Classic",
        price: "₹560",
        description: "Fresh coastal kingfish, coconut cream extract, wild kokum — served with fragrant basmati."
      },
      {
        id: "m3",
        name: "Artisanal Masala Dosa",
        badge: "Vegetarian",
        price: "₹280",
        description: "Golden fermented crepe, spiced potato mash, coconut sambar, three house chutneys."
      }
    ],
    desserts: [
      {
        id: "d1",
        name: "Kashmiri Saffron & Rose Panna Cotta",
        badge: "House Favorite",
        price: "₹260",
        description: "Pistachio crumb, citrus pearls, damask rose syrup infusion."
      },
      {
        id: "d2",
        name: "Deconstructed Gulab Jamun Cheesecake",
        badge: "Fusion",
        price: "₹290",
        description: "Baked cardamom cheesecake layered with warm gulab jamun and pistachio gelato."
      }
    ],
    drinks: [
      {
        id: "dr1",
        name: "Cardamom & Smoke Old Fashioned",
        badge: "Craft Cocktail",
        price: "₹380",
        description: "Small-batch bourbon, smoked black cardamom syrup, orange bitters."
      },
      {
        id: "dr2",
        name: "Artisanal Royal Masala Chai",
        badge: "Traditional",
        price: "₹120",
        description: "Single-estate Assam tea slow-brewed with fresh ginger, green cardamom, and clove."
      }
    ]
  },
  about: {
    title: "Our Culinary Philosophy",
    paragraphs: [
      "Founded on a passion for authentic flavors and modern culinary arts, Luna Bistro reimagines regional Indian gastronomy for the discerning palate.",
      "Every ingredient is meticulously sourced from local organic farms and spice estates across Southern and Northern India, creating an unforgettable atmosphere of luxury and warmth."
    ],
    quote: "An elevated, magnetic celebration of Indian gastronomy.",
    quoteAuthor: "Michelin Guide & Food Journal"
  },
  gallery: [
    {
      id: "g1",
      thumb: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=85&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=85&auto=format&fit=crop",
      alt: "Luna Bistro Luxury Dining Room Interior"
    },
    {
      id: "g2",
      thumb: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=85&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1400&q=85&auto=format&fit=crop",
      alt: "Chef Plating Modern Indian Dishes"
    },
    {
      id: "g3",
      thumb: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=85&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1400&q=85&auto=format&fit=crop",
      alt: "Craft Botanical Cocktails at the Bar"
    },
    {
      id: "g4",
      thumb: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=85&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1400&q=85&auto=format&fit=crop",
      alt: "Gourmet Indian Curry & Naan Presentation"
    }
  ],
  reviews: [
    {
      id: "r1",
      quote: "Luna Bistro sets a new standard for modern Indian fine dining. Impeccable presentation, complex flavors, and a sublime wine pairing list.",
      author: "Priya R. — Food Critic"
    },
    {
      id: "r2",
      quote: "The atmosphere is magnetic, intimate, and sophisticated. The Heritage Butter Chicken and Smoke Old Fashioned are unforgettable.",
      author: "Rahul K. — Connoisseur"
    },
    {
      id: "r3",
      quote: "An extraordinary dining experience where traditional spice routes meet modern culinary brilliance. Every dish tells a story.",
      author: "Anjali S. — Epicurean"
    }
  ],
  hours: [
    { days: "Mon – Thu", time: "12:00 PM — 10:30 PM" },
    { days: "Fri – Sat", time: "12:00 PM — 11:30 PM" },
    { days: "Sun", time: "11:00 AM — 10:00 PM" }
  ],
  contact: {
    address: "123 Moon Street, Indiranagar, Bengaluru, KA 560001",
    phone: "+91 98765 43210",
    phoneUrl: "tel:+919876543210",
    mapEmbedUrl: "https://www.google.com/maps?q=Bengaluru+India&output=embed"
  }
};
