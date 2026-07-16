// Import html2canvas from CDN (will be cached by service worker)
const html2canvasScript = document.createElement('script');
html2canvasScript.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
document.head.appendChild(html2canvasScript);

(function(){
  const container = document.getElementById("container");
  const totalBox  = document.getElementById("total");
  const totalWordsBox = document.getElementById("totalWords");
  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");
  const saveBtn = document.getElementById("saveBtn");
  const clearBtn = document.getElementById("clearBtn");
  const remarkDivs = document.querySelectorAll('.remark');
  const previousBalanceEl = document.querySelector(".previous-balance");

  /* ---------- Utils ---------- */
  function setCaretToEnd(el){
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function nowDateTimeTick(){
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', {year:'numeric', month:'short', day:'numeric'});
    timeEl.textContent = now.toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit', second:'2-digit', hour12:true});
  }
  
  setInterval(nowDateTimeTick, 1000);
  nowDateTimeTick();

  function evalExpr(expr){
    try{
      const js=expr.replace(/\^/g,"**");
      const val=Function('"use strict";return('+js+')')();
      if(typeof val==="number" && isFinite(val))
        return Number.isInteger(val)?val:parseFloat(val.toFixed(6));
    }catch(e){}
    return 0;
  }

  // Indian number words (Rupees & Paise)
  function numberToWordsIndian(num){
    num = Math.floor(Math.abs(num));
    if (num === 0) return "Zero";
    const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven",
      "Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

    function twoDigits(n){
      if(n<20) return ones[n];
      const t=Math.floor(n/10), o=n%10;
      return tens[t] + (o?(" " + ones[o]):"");
    }
    function threeDigits(n){
      const h=Math.floor(n/100), r=n%100;
      return (h?ones[h]+" Hundred":"") + (h&&r?" ":"") + (r?twoDigits(r):"");
    }

    let words = "";
    const crore = Math.floor(num/10000000); num%=10000000;
    const lakh  = Math.floor(num/100000);   num%=100000;
    const thou  = Math.floor(num/1000);     num%=1000;
    const hund  = num;

    if(crore) words += threeDigits(crore) + " Crore";
    if(lakh)  words += (words?" ":"") + twoDigits(lakh) + " Lakh";
    if(thou)  words += (words?" ":"") + twoDigits(thou) + " Thousand";
    if(hund)  words += (words?" ":"") + threeDigits(hund);

    return words.trim();
  }

  function totalInWords(amt){
    const rupees = Math.floor(amt);
    const paise = Math.round((amt - rupees) * 100);
    let s = numberToWordsIndian(rupees) + " Rupees";
    if (paise>0) s += " and " + numberToWordsIndian(paise) + " Paise";
    return s + " Only";
  }

  /* ---------- Prevent new lines in remark fields ---------- */
  remarkDivs.forEach(remark => {
    remark.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
    
    // Prevent paste with new lines
    remark.addEventListener('paste', function(e) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertText', false, text.replace(/[\r\n]+/g, ' '));
    });
  });

  /* ---------- Row factory ---------- */
  function makeRow(i, text=""){
    const row = document.createElement("div");
    row.className = "row";

    const sl = document.createElement("div");
    sl.className = "sl";
    sl.textContent = i+1;

    const input = document.createElement("div");
    input.className = "input";
    input.contentEditable = true;
    input.textContent = text;

    const result = document.createElement("div");
    result.className = "result";

    // live evaluation when typing
    input.addEventListener("input", render);

    // Enter => new row (if not empty)
    input.addEventListener("keydown", function(e){
      if(e.key === "Enter"){
        e.preventDefault();
        if(input.textContent.trim() !== ""){
          container.appendChild(makeRow(container.children.length));
          updateSL();
          render();
          const lastInput = container.lastChild.querySelector(".input");
          lastInput.focus();
        }
      }

      // Backspace on empty => delete row (keep at least 1)
      if(e.key === "Backspace" && input.textContent.trim() === ""){
        if(container.children.length > 1){
          e.preventDefault();
          const prev = row.previousElementSibling || row.nextElementSibling;
          row.remove();
          updateSL();
          render();
          // focus & caret at END on the neighbor row
          if(prev){
            const target = prev.querySelector(".input");
            target.focus();
            setCaretToEnd(target);
          }
        }
      }
    });

    row.appendChild(sl);
    row.appendChild(input);
    row.appendChild(result);
    return row;
  }

  function updateSL(){
    [...container.children].forEach((row,i)=>{
      row.querySelector(".sl").textContent = i+1;
    });
  }

  function render(){
    let grand=0;
    const previousBalance = parseFloat(previousBalanceEl.textContent) || 0;
    grand += previousBalance;

    [...container.children].forEach(row=>{
      const text = row.querySelector(".input").textContent;
      const resBox = row.querySelector(".result");
      let val=0;
      const m=text.match(/([0-9.\s()+\-*/^]+)$/);
      if(m){
        const expr=m[1].trim();
        if(expr && /[0-9]/.test(expr)) val=evalExpr(expr);
      }
      resBox.textContent = val ? val.toLocaleString('en-IN') : "";
      grand += (val||0);
    });

    // numbers + words
    totalBox.textContent = "Total = " + (Number.isInteger(grand) ? grand.toLocaleString('en-IN') : grand.toLocaleString('en-IN'));
    totalWordsBox.textContent = "In Words: " + totalInWords(grand);
  }

  // Save as Image (PNG)
  async function saveAsImage(){
    const paper = document.getElementById("paper");
    // wait a frame to ensure fonts/layout settled
    await new Promise(r=>requestAnimationFrame(r));
    
    // Check if html2canvas is loaded
    if (typeof html2canvas === 'undefined') {
      alert('Please check your internet connection and try again. html2canvas is required for saving images.');
      return;
    }
    
    const canvas = await html2canvas(paper, {backgroundColor:null, scale:2});
    const link = document.createElement('a');
    const stamp = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
    link.download = `invoice-${stamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
  
  saveBtn.addEventListener("click", saveAsImage);

  clearBtn.addEventListener("click",function(){
    container.innerHTML="";
    container.appendChild(makeRow(0));
    previousBalanceEl.textContent="";
    render();
  });
  
  // Validation: only digits, max 10
  previousBalanceEl.addEventListener("input", function(e){
    let val = previousBalanceEl.textContent.replace(/\D/g, "");
    if(val.length > 10) val = val.slice(0,10);
    if(previousBalanceEl.textContent !== val){
      previousBalanceEl.textContent = val;
      setCaretToEnd(previousBalanceEl);
    }
    render();
  });
  
  // start with ONLY 1 default row
  container.appendChild(makeRow(0));
  render();
})();
  /* ---------- Quick Operator Insertion Logic ---------- */
  let activeInput = null;

  // Track rakhenge ki user kis input box mein type kar raha tha
  container.addEventListener("focusin", function(e) {
    if(e.target.classList.contains("input")) {
      activeInput = e.target;
    }
  });

  document.querySelectorAll(".op-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault(); // Default click behavior rokna taaki focus na toote
      
      // Agar koi active input box nahi hai, toh pehle/aakhri box ko select karein
      if (!activeInput && container.children.length > 0) {
        activeInput = container.lastChild.querySelector(".input");
      }

      if (activeInput) {
        activeInput.focus();
        
        const op = btn.getAttribute("data-op");
        const sel = window.getSelection();
        if (!sel.rangeCount) return;
        
        const range = sel.getRangeAt(0);
        range.deleteContents();
        
        // Text node insert karna jahan cursor hai
        const textNode = document.createTextNode(op);
        range.insertNode(textNode);
        
        // Cursor ko character ke aage shift karna
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        sel.removeAllRanges();
        sel.addRange(range);
        
        // Live update calculation trigger karein
        render();
      }
    });
  });
