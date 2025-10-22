import React from 'react';
import "./game.css";
import { getWeapon, getDailyWeapon, compareWeapons } from './weaponUtils';

export function Game() {
    const correct = getDailyWeapon();
    const guess = getWeapon("Stim Pistol");

    console.log("Weapon of the Day:", correct.name);
    console.log("Feedback:", compareWeapons(guess, correct));

    return <main className='container text-center my-5'>Check Console!</main>
}