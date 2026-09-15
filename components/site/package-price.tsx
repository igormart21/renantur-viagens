type Pkg = Record<string, unknown>

export function PackagePrice({
  pkg,
  dark = false,
}: {
  pkg: Pkg
  dark?: boolean
}) {
  const financed = Number(pkg.installments) > 0 && Boolean(pkg.monthly)
  const entry = String(pkg.entry ?? "")
  const hasEntry = Number(entry.replace(/\./g, "").replace(",", ".")) > 0
  return (
    <div className={dark ? "text-white" : "text-primary"}>
      {financed && (
        <>
          <p className="mb-2 text-xs font-semibold text-accent">
            {hasEntry ? `Entrada de R$ ${entry} +` : "Sem entrada"}
          </p>
          <p className="text-xl font-extrabold">
            {String(pkg.installments)}x de R$ {String(pkg.monthly)}
          </p>
        </>
      )}
      {Boolean(pkg.total) && (
        <p
          className={
            financed ? "mt-1 text-xs opacity-60" : "text-xl font-extrabold"
          }
        >
          {financed ? "Ou " : ""}R$ {String(pkg.total)} à vista
        </p>
      )}
      {!financed && !pkg.total && (
        <p className="text-sm">Consulte os valores</p>
      )}
    </div>
  )
}
