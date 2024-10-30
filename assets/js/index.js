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

function playSound() {
    if (isAudioEnabled) {
        chatbotSound.currentTime = 0;
        chatbotSound.play().catch(error => console.error("Erreur de lecture audio :", error));
    }
}

function sendMessage(text) {
  const messageElement = document.createElement("div");
  messageElement.className = "bot-message";
  messageElement.innerHTML = text;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  playSound();
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

loader.addEventListener("click", () => {
    isAudioEnabled = true;
    loader.style.display = "none";
    setTimeout(() => {
        chatbotContainer.classList.add("visible");
        playSound();
      }, 5000);
});
  

window.addEventListener("scroll", handleScroll);


let typeSplit = new SplitType('[animate]', {
  types: 'lines, words, chars',
  tagName: 'span'
})

gsap.from('[animate] .line', {
  opacity: 0.3,
  duration: 1.2,
  ease: 'power1.out',
  stagger: 0.3,
  
  scrollTrigger: {
    trigger: '[animate]',
    start: 'top center',
    scrub: true
  }
})
