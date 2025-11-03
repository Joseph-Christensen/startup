import { weapons } from "./weaponData";

export function getWeapon(name) {
    return weapons.find(
        (w) => w.name.toLowerCase() === name.trim().toLowerCase()
    );
}

function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
  }
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(a) {
  return function() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getDailyWeapon() {
  // Always use Mountain Time for the date, ignoring user clock
  const nowUtc = new Date();
  const mountainString = nowUtc.toLocaleString("en-US", {
    timeZone: "America/Denver",
  });
  const mountainDate = new Date(mountainString);

  // Only the date part (YYYY-MM-DD) matters
  const today = mountainDate.toISOString().slice(0, 10);

  // Deterministic pseudo-random seed from date
  const seedFn = xmur3(today);
  const rand = mulberry32(seedFn());

  const index = Math.floor(rand() * weapons.length);
  return weapons[index];
}

function shareTraits(guess, correct) {
    return guess.traits.some((trait) => correct.traits.includes(trait));
}

export function compareWeapons(guess, correct) {
    const isEqual = (a, b) =>
        a.toString().trim().toLowerCase() === b.toString().trim().toLowerCase();

    const hasSharedTrait = shareTraits(guess, correct);
    const allTraitsMatch = 
        guess.traits.length === correct.traits.length &&
        guess.traits.every((t) => correct.traits.includes(t));
 
    const result = {
        name: guess.name,
        category: '',
        type: '',
        damage: '',
        armorPen: '',
        traits: ''
    };

    // Name
    if (isEqual(guess.name, correct.name)) {
        result.name = 'correct';
        result.category = 'correct';
        result.type = 'correct';
        result.damage = 'correct';
        result.armorPen = 'correct';
        result.traits = 'correct';
        return result;
    } else {
        result.name = 'incorrect';
    }

    // Category
    if (isEqual(guess.category, correct.category)) {
        result.category = 'correct';
    } else {
        result.category = 'incorrect';
    }

    // Type
    if (isEqual(guess.type, correct.type)) {
        result.type = 'correct';
    } else {    
        result.type = 'incorrect';
    }

    // Damage
    if (guess.damage === correct.damage) {
        result.damage = 'correct';
    } else if (guess.damage > correct.damage) {
        result.damage = 'incorrect lower';
    } else {
        result.damage = 'incorrect higher';
    }

    // Armor Pen
    if (guess.armorPenValue === correct.armorPenValue) {
        result.armorPen = 'correct';
    } else if (guess.armorPenValue > correct.armorPenValue) {
        result.armorPen = 'incorrect lower';
    } else {
        result.armorPen = 'incorrect higher';
    }

    // Traits
    if (allTraitsMatch) {
        result.traits = 'correct';
    } else if (hasSharedTrait) {
        result.traits = 'partial';
    } else {
        result.traits = 'incorrect';
    }

    return result;
}