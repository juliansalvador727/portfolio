/**
 * Two painted azulejo panels in the page margins (see scripts/azulejo-mural):
 * a rabelo on the Douro on the left, an albarrada on the right. They sit
 * behind the page, fade out before the reading column, and a slow band of
 * light crosses the glaze now and then.
 */
export function PortoBackdrop() {
  return (
    <div aria-hidden className="porto-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="porto-mural porto-mural-left" />
      <div className="porto-mural porto-mural-right" />
      <div className="porto-sheen absolute inset-0" />
    </div>
  );
}
