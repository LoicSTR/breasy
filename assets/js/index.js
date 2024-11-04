
const track = document.querySelector('.carousel');
const items = Array.from(track.children);
const prevButton = document.querySelector('.arrow.left');
const nextButton = document.querySelector('.arrow.right');
let currentIndex = 0;

function updateCarousel() {
  const itemWidth = items[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  if (currentIndex === 0) {
    prevButton.disabled = true;
    prevButton.classList.add('disabled');
  } else {
    prevButton.disabled = false;
    prevButton.classList.remove('disabled');
  }

  if (currentIndex === items.length - 1) {
    nextButton.disabled = true;
    nextButton.classList.add('disabled');
  } else {
    nextButton.disabled = false;
    nextButton.classList.remove('disabled');
  }
}

nextButton.addEventListener('click', () => {
  if (currentIndex < items.length - 1) {
    currentIndex += 1;
    updateCarousel();
  }
});

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);
updateCarousel();

const loader = document.getElementById("loader");
const chatbotContainer = document.getElementById("chatContainer");
const chatbotMessages = document.getElementById("chatMessages");
const chatbotSound = document.getElementById("chatbotSound");
const chatbotSound1 = document.getElementById("chatbotSound1");
const chatbotSound2 = document.getElementById("chatbotSound2");
const chatbotSound3 = document.getElementById("chatbotSound3");

let isAudioEnabled = false;

const messages = [
  { text: "Nous avons la solution parfaite !", trigger: 30 },
  { text: "Continue de respirer sainement.", trigger: 60 },
  { text: "Ou sinon on s’en arrête là?!", trigger: 80 },
  { text: "EH OH", trigger: 90 },
  { text: "STOP !!!!!!", trigger: 90 },
  { text: "Réveille toi !", trigger: 90 },
  { text: "Ce produit est fictif, pas le cancer !", trigger: 90 },
  { text: "Rejoins nous sur : <a href='https://cnct.fr/' target='_blank'>https://cnct.fr/</a>", trigger: 90 }
];

let messagesSent = new Set();
let sendingMessagesAt90 = false;

function playSound(sound) {
    if (isAudioEnabled) {
      sound.currentTime = 0;
      sound.play().catch(error => console.error("Erreur de lecture audio :", error));
    }
}

function sendMessage(text) {
  const messageElement = document.createElement("div");
  messageElement.className = "bot-message";
  messageElement.innerHTML = text;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  const messages = chatbotMessages.getElementsByClassName("bot-message");
  if (messages.length > 3) {
    // Rendre invisibles les premiers messages au-delà du troisième
    for (let i = 0; i < messages.length; i++) {
      if (i < messages.length - 3) {
        messages[i].style.display = 'none';  // Cache les premiers messages
      }
    }
  }

  playSound(chatbotSound);
}

function sendMessagesAtIntervals(messagesToSend) {
    let baseInterval = 1000;
    let decreasingFactor = 100;
  
    messagesToSend.forEach((msg, index) => {
        let interval = baseInterval - (index * decreasingFactor);
        interval = Math.max(interval, 200);
        setTimeout(() => {
            sendMessage(msg);
        }, index * interval);
        playSound(chatbotSound3);
    });
  }
  

function handleScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  messages.forEach(({ text, trigger }) => {
    if (scrollPercent >= trigger && !messagesSent.has(trigger)) {

      messagesSent.add(trigger);
      if (trigger === 90 && !sendingMessagesAt90) {
        sendingMessagesAt90 = true;
        sendMessagesAtIntervals(messages.filter(msg => msg.trigger === 90).map(msg => msg.text));
      } else if (trigger < 90) {
        chatbotContainer.classList.add("visible");
        sendMessage(text);
      }
    }
  });
}
const buttonEnter = document.getElementById('button-enter');

setTimeout(() => {
  buttonEnter.style.visibility = 'visible';
}, 3000);

buttonEnter.addEventListener("click", () => {
    isAudioEnabled = true;
    loader.style.display = "none";
    setTimeout(() => {
        chatbotContainer.classList.add("visible");
        playSound(chatbotSound);
      }, 5000);
});

const loaderPoumons = document.getElementById("loader-poumons");
    setTimeout(() => {
        loaderPoumons.classList.add("loading");
    }, 1000);
  

window.addEventListener("scroll", handleScroll);


//changement de couleur

ScrollTrigger.create({
  trigger: ".product-2", // Le trigger est votre section spécifique
  start: "top 75%", // Quand le haut de la section atteint le haut de la fenêtre
  end: "center top", // Quand le bas de la section atteint le haut de la fenêtre
  onEnter: () => document.body.style.backgroundColor = 'black', // Lorsque vous entrez dans la section
  onLeave: () => document.body.style.backgroundColor = 'white', // Lorsque vous sortez de la section
  onEnterBack: () => document.body.style.backgroundColor = 'black', // Quand vous revenez à la section
  onLeaveBack: () => document.body.style.backgroundColor = 'white' // Quand vous partez à nouveau
});
ScrollTrigger.create({
  trigger: ".continue", // Le trigger est votre section spécifique
  start: "top 75%", // Quand le haut de la section atteint le haut de la fenêtre
  end: "10% top", // Quand le bas de la section atteint le haut de la fenêtre
  onEnter: () => document.body.style.backgroundColor = 'black', // Lorsque vous entrez dans la section
  onLeave: () => document.body.style.backgroundColor = 'white', // Lorsque vous sortez de la section
  onEnterBack: () => document.body.style.backgroundColor = 'black', // Quand vous revenez à la section
  onLeaveBack: () => document.body.style.backgroundColor = 'white' // Quand vous partez à nouveau
});

ScrollTrigger.create({
  trigger: ".twist", // Le trigger est votre section spécifique
  start: "top 65%", // Quand le haut de la section atteint le haut de la fenêtre
  end: "100% top", // Quand le bas de la section atteint le haut de la fenêtre
  onEnter: () => document.body.style.backgroundColor = 'black', // Lorsque vous entrez dans la section
  onLeave: () => document.body.style.backgroundColor = 'white', // Lorsque vous sortez de la section
  onEnterBack: () => document.body.style.backgroundColor = 'black', // Quand vous revenez à la section
  onLeaveBack: () => document.body.style.backgroundColor = 'white' // Quand vous partez à nouveau
});


ScrollTrigger.create({
  trigger: ".close", // Déclenche l'effet en fonction de la section `.stats`
  start: "top bottom", // Quand le bas de la section atteint le centre de la fenêtre
  onEnter: () => {
    gsap.to(".image-container", {
      opacity: 0,           // Opacité à 0 pour faire disparaître l'élément
      duration: .6,          // Durée de la transition en secondes
      ease: "power2.out",   // Animation douce de la transition
    });
  },
  onLeaveBack: () => {
    gsap.to(".image-container", {
      opacity: 1,           // Réapparition avec opacité à 1
      duration: .6,
      ease: "power2.out",
    });
  }
});



//parrallax
gsap.registerPlugin(ScrollTrigger);

  // Parallaxe du texte
  gsap.to(".parallax-text", {
      yPercent: -900,           // Déplace le texte vers le haut
      ease: "none",             // Pas d'accélération pour un effet constant
      scrollTrigger: {
          trigger: ".parallax-section", // La section déclenche l'effet
          start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
          end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
          scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
      }
  });

  gsap.to(".parallax-text2", {
    yPercent: -600,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});
  gsap.to(".parallax-text3", {
    yPercent: 300,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});

  gsap.to(".parallax-text4", {
    yPercent: -300,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});
  gsap.to(".parallax-text5", {
    yPercent: -200,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});
  gsap.to(".parallax-text6", {
    yPercent: -25,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section2", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});
  gsap.to(".parallax-text7", {
    yPercent: -400,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section2", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});
  gsap.to(".parallax-text8", {
    yPercent: -270,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section2", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});
  gsap.to(".parallax-text9", {
    yPercent: -325,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section2", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});
  gsap.to(".parallax-text10", {
    yPercent: -100,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section2", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});
  gsap.to(".parallax-text11", {
    yPercent: -300,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section2", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});
  gsap.to(".parallax-text12", {
    yPercent: -100,           // Déplace le texte vers le haut
    ease: "none",             // Pas d'accélération pour un effet constant
    scrollTrigger: {
        trigger: ".parallax-section2", // La section déclenche l'effet
        start: "top bottom",          // L'effet commence quand le haut de la section entre dans la vue
        end: "bottom top",            // L'effet termine quand le bas de la section sort de la vue
        scrub: true                   // Le défilement est synchronisé avec le mouvement du texte
    }
});


gsap.registerPlugin(ScrollTrigger);

// Animation de la largeur de .contenent en fonction du défilement
gsap.to(".contenent", {
    width: "100%", // Largeur finale à 100%
    scrollTrigger: {
        trigger: ".right-top", // Déclencheur basé sur le conteneur
        start: "top 75%", // Commencer à 80% de la fenêtre
        end: "80% Top", // Fin de l'animation à 50%
        scrub: true, // Scrubbing lié au défilement
        markers: false // Pour le débogage : afficher les marqueurs
    }
});