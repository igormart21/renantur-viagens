/** Cláusulas padrão do contrato (usadas enquanto Configurações estiver vazio). */
export const DEFAULT_CONTRACT_TERMS = `A CONTRATADA compromete-se a prestar os serviços de turismo descritos neste instrumento, conforme o pacote e roteiro acima, observadas as condições comerciais pactuadas.

O CONTRATANTE declara estar ciente das condições de pagamento, prazos e políticas de cancelamento e remarcação informadas pela CONTRATADA.`;

/** Um parágrafo por cláusula (separadas por linha em branco ou quebra de linha). */
export function contractClauses(text: string | null | undefined): string[] {
  return (text?.trim() || DEFAULT_CONTRACT_TERMS)
    .split(/\n+/)
    .map((c) => c.trim().replace(/^\d+[.)]\s*/, ""))
    .filter(Boolean);
}
