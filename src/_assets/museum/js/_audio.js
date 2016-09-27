'use strict';

let msg,
    lang = 'en-UK',
    voice = 'Google UK English Female';

let speak = function (newLang, newVoice, string) {
    canITalk();

    // Create a new instance of SpeechSynthesisUtterance.
    msg = new SpeechSynthesisUtterance();

    // Set the text.
    msg.text = string;

    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1; //0 to 2

    // Set the language
    msg.lang = newLang;

    console.log(lang)
    console.log(voice)

    // If a voice has been selected, find the voice and set the
    // utterance instance's voice attribute.
    msg.voice = speechSynthesis.getVoices().filter(function(voice) {
        return voice.name == newVoice;
        // native
        // de-DE   Google Deutsch
        // en-US   Google US English
        // en-GB   Google UK English Female
        // en-GB   Google UK English Male
        // es-ES   Google español
        // es-US   Google español de Estados Unidos
        // fr-FR   Google français
        // hi-IN   Google हिन्दी
        // id-ID   Google Bahasa Indonesia
        // it-IT   Google italiano
        // ja-JP   Google 日本語
        // ko-KR   Google 한국의
        // nl-NL   Google Nederlands
        // pl-PL   Google polski
        // pt-BR   Google português do Brasil
        // ru-RU   Google русский
        // zh-CN   Google 普通话（中国大陆）
        // zh-HK   Google 粤語（香港）
        // zh-TW   Google 國語（臺灣）
    })[0];


    window.speechSynthesis.speak(msg);

    // msg.onend = function(e) {
    //     console.log('Finished in ' + event.elapsedTime + ' seconds.');
    // };
};

let canITalk = function () {
    if (isMobile.iOS()){
        return false;
    }

    var SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance || window.mozSpeechSynthesisUtterance || window.msSpeechSynthesisUtterance || window.oSpeechSynthesisUtterance || window.SpeechSynthesisUtterance;

    if ( SpeechSynthesisUtterance === undefined ) {
        return false;
    }
};

let isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

export { speak };