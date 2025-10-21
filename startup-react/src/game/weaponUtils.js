import { weapons } from "./weaponData";

export function getWeapon(name) {
    return weapons.find(
        (w) => w.name.toLowerCase() === name.trim().toLowerCase()
    );
}