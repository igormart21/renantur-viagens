-- ============================================================
-- Renantur Viagens — Seed do conteúdo atual do site.
-- Rode uma vez em um banco recém-criado (após 0001_init.sql).
-- ============================================================

-- Pacotes ----------------------------------------------------
insert into public.packages (name, flag, location, subtitle, includes, duration, type, entry, installments, monthly, total, img, category, tag, sort) values
('Circuito Andino','🇦🇷🇨🇱🇧🇴','Argentina · Chile · Bolívia','Aventura pela Cordilheira','Ônibus + Hotel + Passeios + Guia local + Transfer','12 dias','Turismo de aventura','100,00',12,'188','2.360','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000','Rodoviários','Mais vendido',1),
('Circuito Patagônia','🇦🇷🇨🇱','Argentina · Chile','Natureza selvagem no fim do mundo','Ônibus + Hotel + Passeios + Guia local + Transfer','10 dias','Ecoturismo','100,00',12,'228','2.833','https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1000','Rodoviários','Destaque',2),
('Inverno Argentina','🇦🇷','Bariloche · Mendoza','Neve, chocolate e lagos alpinos','Ônibus + Hotel + Passeios + Guia local + Transfer','8 dias','Turismo de inverno','100,00',12,'137','1.747','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000','Rodoviários','Inverno',3),
('Buenos Aires','🇦🇷','Argentina','Tango, cultura e gastronomia','Aéreo + Hotel + Passeios + Guia local + Transfer','5 dias','Pacote Aéreo','100,00',12,'149','1.890','https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1000','Aéreos','Cidade',4),
('Santiago & Valparaíso','🇨🇱','Chile','Arte, vinho e arquitetura colonial','Aéreo + Hotel + Passeios + Guia local + Transfer','5 dias','Pacote Aéreo','100,00',12,'166','2.100','https://images.unsplash.com/photo-1553697388-94e804e2f0f6?auto=format&fit=crop&q=80&w=1000','Aéreos','Chile',5),
('Machu Picchu & Cusco','🇵🇪','Peru','A maravilha do mundo inca','Aéreo + Hotel + Passeios + Guia local + Transfer','8 dias','Pacote Aéreo','100,00',12,'425','5.200','https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1000','Internacional','Exclusivo',6),
('Deserto Atacama','🇨🇱','Norte do Chile','Imersão no deserto mais árido','Aéreo + Hotel + Passeios + Guia local + Transfer','6 dias','Turismo de aventura','100,00',12,'308','3.800','https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=1000','Internacional','Paisagens',7),
('Salar de Uyuni','🇧🇴','Bolívia','O maior espelho do mundo','Aéreo + Hotel + Passeios + Guia local + Transfer','6 dias','Turismo de aventura','100,00',12,'275','3.400','https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=1000','Internacional','Deserto',8),
('Cruzeiro América do Sul','🇧🇷🇺🇾🇦🇷','Brasil · Uruguai · Argentina','Litoral sul-americano a bordo','Cruzeiro + Cabine + Pensão completa + Entretenimento','7 noites','Cruzeiro marítimo','100,00',12,'258','3.200','https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1000','Cruzeiros','Oferta',9),
('Cruzeiro Patagônia','🇨🇱🇦🇷','Chile · Argentina','Fjords e geleiras do fim do mundo','Cruzeiro + Cabine + Pensão completa + Entretenimento','10 noites','Cruzeiro marítimo','100,00',12,'491','5.900','https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1000','Cruzeiros','Premium',10),
('Torres del Paine','🇨🇱','Patagônia, Chile','O parque mais selvagem do Chile','Aéreo + Hotel + Passeios + Guia local + Transfer','7 dias','Ecoturismo','100,00',12,'333','4.100','https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1000','Internacional','Natureza',11),
('Circuito Andino Norte','🇵🇪🇧🇴','Peru · Bolívia','Incas, Titicaca e Salar de Uyuni','Aéreo + Hotel + Passeios + Guia local + Transfer','10 dias','Turismo cultural','100,00',12,'316','3.900','https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&q=80&w=1000','Internacional','América do Sul',12);

-- Destinos ---------------------------------------------------
insert into public.destinations (slug, name, tagline, description, hero, rating, highlights, temp, people, airport, region, grid_img, grid_size, sort) values
('maceio','Maceió','O Caribe Brasileiro','Maceió encanta por suas águas mornas e cristalinas, cercadas por vastos coqueirais e piscinas naturais formadas por arrecifes.','https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=2000',4.9,array['Piscinas Naturais de Pajuçara','Praia do Francês','Gastronomia Regional','Artesanato Local'],'28°C','1M+','MCZ','Nordeste','https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=900','lg',1),
('gramado','Gramado','A Europa no Brasil','Gramado é o destino perfeito para quem busca sofisticação, gastronomia de alto nível e um clima europeu acolhedor na Serra Gaúcha.','https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=2000',5.0,array['Lago Negro','Rua Coberta','Snowland','Fábricas de Chocolate'],'15°C','35k','CXJ','Sul','https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=900','sm',2),
('rio-de-janeiro','Rio de Janeiro','A Cidade Maravilhosa','O Rio combina montanhas icônicas, praias lendárias e uma energia vibrante que faz dele o destino mais famoso do Brasil.','https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=2000',4.8,array['Cristo Redentor','Pão de Açúcar','Copacabana','Santa Teresa'],'26°C','6M+','GIG','Sudeste','https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=900','lg',3);

-- Circuitos --------------------------------------------------
insert into public.circuits (region, title, subtitle, description, img, stops, days, price_from, accent, sort) values
('Argentina · Chile · Bolívia','Circuito Andino','Mendoza · Santiago · Atacama · Salta · Uyuni','Um roteiro épico pela espinha dorsal da América do Sul. De Mendoza às salinas bolivianas, passando pelas vinícolas argentinas e o deserto mais árido do mundo.','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1400',array['Mendoza','Santiago','Atacama','Salta','Salar de Uyuni'],'12 a 15 dias','2.360','#FF6B57',1),
('Argentina · Chile','Circuito Patagônia','Puerto Natales · Torres del Paine · El Calafate · Ushuaia','Das Torres del Paine às geleiras de El Calafate e à cidade mais austral do mundo em Ushuaia. Um roteiro entre dois países onde a natureza selvagem toma conta de tudo.','https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1400',array['Puerto Natales','Torres del Paine','El Calafate','El Chaltén','Ushuaia'],'10 a 14 dias','2.833','#3BB273',2),
('Argentina','Circuito Inverno Argentina','Buenos Aires · Bariloche · Villa La Angostura · San Martín','Bariloche no inverno é um cartão-postal de outro mundo. Neve nas montanhas, lagos azuis e a culinária alemã que encantou gerações — o melhor do inverno sul-americano.','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1400',array['Buenos Aires','Bariloche','Villa La Angostura','San Martín de los Andes'],'8 a 10 dias','1.747','#0F6D7A',3),
('Peru · Bolívia','Circuito Andino Norte','Lima · Cusco · Machu Picchu · Titicaca · La Paz','Das ruínas incas de Machu Picchu às águas místicas do Titicaca e ao Salar de Uyuni. Um roteiro entre civilizações ancestrais e paisagens que desafiam a imaginação.','https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1400',array['Lima','Cusco','Machu Picchu','Lago Titicaca','La Paz'],'10 a 12 dias','3.900','#FF6B57',4);

-- Depoimentos (avaliações reais do Google, sincronizadas em 2026-09-02) -----
insert into public.testimonials (name, city, stars, text, photo, sort) values
('Elaine Carmo','Avaliação no Google',5,'A minha experiência foi a melhor possível, viagem super agradável, claro contratempos acontecem mas foi tudo conduzido da melhor maneira possível, nosso guia super atencioso. O que foi oferecido foi cumprido, hospedagem foi maravilhosa, café da manhã todos os dias maravilhoso e o atendimento também. Para minha primeira viagem eu amei. E super indico a Renantur Viagens.','',1),
('Jeniffer Sayuri','Avaliação no Google',5,'Experiência nota 1000! Quero agradecer à Renantur por organizar tudo com tanto cuidado. Desde o primeiro contato até a volta para casa, foi tudo impecável. E um agradecimento especial ao guia Renan. Atencioso, paciente e com um conhecimento incrível sobre cada lugar. Fez toda diferença na nossa viagem! Recomendo de olhos fechados. Já estou planejando a próxima com vocês!','',2),
('Mariane Braz','Avaliação no Google',5,'Super recomendo a Renantur Viagens pelo atendimento, responsabilidade, organização e atenção com cada um. Viagem para Foz do Iguaçu x Paraguai x Argentina foi extremamente espetacular... roteiro top.','',3),
('Maria Lucia Soares','Avaliação no Google',5,'A viagem foi tranquila, Renan e os guias locais muito atenciosos. Todos os passeios inclusos na programação do pacote de viagem para Foz do Iguaçu foram realizados.','',4),
('Valéria Andrade','Avaliação no Google',5,'Viagem para Sampa Sky sensacional, com visita ao Mercado Municipal e Bairro da Liberdade. Passeio com conforto e segurança, parabéns toda equipe Renantur Viagens.','',5),
('Maria da Glória Silva','Avaliação no Google',5,'Amei ir no Sampa Sky e no mercadão, já na praça da Liberdade achei muito cheio, mas matei minha curiosidade sobre esse bairro... viagem tranquila com atendimento nota 10, principalmente por parte da organização representada pelo Renan, sempre junto, muito atencioso e paciente.','',6),
('Ana Andrade','Avaliação no Google',5,'Recomendo viagens e passeios. Já fiz vários com a Renantur. Hotéis e pousadas bem localizados, animação e diversão garantidos.','',7),
('Katia Araújo','Avaliação no Google',4,'Minha experiência com a Renantur foi muito boa, mas o quarto que fiquei no hotel não foi bom, pequeno e tinha uma beliche em cima da cama de casal que o meu esposo bateu a testa e cortou, o restaurante também não me agradou, tinha até sobremesa azeda. Mas isso não depende do Renan, que é muito competente.','',8);

-- Galeria ----------------------------------------------------
insert into public.gallery_photos (url, size, sort) values
('https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=800','large',1),
('https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800','medium',2),
('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800','small',3),
('https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=800','medium',4),
('https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800','large',5),
('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800','small',6),
('https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=800','medium',7),
('https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=800','medium',8),
('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800','large',9);

-- Categorias -------------------------------------------------
insert into public.categories (label, name, description, img, href, accent, sort) values
('01','Pacotes Aéreos','Buenos Aires, Lima, Santiago e destinos incríveis com tudo incluso.','https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=900','/pacotes','#0F6D7A',1),
('02','Pacotes Rodoviários','Circuito Andino, Patagônia e Argentina de ônibus moderno.','https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&q=80&w=900','/circuitos','#FF6B57',2),
('03','Cruzeiros','Navegue pelo litoral da América do Sul com estilo.','https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=900','/pacotes','#0F6D7A',3),
('04','Internacional','Machu Picchu, Atacama, Salar de Uyuni e muito mais.','https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=900','/pacotes','#3BB273',4),
('05','Transfer','Aeroportos, portos e traslados com pontualidade e conforto.','https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&q=80&w=900','/transfer','#FF6B57',5);

-- Serviços de transfer ---------------------------------------
insert into public.transfer_services (title, icon, description, sort) values
('Transfers de Aeroporto','Car','Recepção personalizada nos principais aeroportos do país com monitoramento de voo em tempo real.',1),
('Transfers de Porto','Shield','Conforto e pontualidade para seus embarques e desembarques em cruzeiros.',2),
('Eventos & Grupos','Users','Logística completa para eventos corporativos e grupos familiares com veículos sob medida.',3),
('Atendimento Especial','Clock','Disponibilidade 24/7 para traslados intermunicipais e viagens executivas.',4);

-- Slides do hero ---------------------------------------------
insert into public.hero_slides (img, headline, sub, place, sort) values
('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=85&w=2560','Descubra o Brasil','com quem entende.','Fernando de Noronha, PE',1),
('https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=85&w=2560','Rio de Janeiro','inesquecível.','Rio de Janeiro, RJ',2),
('https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=85&w=2560','Nordeste paradisíaco','te espera.','Maceió, AL',3),
('https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=85&w=2560','Gramado & Serra','encantadores.','Gramado, RS',4);

-- Cidades atendidas ------------------------------------------
insert into public.cities (name, sort) values
('Volta Redonda',1),('Barra Mansa',2),('Quatis',3),('Floriano',4),('Porto Real',5),
('Resende',6),('Piraí',7),('Barra do Piraí',8),('Rio de Janeiro',9),('Seropédica',10),
('Queimados',11),('Nova Iguaçu',12),('São João de Meriti',13);

-- Valores da empresa -----------------------------------------
insert into public.company_values (title, icon, description, sort) values
('Paixão por Viajar','Heart','Não apenas vendemos pacotes, compartilhamos o amor por descobrir o novo.',1),
('Excelência & Rigor','Award','Curadoria rigorosa de hotéis e serviços para garantir o máximo padrão.',2),
('Atendimento Humano','Users','Pessoas reais cuidando de cada detalhe da sua jornada, 24 horas por dia.',3),
('Roteiros sob Medida','Target','Personalização absoluta para que cada viagem seja única e inesquecível.',4);

-- Configurações do site --------------------------------------
insert into public.site_settings (id, brand_name, brand_tagline, whatsapp, phone, email, location, google_reviews_url, about_title, about_text)
values (
  1,'Renantur','Viagens & Turismo','https://wa.me/5524981266819','(24) 3026-4973','contato@renantur.com.br','Av. Getúlio Vargas, nº 767, sala 603 – Galeria Kennedy (ao lado do antigo Detran) – Volta Redonda, RJ','https://share.google/JXGU2F8MGWyswp9ln',
  'Especialistas em curadoria de destinos.',
  'A Renantur Viagens nasceu de um desejo profundo de elevar o padrão do turismo no Brasil. Não somos apenas uma agência; somos arquitetos de memórias. Nossa equipe é formada por viajantes experientes que entendem que o luxo não está apenas no valor, mas na autenticidade da experiência, no atendimento personalizado e na segurança de cada passo. Com sede no Sul Fluminense, servimos orgulhosamente cidades como Volta Redonda, Barra Mansa e Resende, conectando nossa região aos destinos mais deslumbrantes do planeta.'
)
on conflict (id) do nothing;
