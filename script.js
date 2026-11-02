document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-links");
  const toggle = document.querySelector(".menu-toggle");
  if (toggle) toggle.addEventListener("click", () => nav.classList.toggle("open"));

  document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target, target = Number(el.dataset.count);
        let current = 0, step = Math.max(1, Math.ceil(target / 80));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current;
        }, 20);
        observer.unobserve(el);
      });
    }, {threshold:.4});
    counters.forEach(c => observer.observe(c));
  }

  // Testimonials
  const testimonials = [
    {text:"The food was absolutely amazing, and the entire catering team was professional and helpful. Our guests loved every dish!", name:"Happy Wedding Client"},
    {text:"Muskan Caterers made our family celebration completely stress-free. The buffet looked beautiful and the food was delicious.", name:"Satisfied Customer"},
    {text:"Excellent service, wonderful presentation and fantastic flavours. We would definitely book them again!", name:"Corporate Event Client"}
  ];
  let currentTestimonial = 0;
  const testimonialContent = document.getElementById("testimonialContent");
  function renderTestimonial() {
    if (!testimonialContent) return;
    const t = testimonials[currentTestimonial];
    testimonialContent.innerHTML = `<div class="testimonial"><div class="stars">★★★★★</div><blockquote>"${t.text}"</blockquote><strong>— ${t.name}</strong></div>`;
  }
  renderTestimonial();
  document.getElementById("prevTestimonial")?.addEventListener("click", () => {currentTestimonial=(currentTestimonial-1+testimonials.length)%testimonials.length;renderTestimonial();});
  document.getElementById("nextTestimonial")?.addEventListener("click", () => {currentTestimonial=(currentTestimonial+1)%testimonials.length;renderTestimonial();});

  // ==========================================
// BOOKING FORM → WHATSAPP
// ==========================================

document
  .getElementById("bookingForm")
  ?.addEventListener("submit", function (e) {

    // Stop normal form submission
    e.preventDefault();


    // ==========================================
    // GET FORM VALUES
    // ==========================================

    const name = this.querySelector(
      '[name="name"]'
    ).value;

    const phone = this.querySelector(
      '[name="phone"]'
    ).value;

    const eventType = this.querySelector(
      '[name="eventType"]'
    ).value;

    const eventDate = this.querySelector(
      '[name="eventDate"]'
    ).value;

    const guests = this.querySelector(
      '[name="guests"]'
    ).value;

    const location = this.querySelector(
      '[name="location"]'
    ).value;

    // IMPORTANT:
    // Your HTML uses name="message"
    const message = this.querySelector(
      '[name="message"]'
    ).value;


    // ==========================================
    // YOUR WHATSAPP NUMBER
    // ==========================================

    const whatsappNumber = "918889777841";


    // ==========================================
    // CREATE BOOKING MESSAGE
    // ==========================================

    const whatsappMessage =

`🍽️ *NEW CATERING BOOKING REQUEST*

👤 *Customer Name:*
${name}

📱 *Phone Number:*
${phone}

🎉 *Event Type:*
${eventType}

📅 *Event Date:*
${eventDate}

👥 *Number of Guests:*
${guests}

📍 *Event Location:*
${location}

📝 *Requirements:*
${message}

----------------------------

Thank you for contacting *Muskan Caterers* ❤️`;


    // ==========================================
    // ENCODE MESSAGE
    // ==========================================

    const encodedMessage =
      encodeURIComponent(whatsappMessage);


    // ==========================================
    // CREATE WHATSAPP URL
    // ==========================================

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


    // ==========================================
    // SHOW SUCCESS MESSAGE
    // ==========================================

    const bookingMessage =
      document.getElementById("bookingMessage");


    if (bookingMessage) {

      bookingMessage.textContent =
        "Opening WhatsApp...";

    }


    // ==========================================
    // OPEN WHATSAPP
    // ==========================================

    window.open(
      whatsappURL,
      "_blank"
    );


    // ==========================================
    // RESET FORM
    // ==========================================

    this.reset();

});

  // ==========================================
// CONTACT FORM → WHATSAPP
// ==========================================

document.getElementById("contactForm")?.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get form values
    const name = this.querySelector('[name="name"]').value;
    const email = this.querySelector('[name="email"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const message = this.querySelector('[name="message"]').value;

    // Your WhatsApp Number
    const whatsappNumber = "918889777841";

    // Create WhatsApp message
    const whatsappMessage =
        `Hello Muskan Caterers! 👋

New Customer Inquiry

👤 Name: ${name}

📧 Email: ${email}

📱 Phone: ${phone}

💬 Message:
${message}`;

    // Encode message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp URL
    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Success message
    document.getElementById("contactMessage").textContent =
        "Redirecting you to WhatsApp...";

    // Reset form
    this.reset();

});

  // Menu filtering
  document.querySelectorAll(".menu-tab").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".menu-tab").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".food-card").forEach(card => {
        card.style.display = filter === "all" || card.dataset.category === filter ? "block" : "none";
      });
    });
  });

  // Quote calculator
  document.getElementById("calculateQuote")?.addEventListener("click", () => {
    const multiplier = Number(document.getElementById("quoteEvent").value);
    const guests = Number(document.getElementById("quoteGuests").value);
    const packagePrice = Number(document.getElementById("quotePackage").value);
    const result = document.getElementById("quoteResult");
    if (!guests || guests < 10) {
      result.textContent = "Please enter at least 10 guests.";
      return;
    }
    const estimate = Math.round(guests * packagePrice * multiplier);
    const low = Math.round(estimate * .9), high = Math.round(estimate * 1.1);
    result.textContent = `Estimated package range: ₹${low.toLocaleString("en-IN")} – ₹${high.toLocaleString("en-IN")}`;
  });

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  document.querySelectorAll(".full-gallery img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightbox.classList.add("show");
    });
  });
  document.getElementById("closeLightbox")?.addEventListener("click", () => lightbox.classList.remove("show"));
  lightbox?.addEventListener("click", e => { if (e.target === lightbox) lightbox.classList.remove("show"); });
});