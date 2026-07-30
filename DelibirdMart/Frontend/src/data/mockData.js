/**
 * mockData.js
 * Simulates the MongoDB Pokémon document schema.
 * Replace this import with API calls in Phase 2:
 *   GET /api/v1/pokemon?region=kalos&rarity=legendary
 *
 * Image source: PokeAPI official artwork (no placeholders)
 */

const ARTWORK = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

/* ── TYPE DEFINITIONS ───────────────────────────────────────────── */
export const TYPES = [
  { id: 'fire',     label: 'Fire',     emoji: '🔥', color: '#ef4444' },
  { id: 'water',    label: 'Water',    emoji: '💧', color: '#3b82f6' },
  { id: 'grass',    label: 'Grass',    emoji: '🌿', color: '#22c55e' },
  { id: 'electric', label: 'Electric', emoji: '⚡', color: '#eab308' },
  { id: 'psychic',  label: 'Psychic',  emoji: '🔮', color: '#ec4899' },
  { id: 'fighting', label: 'Fighting', emoji: '🥊', color: '#dc2626' },
  { id: 'dragon',   label: 'Dragon',   emoji: '🐉', color: '#4f46e5' },
  { id: 'ghost',    label: 'Ghost',    emoji: '👻', color: '#7c3aed' },
  { id: 'dark',     label: 'Dark',     emoji: '🌑', color: '#475569' },
  { id: 'fairy',    label: 'Fairy',    emoji: '✨', color: '#f472b6' },
  { id: 'steel',    label: 'Steel',    emoji: '⚙️', color: '#94a3b8' },
  { id: 'ice',      label: 'Ice',      emoji: '❄️', color: '#67e8f9' },
];

/* ── RARITY TIERS ───────────────────────────────────────────────── */
export const RARITIES = ['Common', 'Rare', 'Epic', 'Legendary'];

/* ── POKEMON CATALOG ────────────────────────────────────────────── */
export const POKEMON_LIST = [
  {
    id:          'pkmn-448',
    pokedexId:   448,
    name:        'Lucario',
    subtitle:    'Aura Pokémon',
    types:       ['fighting', 'steel'],
    region:      'Sinnoh',
    rarity:      'Epic',
    price:       48000,
    stock:       3,
    image:       ARTWORK(448),
    rating:      4.9,
    reviewCount: 124,
    featured:    true,
    abilities:   ['Steadfast', 'Inner Focus', 'Justified'],
    height:      1.2,   // metres
    weight:      54.0,  // kg
    description:
      'By reading the auras of all things, it can tell how others are feeling from over half a mile away. Deeply loyal once it bonds — ideal for advanced trainers.',
    stats: {
      hp:             70,
      attack:        110,
      defense:        70,
      specialAttack: 115,
      specialDefense: 70,
      speed:          90,
    },
    tags: ['Mega-Capable', 'Fan Favourite', 'Kalos League Ready'],
  },
  {
    id:          'pkmn-658',
    pokedexId:   658,
    name:        'Greninja',
    subtitle:    'Ninja Pokémon',
    types:       ['water', 'dark'],
    region:      'Kalos',
    rarity:      'Epic',
    price:       52000,
    stock:       2,
    image:       ARTWORK(658),
    rating:      5.0,
    reviewCount: 218,
    featured:    true,
    abilities:   ['Torrent', 'Protean', 'Battle Bond'],
    height:      1.5,
    weight:      40.0,
    description:
      'It appears and vanishes with a ninja\'s grace. It can compress water to create shuriken sharp enough to slice metal. The Battle Bond form achieved with Ash is legendary.',
    stats: {
      hp:             72,
      attack:         95,
      defense:        67,
      specialAttack:  103,
      specialDefense:  71,
      speed:         122,
    },
    tags: ['Battle Bond', 'Protean', 'Kalos Native'],
  },
  {
    id:          'pkmn-006',
    pokedexId:   6,
    name:        'Charizard',
    subtitle:    'Flame Pokémon',
    types:       ['fire', 'flying'],
    region:      'Kanto',
    rarity:      'Legendary',
    price:       95000,
    stock:       1,
    image:       ARTWORK(6),
    rating:      4.8,
    reviewCount: 341,
    featured:    true,
    abilities:   ['Blaze', 'Solar Power'],
    height:      1.7,
    weight:      90.5,
    description:
      'Its wings can carry it close to an altitude of 4,600 feet. It breathes fire so hot it melts boulders. Only available through Champion-tier verified listings.',
    stats: {
      hp:              78,
      attack:          84,
      defense:         78,
      specialAttack:  109,
      specialDefense:  85,
      speed:          100,
    },
    tags: ['Mega X', 'Mega Y', 'National Dex Staple'],
  },
  {
    id:          'pkmn-282',
    pokedexId:   282,
    name:        'Gardevoir',
    subtitle:    'Embrace Pokémon',
    types:       ['psychic', 'fairy'],
    region:      'Hoenn',
    rarity:      'Rare',
    price:       36000,
    stock:       6,
    image:       ARTWORK(282),
    rating:      4.7,
    reviewCount:  87,
    featured:    false,
    abilities:   ['Synchronize', 'Trace', 'Telepathy'],
    height:      1.6,
    weight:      48.4,
    description:
      'It reads its trainer\'s emotions and responds with unmatched empathy. Gardevoir will even sacrifice itself to protect its trainer, creating a small black hole if needed.',
    stats: {
      hp:              68,
      attack:          65,
      defense:         65,
      specialAttack:  125,
      specialDefense: 115,
      speed:           80,
    },
    tags: ['Mega-Capable', 'Empathic Bond', 'Psychic Support'],
  },
  {
    id:          'pkmn-700',
    pokedexId:   700,
    name:        'Sylveon',
    subtitle:    'Intertwining Pokémon',
    types:       ['fairy'],
    region:      'Kalos',
    rarity:      'Rare',
    price:       28000,
    stock:       9,
    image:       ARTWORK(700),
    rating:      4.9,
    reviewCount: 196,
    featured:    false,
    abilities:   ['Cute Charm', 'Pixilate'],
    height:      1.0,
    weight:      23.5,
    description:
      'It wraps its ribbon-like feelers around its trainer\'s arm and senses feelings this way. Its soothing gaze calms hostility in seconds — Lumiose residents love it.',
    stats: {
      hp:              95,
      attack:          65,
      defense:         65,
      specialAttack:  110,
      specialDefense: 130,
      speed:           60,
    },
    tags: ['Kalos Native', 'Eeveelution', 'Beginner Friendly'],
  },
  {
    id:          'pkmn-445',
    pokedexId:   445,
    name:        'Garchomp',
    subtitle:    'Mach Pokémon',
    types:       ['dragon', 'ground'],
    region:      'Sinnoh',
    rarity:      'Epic',
    price:       62000,
    stock:       2,
    image:       ARTWORK(445),
    rating:      4.8,
    reviewCount: 103,
    featured:    false,
    abilities:   ['Sand Veil', 'Rough Skin'],
    height:      1.9,
    weight:     95.0,
    description:
      'It flies at speeds close to the speed of sound. It folds its fins against its sleek body to fly at Mach 2 speed. Requires experienced handling.',
    stats: {
      hp:             108,
      attack:         130,
      defense:         95,
      specialAttack:   80,
      specialDefense:  85,
      speed:          102,
    },
    tags: ['Mega-Capable', 'Champion Tier', 'Physical Sweeper'],
  },
  {
    id:          'pkmn-908',
    pokedexId:   908,
    name:        'Meowscarada',
    subtitle:    'Magician Pokémon',
    types:       ['grass', 'dark'],
    region:      'Paldea',
    rarity:      'Rare',
    price:       31000,
    stock:       7,
    image:       ARTWORK(908),
    rating:      4.6,
    reviewCount:  62,
    featured:    false,
    abilities:   ['Overgrow', 'Protean'],
    height:      1.9,
    weight:      31.2,
    description:
      'The cape of flowers it wears is made from pollen. It can obscure its movements with illusion-like agility, confusing opponents before delivering a decisive strike.',
    stats: {
      hp:              76,
      attack:         110,
      defense:         70,
      specialAttack:   81,
      specialDefense:  70,
      speed:          123,
    },
    tags: ['Protean', 'Paldea Starter', 'Speed Tier S'],
  },
  {
    id:          'pkmn-149',
    pokedexId:   149,
    name:        'Dragonite',
    subtitle:    'Dragon Pokémon',
    types:       ['dragon', 'flying'],
    region:      'Kanto',
    rarity:      'Legendary',
    price:       88000,
    stock:       1,
    image:       ARTWORK(149),
    rating:      4.9,
    reviewCount: 157,
    featured:    true,
    abilities:   ['Inner Focus', 'Multiscale'],
    height:      2.2,
    weight:     210.0,
    description:
      'A sea-going Pokémon that flies faster than jet planes. It is gentle and can fly around the entire world in sixteen hours. Rarest listing on Delibird Mart.',
    stats: {
      hp:             91,
      attack:         134,
      defense:         95,
      specialAttack:  100,
      specialDefense: 100,
      speed:          80,
    },
    tags: ['Multiscale Wall', 'Dragon Dance', 'Legacy Listing'],
  },
];

/* ── FEATURED subset (for Home page slider) ─────────────────────── */
export const FEATURED_POKEMON = POKEMON_LIST.filter(p => p.featured);

/* ── Type map for quick lookup ──────────────────────────────────── */
export const TYPE_MAP = Object.fromEntries(TYPES.map(t => [t.id, t]));

/* ── Helper: price formatter ────────────────────────────────────── */
export const formatPrice = (p) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);
