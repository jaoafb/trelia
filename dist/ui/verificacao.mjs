import { h } from "./html.mjs";

const statuses = {
  pendente_revisao_juridica: "Revisão jurídica pendente",
  revisao_parcial: "Conferência jurídica parcial",
  revisao_concluida_no_escopo: "Síntese conferida no escopo",
};

export function verificationSection(topic, external) {
  const review = topic.verification;
  if (!review) return "";
  const label = statuses[review.status];
  if (!label) throw new Error("Status desconhecido de revisão: " + review.status);
  const event = review.historico.at(-1);
  return `<details class="verification-history">
    <summary>Histórico de verificação <span class="verification-state">${h(label)}</span></summary>
    <div class="verification-content">
      ${event ? `<p class="verification-date">Conferência de <time datetime="${h(event.data)}">${h(event.data.split("-").reverse().join("/"))}</time></p>
        <p><strong>Escopo:</strong> ${h(event.escopo)}</p>
        <p><strong>Resultado:</strong> ${h(event.resultado)}</p>
        ${event.pendencias ? `<p><strong>Pontos ainda a conferir:</strong> ${h(event.pendencias)}</p>` : ""}
        <ul class="verification-links">${event.fontes.map(source =>
          `<li>${external(source.url, source.titulo)} <span>· ${h(source.recorte)}</span></li>`).join("")}</ul>`
      : "<p>Esta explicação permanece em revisão jurídica, sem registro de conferência substantiva concluída.</p>"}
      <p class="verification-disclaimer">${h(review.aviso)}</p>
    </div>
  </details>`;
}
