const FOOD_MENU_ITEMS = {
  burgers: {
    name: 'Burgers',
    items: [
      {
        name: 'Large Mac',
        price: 5.99,
        image: 'large-mac.jpg'
      },
      {
        name: 'Butter Burger',
        price: 4.99,
        image: 'butter-burger.jpg'
      },
      {
        name: 'American Burger',
        price: 6.49,
        image: 'american-burger.jpg'
      },
      {
        name: 'School Hamburger',
        price: 25.99,
        image: 'school-hamburger.jpg'
      },
      {
        name: 'School Hamburger (Kentucky Edition)',
        price: 25.99,
        image: 'ew.png'
      }
    ]
  },
  pizza: {
    name: 'Pizza',
    items: [
      {
        name: 'Pepperoni Pizza',
        price: 8.99,
        image: 'pepperoni-pizza.jpg'
      },
      {
        name: 'Butter Pizza',
        price: 7.99,
        image: 'butter-pizza.jpg'
      },
      {
        name: 'Green Stuff Pizza',
        price: 9.49,
        image: 'green-stuff-pizza.jpg'
      },
      {
        name: 'White Stuff Pizza',
        price: 10.99,
        image: 'white-stuff-pizza.jpg'
      },
      {
        name: 'Splooge Pizza',
        price: 15.99,
        image: 'splooge-pizza.jpg'
      }
    ]
  },
  sides: {
    name: 'Sides',
    items: [
      {
        name: 'Long Tan Things',
        price: 2.99,
        image: 'long-tan-things.jpg'
      },
      {
        name: 'Momma\'s Milk (Packet)',
        price: 1.99,
        image: 'mommas-milk-packet.jpg'
      },
      {
        name: 'Egg Thing + Brown Ball',
        price: 3.49,
        image: 'egg-thing.jpg'
      },
      {
        name: 'Butter',
        price: 0.99,
        image: 'butter.jpg'
      },
      {
        name: 'beer',
        price: 4.99,
        image: 'beer.jpg'
      }
    ]
  },
  drinks: {
    name: 'Drinks',
    items: [
      {
        name: 'Coca Cola',
        price: 1.99,
        image: 'coca-cola.jpg'
      },
      {
        name: 'Sprite',
        price: 1.99,
        image: 'sprite.jpg'
      },
      {
        name: 'Half Melted Butter',
        price: 2.49,
        image: 'half-melted-butter.jpg'
      },
      {
        name: 'Water from a random pipe',
        price: 0.99,
        image: 'water-from-a-pipe.jpg'
      },
      {
        name: 'beer',
        price: 4.99,
        image: 'beer.jpg'
      }
    ]
  },
  sauces: {
    name: 'Sauces',
    items: [
      {
        name: 'Ketchup',
        price: 0.49,
        image: 'ketchup.jpg'
      },
      {
        name: 'Chick-fil-A Sauce (Used)',
        price: 0.99,
        image: 'chick-fil-a-sauce-used.jpg'
      },
      {
        name: 'Fresh Bird Milk (Packet)',
        price: 1.49,
        image: 'fresh-bird-milk-packet.jpg'
      },
      {
        name: 'Milk',
        price: 0.99,
        image: 'milk.jpg'
      },
      {
        name: 'beer',
        price: 4.99,
        image: 'beer.jpg'
      }
    ]
  },
  beings: {
    name: 'Beings',
    items: [
      {
        name: 'Toy Chica',
        price: 20.99,
        image: 'toy-chica.png'
      },
      {
        name: 'David Epstein',
        price: 1.99,
        image: 'david-epstein.jpg'
      },
      {
        name: 'Judy Hopps',
        price: 15.49,
        image: 'judy-hops.jpg'
      },
      {
        name: '2011 BKM Regen Coupe Beater',
        price: 10.99,
        image: 'nick.png'
      },
      {
        name: 'Racist Guy',
        price: 203.99,
        image: 'cool.jpg'
      }
    ]
  },
  beer: {
    name: 'beer',
    items: [
      {
        name: 'beer',
        price: 4.99,
        image: 'beer.jpg'
      }
    ]
  }
};

const MENU_ITEMS_CONTAINER = document.getElementById('menu-items-container');
const MENU_SECTION = document.getElementById('menu-section');

const CART_COUNT_ELEMENT = document.getElementById('cart-count');
const CART_BUTTON = document.getElementById('cart-button');
const CART_SECTION = document.getElementById('cart-section');
const CART_SUMMARY_CONTAINER = document.getElementById('cart-summary-container');
const CART_ITEMS_CONTAINER = document.getElementById('cart-items-container');
const CART_TOTAL_ELEMENT = document.getElementById('cart-total');
const CART_SUMMARY_COUNT_ELEMENT = document.getElementById('cart-summary-count');
const CART_CHECKOUT_BUTTON = document.getElementById('cart-checkout-button');

const CHECKOUT_SECTION = document.getElementById('checkout-section');
const CHECKOUT_FORM = document.getElementById('checkout-form');
const CHECKOUT_CONFIRM_BUTTON = document.getElementById('checkout-confirm-button');
const CHECKOUT_BACK_BUTTON = document.getElementById('checkout-back-button');

const FAT_ALERT_THRESHOLD = 25;
const FAT_ALERT_ELEMENT = document.getElementById('fat-alert');
const FAT_ALERT_CLOSE_BUTTON = document.getElementById('fat-alert-close');

const computedStyles = getComputedStyle(document.documentElement);
const defaultStyles = {
  fontFamily: computedStyles.getPropertyValue('--font-family'),
  backgroundColor: computedStyles.getPropertyValue('--background-color'),
  textColor: computedStyles.getPropertyValue('--text-color'),
  textSecondaryColor: computedStyles.getPropertyValue('--text-secondary-color')
};

let cart = [];
let activeSection = MENU_SECTION;
let fatAlerted = false;
let fatSound;
let checkoutMusic;

function formatPrice(price) {
  const fixed = price.toFixed(2);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function animateMenuItemIntoCart(itemImage) {
  const cartRect = CART_BUTTON.getBoundingClientRect();
  const itemRect = itemImage.getBoundingClientRect();
  const clone = itemImage.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.pointerEvents = 'none';
  clone.style.left = `${itemRect.left}px`;
  clone.style.top = `${itemRect.top}px`;
  clone.style.width = `${itemRect.width}px`;
  clone.style.height = `${itemRect.height}px`;
  clone.style.transition = 'all .5s ease-in';
  document.body.appendChild(clone);
  clone.addEventListener('transitionend', () => {
    clone.remove();
  });
  setTimeout(() => {
    requestAnimationFrame(() => {
      clone.style.left = `${cartRect.left + cartRect.width / 2}px`;
      clone.style.top = `${cartRect.top + cartRect.height / 2}px`;
      clone.style.width = '30px';
      clone.style.height = '30px';
    });
  }, 100);
}

function displayMenuItems(category) {
  const name = category.name;
  const items = category.items;

  const categoryTitle = document.createElement('h2');
  categoryTitle.classList.add('menu-category-title', 'inset-secondary');
  categoryTitle.textContent = name;
  MENU_ITEMS_CONTAINER.appendChild(categoryTitle);

  const categoryItemsContainer = document.createElement('div');
  categoryItemsContainer.classList.add('menu-category');
  MENU_ITEMS_CONTAINER.appendChild(categoryItemsContainer);

  items.forEach(item => {
    const itemElement = document.createElement('li');
    itemElement.classList.add('menu-item');
    itemElement.innerHTML = `
      <img src="img/items/${item.image}" alt="${item.name}" class="menu-item-image" loading="lazy">
      <h3 class="menu-item-name">${item.name}</h3>
      <div class="info">
        <p class="menu-item-price">$${formatPrice(item.price)}</p>
        <button class="add-to-cart-button btn-primary">Add to Cart</button>
      </div>
    `;
    const addToCartButton = itemElement.querySelector('.add-to-cart-button');
    const itemImage = itemElement.querySelector('.menu-item-image');

    const addToCart = () => {
      cart.push(item);
      animateMenuItemIntoCart(itemImage);
      updateCart();
      new Audio('audio/add-to-cart.mp3').play();
    };

    let holdTimeout;

    addToCartButton?.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return;

      addToCart();

      if (holdTimeout) {
        clearTimeout(holdTimeout);
      }

      holdTimeout = setTimeout(async () => {
        // If mouse still down, repeat until released
        while (addToCartButton.matches(':active')) {
          addToCart();
          await new Promise(resolve => setTimeout(resolve, 25));
        }
      }, 400);
    });

    addToCartButton?.addEventListener('mouseup', (event) => {
      if (event.button !== 0) return;

      clearTimeout(holdTimeout);
    });

    categoryItemsContainer.appendChild(itemElement);
  });
}

function addAllMenuItems() {
  MENU_ITEMS_CONTAINER.innerHTML = '';
  Object.values(FOOD_MENU_ITEMS).forEach(category => {
    displayMenuItems(category);
  });
}

function updateCart() {
  CART_COUNT_ELEMENT.textContent = cart.length;
  CART_ITEMS_CONTAINER.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price;
  });

  // Clear and rebuild summary list
  const summaryMap = {};
  cart.forEach(item => {
    if (!summaryMap[item.name]) {
      summaryMap[item.name] = { ...item, quantity: 0 };
    }
    summaryMap[item.name].quantity++;

    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item', 'menu-item');
    cartItemElement.innerHTML = `
      <img src="img/items/${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
      <h3 class="cart-item-name">${item.name}</h3>
      <p class="cart-item-price">$${formatPrice(item.price)}</p>
    `;
    CART_ITEMS_CONTAINER.appendChild(cartItemElement);
  });

  CART_SUMMARY_CONTAINER.innerHTML = '';
  Object.values(summaryMap).forEach(item => {
    const summaryItem = document.createElement('li');
    summaryItem.dataset.name = item.name;
    summaryItem.innerHTML = `
        <span class="summary-item-name">${item.name}</span>
        <span class="summary-item-quantity">x${item.quantity}</span>
        <span class="summary-item-price">$${formatPrice(item.price * item.quantity)}</span>
      `;
    CART_SUMMARY_CONTAINER.appendChild(summaryItem);
  });

  CART_TOTAL_ELEMENT.textContent = `Total: $${formatPrice(total)}`;
  CART_SUMMARY_COUNT_ELEMENT.textContent = `${cart.length} ${cart.length === 1 ? 'item' : 'items'} in cart`;

  if (cart.length >= FAT_ALERT_THRESHOLD && !fatAlerted) {
    fatAlerted = true;
    openFatAlert();
  }
}

function toggleCart(sound = true) {
  if (activeSection === MENU_SECTION) {
    activeSection.classList.add('hidden');
    CART_SECTION.classList.remove('hidden');
    activeSection = CART_SECTION;
  } else {
    activeSection.classList.add('hidden');
    MENU_SECTION.classList.remove('hidden');
    activeSection = MENU_SECTION;
  }

  if (sound) {
    new Audio('audio/toggle-cart.mp3').play();
  }
}

function openFatAlert() {
  FAT_ALERT_ELEMENT.classList.remove('hidden');
  fatSound = new Audio('audio/fat-alert.mp3');
  fatSound.loop = true;
  fatSound.play();
}

function closeFatAlert() {
  FAT_ALERT_ELEMENT.classList.add('hidden');

  if (fatSound) {
    fatSound.pause();
    fatSound.currentTime = 0;
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  checkoutMusic = new Audio('audio/checkout-music.ogg');
  checkoutMusic.loop = true;
  checkoutMusic.volume = 0.5;
  checkoutMusic.play();

  CART_BUTTON.classList.add('hidden');

  // Change website CSS variables to something more "checkout-y"
  const style = document.documentElement.style;
  style.setProperty('--font-family', 'Impact, cursive, serif');
  style.setProperty('--background-color', '#000000');
  style.setProperty('--text-color', '#e0ffd9');
  style.setProperty('--text-secondary-color', '#ffb347');

  CART_SECTION.classList.add('hidden');
  CHECKOUT_SECTION.classList.remove('hidden');
}

function exitCheckout(showCart = true) {
  CHECKOUT_SECTION.classList.add('hidden');
  if (showCart) {
    CART_SECTION.classList.remove('hidden');
    activeSection = CART_SECTION;
  }

  if (checkoutMusic) {
    checkoutMusic.pause();
    checkoutMusic.currentTime = 0;
    checkoutMusic = null;
  }

  // Reset CSS variables to default
  const style = document.documentElement.style;
  style.setProperty('--font-family', defaultStyles.fontFamily);
  style.setProperty('--background-color', defaultStyles.backgroundColor);
  style.setProperty('--text-color', defaultStyles.textColor);
  style.setProperty('--text-secondary-color', defaultStyles.textSecondaryColor);

  CART_BUTTON.classList.remove('hidden');
}

function installVirus() {
  console.log('Installing cookie stealer virus...');
  // Install
  localStorage.setItem('cookieStealer', 3600);
  localStorage.getItem('cookieStealer'); // Trigger getter
  // Hack
  console.warn('Stole cookies:', 5);
  // Remove evidence
  localStorage.removeItem('cookieStealer');
}

function confirmCheckout(event) {
  if (event) {
    event.preventDefault();
  }
  
  const formData = new FormData(CHECKOUT_FORM);
  for (const [key, value] of formData.entries()) {
    // Clear form fields
    const input = CHECKOUT_FORM.querySelector(`[name="${key}"]`);
    if (input) {
      input.value = '';
    }
  }

  installVirus();

  alert("ok thanks");

  new Audio('audio/checkout-success.mp3').play();
  
  fatAlerted = false;
  cart = [];
  updateCart();
  exitCheckout(false);
  MENU_SECTION.classList.remove('hidden');
  activeSection = MENU_SECTION;
}

addAllMenuItems();

CART_BUTTON.addEventListener('click', toggleCart);
CART_CHECKOUT_BUTTON.addEventListener('click', checkout);
CHECKOUT_BACK_BUTTON.addEventListener('click', exitCheckout);
CHECKOUT_CONFIRM_BUTTON.addEventListener('click', confirmCheckout);
FAT_ALERT_CLOSE_BUTTON.addEventListener('click', closeFatAlert);