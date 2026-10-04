import { MenuItem, DiningSpace, Reservation, GalleryItem, PromoBanner, ReviewItem } from '../types/restaurant';

// Generated asset paths
export const ASSETS = {
  hero: '/src/assets/images/hero_singh_restaurant_1791139523547.jpg',
  rooftop: '/src/assets/images/dining_ganges_rooftop_1791139534640.jpg',
  biryani: '/src/assets/images/dish_awadhi_biryani_1791139546524.jpg',
  galouti: '/src/assets/images/dish_galouti_kebab_1791139558240.jpg',
};

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Royal Appetizers
  {
    id: 'dish-1',
    name: 'Truffle Galouti Kebab',
    hindiName: 'ग़लौटी कबाब',
    category: 'Royal Appetizers',
    price: 1450,
    description: 'Melt-in-the-mouth Awadhi smoked lamb pate seasoned with 36 secret potli spices, infused with black winter truffle and perched on miniature saffron ulte tawe ka paratha.',
    culinaryOrigin: 'Nawabs of Awadh Royal Kitchens, 1850s',
    dietary: ['non-veg', 'chef-signature'],
    image: ASSETS.galouti,
    allergens: ['Dairy', 'Gluten', 'Nut trace'],
    spiceLevel: 2,
    isAvailable: true,
    preparationTime: '22 mins',
    pairingRecommendation: 'Ganga Aarti Smoked Saffron Cooler or Shiraz Reserve',
    calories: '420 kcal'
  },
  {
    id: 'dish-2',
    name: 'Banarasi Tamatar Chaat Tartlet',
    hindiName: 'बनारसी टमाटर चाट टार्टलेट',
    category: 'Royal Appetizers',
    price: 950,
    description: 'Deconstructed celebration of Varanasi’s historic street delicacy: charred heirloom plum tomatoes simmered in hing-cumin nectar, served in crisp gram flour filigree cups crowned with saffron foam and churned ginger pearls.',
    culinaryOrigin: 'Gowdowlia Chauraha Heritage recipe, Varanasi',
    dietary: ['pure-veg', 'sattvic'],
    image: ASSETS.hero,
    allergens: ['Dairy'],
    spiceLevel: 3,
    isAvailable: true,
    preparationTime: '15 mins',
    pairingRecommendation: 'Royal Banaras Thandai',
    calories: '280 kcal'
  },
  {
    id: 'dish-3',
    name: 'Nadru Ke Goolar',
    hindiName: 'नदरू के गूलर',
    category: 'Royal Appetizers',
    price: 1150,
    description: 'Crisp hand-pounded lotus stem croquettes enveloped around a molten spiced wild fig and pomegranate reduction, dusted with dried marigold ash.',
    culinaryOrigin: 'Ancient Gangetic riparian cuisine',
    dietary: ['pure-veg', 'jain'],
    image: ASSETS.rooftop,
    allergens: ['Nuts'],
    spiceLevel: 2,
    isAvailable: true,
    preparationTime: '18 mins',
    pairingRecommendation: 'Mogra & Lychee Botanical Fizz',
    calories: '310 kcal'
  },
  {
    id: 'dish-4',
    name: 'Murgh Malai Zaffrani Kebab',
    hindiName: 'मुर्ग़ मलाई ज़ाफ़रानी कबाब',
    category: 'Royal Appetizers',
    price: 1350,
    description: 'Tender corn-fed chicken morsels steeped overnight in clotted Varanasi malai, green cardamom, roasted pine nuts, and saffron filaments, slow-charred over fragrant fruitwood coals.',
    culinaryOrigin: 'Oudh Dastarkhwan Heritage',
    dietary: ['non-veg', 'chef-signature'],
    image: ASSETS.galouti,
    allergens: ['Dairy', 'Nuts'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: '20 mins',
    pairingRecommendation: 'Chardonnay or Kashi Cardamom Cold Brew',
    calories: '490 kcal'
  },

  // Heritage Mains
  {
    id: 'dish-5',
    name: 'Royal Awadhi Dum Biryani',
    hindiName: 'शाही अवधी दम बिरयानी',
    category: 'Heritage Mains',
    price: 1850,
    description: 'Fragrant aged Dehradun basmati rice and tender spring lamb layered with kewra, ittr, caramelized shallots, and milk steeped in Kashmiri saffron. Sealed with whole wheat dough in a hand-hammered brass vessel, slow-steamed on low ember coals.',
    culinaryOrigin: 'Royal Courts of Lucknow & Banaras Estate',
    dietary: ['non-veg', 'chef-signature'],
    image: ASSETS.biryani,
    allergens: ['Dairy', 'Nuts'],
    spiceLevel: 2,
    isAvailable: true,
    preparationTime: '30 mins',
    pairingRecommendation: 'Burani Garlic Raita & Aged Awadh Gravy',
    calories: '680 kcal'
  },
  {
    id: 'dish-6',
    name: 'Dal-e-Banaras (Simmered 36 Hours)',
    hindiName: 'दाल-ए-बनारस',
    category: 'Heritage Mains',
    price: 980,
    description: 'Whole black urad lentils and kidney beans slow-simmered over smoldering sal-wood tandoor for 36 hours with churned white butter, vine-ripened San Marzano-style UP tomatoes, and hand-ground royal garam masala.',
    culinaryOrigin: 'Singh Family Ancestral Pantry, 1984',
    dietary: ['pure-veg'],
    image: ASSETS.hero,
    allergens: ['Dairy'],
    spiceLevel: 2,
    isAvailable: true,
    preparationTime: '15 mins',
    pairingRecommendation: 'Truffle Naan or Warqi Paratha',
    calories: '450 kcal'
  },
  {
    id: 'dish-7',
    name: 'Subz Shahi Nawabi Handi',
    hindiName: 'सब्ज़ शाही नबाबी हांडी',
    category: 'Heritage Mains',
    price: 1250,
    description: 'Garden-fresh baby lotus roots, baby corn, green peas, and heirloom carrots tossed in a velvety saffron-mace gravy enriched with melon seed puree and fragrant rose water.',
    culinaryOrigin: 'Kashi Temple Palace Banquet cuisine',
    dietary: ['pure-veg', 'sattvic', 'jain'],
    image: ASSETS.rooftop,
    allergens: ['Dairy', 'Nuts'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: '20 mins',
    pairingRecommendation: 'Sheermal & Saffron Pilaf',
    calories: '390 kcal'
  },
  {
    id: 'dish-8',
    name: 'Paneer Lababdar-e-Kashi',
    hindiName: 'पनीर लबाबदार-ए-काशी',
    category: 'Heritage Mains',
    price: 1280,
    description: 'Artisanal cottage cheese handcrafted daily from organic Gangetic Gir cow milk, gently simmered in a luscious cashew-onion reduction and topped with grated khoya and smoked pistachios.',
    culinaryOrigin: 'Ancient Varanasi Dairy Tradition',
    dietary: ['pure-veg'],
    image: ASSETS.biryani,
    allergens: ['Dairy', 'Nuts'],
    spiceLevel: 2,
    isAvailable: true,
    preparationTime: '22 mins',
    pairingRecommendation: 'Laccha Paratha or Garlic Naan',
    calories: '520 kcal'
  },

  // Tandoori Specials & Breads
  {
    id: 'dish-9',
    name: 'Truffle & Aged Cheddar Naan',
    hindiName: 'ट्रफ़ल व चेद्दार नान',
    category: 'Tandoori Specials',
    price: 450,
    description: 'Clay-oven baked leavened bread brushed with Italian black summer truffle oil, melted aged cheddar, and micro-cilantro leaves.',
    culinaryOrigin: 'Modern Franco-Awadhi Fusion',
    dietary: ['pure-veg'],
    image: ASSETS.hero,
    allergens: ['Gluten', 'Dairy'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: '10 mins',
    pairingRecommendation: 'Dal-e-Banaras',
    calories: '280 kcal'
  },
  {
    id: 'dish-10',
    name: 'Royal Awadhi Sheermal',
    hindiName: 'शाही शीरमाल',
    category: 'Tandoori Specials',
    price: 380,
    description: 'Traditional saffron-enriched sweet flatbread kneaded with whole milk, clarified cow ghee, and subtle kewra essence, baked on an iron griddle.',
    culinaryOrigin: 'Nawabi Breakfast Tradition',
    dietary: ['pure-veg'],
    image: ASSETS.galouti,
    allergens: ['Gluten', 'Dairy'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: '12 mins',
    pairingRecommendation: 'Royal Dum Biryani or Galouti Kebab',
    calories: '310 kcal'
  },
  {
    id: 'dish-11',
    name: 'Bharwan Tandoori Guchhi',
    hindiName: 'भरवां तंदूरी गुच्छी',
    category: 'Tandoori Specials',
    price: 2450,
    description: 'Wild Himalayan morels stuffed with roasted pistachios, dried apricots, and artisanal chenna, smoked in clay oven with clarified butter and holy tulsi smoke.',
    culinaryOrigin: 'Himalayan & Gangetic Haute Cuisine',
    dietary: ['pure-veg', 'chef-signature'],
    image: ASSETS.rooftop,
    allergens: ['Dairy', 'Nuts'],
    spiceLevel: 2,
    isAvailable: true,
    preparationTime: '25 mins',
    pairingRecommendation: 'Warqi Paratha',
    calories: '340 kcal'
  },

  // Artisanal Desserts
  {
    id: 'dish-12',
    name: 'The Sacred Malaiyo Cloud',
    hindiName: 'बनारसी मलइयो क्लाउड',
    category: 'Artisanal Desserts',
    price: 850,
    description: 'Varanasi’s most coveted winter masterpiece elevated: delicate ethereal milk foam collected under the open night sky, infused with pure saffron strands, crushed pistachios, cardamom mist, and topped with 24K edible gold leaf.',
    culinaryOrigin: 'Chowk Varanasi Historic Winter Miracle',
    dietary: ['pure-veg', 'sattvic', 'chef-signature'],
    image: ASSETS.hero,
    allergens: ['Dairy', 'Nuts'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: '10 mins',
    pairingRecommendation: 'Warm Saffron Kahwa',
    calories: '240 kcal'
  },
  {
    id: 'dish-13',
    name: 'Shahi Tukda Gold Crest',
    hindiName: 'शाही टुकड़ा गोल्ड क्रेस्ट',
    category: 'Artisanal Desserts',
    price: 920,
    description: 'Crisp brioche soaked in saffron-rose syrup, layered with slow-reduced Lucknowi rabri, candied Damask rose petals, and silver vark foil.',
    culinaryOrigin: 'Awadhi Palace Banquets',
    dietary: ['pure-veg'],
    image: ASSETS.biryani,
    allergens: ['Gluten', 'Dairy', 'Nuts'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: '14 mins',
    pairingRecommendation: 'Espresso or Kashi Masala Chai',
    calories: '490 kcal'
  },
  {
    id: 'dish-14',
    name: 'Banarasi Meetha Paan Kulfi',
    hindiName: 'बनारसी पान कुल्फ़ी',
    category: 'Artisanal Desserts',
    price: 750,
    description: 'Slow-churned pot kulfi crafted from Maghai betel leaves, gulkand (sun-cooked rose jam), candied fennel seeds, and roasted dry fruits, set in clay matkas.',
    culinaryOrigin: 'Assi Ghat Legendary Paan Confectioners',
    dietary: ['pure-veg', 'sattvic'],
    image: ASSETS.galouti,
    allergens: ['Dairy', 'Nuts'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: '8 mins',
    pairingRecommendation: 'Cardamom Scented Tisane',
    calories: '320 kcal'
  },

  // Exotic Mocktails & Botanical Elixirs
  {
    id: 'dish-15',
    name: 'Ganga Aarti Smoked Saffron Cooler',
    hindiName: 'गंगा आरती स्मूक्ड ज़ाफ़रान कूलर',
    category: 'Exotic Mocktails',
    price: 650,
    description: 'Cold-steeped Kashmiri saffron and vetiver grass syrup shaken with fresh Valencia orange juice, smoked sandalwood bark mist, and sparkling mountain spring water.',
    culinaryOrigin: 'Singh Signature Botanical Bar',
    dietary: ['pure-veg', 'sattvic', 'chef-signature'],
    image: ASSETS.rooftop,
    allergens: [],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: '7 mins',
    pairingRecommendation: 'Truffle Galouti Kebab',
    calories: '120 kcal'
  },
  {
    id: 'dish-16',
    name: 'Royal Banaras Thandai',
    hindiName: 'शाही बनारसी ठंडाई',
    category: 'Exotic Mocktails',
    price: 720,
    description: 'Varanasi’s revered sacred nectar prepared with crushed almonds, watermelon seeds, black peppercorns, dried rose petals, green cardamom, fennel seeds, and creamy A2 milk.',
    culinaryOrigin: 'Shivratri Celebration Traditional Elixir',
    dietary: ['pure-veg', 'sattvic'],
    image: ASSETS.hero,
    allergens: ['Dairy', 'Nuts'],
    spiceLevel: 2,
    isAvailable: true,
    preparationTime: '6 mins',
    pairingRecommendation: 'Banarasi Tamatar Chaat',
    calories: '260 kcal'
  },
  {
    id: 'dish-17',
    name: 'Mogra & Lychee Botanical Fizz',
    hindiName: 'मोगरा व लीची फिज़',
    category: 'Exotic Mocktails',
    price: 620,
    description: 'Fragrant Arabian jasmine (Mogra) distillate gently blended with sweet Indian lychee reduction, fresh lime, and tonic water with edible gold flakes.',
    culinaryOrigin: 'Summer Courtyard Elixir',
    dietary: ['pure-veg', 'sattvic'],
    image: ASSETS.rooftop,
    allergens: [],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: '5 mins',
    pairingRecommendation: 'Nadru Ke Goolar',
    calories: '110 kcal'
  }
];

export const INITIAL_DINING_SPACES: DiningSpace[] = [
  {
    id: 'grand-dining-room',
    name: 'The Grand Dining Room',
    subtitle: 'Palatial Awadhi & Banarasi Heritage Sanctuary',
    capacity: 75,
    timings: 'Lunch: 12:30 PM - 3:00 PM | Dinner: 7:00 PM - 11:45 PM',
    atmosphere: 'Regal, intimate, acoustic warmth with live sitar and santoor during evening services.',
    image: ASSETS.hero,
    description: 'Envisioned as an ode to Varanasi’s royal estates, The Grand Dining Room boasts 18-foot vaulted ceilings adorned with Belgian crystal chandeliers, hand-carved Chunar sandstone jali screens, and bespoke handloom Banarasi silk wall upholstery.',
    highlights: [
      'Live classical Hindustani Santoor & Sitar recitals from 7:30 PM',
      'Handcrafted solid brass tableware and bone china by master artisans',
      'Dedicated Sommelier and Royal Khansama table-side carving',
      'Private Maharaja Booths accommodating 4 to 8 guests'
    ],
    dressCode: 'Smart Casual to Traditional Formal Elegance',
    recommendedFor: 'Anniversaries, Dignitary Hosting, Family Banquets',
    isAvailable: true
  },
  {
    id: 'ganges-rooftop',
    name: 'The Ganges Rooftop',
    subtitle: 'Starlit Panoramic Riverfront Terrace',
    capacity: 60,
    timings: 'Dinner Service Only: 6:30 PM - 12:00 Midnight',
    atmosphere: 'Breezy riverfront serenity, gentle Ganga chants in the distance, flickering oil diya lamps.',
    image: ASSETS.rooftop,
    description: 'Perched high above the sacred riverfront, The Ganges Rooftop offers an unencumbered 180-degree vista of the holy Ganges ghats and temple spires. Savor artisanal kebabs and smoked saffron coolers while cool river breezes whisper ancient legends.',
    highlights: [
      'Front-row view of distant evening Ganga Aarti illumination',
      'Teakwood pergolas with private candlelight curtained pavilions',
      'Exclusive 7-course Chef’s Sunset Degustation menu available',
      'Telescope station for moonlit riverfront stargazing'
    ],
    dressCode: 'Resort Chic / Evening Smart Casual',
    recommendedFor: 'Romantic Rendezvous, Sunset Aperitifs, Starlit Celebrations',
    isAvailable: true
  },
  {
    id: 'singh-lounge-bar',
    name: 'Singh Lounge & Botanical Bar',
    subtitle: 'Artisanal Elixirs, Tapas & Rare Infusions',
    capacity: 45,
    timings: 'Continuous Service: 2:00 PM - 12:30 AM',
    atmosphere: 'Mood-lit velvet booths, brass cocktail stations, curated ambient jazz and fusion ragas.',
    image: ASSETS.galouti,
    description: 'A sanctuary of sensory indulgence where mixologists draw upon ancient Ayurvedic botanicals, rare Kashmiri saffron, and cold-pressed Gangetic herbs. Complement your drink with our avant-garde royal tapas and rare single-origin Darjeeling flushes.',
    highlights: [
      'Signature zero-proof and artisanal botanical elixirs',
      'Tasting flights of rare single-estate Himalayan teas',
      'Gourmet small plates and smoking tandoor skewers',
      'Acoustic evening lounge sets and vinyl listening hours'
    ],
    dressCode: 'Contemporary Elegant',
    recommendedFor: 'Pre-dinner Apéritifs, Business Conclaves, Late-night Epilogues',
    isAvailable: true
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'SR-VNS-8492',
    guestName: 'Maharaja Digvijay Singh',
    phone: '+91 98200 44123',
    email: 'digvijay.singh@royalestate.in',
    guestCount: 6,
    date: '2026-10-06',
    timeSlot: '8:00 PM',
    spaceId: 'grand-dining-room',
    seatingPreference: 'Maharaja Private Booth',
    occasion: 'Anniversary',
    dietaryNotes: 'Awadhi Chef Degustation, low sodium for 2 guests.',
    specialRequests: 'Welcome with fresh Damask rose garland & vintage silver service.',
    status: 'confirmed',
    createdAt: '2026-10-04T10:15:00Z',
    totalEstimatedInr: 12500
  },
  {
    id: 'SR-VNS-8493',
    guestName: 'Dr. Evelyn Montgomery',
    phone: '+44 7700 900482',
    email: 'e.montgomery@oxford.ac.uk',
    guestCount: 2,
    date: '2026-10-05',
    timeSlot: '7:15 PM',
    spaceId: 'ganges-rooftop',
    seatingPreference: 'Rooftop River View',
    occasion: 'Romantic Rendezvous',
    dietaryNotes: 'Sattvic preparation (No onion, no garlic), Nut allergy on one person.',
    specialRequests: 'Riverfront terrace edge table overlooking illuminated ghats.',
    status: 'confirmed',
    createdAt: '2026-10-04T08:30:00Z',
    totalEstimatedInr: 5800
  },
  {
    id: 'SR-VNS-8494',
    guestName: 'Rajesh & Meera Agarwal',
    phone: '+91 94150 18274',
    email: 'rajesh.agarwal@varanasitrade.com',
    guestCount: 8,
    date: '2026-10-04',
    timeSlot: '1:15 PM',
    spaceId: 'grand-dining-room',
    seatingPreference: 'Indoor AC',
    occasion: 'Family Celebration',
    dietaryNotes: 'Strict Jain preparation for all dishes.',
    specialRequests: 'Family gathering after Kashi Vishwanath Darshan.',
    status: 'seated',
    createdAt: '2026-10-03T16:00:00Z',
    totalEstimatedInr: 14200
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Grand Heritage Dining Hall',
    category: 'Ambiance',
    image: ASSETS.hero,
    caption: 'Belgian crystal chandeliers cast a golden halo across carved Chunar sandstone arches and white linen tables.'
  },
  {
    id: 'gal-2',
    title: 'Twilight Over The Holy Ganga',
    category: 'Ganges View',
    image: ASSETS.rooftop,
    caption: 'The starlit Ganges terrace offers sweeping panoramic views of holy ghats and ancient temple spires.'
  },
  {
    id: 'gal-3',
    title: 'Royal Awadhi Dum Biryani Plating',
    category: 'Culinary',
    image: ASSETS.biryani,
    caption: 'Slow-cooked in hand-hammered brass with 24K gold foil and royal kewra essence.'
  },
  {
    id: 'gal-4',
    title: 'Truffle Galouti on Saffron Paratha',
    category: 'Culinary',
    image: ASSETS.galouti,
    caption: 'Our signature melt-in-the-mouth kebab seasoned with 36 secret potli herbs and fresh winter truffle.'
  },
  {
    id: 'gal-5',
    title: 'Singh Botanical Bar & Lounge',
    category: 'Ambiance',
    image: ASSETS.galouti,
    caption: 'Plush velvet sanctuaries paired with artisanal botanical infusions and rare single-estate Himalayan teas.'
  },
  {
    id: 'gal-6',
    title: 'Heritage Architectural Details',
    category: 'Heritage',
    image: ASSETS.hero,
    caption: 'Bespoke handloom Banarasi silk brocades and hand-chiseled stone lattice screens reflecting ancient crafts.'
  }
];

export const INITIAL_BANNER: PromoBanner = {
  id: 'banner-dev-deepavali',
  title: 'Dev Deepavali & Royal Ganga Soirée 2026',
  subtitle: 'Experience 1,000,000 glowing river lamps with our 7-Course Royal Awadhi Tasting Menu on The Ganges Rooftop.',
  badgeText: 'Curated Seasonal Experience',
  ctaText: 'Reserve Riverfront Table',
  ctaLink: '#reservation',
  active: true,
  validUntil: 'Nov 15, 2026'
};

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Sanjoy K. Roy',
    role: 'Managing Director, Teamwork Arts',
    location: 'New Delhi & London',
    rating: 5,
    comment: 'Singh Restaurant is without question Varanasi’s culinary jewel. The Truffle Galouti Kebab and the ambient sitar notes in the Grand Hall make you feel transported to the golden age of Awadh.',
    date: 'September 2026',
    source: 'Verified Patron'
  },
  {
    id: 'rev-2',
    author: 'Lady Camilla Harwood',
    role: 'Travel & Culture Critic',
    location: 'Condé Nast Traveller UK',
    rating: 5,
    comment: 'Dine on The Ganges Rooftop at dusk. The sacred river reflects a million temple lamps while you savor the Malaiyo Cloud. An unforgettable, Michelin-caliber experience.',
    date: 'August 2026',
    source: 'Condé Nast Traveller'
  },
  {
    id: 'rev-3',
    author: 'Vikramaditya Singhania',
    role: 'Industrialist & Art Patron',
    location: 'Mumbai',
    rating: 5,
    comment: 'The Dal-e-Banaras simmered for 36 hours is perfection. The hospitality honors the sacred tradition of Atithi Devo Bhava with unmatched regal poise.',
    date: 'October 2026',
    source: 'Luxury Dining Guild'
  }
];
