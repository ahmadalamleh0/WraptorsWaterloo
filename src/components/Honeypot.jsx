// Web3Forms honeypot: a checkbox named "botcheck" that people never see
// (display: none, skipped by keyboard and screen readers). Form-filling
// bots tick it; submitToWeb3Forms() then sends nothing and the bot gets
// the normal success screen.
export default function Honeypot({ checked, onChange }) {
  return (
    <input
      type="checkbox"
      name="botcheck"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
}
