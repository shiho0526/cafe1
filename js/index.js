// index.js
document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     Slider Class
  ================================ */
  class Slider {
    constructor(element, interval = 3000) {
      this.slider = element;
      this.slides = Array.from(this.slider.querySelectorAll("li"));
      this.current = 0;
      this.interval = interval;
      this.timer = null;
      if (this.slides.length <= 1) return;
      this.showSlide(this.current);
      this.start();
      this.slider.addEventListener("mouseenter", () => this.stop());
      this.slider.addEventListener("mouseleave", () => this.start());
    }
    showSlide(index) {
      this.slides.forEach((slide,i)=>{
        const active = i===index;
        slide.style.opacity = active?"1":"0";
        slide.setAttribute("aria-hidden", active?"false":"true");
      });
    }
    nextSlide() { this.current = (this.current+1) % this.slides.length; this.showSlide(this.current);}
    start() { this.stop(); this.timer = setInterval(()=>this.nextSlide(), this.interval);}
    stop() { if(this.timer) clearInterval(this.timer);}
  }

  document.querySelectorAll("[data-slider]").forEach(slider => new Slider(slider,3000));

  // ABOUT セクション
  const aboutText = document.querySelector("#cafe1117 .about-content");
  if(aboutText){
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          aboutText.classList.add("fade-up");
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.25});
    observer.observe(aboutText);
  }

  // CONTACT セクション（上段・下段）
  ['.contact-header-section','.contact-info-section'].forEach(sel=>{
    const el = document.querySelector(sel);
    if(el){
      const obs = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },{threshold:0.3});
      obs.observe(el);
    }
  });

});