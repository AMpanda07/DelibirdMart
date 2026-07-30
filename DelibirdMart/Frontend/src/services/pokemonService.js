/**
 * pokemonService.js
 *
 * Live PokeAPI data layer for Delibird Mart.
 * Implements the exact calculatePokemonStats pricing engine specified
 * in the product brief, merged with the full e-commerce data shape.
 *
 * Phase 2 integration points:
 *   – Replace pricingData overrides with GET /api/v1/pricing from Express.
 *   – Replace the stock mock with GET /api/v1/stock/:pokemonId.
 *   – Proxy through Express if PokeAPI rate-limits occur in production.
 */

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const ARTWORK_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const DEFAULT_LIMIT = 20;

/* ══════════════════════════════════════════════════════════════════
   PRICING OVERRIDE TABLE
   Map Pokémon ID (number) → adoption fee (₹ INR).
   These values take priority over the formula in calculatePokemonStats.
   Add IDs here to hard-set a price for specific listings.
   ══════════════════════════════════════════════════════════════════ */
const pricingOverrides = {
  // ── Kanto ──────────────────────────────────────────────────────
  6:   95000,   // Charizard
  9:   72000,   // Blastoise
  3:   65000,   // Venusaur
  25:  18000,   // Pikachu
  94:  58000,   // Gengar
  130: 82000,   // Gyarados
  143: 45000,   // Snorlax
  149: 88000,   // Dragonite
  150: 250000,  // Mewtwo
  151: 200000,  // Mew
  // ── Johto ──────────────────────────────────────────────────────
  196: 34000,   // Espeon
  197: 32000,   // Umbreon
  248: 78000,   // Tyranitar
  249: 220000,  // Lugia
  250: 215000,  // Ho-Oh
  // ── Hoenn ──────────────────────────────────────────────────────
  282: 36000,   // Gardevoir
  373: 68000,   // Salamence
  376: 72000,   // Metagross
  380: 210000,  // Latias
  381: 210000,  // Latios
  384: 230000,  // Rayquaza
  // ── Sinnoh ─────────────────────────────────────────────────────
  445: 62000,   // Garchomp
  448: 48000,   // Lucario
  483: 225000,  // Dialga
  484: 225000,  // Palkia
  487: 228000,  // Giratina
  491: 185000,  // Darkrai
  492: 190000,  // Shaymin
  // ── Unova ──────────────────────────────────────────────────────
  643: 215000,  // Reshiram
  644: 215000,  // Zekrom
  646: 240000,  // Kyurem
  // ── Kalos ──────────────────────────────────────────────────────
  658: 52000,   // Greninja
  700: 28000,   // Sylveon
  716: 220000,  // Xerneas
  717: 220000,  // Yveltal
  718: 235000,  // Zygarde
  // ── Alola ──────────────────────────────────────────────────────
  745: 44000,   // Lycanroc
  800: 215000,  // Necrozma
  // ── Galar ──────────────────────────────────────────────────────
  888: 220000,  // Zacian
  889: 220000,  // Zamazenta
  890: 190000,  // Eternatus
  892: 55000,   // Urshifu
  // ── Paldea ─────────────────────────────────────────────────────
  905: 210000,  // Enamorus
  908: 31000,   // Meowscarada
  // ── ADD MORE CUSTOM PRICES HERE ────────────────────────────────
};

/* ══════════════════════════════════════════════════════════════════
   CALCULATE POKEMON STATS
   Exact pricing & classification engine as specified in the brief.
   Derives evolutionStage, rarity, and adoption price from raw API data.
   pricingOverrides can supersede the formula result for specific IDs.
   ══════════════════════════════════════════════════════════════════ */
export function calculatePokemonStats(apiData) {
  const typeList = apiData.types.map(t => t.type.name.toLowerCase());
  const baseStatTotal = apiData.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  /* ── 1. Rarity via Base Stat Total ─────────────────────────── */
  let rarity = 'Common';
  if (baseStatTotal > 400) rarity = 'Uncommon';
  if (baseStatTotal > 500) rarity = 'Rare';
  if (baseStatTotal >= 600) rarity = 'Epic';

  /* ── 2. Evolution Stage (deterministic mock via base_experience) ──
     Avoids heavy nested species/chain API calls for the UI scaffold.
     base_experience values:
       Stage 1 (base forms):  0  – 140  (e.g. Charmander 62, Pikachu 112)
       Stage 2 (mid-evos):   141 – 220  (e.g. Charmeleon 142, Raichu 218)
       Stage 3 (final evos): 221+        (e.g. Charizard 267, Dragonite 300)
  ── */
  let evolutionStage = 1;
  if (apiData.base_experience > 140) evolutionStage = 2;
  if (apiData.base_experience > 220) evolutionStage = 3;

  /* ── 3. Legendary approximation for scaffold ─────────────────── */
  const isLegendary = baseStatTotal >= 600 && !apiData.is_default;

  /* ── 4. Pricing formula ──────────────────────────────────────── */
  let price;

  if (isLegendary || rarity === 'Legendary' || rarity === 'Epic') {
    // Fixed floor for highly rare / legendary entries
    price = 250000;
  } else {
    // Base price by stage
    if (evolutionStage === 1)      price = 4500;
    else if (evolutionStage === 2) price = 9500;
    else                            price = 12000;  // Stage 3

    // Rarity multiplier
    const multipliers = { Common: 1, Uncommon: 2, Rare: 4, Epic: 8 };
    price *= multipliers[rarity] ?? 1;

    // Type modifiers
    if (typeList.includes('dragon')) price *= 1.20;
    if (typeList.includes('normal')) price *= 0.90;

    // Starter final-evolution bonus (Fire / Water / Grass Stage 3)
    const hasStarterElement = typeList.some(t => ['fire', 'water', 'grass'].includes(t));
    if (evolutionStage === 3 && hasStarterElement) price *= 1.10;
  }

  // Apply hard override if one exists for this specific Pokémon
  const finalPrice = pricingOverrides[apiData.id] ?? Math.round(price);

  return {
    id:            apiData.id,
    name:          apiData.name,
    types:         typeList,
    image:         `${ARTWORK_BASE}/${apiData.id}.png`,
    evolutionStage,  // 1 | 2 | 3
    rarity,
    price: finalPrice,
  };
}

/* ══════════════════════════════════════════════════════════════════
   MODULE-LEVEL REQUEST CACHE
   Prevents duplicate network requests across paginated calls and
   concurrent hero + featured fetches on the Home page.
   Stores the promise while in-flight, resolved data after completion.
   ══════════════════════════════════════════════════════════════════ */
const _cache = new Map();

async function fetchWithCache(url) {
  if (_cache.has(url)) return _cache.get(url);

  const promise = fetch(url).then(r => {
    if (!r.ok) throw new Error(`PokeAPI ${r.status}: ${url}`);
    return r.json();
  });

  _cache.set(url, promise);

  try {
    const data = await promise;
    _cache.set(url, data);   // replace promise with resolved value
    return data;
  } catch (err) {
    _cache.delete(url);      // let it retry next time
    throw err;
  }
}

/* ══════════════════════════════════════════════════════════════════
   GENERATION / REGION HELPER
   Derived from Pokédex ID (matches the 9-generation split).
   ══════════════════════════════════════════════════════════════════ */
function deriveRegion(speciesId) {
  if (speciesId <= 151)  return 'Kanto';
  if (speciesId <= 251)  return 'Johto';
  if (speciesId <= 386)  return 'Hoenn';
  if (speciesId <= 493)  return 'Sinnoh';
  if (speciesId <= 649)  return 'Unova';
  if (speciesId <= 721)  return 'Kalos';
  if (speciesId <= 809)  return 'Alola';
  if (speciesId <= 905)  return 'Galar';
  return 'Paldea';
}

/* ══════════════════════════════════════════════════════════════════
   DATA TRANSFORMER
   Merges calculatePokemonStats output with the full e-commerce shape
   expected by PokemonCard, CartContext, and CheckoutFlow.
   ══════════════════════════════════════════════════════════════════ */
function transformPokemon(apiData) {
  /* Run the pricing engine */
  const computed = calculatePokemonStats(apiData);

  /* Stat map for named access */
  const statMap = Object.fromEntries(
    apiData.stats.map(s => [s.stat.name, s.base_stat])
  );
  const bst = apiData.stats.reduce((s, x) => s + x.base_stat, 0);

  const speciesId = parseInt(apiData.species.url.split('/').at(-2), 10);
  const region    = deriveRegion(speciesId);

  /* Formatted abilities: 'inner-focus' → 'Inner Focus' */
  const abilities = apiData.abilities.map(a =>
    a.ability.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  );

  return {
    /* ── Identity ── */
    id:          `pkmn-${computed.id}`,
    pokedexId:   computed.id,
    name:        computed.name.charAt(0).toUpperCase() + computed.name.slice(1),
    subtitle:    `${computed.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' / ')} Pokémon`,

    /* ── Classification (from pricing engine) ── */
    types:          computed.types,
    rarity:         computed.rarity,
    evolutionStage: computed.evolutionStage,  // 1 | 2 | 3
    price:          computed.price,
    image:          computed.image,

    /* ── Extended metadata ── */
    region,
    stock:        Math.max(1, Math.floor(Math.random() * 9)), // TODO: backend stock API
    rating:       parseFloat((3.8 + Math.random() * 1.2).toFixed(1)),
    reviewCount:  Math.floor(20 + Math.random() * 200),
    featured:     [6, 25, 94, 149, 150, 282, 445, 448, 658, 700].includes(computed.id),
    abilities,
    height:       apiData.height / 10,    // decimetres → metres
    weight:       apiData.weight / 10,    // hectograms → kg
    description:  '',                     // Phase 2: fill from species endpoint
    stats: {
      hp:             statMap.hp                 ?? 0,
      attack:         statMap.attack             ?? 0,
      defense:        statMap.defense            ?? 0,
      specialAttack:  statMap['special-attack']  ?? 0,
      specialDefense: statMap['special-defense'] ?? 0,
      speed:          statMap.speed              ?? 0,
    },
    bst,
    tags: [computed.rarity, region, `Stage ${computed.evolutionStage}`],
  };
}

/* ══════════════════════════════════════════════════════════════════
   FETCH A PAGE OF POKÉMON
   Batch-fetches details for all entries in a list page in parallel.
   Returns: { pokemon, total, page, limit, hasMore }
   ══════════════════════════════════════════════════════════════════ */
export async function fetchPokemonPage(page = 0, limit = DEFAULT_LIMIT) {
  const offset = page * limit;

  /* 1. Paginated list */
  const list = await fetchWithCache(
    `${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`
  );

  /* 2. All detail calls in parallel */
  const details = await Promise.all(
    list.results.map(entry => fetchWithCache(entry.url))
  );

  /* 3. Transform to Delibird Mart shape */
  const pokemon = details.map(transformPokemon);

  return {
    pokemon,
    total:   list.count,
    page,
    limit,
    hasMore: Boolean(list.next),
  };
}

/* ══════════════════════════════════════════════════════════════════
   FETCH A SINGLE POKÉMON BY ID OR NAME
   ══════════════════════════════════════════════════════════════════ */
export async function fetchPokemonById(idOrName) {
  const detail = await fetchWithCache(
    `${POKEAPI_BASE}/pokemon/${String(idOrName).toLowerCase()}`
  );
  return transformPokemon(detail);
}

/* ══════════════════════════════════════════════════════════════════
   FETCH HERO POKÉMON
   Fetches specific IDs for use on the Home page hero section.
   Defaults: Greninja · Lucario · Dragonite · Charizard
   ══════════════════════════════════════════════════════════════════ */
export async function fetchHeroPokemon(ids = [658, 448, 149, 6]) {
  return Promise.all(ids.map(fetchPokemonById));
}

/* ══════════════════════════════════════════════════════════════════
   CLIENT-SIDE FILTER & SORT
   Applied after pages are loaded into the Marketplace accumulator.
   ══════════════════════════════════════════════════════════════════ */
export function applyFilters(pokemon, filters = {}) {
  const {
    types          = [],
    rarities       = [],
    evolutionStages = [],  // array of numbers: [1, 2, 3]
    regions        = [],
    maxPrice,
    searchQuery    = '',
  } = filters;

  return pokemon.filter(p => {
    const matchType  = !types.length          || types.some(t => p.types.includes(t));
    const matchRar   = !rarities.length        || rarities.includes(p.rarity);
    const matchEvo   = !evolutionStages.length || evolutionStages.includes(p.evolutionStage);
    const matchReg   = !regions.length         || regions.includes(p.region);
    const matchPrice = !maxPrice               || p.price <= maxPrice;
    const q = searchQuery.toLowerCase();
    const matchQ = !q
      || p.name.toLowerCase().includes(q)
      || p.types.some(t => t.includes(q))
      || p.region.toLowerCase().includes(q);

    return matchType && matchRar && matchEvo && matchReg && matchPrice && matchQ;
  });
}

export function sortPokemon(pokemon, sortBy = 'featured') {
  const list = [...pokemon];
  switch (sortBy) {
    case 'price-asc':   return list.sort((a, b) => a.price - b.price);
    case 'price-desc':  return list.sort((a, b) => b.price - a.price);
    case 'rating':      return list.sort((a, b) => b.rating - a.rating);
    case 'bst-desc':    return list.sort((a, b) => b.bst - a.bst);
    case 'name':        return list.sort((a, b) => a.name.localeCompare(b.name));
    case 'stage-asc':   return list.sort((a, b) => a.evolutionStage - b.evolutionStage);
    default:            return list;
  }
}

/* ══════════════════════════════════════════════════════════════════
   EXPORTED CONSTANTS (used in filter UI)
   ══════════════════════════════════════════════════════════════════ */
export const EVOLUTION_STAGES = [
  { value: 1, label: 'Stage 1', description: 'Base forms',        color: 'slate'  },
  { value: 2, label: 'Stage 2', description: 'Mid-evolutions',    color: 'blue'   },
  { value: 3, label: 'Stage 3', description: 'Final evolutions',  color: 'purple' },
];

export const GENERATIONS = [
  'Kanto','Johto','Hoenn','Sinnoh','Unova','Kalos','Alola','Galar','Paldea',
];

export const RARITIES = ['Common', 'Uncommon', 'Rare', 'Epic'];
