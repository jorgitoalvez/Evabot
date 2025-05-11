// Tema claro/oscuro
const toggle = document.getElementById('theme-toggle');
toggle.onclick = () => {
  const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', t);
};

// Cotizador
document.getElementById('btn-cotizar').onclick = () => {
  const tipo = document.getElementById('tipo').value;
  let valor = parseFloat(document.getElementById('valor').value) || 0;
  const uso = document.getElementById('uso').checked;
  let res = valor * ({auto:0.05,hogar:0.03,vida:0.04}[tipo]||0.05);
  if(!uso) res*=1.2;
  speak(`Tu prima anual estimada es ${res.toFixed(2)} pesos`);
  alert(`Prima estimada: $${res.toFixed(2)}`);
};

// Chat AI
async function sendChat(msg) {
  const win = document.getElementById('chat-window');
  const userDiv = document.createElement('div'); userDiv.className='msg user'; userDiv.textContent=msg;
  win.appendChild(userDiv);
  win.scrollTop = win.scrollHeight;

  const resp = await fetch('/api/chat', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({message: msg})
  });
  const {reply} = await resp.json();
  const botDiv = document.createElement('div'); botDiv.className='msg bot'; botDiv.textContent=reply;
  setTimeout(()=>{ win.appendChild(botDiv); win.scrollTop = win.scrollHeight; }, 500);
  speak(reply);
}

document.getElementById('send-msg').onclick = () => {
  const inp = document.getElementById('chat-msg');
  if(inp.value.trim()) sendChat(inp.value.trim()), inp.value='';
};

// TTS
function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang='es-ES'; u.rate=1;
  speechSynthesis.speak(u);
}