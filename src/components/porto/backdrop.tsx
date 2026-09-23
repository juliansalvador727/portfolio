/**
 * Two painted azulejo panels in the page margins (see scripts/azulejo-mural):
 * a rabelo on the Douro on the left, an albarrada on the right. Each panel is
 * a stack of aligned layers; only the moving parts animate — the water
 * ripples, the boat rocks, the bouquet sways and sheds the odd petal.
 */

const LEFT = ["back", "water-a", "water-b", "boat", "tiles"];
const RIGHT = ["back", "bouquet", "vase", "tiles"];

function Panel({ side, layers }: { side: "left" | "right"; layers: string[] }) {
  return (
    <div className={`porto-mural porto-mural-${side}`}>
      {layers.map((layer) => (
        <div
          key={layer}
          className={`porto-mural-layer porto-mural-${layer}`}
          style={{ backgroundImage: `url(/mural/${side}-${layer}.svg)` }}
        />
      ))}
      {side === "right" &&
        [0, 1, 2].map((i) => <span key={i} className={`porto-petal porto-petal-${i}`} />)}
    </div>
  );
}

export function PortoBackdrop() {
  return (
    <div aria-hidden className="porto-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Panel side="left" layers={LEFT} />
      <Panel side="right" layers={RIGHT} />
    </div>
  );
}
