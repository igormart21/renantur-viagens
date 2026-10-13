import { Font } from "@react-pdf/renderer";

/** Identidade da plataforma (mesmos tokens do site: azul-marinho + laranja, Poppins). */
export const BRAND = {
  navy: "#0a2d57",
  navySoft: "#e8eef6",
  orange: "#f7941d",
  orangeSoft: "#fff3e3",
  text: "#3d4a5d",
  muted: "#7a8696",
  line: "#dde3ea",
  font: "Poppins",
};

let registered = "";
/** Registra a Poppins a partir de `base` (URL do site ou pasta local com os .ttf). */
export function registerBrandFonts(base: string) {
  if (registered === base) return;
  Font.register({
    family: BRAND.font,
    fonts: [
      { src: `${base}/fonts/Poppins-Regular.ttf`, fontWeight: 400 },
      { src: `${base}/fonts/Poppins-Medium.ttf`, fontWeight: 500 },
      { src: `${base}/fonts/Poppins-SemiBold.ttf`, fontWeight: 600 },
      { src: `${base}/fonts/Poppins-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]); // sem "con- forme"
  registered = base;
}

/** Remove emojis/bandeiras, que as fontes do PDF não desenham (viram "<+ç<+÷"). */
export const clean = (text: unknown) =>
  String(text ?? "")
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();

/** "11017581711" → "110.175.817-11" (mantém como está se não tiver 11 dígitos). */
export function cpf(doc: unknown) {
  const d = String(doc ?? "").replace(/\D/g, "");
  return d.length === 11 ? d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : String(doc ?? "");
}
