const translations = {
  en: {
    pipTitle: "Click to activate Picture-in-Picture mode",
    pipText:
      "Click anywhere on the video to activate Picture-in-Picture mode. When you minimize the window, the video will shrink and you'll still have it on the screen",
    lastTalker1: "Last Talker",
    lastTalker2: "Second to last speaker",
    lastTalker3: "Third to last speaker",
    willSendMsg: "Sends a private message: ",
    msgNotSharing: "You are not sharing the screen",
    msgNotSharingLong:
      "You are not sharing the screen. You must always share the screen in our class.",
    msgYouHere: "Are you here?",
    msgYouHear: "Can you hear us?",
    msgRestart: "Restart Remotto",
    msgRestartLong: "Restart Remotto, hopefully that will solve your problems",
    refreshRemotto: "Refresh all users' screens",
    youNotSharing:
      "You're not sharing your screen, you must share the whole screen all the time in our class",
  },
  cs: {
    pipTitle: "Klikni pro aktivaci Picture-in-Picture módu",
    pipText:
      "Klikni kdekoli na video pro aktivaci Picture-in-Picture módu. Když minimalizuješ okno, video se zmenší a budeš ho mít pořád na obrazovce.",
    lastTalker1: "Poslední mluvící",
    lastTalker2: "Předposlední mluvící",
    lastTalker3: "Předpředposlední mluvící",
    willSendMsg: "Pošle soukromou zprávu: ",
    msgNotSharing: "Nesdílíš obrazovku",
    msgNotSharingLong:
      "Nesdílíš obrazovku. V hodinách je nutné stále sdílet obrazovku.",
    msgYouHere: "Jsi tady?",
    msgYouHear: "Slyšíš nás?",
    msgRestart: "Restartuj Remotto",
    msgRestartLong: "Restartuj Remotto, snad to vyřeší Tvé trable",
    refreshRemotto: "Refresh obrazovek všech uživatelů",
    youNotSharing:
      "Nesdílíš obrazovku, v našich hodinách je třeba neustále sdílet celou obrazovku.",
  },
  sk: {
    pipTitle: "Kliknutím aktivujete režim Picture-in-Picture",
    pipText:
      "Kliknutím kdekoľvek na video aktivujete režim Picture-in-Picture. Keď okno minimalizujete, video sa zmenší a budete ho mať stále na obrazovke.",
    lastTalker1: "Posledný hovoriaci",
    lastTalker2: "Predposledný hovoriaci",
    lastTalker3: "Predpredposledný hovoriaci",
    willSendMsg: "Odošle súkromnú správu: ",
    msgNotSharing: "Nezdieľate obrazovku",
    msgNotSharingLong:
      "Nezdieľate obrazovku. Stále musíte zdieľať obrazovku v našich hodinách.",
    msgYouHere: "Ste tu?",
    msgYouHear: "Počujete nás?",
    msgRestart: "Reštartujte Remotto",
    msgRestartLong:
      "Reštartujte Remotto, dúfajme, že to vyrieši vaše problémy.",
    refreshRemotto: "Obnoviť obrazovky všetkých používateľov",
    youNotSharing:
      "Nezdieľate svoju obrazovku, musíte zdieľať celú obrazovku po celý čas v našich hodinách.",
  },
  de: {
    pipTitle: "Klicken Sie, um den Bild-in-Bild-Modus zu aktivieren",
    pipText:
      "Klicken Sie irgendwo auf das Video, um den Bild-in-Bild-Modus zu aktivieren. Wenn Sie das Fenster minimieren, wird das Video verkleinert und bleibt trotzdem auf dem Bildschirm sichtbar.",
    lastTalker1: "Letzter Redner",
    lastTalker2: "Vorletzter Sprecher",
    lastTalker3: "Drittletzter Sprecher",
    willSendMsg: "Sendet eine private Nachricht: ",
    msgNotSharing: "Sie teilen den Bildschirm nicht",
    msgNotSharingLong:
      "Du teilst den Bildschirm nicht. Sie müssen den Bildschirm in unserer Klasse immer teilen.",
    msgYouHere: "Bist du hier?",
    msgYouHear: "Können Sie uns hören?",
    msgRestart: "Remotto neu starten",
    msgRestartLong:
      "Starten Sie Remotto neu, hoffentlich löst das Ihre Probleme",
    refreshRemotto: "Aktualisieren Sie die Bildschirme aller Benutzer",
    youNotSharing:
      "Du teilst deinen Bildschirm nicht, du musst in unserer Klasse immer den ganzen Bildschirm teilen",
  },
};

function translate(key: string): string {
  let language = localStorage.getItem("language") || "en";

  // trim "-" from "en-US"
  if (language.length > 2) {
    language = language.substring(0, 2);
  }

  // detect if the language is supported
  if (translations[language] == undefined) {
    language = "en";
  }

  let generatedTranslation = translations[language][key] || undefined;

  if (generatedTranslation == undefined) {
    generatedTranslation = "";
  }

  return generatedTranslation;
}

export default translate;
