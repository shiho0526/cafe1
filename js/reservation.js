// reservation.js
document.addEventListener("DOMContentLoaded", () => {

  // タブ切替
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.form-panel');

  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>{t.classList.remove('active'); t.setAttribute("aria-selected","false");});
      tab.classList.add('active'); tab.setAttribute("aria-selected","true");
      panels.forEach(p=>p.classList.remove('active'));
      const target = document.querySelector(`#form-${tab.dataset.tab}`);
      if(target) target.classList.add('active');
    });
  });

  // 日付・時間制御
  const dateInput = document.getElementById("date_input");
  const timeSelect = document.getElementById("time_start");
  if(dateInput && timeSelect){
    const timeOptions = document.querySelectorAll("#time_start option");
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
    timeOptions.forEach(opt=> opt.dataset.original = opt.textContent);

    function updateTimeOptions(){
      const selectedDate = dateInput.value;
      if(!selectedDate) return;
      timeOptions.forEach(opt=>{
        opt.disabled=false;
        opt.classList.remove("disabled-time");
        opt.textContent = opt.dataset.original;
      });
    }
    updateTimeOptions();
    dateInput.addEventListener("change", updateTimeOptions);
  }

  // 同意チェック
  const forms = document.querySelectorAll("form");
  forms.forEach(form=>{
    const privacy = form.querySelector("input[class*='agree-privacy']");
    const terms = form.querySelector("input[class*='agree-terms']");
    const errorText = form.querySelector(".agree-error");
    if(!privacy||!terms||!errorText) return;
    form.addEventListener("submit", e=>{
      if(!privacy.checked || !terms.checked){
        e.preventDefault();
        errorText.style.display="block";
      } else errorText.style.display="none";
    });
    [privacy,terms].forEach(input=>{
      input.addEventListener("change", ()=>{
        if(privacy.checked && terms.checked) errorText.style.display="none";
      });
    });
  });

});