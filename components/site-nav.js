import {
  LitElement,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

const LABELS = {
  en: {
    aboutme: "About Me",
    programming: "Programming",
    teaching: "Teaching",
    cv: "Resume",
    contact: "Contact",
    articles: "Articles",
    language: "Language",
  },
  de: {
    aboutme: "Über Mich",
    programming: "Softwareentwicklung",
    teaching: "Schulungen / Kurse",
    cv: "Lebenslauf",
    contact: "Kontakt / Impressum",
    articles: "Artikel",
    language: "Sprache",
  },
};

class SiteNav extends LitElement {
  // Opt out of shadow DOM so the Web Awesome autoloader can discover
  // wa-dropdown / wa-dropdown-item in the rendered markup.
  createRenderRoot() {
    return this;
  }
  static properties = {
    lang: { type: String },
    page: { type: String },
    root: { type: String },
  };

  constructor() {
    super();
    this.lang = "en";
    this.page = "aboutme";
    this.root = "..";
  }

  _pageLink(name) {
    return `${this.root}/pages/${name}_${this.lang}.html`;
  }

  _langLink(targetLang) {
    return `${this.root}/pages/${this.page}_${targetLang}.html`;
  }

  render() {
    const l = LABELS[this.lang] ?? LABELS.en;
    return html`
      <nav>
        <a class="brand" href="${this._pageLink("aboutme")}">Marko Knöbl</a>
        <ul class="nav-links">
          <li><a href="${this._pageLink("aboutme")}">${l.aboutme}</a></li>
          <li>
            <a href="${this._pageLink("programming")}">${l.programming}</a>
          </li>
          <li><a href="${this._pageLink("teaching")}">${l.teaching}</a></li>
          <li><a href="${this._pageLink("cv")}">${l.cv}</a></li>
          <li><a href="${this._pageLink("contact")}">${l.contact}</a></li>
          <li>
            <wa-dropdown
              @wa-select=${(e) => {
                window.location.href = e.detail.item.value;
              }}
            >
              <button slot="trigger" class="nav-btn" type="button">
                ${l.articles} ▾
              </button>
              <wa-dropdown-item
                value="${this.root}/articles/transparent_cup.html"
              >
                transparent cup theorem
              </wa-dropdown-item>
            </wa-dropdown>
          </li>
        </ul>
        <div class="lang-switcher">
          <wa-dropdown
            @wa-select=${(e) => {
              window.location.href = e.detail.item.value;
            }}
          >
            <button slot="trigger" class="nav-btn" type="button">
              ${l.language} ▾
            </button>
            <wa-dropdown-item value="${this._langLink("en")}"
              >EN</wa-dropdown-item
            >
            <wa-dropdown-item value="${this._langLink("de")}"
              >DE</wa-dropdown-item
            >
          </wa-dropdown>
        </div>
      </nav>
    `;
  }
}

customElements.define("site-nav", SiteNav);
