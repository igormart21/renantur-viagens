export type CepAddress = { street: string; district: string; city: string; uf: string }

/** Busca o endereço pelo CEP na ViaCEP. Retorna null se inválido/não encontrado. */
export async function fetchCep(cep: string): Promise<CepAddress | null> {
  const digits = cep.replace(/\D/g, "")
  if (digits.length !== 8) return null
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
    const data = await res.json()
    if (!res.ok || data.erro) return null
    return { street: data.logradouro ?? "", district: data.bairro ?? "", city: data.localidade ?? "", uf: data.uf ?? "" }
  } catch {
    return null
  }
}
