import { weapons } from "./weaponData";

export function getWeapon(name) {
    return weapons.find(
        (w) => w.name.toLowerCase() === name.trim().toLowerCase()
    );
}

export function getDailyWeapon() {
    const today = new Date().toISOString().slice(0, 10);
    let seed = 0;

    for (let i = 0; i < today.length; i++) {
        seed += today.charCodeAt(i);
    }

    const index = seed % weapons.length;
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
        result.damage = 'higher';
    } else {
        result.damage = 'lower';
    }

    // Armor Pen
    if (guess.armorPenValue === correct.armorPenValue) {
        result.armorPen = 'correct';
    } else if (guess.armorPenValue > correct.armorPenValue) {
        result.armorPen = 'higher';
    } else {
        result.armorPen = 'lower';
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