/* ================================
   FAKTA SAINS LANDING PAGE JS
================================ */

/*
  GANTI NOMOR WHATSAPP CS DI SINI.
  Format wajib:
  - Pakai kode negara
  - Tanpa tanda +
  - Tanpa spasi
  Contoh: 6281234567890
*/
const CS_WHATSAPP_NUMBER = "6282312231156";

/*
  Pesan otomatis saat pembeli klik tombol WhatsApp.
  Teks akan otomatis diubah ke format URL oleh encodeURIComponent.
*/
function createWhatsAppLink(productName) {
  const message = `
Halo Kak, saya tertarik dengan ${productName}.

Saya ingin bertanya:
1. Harga buku/paketnya berapa?
2. Stoknya masih ada?
3. Bisa kirim ke kota saya?
4. Bagaimana cara pemesanannya?

Terima kasih.
  `.trim();

  return `https://wa.me/${CS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* Data Seri Buku */
const seriesData = [
  {
    id: 1,
    title: "Seri 1 - Sains Alam Sekitar",
    cover: "img/COVER SERI 1.webp",
    description:
      "Mengenalkan anak pada fenomena alam, tubuh, hewan, warna, cahaya, air, dan kebiasaan sehari-hari.",
    tags: ["Alam", "Tubuh", "Hewan"],
    topics: [
      "Kenapa langit berwarna biru?",
      "Kenapa hujan turun dari awan?",
      "Kenapa ikan bisa hidup di air?",
      "Kenapa bulan seperti mengikuti kita?",
      "Kenapa es bisa mencair?",
      "Kenapa kita harus tidur?",
      "Kenapa semut berjalan berbaris?",
      "Kenapa pelangi punya banyak warna?"
    ]
  },
  {
    id: 2,
    title: "Seri 2 - Eksperimen Benda Rumah",
    cover: "img/Seri 2 cover.webp",
    description:
      "Berisi percobaan sederhana dengan benda di rumah seperti sabun, balon, magnet, air, minyak, gula, dan telur.",
    tags: ["Benda", "Air", "Magnet"],
    topics: [
      "Kenapa sabun bisa membersihkan tangan?",
      "Kenapa balon bisa menempel di rambut?",
      "Kenapa magnet bisa menarik benda tertentu?",
      "Kenapa minyak tidak bercampur dengan air?",
      "Kenapa air bisa merambat di tisu?",
      "Kenapa biji bisa tumbuh?",
      "Kenapa gula bisa larut dalam air?",
      "Kenapa telur bisa mengapung di air garam?"
    ]
  },
  {
    id: 3,
    title: "Seri 3 - Tubuh dan Lingkungan",
    cover: "img/COVER SERI 3.webp",
    description:
      "Mengajak anak memahami tubuh manusia, rasa, kulit, otot, tulang, tanah, tumbuhan, dan makanan.",
    tags: ["Tubuh", "Tumbuhan", "Tanah"],
    topics: [
      "Kenapa jantung kita berdetak?",
      "Kenapa darah berwarna merah?",
      "Kenapa luka kecil bisa menutup?",
      "Kenapa kita merasa haus?",
      "Kenapa otot bisa bergerak?",
      "Kenapa tulang keras dan kuat?",
      "Kenapa lidah bisa merasakan rasa?",
      "Kenapa tanaman membelok ke arah cahaya?"
    ]
  },
  {
    id: 4,
    title: "Seri 4 - Reaksi dan Fenomena Seru",
    cover: "img/COVER SERI 4.webp",
    description:
      "Membahas eksperimen reaksi sederhana, panas, udara, karat, warna, tekanan, gelembung, dan bunyi.",
    tags: ["Reaksi", "Udara", "Panas"],
    topics: [
      "Kenapa air bisa mendidih?",
      "Kenapa besi bisa berkarat?",
      "Kenapa cuka dan soda kue bisa berbusa?",
      "Kenapa kubis ungu bisa menunjukkan asam dan basa?",
      "Kenapa susu bisa menggumpal saat diberi cuka?",
      "Kenapa merica menjauh saat disentuh sabun?",
      "Kenapa sedotan bisa membawa minuman?",
      "Kenapa bola pingpong bisa melayang di aliran udara?"
    ]
  }
];

/* Render Card Seri */
const seriesGrid = document.querySelector("#seriesGrid");

function renderSeriesCards() {
  if (!seriesGrid) return;

  seriesGrid.innerHTML = seriesData
    .map((series) => {
      const tags = series.tags
        .map((tag) => `<li>${tag}</li>`)
        .join("");

      return `
        <article class="series-card reveal">
          <div class="series-card-image">
            <img src="${series.cover}" alt="${series.title}" loading="lazy" />
            <span class="series-badge">Seri ${series.id}</span>
          </div>

          <div class="series-card-body">
            <h3>${series.title}</h3>
            <p>${series.description}</p>

            <ul class="series-topics" aria-label="Tema ${series.title}">
              ${tags}
            </ul>

            <a
              href="#"
              class="btn btn-primary btn-wa"
              data-wa-product="${series.title}"
            >
              Tanya Seri ${series.id}
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

/* Render Topik Preview */
const topicControls = document.querySelector("#topicControls");
const topicList = document.querySelector("#topicList");

function renderTopicControls() {
  if (!topicControls) return;

  topicControls.innerHTML = seriesData
    .map((series, index) => {
      const activeClass = index === 0 ? "active" : "";

      return `
        <button
          type="button"
          class="topic-btn ${activeClass}"
          data-series-id="${series.id}"
        >
          Seri ${series.id}
        </button>
      `;
    })
    .join("");
}

function renderTopics(seriesId = 1) {
  if (!topicList) return;

  const selectedSeries = seriesData.find((series) => series.id === Number(seriesId));

  if (!selectedSeries) return;

  topicList.innerHTML = selectedSeries.topics
    .map((topic, index) => {
      return `
        <div class="topic-item">
          <span class="topic-number">${index + 1}</span>
          <span class="topic-text">${topic}</span>
        </div>
      `;
    })
    .join("");
}

function setupTopicButtons() {
  if (!topicControls) return;

  topicControls.addEventListener("click", (event) => {
    const button = event.target.closest(".topic-btn");

    if (!button) return;

    const seriesId = button.dataset.seriesId;

    document.querySelectorAll(".topic-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    renderTopics(seriesId);
  });
}

/* WhatsApp Button Setup */
function setupWhatsAppButtons() {
  const buttons = document.querySelectorAll(".btn-wa");

  buttons.forEach((button) => {
    const productName = button.dataset.waProduct || "Buku FAKTA SAINS";
    const link = createWhatsAppLink(productName);

    button.setAttribute("href", link);
    button.setAttribute("target", "_blank");
    button.setAttribute("rel", "noopener noreferrer");
  });
}

/* Mobile Navigation */
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

function setupMobileNav() {
  if (!navToggle || !siteNav) return;

  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
    });
  });
}

/* Active Navigation on Scroll */
const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
const pageSections = document.querySelectorAll("section[id]");

function setupActiveNav() {
  if (!navLinks.length || !pageSections.length) return;

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    pageSections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });
}

/* Tabs */
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tab;

      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      tabPanels.forEach((panel) => {
        panel.classList.remove("active");
      });

      button.classList.add("active");

      const targetPanel = document.querySelector(`#${targetId}`);

      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}

/* FAQ Accordion */
function setupFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/* Reveal Animation */
function setupRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

/* Footer Year */
function setupYear() {
  const year = document.querySelector("#year");

  if (!year) return;

  year.textContent = new Date().getFullYear();
}

/* Init */
document.addEventListener("DOMContentLoaded", () => {
  renderSeriesCards();

  renderTopicControls();
  renderTopics(1);
  setupTopicButtons();

  setupWhatsAppButtons();
  setupMobileNav();
  setupActiveNav();
  setupTabs();
  setupFAQ();
  setupRevealAnimation();
  setupYear();
});