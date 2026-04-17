function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

function formatVnDigits(digits: string) {
  const d = onlyDigits(digits);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 10)}`;
}

/** +84 prefix; ẩn 4 số cuối (national digits only, same shapes as `VnPhoneInput`). */
export function maskNationalPhoneForSubtitle(digitsRaw: string): string {
  const d = onlyDigits(digitsRaw);
  if (d.length <= 4) return "****";
  return `${formatVnDigits(d.slice(0, -4)).trim()} ****`;
}
