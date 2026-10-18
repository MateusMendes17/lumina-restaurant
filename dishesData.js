export const dishesData = [
  {
    id: 'tartaro-atun',
    slug: 'tartaro-atun',
    name: 'Tártaro de Atum',
    category: 'Entradas',
    price: '18€',
    image: '/images/dishes/tartaro-atun.jpg',
    shortDescription: 'Atum rabilho, abacate, molho ponzu, sementes de sésamo tostadas, micro coentros',
    fullDescription: 'O nosso tártaro de atum é preparado diariamente com atum rabilho de qualidade sashimi, cortado à mão em cubos perfeitos. O abacate maduro traz cremosidade, enquanto o molho ponzu caseiro — uma redução de citrinos japoneses, molho de soja artesanal e mirin — confere acidez brilhante e profundidade umami. Finalizado com sementes de sésamo tostadas na hora para textura e micro coentros para frescura aromática.',
    ingredients: [
      'Atum rabilho (qualidade sashimi)',
      'Abacate Hass maduro',
      'Molho ponzu caseiro (yuzu, sudachi, shoyu, mirin)',
      'Sementes de sésamo branco e preto tostadas',
      'Micro coentros',
      'Flor de sal de Castro Marim',
      'Azeite virgem extra português'
    ],
    allergens: ['Peixe', 'Sésamo', 'Soja'],
    winePairing: {
      suggestion: 'Alvarinho de Monção e Melgaço',
      reason: 'A acidez vibrante e notas cítricas do Alvarinho complementam o ponzu e cortam a riqueza do atum e abacate.'
    },
    chefNotes: 'O segredo está na temperatura: o atum deve estar a 2°C no momento do corte para manter a textura firme. O ponzu é preparado 24h antes para os sabores casarem.',
    en: {
      name: 'Bluefin Tuna Tartare',
      shortDescription: 'Bluefin tuna, avocado, ponzu sauce, toasted sesame seeds, micro coriander',
      fullDescription: 'Our tuna tartare is prepared daily with sashimi-grade bluefin tuna, hand-cut into perfect cubes. Ripe avocado brings creaminess, while house-made ponzu — a reduction of Japanese citrus, artisanal soy and mirin — adds bright acidity and umami depth. Finished with sesame seeds toasted to order and micro coriander for aromatic freshness.',
      ingredients: ['Bluefin tuna (sashimi grade)', 'Ripe Hass avocado', 'House ponzu (yuzu, sudachi, shoyu, mirin)', 'Toasted white and black sesame seeds', 'Micro coriander', 'Castro Marim sea salt flakes', 'Portuguese extra virgin olive oil'],
      allergens: ['Fish', 'Sesame', 'Soy'],
      wineReason: 'The vibrant acidity and citrus notes of Alvarinho complement the ponzu and cut through the richness of tuna and avocado.',
      chefNotes: 'The secret is temperature: the tuna must be at 2°C when cut to keep a firm texture. The ponzu is made 24h ahead so the flavours settle.'
    }
  },
  {
    id: 'vieiras-grelhadas',
    slug: 'vieiras-grelhadas',
    name: 'Vieiras Grelhadas',
    category: 'Entradas',
    price: '22€',
    image: '/images/dishes/vieiras-grelhadas.jpg',
    shortDescription: 'Vieiras do Algarve, puré de couve-flor, manteiga de alga nori, caviar de citrinos',
    fullDescription: 'Vieiras selvagens da costa algarvia, selecionadas uma a uma pela nossa equipa. Grelhadas na plancha a temperatura extrema por 45 segundos de cada lado — o suficiente para criar a caramelização Maillard perfeita sem cozinhar o interior, que permanece translúcido e doce. Acompanham puré aveludado de couve-flor assada, manteiga emulsionada com alga nori tostada para umami marinho, e caviar de citrinos (yuzu, lima, lima-kumquat) que explode em frescura a cada dentada.',
    ingredients: [
      'Vieiras do Algarve (selvagens)',
      'Couve-flor assada',
      'Natas frescas',
      'Manteiga de alga nori tostada',
      'Caviar de citrinos (yuzu, lima, kumquat)',
      'Micro ervas marinhas',
      'Flor de sal',
      'Azeite de categoria superior'
    ],
    allergens: ['Moluscos', 'Lacticínios'],
    winePairing: {
      suggestion: 'Vinho Verde Alvarinho - Quinta de Soalheiro',
      reason: 'A mineralidade e efervescência fina cortam a riqueza da manteiga de nori e realçam a doçura natural das vieiras.'
    },
    chefNotes: 'As vieiras chegam vivas da lota de Olhão às 6h da manhã. Secamos cada uma com papel absorvente 30 min antes de grelhar — a humidade é inimiga da caramelização.',
    en: {
      name: 'Grilled Scallops',
      shortDescription: 'Algarve scallops, cauliflower purée, nori butter, citrus caviar',
      fullDescription: 'Wild scallops from the Algarve coast, selected one by one by our team. Grilled on an extremely hot plancha for 45 seconds per side — enough for the perfect Maillard caramelisation without cooking the interior, which stays translucent and sweet. Served with a smooth roasted cauliflower puré, butter emulsified with toasted nori seaweed for marine umami, and citrus caviar (yuzu, lime, kumquat) that bursts with freshness in every bite.',
      ingredients: ['Wild Algarve scallops', 'Roasted cauliflower', 'Fresh cream', 'Toasted nori butter', 'Citrus caviar (yuzu, lime, kumquat)', 'Micro sea herbs', 'Sea salt flakes', 'Extra virgin olive oil'],
      allergens: ['Molluscs', 'Dairy'],
      wineReason: 'The minerality and fine effervescence of Vinho Verde Alvarinho cut through the richness of the nori butter and enhance the scallops\' natural sweetness.',
      chefNotes: 'The scallops arrive alive from the Olhão fish auction at 6am. We dry each one with paper towel 30 min before grilling — moisture is the enemy of caramelisation.'
    }
  },
  {
    id: 'foie-gras',
    slug: 'foie-gras',
    name: 'Foie Gras Terrina',
    category: 'Entradas',
    price: '26€',
    image: '/images/dishes/foie-gras.jpg',
    shortDescription: 'Foie gras de pato, compota de figo e vinho do Porto, brioche torrado, flor de sal',
    fullDescription: 'Foie gras de pato do Sudoeste francês (Label Rouge), desvenado à mão e marinado 12h em vinho do Porto Vintage, Porto Tawny 10 anos e especiarias quentes (canela, cardamomo, estrela de anis). Cozido em banho-maria a 52°C para textura sedosa, depois prensado 48h. Servido com compota de figos Pingo de Mel do Algarve reduzida em vinho do Porto, brioche artesanal de fermentação lenta tostado na manteiga noisette, e flor de sal de Castro Marim.',
    ingredients: [
      'Foie gras de pato Label Rouge (França)',
      'Vinho do Porto Vintage e Tawny 10 anos',
      'Figos Pingo de Mel (Algarve)',
      'Brioche de fermentação lenta (24h)',
      'Manteiga noisette',
      'Especiarias: canela, cardamomo, estrela de anis',
      'Flor de sal de Castro Marim',
      'Pimenta branca moída na hora'
    ],
    allergens: ['Lacticínios', 'Glúten', 'Sulfitos (vinho do Porto)'],
    winePairing: {
      suggestion: 'Porto Tawny 20 Anos - Niepoort',
      reason: 'A doçura evoluída e notas de frutos secos do Tawny 20 anos espelham a riqueza do foie gras e a compota de figo.'
    },
    chefNotes: 'A terrine é feita às terças e servida a partir de quinta — o repouso de 48h é inegociável para a textura. O vinho do Porto na marinada deve ser de qualidade de prova.',
    en: {
      name: 'Foie Gras Terrine',
      shortDescription: 'Duck foie gras, fig and Port wine compote, toasted brioche, sea salt',
      fullDescription: 'Duck foie gras from southwest France (Label Rouge), hand-trimmed and marinated for 12h in Vintage Port, 10-year Tawny Port and warm spices (cinnamon, cardamom, star anise). Cooked in a bain-marie at 52°C for a silken texture, then pressed for 48h. Served with Algarve Pingo de Mel figs reduced in Port wine, artisanal slow-fermented brioche toasted in noisette butter, and Castro Marim sea salt flakes.',
      ingredients: ['Label Rouge duck foie gras (France)', 'Vintage and 10-year Tawny Port', 'Pingo de Mel figs (Algarve)', 'Slow-fermented brioche (24h)', 'Noisette butter', 'Spices: cinnamon, cardamom, star anise', 'Castro Marim sea salt flakes', 'Freshly ground white pepper'],
      allergens: ['Dairy', 'Gluten', 'Sulphites (Port wine)'],
      wineReason: 'The evolved sweetness and nutty notes of a 20-year Tawny mirror the richness of the foie gras and fig compote.',
      chefNotes: 'The terrine is made on Tuesdays and served from Thursday — the 48h rest is non-negotiable for the texture. The Port in the marinade must be drinking quality.'
    }
  },
  {
    id: 'wagyu-a5',
    slug: 'wagyu-a5',
    name: 'Lombo de Wagyu A5',
    category: 'Pratos Principais',
    price: '65€',
    image: '/images/dishes/wagyu-a5.jpg',
    shortDescription: 'Wagyu japonês grau A5, batata trufada, legumes da horta assados, molho de vinho tinto reduzido',
    fullDescription: 'Lombo de Wagyu japonês certificado A5 (BMS 10-12), da prefeitura de Kagoshima. A gordura intramuscular derrete a 25°C, abaixo da temperatura corporal — daí a sensação de "manteiga na boca". Selado 90 segundos de cada lado em frigideira de ferro fundido, repousado 8 min. Acompanha batata trufada (batata Ratte, trufa negra de inverno, parmesão 36 meses), legumes da nossa horta (cenoura roxa, nabo, brócolos romanesco) assados em josper, e molho de vinho tinto do Douro reduzido 6h com demi-glace de vitela.',
    ingredients: [
      'Wagyu A5 Kagoshima (BMS 10-12) - 180g',
      'Batata Ratte',
      'Trufa negra de inverno (Tuber melanosporum)',
      'Parmesão 36 meses',
      'Legumes da horta: cenoura roxa, nabo, romanesco',
      'Vinho tinto do Douro (Touriga Nacional)',
      'Demi-glace de vitela caseiro',
      'Tomilho-limão, alecrim, alho negro'
    ],
    allergens: [],
    winePairing: {
      suggestion: 'Douro Tinto Reserva - Quinta do Vale Meão',
      reason: 'Taninos polidos e fruta negra madura aguentam a intensidade do Wagyu e do molho reduzido.'
    },
    chefNotes: 'O Wagyu chega congelado a -40°C (IQF). Descongelamos 48h em câmara a 1°C. Nunca temperamos antes de selar — só flor de sal no final. A gordura é o tempero.',
    en: {
      name: 'A5 Wagyu Loin',
      shortDescription: 'Japanese Wagyu A5, truffle potato, roasted garden vegetables, reduced red wine sauce',
      fullDescription: 'Japanese Wagyu loin, certified A5 (BMS 10-12), from Kagoshima Prefecture. The intramuscular fat melts at 25°C, below body temperature — hence the "butter in the mouth" sensation. Seared 90 seconds per side in a cast-iron pan, rested 8 min. Served with truffle potato (Ratte potato, winter black truffle, 36-month Parmesan), vegetables from our garden (purple carrot, kohlrabi, romanesco) roasted in a josper, and Douro red wine sauce reduced for 6h with veal demi-glace.',
      ingredients: ['A5 Kagoshima Wagyu (BMS 10-12) — 180g', 'Ratte potato', 'Winter black truffle (Tuber melanosporum)', '36-month Parmesan', 'Garden vegetables: purple carrot, kohlrabi, romanesco', 'Douro red wine (Touriga Nacional)', 'House veal demi-glace', 'Lemon thyme, rosemary, black garlic'],
      allergens: [],
      wineReason: 'Polished tannins and ripe dark fruit stand up to the intensity of the Wagyu and the reduced sauce.',
      chefNotes: 'The Wagyu arrives frozen at -40°C (IQF). We defrost for 48h at 1°C. Never season before searing — only sea salt at the end. The fat is the seasoning.'
    }
  },
  {
    id: 'robalo-crosta',
    slug: 'robalo-crosta',
    name: 'Robalo em Crosta de Ervas',
    category: 'Pratos Principais',
    price: '34€',
    image: '/images/dishes/robalo-crosta.jpg',
    shortDescription: 'Robalo selvagem, crosta de ervas aromáticas, risoto de limão e manjericão, beurre blanc',
    fullDescription: 'Robalo de linha (não aquicultura) da costa vicentina, 600-800g. Filetado com pele, cozido a vácuo a 48°C por 22 min para textura perfeita, depois finalizado no forno com crosta de panko, ervas frescas (salsa, cebolinho, estragão, tomilho-limão), raspa de lima e manteiga de alga. Servido sobre risoto de Carnaroli com limão siciliano e manjericão roxo, finalizado com beurre blanc de vinho verde Alvarinho e manteiga de pastagem batida a frio.',
    ingredients: [
      'Robalo selvagem da Costa Vicentina',
      'Panko artesanal',
      'Ervas: salsa, cebolinho, estragão, tomilho-limão',
      'Raspa de lima e limão siciliano',
      'Manteiga de alga',
      'Arroz Carnaroli',
      'Limão siciliano, manjericão roxo',
      'Vinho Verde Alvarinho (beurre blanc)',
      'Manteiga de pastagem A2'
    ],
    allergens: ['Peixe', 'Glúten (panko)', 'Lacticínios'],
    winePairing: {
      suggestion: 'Vinho Verde Alvarinho - Anselmo Mendes Curtimenta',
      reason: 'A estrutura tânica leve e notas de casca de citrino do curtimenta acompanham o beurre blanc e a crosta de ervas.'
    },
    chefNotes: 'O robalo de linha tem carne mais firme e sabor mais iodado. A crosta vai ao forno só 3 min — o peixe já está cozido a vácuo. O beurre blanc faz-se à última da hora, emulsionando manteiga gelada.',
    en: {
      name: 'Sea Bass in Herb Crust',
      shortDescription: 'Wild sea bass, aromatic herb crust, lemon and basil risotto, beurre blanc',
      fullDescription: 'Line-caught sea bass (not farmed) from the Vicentine coast, 600-800g. Filleted with the skin, cooked sous-vide at 48°C for 22 min for perfect texture, then finished in the oven with a crust of panko, fresh herbs (parsley, chives, tarragon, lemon thyme), lime zest and seaweed butter. Served over a Carnaroli risotto with Sicilian lemon and purple basil, finished with an Alvarinho Vinho Verde beurre blanc and cold-churned pasture butter.',
      ingredients: ['Wild Vicentine coast sea bass', 'Artisanal panko', 'Herbs: parsley, chives, tarragon, lemon thyme', 'Lime and Sicilian lemon zest', 'Seaweed butter', 'Carnaroli rice', 'Sicilian lemon, purple basil', 'Alvarinho Vinho Verde (beurre blanc)', 'A2 pasture butter'],
      allergens: ['Fish', 'Gluten (panko)', 'Dairy'],
      wineReason: 'The light tannic structure and citrus-peel notes of the curtimenta Alvarinho follow the beurre blanc and herb crust.',
      chefNotes: 'Line-caught sea bass has firmer meat and more iodine flavour. The crust goes into the oven for only 3 min — the fish is already cooked sous-vide. The beurre blanc is made à la minute, emulsifying cold butter.'
    }
  },
  {
    id: 'risoto-cogumelos',
    slug: 'risoto-cogumelos',
    name: 'Risoto de Cogumelos Silvestres',
    category: 'Pratos Principais',
    price: '30€',
    image: '/images/dishes/risoto-cogumelos.jpg',
    shortDescription: 'Arroz Carnaroli, variedade de cogumelos da serra, parmesão 36 meses, óleo de trufa negra',
    fullDescription: 'Risoto de arroz Carnaroli envelhecido 2 anos (maior teor de amido, melhor textura). Base de cogumelos salteados separadamente: porcini (secados e reidratados em caldo), chanterelles, trompetas-da-morte, shiitake e portobello. Caldo de vitela e cogumelos reduzido 8h. Finalizado fora do lume com manteiga de pastagem, parmesão Reggiano 36 meses, mascarpone para cremosidade, e fio de óleo de trufa negra de Alba. Final: lascas de trufa negra fresca (quando em época) ou trufa de verão.',
    ingredients: [
      'Arroz Carnaroli envelhecido 2 anos',
      'Cogumelos: porcini, chanterelles, trompetas, shiitake, portobello',
      'Caldo de vitela e cogumelos (8h redução)',
      'Parmesão Reggiano 36 meses',
      'Mascarpone artesanal',
      'Manteiga de pastagem',
      'Óleo de trufa negra de Alba',
      'Trufa negra fresca (época) ou trufa de verão',
      'Tomilho, alho, vinho branco seco'
    ],
    allergens: ['Lacticínios'],
    winePairing: {
      suggestion: 'Bairrada Reserva - Luís Pato Vinha Pan',
      reason: 'A acidez vibrante e notas terrosas da Baga complementam os cogumelos e cortam a riqueza do queijo.'
    },
    chefNotes: 'O risoto faz-se à ordem — 18 min exatos. Os cogumelos salteiam-se à parte para não libertarem água no arroz. O parmesão entra só no final, fora do lume.',
    en: {
      name: 'Wild Mushroom Risotto',
      shortDescription: 'Carnaroli rice, wild mushrooms from the hills, 36-month Parmesan, black truffle oil',
      fullDescription: 'Risotto made with Carnaroli rice aged for 2 years (higher amylose content, better texture). A base of separately sautéed mushrooms: porcini (dried and rehydrated in stock), chanterelles, trumpets of death, shiitake and portobello. Veal and mushroom stock reduced for 8h. Finished off the heat with pasture butter, 36-month Parmigiano Reggiano, mascarpone for creaminess, and a thread of Alba truffle oil. Finish: fresh black truffle shavings (in season) or summer truffle.',
      ingredients: ['2-year aged Carnaroli rice', 'Mushrooms: porcini, chanterelles, trumpets, shiitake, portobello', 'Veal and mushroom stock (8h reduction)', '36-month Parmigiano Reggiano', 'Artisanal mascarpone', 'Pasture butter', 'Alba black truffle oil', 'Fresh black truffle (in season) or summer truffle', 'Thyme, garlic, dry white wine'],
      allergens: ['Dairy'],
      wineReason: 'The vibrant acidity and earthy notes of Bairrada Baga complement the mushrooms and cut through the richness of the cheese.',
      chefNotes: 'The risotto is made to order — exactly 18 min. Mushrooms are sautéed separately so they do not release water into the rice. Parmesan goes in only at the end, off the heat.'
    }
  },
  {
    id: 'souffle-chocolate',
    slug: 'souffle-chocolate',
    name: 'Soufflé de Chocolate Valrhona',
    category: 'Sobremesas',
    price: '12€',
    image: '/images/dishes/souffle-chocolate.webp',
    shortDescription: 'Chocolate 70%, gelado de baunilha de Madagáscar, crocante de avelã',
    fullDescription: 'Soufflé ao momento com chocolate Valrhona Guanaja 70% (blend de cacau Trinitário da Venezuela, República Dominicana e Trinidad). Base de creme pâtissière leve, claras em castelo firme com açúcar em três tempos. Coze 11 min a 190°C — sobe 3 cm acima do ramequim. Servido imediatamente com bola de gelado de baunilha Bourbon de Madagáscar (infusão 24h de vagens raspadas), crocante de avelã do Piemonte caramelizada com flor de sal, e pó de cacau cru.',
    ingredients: [
      'Chocolate Valrhona Guanaja 70%',
      'Ovos (claras e gemas separadas)',
      'Açúcar refinado e açúcar invertido',
      'Leite gordo, natas 35%',
      'Gelado: baunilha Bourbon Madagáscar, leite A2, natas',
      'Avelã do Piemonte IGP',
      'Cacau cru em pó',
      'Flor de sal'
    ],
    allergens: ['Ovos', 'Lacticínios', 'Frutos de casca rija (avelã)'],
    winePairing: {
      suggestion: 'Moscatel de Setúbal Superior - José Maria da Fonseca',
      reason: 'A doçura equilibrada e notas de laranja cristalizada e mel complementam o chocolate negro sem o tornar amargo.'
    },
    chefNotes: 'Os ramequins são untados com manteiga fria e açúcar — cria a "casca" que ajuda a subir. O forno não abre nos primeiros 8 min. O gelado vai à mesa a -14°C para contraste térmico.',
    en: {
      name: 'Valrhona Chocolate Soufflé',
      shortDescription: '70% chocolate, Madagascar vanilla ice cream, hazelnut crumble',
      fullDescription: 'Soufflé made to order with Valrhona Guanaja 70% chocolate (a Trinitario blend from Venezuela, Dominican Republic and Trinidad). A light crème pâtissière base, egg whites whipped firm with sugar in three stages. Baked 11 min at 190°C — it rises 3 cm above the ramekin. Served immediately with a scoop of Madagascar Bourbon vanilla ice cream (24h infusion of scraped pods), caramelised Piedmont hazelnut crumble with sea salt, and raw cocoa powder.',
      ingredients: ['Valrhona Guanaja 70% chocolate', 'Eggs (separated whites and yolks)', 'Refined and invert sugar', 'Whole milk, 35% cream', 'Ice cream: Madagascar Bourbon vanilla, A2 milk, cream', 'Piedmont PGI hazelnuts', 'Raw cocoa powder', 'Sea salt'],
      allergens: ['Eggs', 'Dairy', 'Tree nuts (hazelnut)'],
      wineReason: 'The balanced sweetness and notes of candied orange and honey in the Moscatel complement dark chocolate without turning bitter.',
      chefNotes: 'Ramekins are greased with cold butter and sugar — it creates the "skin" that helps the soufflé rise. The oven is not opened in the first 8 min. The ice cream is served at -14°C for thermal contrast.'
    }
  },
  {
    id: 'creme-brulee',
    slug: 'creme-brulee',
    name: 'Crème Brûlée',
    category: 'Sobremesas',
    price: '11€',
    image: '/images/dishes/creme-brulee.jpg',
    shortDescription: 'Baunilha de Madagáscar, açúcar caramelizado, framboesas frescas, gelado de baunilha',
    fullDescription: 'Clássico executado na perfeição: creme de gemas, natas 35%, leite gordo e baunilha Bourbon de Madagáscar (vagens inteiras, infusão 30 min, raspadas). Coze em banho-maria a 95°C por 40 min — textura de "creme que treme". Arrefece 6h. No momento de servir: camada fina de açúcar demerara queimada com maçarico até caramelo âmbar escuro, crocante mas não queimado. Acompanha framboesas frescas maceradas 10 min em xarope de hibisco e gelado de baunilha.',
    ingredients: [
      'Gemas de ovos cor de laranja (galinhas criadas ao ar livre)',
      'Natas 35%, leite gordo',
      'Baunilha Bourbon Madagáscar (vagens)',
      'Açúcar demerara (para queimar)',
      'Framboesas frescas',
      'Xarope de hibisco caseiro',
      'Gelado de baunilha'
    ],
    allergens: ['Ovos', 'Lacticínios'],
    winePairing: {
      suggestion: 'Colheita Tardia - Quinta da Plansel',
      reason: 'A acidez da colheita tardia limpa o palato do caramelo e realça a baunilha.'
    },
    chefNotes: 'O segredo é o banho-maria: água a 95°C, não a ferver. O açúcar demerara carameliza mais devagar que o refinado, dando controlo. Queimamos à mesa — o som do "crack" faz parte da experiência.',
    en: {
      name: 'Crème Brûlée',
      shortDescription: 'Madagascar vanilla, caramelised sugar, fresh raspberries, vanilla ice cream',
      fullDescription: 'A classic executed to perfection: a cream of egg yolks, 35% cream, whole milk and Madagascar Bourbon vanilla (whole pods, 30 min infusion, scraped). Baked in a bain-marie at 95°C for 40 min — a "wobbly cream" texture. Cooled for 6h. When serving: a thin layer of demerara sugar torched to a dark amber caramel, crisp but not burnt. Served with fresh raspberries macerated 10 min in hibisco syrup and vanilla ice cream.',
      ingredients: ['Free-range egg yolks', '35% cream, whole milk', 'Madagascar Bourbon vanilla (pods)', 'Demerara sugar (for torching)', 'Fresh raspberries', 'House hibisco syrup', 'Vanilla ice cream'],
      allergens: ['Eggs', 'Dairy'],
      wineReason: 'The acidity of the late harvest cleans the palate of caramel and enhances the vanilla.',
      chefNotes: 'The secret is the bain-marie: water at 95°C, not boiling. Demerara caramelises more slowly than refined sugar, giving control. We torch it at the table — the "crack" sound is part of the experience.'
    }
  },
  {
    id: 'queijos',
    slug: 'queijos',
    name: 'Seleção de Queijos Portugueses',
    category: 'Sobremesas',
    price: '14€',
    image: '/images/dishes/queijos.jpg',
    shortDescription: 'Queijos artesanais nacionais, compotas caseiras, nozes, pão de cereais',
    fullDescription: 'Seleção rotativa de 5 queijos artesanais portugueses: Serra da Estrela DOP (velho, 90 dias), Azeitão DOP (amanteigado), Serpa DOP (picante), Cabra Transmontano (semi-curado), São Jorge DOP (24 meses). Cada queijo servido à temperatura ideal (fora do frio 45 min antes). Acompanha compotas caseiras: marmelo (com vinho do Porto), figo com noz, abóbora com gengibre, cebola roxa com vinho tinto. Nozes tostadas, mel de rosmaninho, pão de cereais fermentação natural e tostas de centeio.',
    ingredients: [
      'Queijo Serra da Estrela DOP (90 dias)',
      'Queijo Azeitão DOP',
      'Queijo Serpa DOP',
      'Queijo Cabra Transmontano',
      'Queijo São Jorge DOP (24 meses)',
      'Compotas: marmelo/Porto, figo/noz, abóbora/gengibre, cebola/vinho tinto',
      'Nozes tostadas, mel de rosmaninho',
      'Pão de cereais fermentação natural',
      'Tostas de centeio'
    ],
    allergens: ['Lacticínios', 'Glúten', 'Frutos de casca rija (nozes)', 'Sulfitos (vinho do Porto nas compotas)'],
    winePairing: {
      suggestion: 'Porto Tawny 10 Anos - Kopke ou Vinho do Douro Branco Reserva',
      reason: 'O Tawny 10 anos com notas de frutos secos e caramelo é o par clássico para queijos curados. O branco Reserva com madeira limpa o palato entre queijos.'
    },
    chefNotes: 'A seleção muda conforme a estação e disponibilidade dos produtores. O Serra da Estrela só entra quando está no ponto — nem mole demais, nem seco. O mel de rosmaninho é da Serra de Monchique.',
    en: {
      name: 'Portuguese Cheese Selection',
      shortDescription: 'Artisanal national cheeses, house compotes, walnuts, seeded bread',
      fullDescription: 'A rotating selection of 5 Portuguese artisanal cheeses: Serra da Estrela DOP (aged, 90 days), Azeitão DOP (buttery), Serpa DOP (sharp), Cabra Transmontano (semi-cured), São Jorge DOP (24 months). Each cheese served at its ideal temperature (45 min out of the fridge). Accompanied by house compotes: quince (with Port wine), fig and walnut, pumpkin and ginger, red onion and red wine. Toasted walnuts, rosemary honey, natural fermentation seed bread and rye toasts.',
      ingredients: ['Serra da Estrela DOP cheese (90 days)', 'Azeitão DOP cheese', 'Serpa DOP cheese', 'Cabra Transmontano cheese', 'São Jorge DOP cheese (24 months)', 'Compotes: quince/Port, fig/walnut, pumpkin/ginger, onion/red wine', 'Toasted walnuts, rosemary honey', 'Natural fermentation seed bread', 'Rye toasts'],
      allergens: ['Dairy', 'Gluten', 'Tree nuts (walnuts)', 'Sulphites (Port in compotes)'],
      wineReason: 'A 10-year Tawny with nutty and caramel notes is the classic pairing for aged cheeses. The aged white cleans the palate between cheeses.',
      chefNotes: 'The selection changes with the season and producer availability. Serra da Estrela only makes the cut when it is at its point — neither too soft nor too dry. The rosemary honey comes from Serra de Monchique.'
    }
  }
];

export const getDishBySlug = (slug) => {
  return dishesData.find(dish => dish.slug === slug);
};

export const getDishesByCategory = (category) => {
  return dishesData.filter(dish => dish.category === category);
};

export const getAllDishes = () => dishesData;