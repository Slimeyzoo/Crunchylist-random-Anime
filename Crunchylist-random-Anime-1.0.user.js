// ==UserScript==
// @name         Crunchylist-random-Anime
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  when you press R a random anime will be selected
// @match        https://www.crunchyroll.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Scrollt zum Seitenende, um alle Inhalte zu laden
    async function scrollToBottom() {
        return new Promise((resolve) => {
            let lastHeight = 0;
            const interval = setInterval(() => {
                window.scrollTo(0, document.body.scrollHeight);
                if (document.body.scrollHeight === lastHeight) {
                    clearInterval(interval);
                    setTimeout(resolve, 1000);
                } else {
                    lastHeight = document.body.scrollHeight;
                }
            }, 500);
        });
    }

    // Holt alle Anime-Links aus den Crunchylist-Kacheln
    function getAllAnimeLinks() {
        const allLinks = Array.from(document.querySelectorAll('a')).filter(a => {
            return a.href.includes("/series/") && a.querySelector('img');
        });
        return allLinks;
    }

    // Button erstellen
    {
        const btn = document.createElement("button");
        btn.innerText = "random Anime";
        Object.assign(btn.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            backgroundColor: "#23252b",
            color: "white",
            border: "none",
            borderRadius: "10px",
            zIndex: 9999,
            cursor: "pointer",
            fontSize: "16px"
        });
        btn.onclick = run;
        document.body.appendChild(btn);
    }

    async function run() {
        await scrollToBottom();
        const links = getAllAnimeLinks();
        if (links.length === 0) {
            alert("Keine Anime-Links gefunden!");
            return;
        }
        const chosen = links[Math.floor(Math.random() * links.length)];
        window.open(chosen.href, "_blank");
    }

    // Tastenkürzel: R = random
    document.addEventListener("keydown", async (e) => {
        if (e.key.toLowerCase() === "r") {
            await run();
        }
    });

})();
