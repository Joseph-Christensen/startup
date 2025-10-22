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

    if (isEqual(guess.name, correct.name)) {
        result.name = 'correct';
        result.category = 'correct';
        result.type = 'correct';
        result.damage = 'correct';
        result.armorPen = 'correct';
        result.traits = 'correct';
    } else {
        result.name = 'incorrect';
    }

    return result;
}