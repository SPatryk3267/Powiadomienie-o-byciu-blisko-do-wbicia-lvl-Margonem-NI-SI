// ==UserScript==
// @name         Powiadomienie o byciu blisko do wbicia lvl
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Powiadomienie o byciu blisko do wbicia lvl
// @author       SPatryk3267
// @match        https://*.margonem.pl/
// @grant        none
// @run-at document-end
// ==/UserScript==




function checkExpPercent() {
    const isInterfaceSi = getCookie("interface") === "si";

    if ((!isInterfaceSi && Engine.hero?.d?.lvl && Engine.hero?.d?.exp) ||
        (isInterfaceSi && hero?.exp && hero?.lvl)) {

        const exp = isInterfaceSi ? hero.exp : Engine.hero.d.exp;
        const lvl = isInterfaceSi ? hero.lvl : Engine.hero.d.lvl;

        const expNext = lvl ** 4 + 10;
        const expPrev = (lvl - 1) ** 4 + 10;
        const percent = ((exp - expPrev) / (expNext - expPrev)) * 100;

        if (percent >= 95) {
            message(`Uwaga! Masz ${percent.toFixed(2)}% doświadczenia!`);
        }
    }

    if (!isInterfaceSi) {

        window.API.addCallbackToEvent("close_battle", checkExpPercent);
    } else {

        g.loadQueue.push({
            fun: () => {
                setTimeout(() => {
                    checkExpPercent();
                }, 15000);
            }
        });
    }
}

setTimeout(() => {
    checkExpPercent();
}, 5000);