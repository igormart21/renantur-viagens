/** Valores monetários no formato usado no cadastro e na vitrine. */
export function moneyValue(value: unknown): number | null {
  const text = String(value ?? "").trim()
  if (!text) return null
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(text)) {
    throw new Error(
      "Informe os valores em reais, como 1.500,00, sem o símbolo R$."
    )
  }
  return Number(text.replace(/\./g, "").replace(",", "."))
}

export function validatePackage(row: Record<string, unknown>) {
  if (!String(row.name ?? "").trim())
    throw new Error("Informe o nome do pacote.")
  row.slug = String(row.slug || row.name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  if (!row.slug) throw new Error("Informe uma URL válida para o pacote.")
  for (const key of ["entry", "monthly", "total"]) {
    const value = moneyValue(row[key])
    if (value !== null && value <= 0) {
      if (key === "entry") row[key] = ""
      else
        throw new Error(
          "Os valores à vista e de parcela devem ser maiores que zero."
        )
    } else
      row[key] =
        value === null
          ? ""
          : value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
  }
  if (row.monthly) {
    if (!Number.isInteger(row.installments) || Number(row.installments) < 1)
      throw new Error("Informe a quantidade de parcelas.")
  } else {
    if (row.entry)
      throw new Error("Informe o parcelamento para cadastrar uma entrada.")
    row.installments = 0
  }
  if (!row.monthly && !row.total)
    throw new Error("Informe o valor à vista ou o parcelamento.")
  for (const key of ["itinerary", "faq"]) {
    if (
      !Array.isArray(row[key]) ||
      row[key].some(
        (item: unknown) =>
          !item ||
          typeof item !== "object" ||
          Array.isArray(item) ||
          Object.values(item).some((value) => typeof value !== "string")
      )
    )
      throw new Error(
        `Preencha corretamente ${key === "itinerary" ? "o roteiro" : "as dúvidas frequentes"}.`
      )
  }
  if (!String(row.includes ?? "").trim() && Array.isArray(row.highlights))
    row.includes = row.highlights.join(" + ")
  return row
}
