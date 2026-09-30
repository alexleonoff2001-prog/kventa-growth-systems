export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="brand" aria-label="KVENTA — наверх">
      <span className="brand-mark" aria-hidden="true"><i /></span>
      {!compact && (
        <span className="brand-type">
          <strong>KVENTA</strong>
          <small>GROWTH SYSTEMS</small>
        </span>
      )}
    </a>
  );
}
