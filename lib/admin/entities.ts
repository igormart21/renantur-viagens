/**
 * Configuração das entidades de conteúdo gerenciáveis no painel admin.
 * A UI e as server actions são genéricas e dirigidas por esta config,
 * evitando duplicar código de CRUD para cada tabela.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "boolean"
  | "select"
  | "array"
  | "json"
  | "date";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  help?: string;
}

export interface EntityConfig {
  key: string; // segmento de URL (/admin/<key>)
  table: string; // tabela no Supabase
  label: string; // singular
  labelPlural: string;
  icon: string; // nome do ícone lucide-react
  listColumns: string[]; // campos exibidos na tabela
  fields: FieldConfig[];
  defaultSort: string;
}

const activeField: FieldConfig = {
  key: "active",
  label: "Ativo",
  type: "boolean",
  help: "Exibir no site público",
};
const sortField: FieldConfig = {
  key: "sort",
  label: "Ordem",
  type: "number",
  help: "Ordem de exibição (menor primeiro)",
};

export const ENTITIES: EntityConfig[] = [
  {
    key: "pacotes",
    table: "packages",
    label: "Pacote",
    labelPlural: "Pacotes",
    icon: "Luggage",
    listColumns: ["name", "category", "location", "total", "active"],
    defaultSort: "sort",
    fields: [
      { key: "name", label: "Nome", type: "text", required: true },
      { key: "slug", label: "Slug (URL da página)", type: "text", help: "Ex.: deserto-atacama" },
      { key: "flag", label: "Bandeiras (emoji)", type: "text" },
      { key: "location", label: "Localização", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "text" },
      { key: "includes", label: "Inclui", type: "textarea" },
      { key: "duration", label: "Duração", type: "text", help: "Ex.: 12 dias" },
      { key: "type", label: "Tipo", type: "text" },
      {
        key: "category",
        label: "Categoria",
        type: "select",
        options: ["Aéreos", "Rodoviários", "Cruzeiros", "Internacional"],
        required: true,
      },
      { key: "tag", label: "Tag/Selo", type: "text" },
      { key: "entry", label: "Entrada (R$)", type: "text", help: "Ex.: 100,00" },
      { key: "installments", label: "Parcelas", type: "number" },
      { key: "monthly", label: "Valor da parcela (R$)", type: "text" },
      { key: "total", label: "Total (R$)", type: "text" },
      { key: "img", label: "Imagem", type: "image" },
      { key: "description_long", label: "Descrição completa (página dedicada)", type: "textarea", help: "Texto de apresentação exibido na página do pacote" },
      { key: "highlights", label: "O que inclui (checklist)", type: "array", help: "Um item por linha. Se vazio, usa o campo 'Inclui'." },
      { key: "gallery", label: "Galeria (pontos turísticos / hospedagem)", type: "array", help: "Uma URL de imagem por linha" },
      { key: "itinerary", label: "Roteiro (dias)", type: "json", help: 'Lista JSON: [{"day":"1º DIA","title":"Chegada","description":"..."}]' },
      { key: "faq", label: "Dúvidas frequentes", type: "json", help: 'Lista JSON: [{"q":"Pergunta?","a":"Resposta"}]' },
      activeField,
      sortField,
    ],
  },
  {
    key: "destinos",
    table: "destinations",
    label: "Destino",
    labelPlural: "Destinos",
    icon: "MapPin",
    listColumns: ["name", "region", "rating", "airport", "active"],
    defaultSort: "sort",
    fields: [
      { key: "slug", label: "Slug (URL)", type: "text", required: true, help: "Ex.: rio-de-janeiro" },
      { key: "name", label: "Nome", type: "text", required: true },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "description", label: "Descrição", type: "textarea" },
      { key: "hero", label: "Imagem principal (hero)", type: "image" },
      { key: "rating", label: "Avaliação (0-5)", type: "number" },
      { key: "highlights", label: "Destaques", type: "array", help: "Um por linha" },
      { key: "temp", label: "Clima", type: "text", help: "Ex.: 28°C" },
      { key: "people", label: "Visitantes", type: "text", help: "Ex.: 1M+" },
      { key: "airport", label: "Aeroporto", type: "text", help: "Ex.: GIG" },
      { key: "region", label: "Região (grid)", type: "text" },
      { key: "grid_img", label: "Imagem do grid", type: "image" },
      { key: "grid_size", label: "Tamanho no grid", type: "select", options: ["lg", "sm"] },
      activeField,
      sortField,
    ],
  },
  {
    key: "circuitos",
    table: "circuits",
    label: "Circuito",
    labelPlural: "Circuitos",
    icon: "Route",
    listColumns: ["title", "region", "days", "price_from", "active"],
    defaultSort: "sort",
    fields: [
      { key: "title", label: "Título", type: "text", required: true },
      { key: "region", label: "Região", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "text" },
      { key: "description", label: "Descrição", type: "textarea" },
      { key: "img", label: "Imagem", type: "image" },
      { key: "stops", label: "Paradas", type: "array", help: "Uma por linha" },
      { key: "days", label: "Dias", type: "text", help: "Ex.: 12 a 15 dias" },
      { key: "price_from", label: "A partir de (R$)", type: "text" },
      { key: "accent", label: "Cor de destaque", type: "text", help: "Ex.: #FF6B57" },
      activeField,
      sortField,
    ],
  },
  {
    key: "depoimentos",
    table: "testimonials",
    label: "Depoimento",
    labelPlural: "Depoimentos",
    icon: "MessageSquareQuote",
    listColumns: ["name", "city", "stars", "active"],
    defaultSort: "sort",
    fields: [
      { key: "name", label: "Nome", type: "text", required: true },
      { key: "city", label: "Cidade", type: "text" },
      { key: "stars", label: "Estrelas (1-5)", type: "number" },
      { key: "text", label: "Depoimento", type: "textarea" },
      { key: "photo", label: "Foto do avaliador", type: "image" },
      { key: "photos", label: "Fotos da viagem (avaliação)", type: "array", help: "Uma URL de imagem por linha — fotos anexadas na avaliação (opcional)" },
      activeField,
      sortField,
    ],
  },
  {
    key: "galeria",
    table: "gallery_photos",
    label: "Foto",
    labelPlural: "Galeria",
    icon: "Images",
    listColumns: ["url", "size", "active"],
    defaultSort: "sort",
    fields: [
      { key: "url", label: "Imagem", type: "image", required: true },
      { key: "size", label: "Tamanho", type: "select", options: ["large", "medium", "small"] },
      activeField,
      sortField,
    ],
  },
  {
    key: "categorias",
    table: "categories",
    label: "Categoria",
    labelPlural: "Categorias",
    icon: "LayoutGrid",
    listColumns: ["name", "label", "href", "active"],
    defaultSort: "sort",
    fields: [
      { key: "label", label: "Número/rótulo", type: "text", help: "Ex.: 01" },
      { key: "name", label: "Nome", type: "text", required: true },
      { key: "description", label: "Descrição", type: "textarea" },
      { key: "img", label: "Imagem", type: "image" },
      { key: "href", label: "Link", type: "text", help: "Ex.: /pacotes" },
      { key: "accent", label: "Cor de destaque", type: "text" },
      activeField,
      sortField,
    ],
  },
  {
    key: "transfer",
    table: "transfer_services",
    label: "Serviço de Transfer",
    labelPlural: "Transfer",
    icon: "Car",
    listColumns: ["title", "icon", "active"],
    defaultSort: "sort",
    fields: [
      { key: "title", label: "Título", type: "text", required: true },
      { key: "icon", label: "Ícone (lucide)", type: "text", help: "Ex.: Car, Shield, Users, Clock" },
      { key: "description", label: "Descrição", type: "textarea" },
      activeField,
      sortField,
    ],
  },
  {
    key: "hero",
    table: "hero_slides",
    label: "Slide do Hero",
    labelPlural: "Hero (slides)",
    icon: "GalleryHorizontal",
    listColumns: ["headline", "place", "active"],
    defaultSort: "sort",
    fields: [
      { key: "img", label: "Imagem de fundo", type: "image", required: true },
      { key: "headline", label: "Título", type: "text" },
      { key: "sub", label: "Subtítulo", type: "text" },
      { key: "place", label: "Local", type: "text" },
      activeField,
      sortField,
    ],
  },
  {
    key: "cidades",
    table: "cities",
    label: "Cidade",
    labelPlural: "Cidades atendidas",
    icon: "Building2",
    listColumns: ["name"],
    defaultSort: "sort",
    fields: [
      { key: "name", label: "Nome", type: "text", required: true },
      sortField,
    ],
  },
  {
    key: "valores",
    table: "company_values",
    label: "Valor da empresa",
    labelPlural: "Valores",
    icon: "Sparkles",
    listColumns: ["title", "icon"],
    defaultSort: "sort",
    fields: [
      { key: "title", label: "Título", type: "text", required: true },
      { key: "icon", label: "Ícone (lucide)", type: "text", help: "Ex.: Heart, Award, Users, Target" },
      { key: "description", label: "Descrição", type: "textarea" },
      sortField,
    ],
  },
  {
    key: "clientes",
    table: "clients",
    label: "Cliente",
    labelPlural: "Clientes",
    icon: "Users",
    listColumns: ["name", "email", "phone", "doc"],
    defaultSort: "name",
    fields: [
      { key: "name", label: "Nome", type: "text", required: true },
      { key: "email", label: "E-mail", type: "text" },
      { key: "phone", label: "Telefone", type: "text" },
      { key: "doc", label: "CPF/CNPJ", type: "text" },
      { key: "birthdate", label: "Nascimento", type: "date" },
      { key: "address", label: "Endereço", type: "textarea" },
      { key: "notes", label: "Observações", type: "textarea" },
    ],
  },
];

export function getEntity(key: string): EntityConfig | undefined {
  return ENTITIES.find((e) => e.key === key);
}

// Entidades de conteúdo exibidas na seção "Conteúdo do site" do menu.
export const CONTENT_ENTITY_KEYS = [
  "pacotes",
  "destinos",
  "circuitos",
  "depoimentos",
  "galeria",
  "categorias",
  "transfer",
  "hero",
  "cidades",
  "valores",
];
