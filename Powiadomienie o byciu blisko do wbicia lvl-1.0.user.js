// ==UserScript==
// @name         Powiadomienie o byciu blisko do wbicia lvl
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Powiadomienie o byciu blisko do wbicia lvl
// @author       SPatryk3267
// @match        https://*.margonem.pl/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function checkExp() {

        const isSi = getCookie("interface") == "si" ? true : false;

        if ((!isSi && (Engine.hero.d.lvl && Engine.hero.d.exp)) || (isSi && (hero.exp && hero.lvl))) {

            const exp = isSi ? hero.exp : Engine.hero.d.exp;
            const lvl = isSi ? hero.lvl : Engine.hero.d.lvl;
            const expNext = lvl ** 4 + 10;
            const expPrev = ((lvl - 1) ** 4 + 10);
            const percent = ((exp - expPrev) / (expNext - expPrev)) * 100;

            if (percent >= 95) {
                message(`Uwaga! Masz ${percent.toFixed(2)}% doświadczenia!`);
            }
        }
    }

    setInterval(checkExp, 5000);
})();