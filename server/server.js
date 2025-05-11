function toggleChat() {
  const bubble = document.getElementById("chatBubble");
  bubble.style.display = bubble.style.display === "block" ? "none" : "block";
}

function cotizar() {
  const tipo = document.getElementById("tipo").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const uso = document.getElementById("uso").checked;

  if (isNaN(valor) || valor <= 0) {
    alert("Por favor, ingresá un valor válido.");
    return;
  }

  let porcentaje = 0.05; // base 5%
  if (!uso) porcentaje += 0.02; // uso comercial

  let total = valor * porcentaje;

  alert(`El seguro estimado para un ${tipo} es de $${total.toFixed(2)} ARS.`);
}
