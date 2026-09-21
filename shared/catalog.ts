export type CatalogVariant = {
  sku: string;
  label: string;
  price: number;
  inventory: boolean;
};

export type CatalogProduct = {
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  categoryLabel: string;
  brand: string;
  image: string;
  variants: CatalogVariant[];
  featured?: boolean;
};

export const catalogProducts: CatalogProduct[] = [
  {
    "slug": "arnes-de-polipropileno-con-correa",
    "name": "Arnes de Polipropileno con Correa",
    "description": "Seleccione el modelo/artículo correspondiente.   803 - ARNES C/ CORREA 1,50 CM - $9800  804 - ARNES C/ CORREA 2,00 CM - $11600  805 - ARNES C/ CORREA 2,50 CM - $18700  806 - ARNES C/CORREA 3,00 CM - $21500  807 - ARNES C/CORREA 4,00 CM - $27500",
    "categorySlug": "arnes-de-polipropileno-con-correa",
    "categoryLabel": "Arnes De Polipropileno Con Correa",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000803",
        "label": "803 - ARNES C/ CORREA 1,50 CM",
        "price": 9800,
        "inventory": true
      },
      {
        "sku": "004226000804",
        "label": "804 - ARNES C/ CORREA 2,00 CM",
        "price": 11600,
        "inventory": true
      },
      {
        "sku": "004226000805",
        "label": "805 - ARNES C/ CORREA 2,50 CM",
        "price": 18700,
        "inventory": true
      },
      {
        "sku": "004226000806",
        "label": "806 - ARNES C/CORREA 3,00 CM",
        "price": 21500,
        "inventory": true
      },
      {
        "sku": "004226000807",
        "label": "807 - ARNES C/CORREA 4,00 CM",
        "price": 27500,
        "inventory": true
      }
    ]
  },
  {
    "slug": "arnes-rayado-con-manija",
    "name": "Arnes rayado con manija",
    "description": "Seleccione el modelo/artículo correspondiente.   801 - ARNES MEDIANO DE 4,00 cm - $22000  802 - ARNES GRANDE DE 4,00 cm - $23650",
    "categorySlug": "arnes-rayado-con-manija",
    "categoryLabel": "Arnes Rayado Con Manija",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000801",
        "label": "801 - ARNES MEDIANO DE 4,00 cm",
        "price": 22000,
        "inventory": true
      },
      {
        "sku": "004226000802",
        "label": "802 - ARNES GRANDE DE 4,00 cm",
        "price": 23650,
        "inventory": true
      }
    ]
  },
  {
    "slug": "manopla-de-nato-sin-ribete",
    "name": "Manopla de nato sin ribete",
    "description": "Seleccione el modelo/artículo correspondiente.   734 - MANOPLA COMÚN - $7700",
    "categorySlug": "manopla-de-nato-sin-ribete",
    "categoryLabel": "Manopla De Nato Sin Ribete",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000734",
        "label": "734 - MANOPLA COMÚN",
        "price": 7700,
        "inventory": true
      }
    ]
  },
  {
    "slug": "arnes-de-nato-economico-sin-ribete",
    "name": "Arnes de nato económico sin ribete",
    "description": "Seleccione el modelo/artículo correspondiente.   735 - ARNES N° 3 MEDIANO 3,00 cm - $17500  736 - ARNES N° 4 GRANDE - $21500  737 - ARNES N° 4 XXL - $26400  738 - ARNES N° 5 GRANDE - $27500  745 - ARNES MEDIANO 4,00 cm - $24200",
    "categorySlug": "arnes-de-nato-economico-sin-ribete",
    "categoryLabel": "Arnes De Nato Economico Sin Ribete",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000735",
        "label": "735 - ARNES N° 3 MEDIANO 3,00 cm",
        "price": 17500,
        "inventory": true
      },
      {
        "sku": "004226000736",
        "label": "736 - ARNES N° 4 GRANDE",
        "price": 21500,
        "inventory": true
      },
      {
        "sku": "004226000745",
        "label": "745 - ARNES MEDIANO 4,00 cm",
        "price": 24200,
        "inventory": true
      },
      {
        "sku": "004226000737",
        "label": "737 - ARNES N° 4 XXL",
        "price": 26400,
        "inventory": true
      },
      {
        "sku": "004226000738",
        "label": "738 - ARNES N° 5 GRANDE",
        "price": 27500,
        "inventory": true
      }
    ]
  },
  {
    "slug": "correa-de-nato-sin-ribete",
    "name": "Correa de nato sin ribete",
    "description": "Seleccione el modelo/artículo correspondiente.   732 - CORREA N° 3 x 1,20 mts c/ MOSQUETÓN PESADO - $12650  733 - CORREA N° 3 x 0,80 mts c/ MOSQUETÓN PESADO - $12100  744 - CORREA N°4 x 1,20 mts c/ MOSQUETÓN PESADO - $15000  900 - CORREA 3,00 mts c/ MOSQUETÓN GIGANTE - $19800",
    "categorySlug": "correa-de-nato-sin-ribete",
    "categoryLabel": "Correa De Nato Sin Ribete",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000733",
        "label": "733 - CORREA N° 3 x 0,80 mts c/ MOSQUETÓN PESADO",
        "price": 12100,
        "inventory": true
      },
      {
        "sku": "004226000732",
        "label": "732 - CORREA N° 3 x 1,20 mts c/ MOSQUETÓN PESADO",
        "price": 12650,
        "inventory": true
      },
      {
        "sku": "004226000744",
        "label": "744 - CORREA N°4 x 1,20 mts c/ MOSQUETÓN PESADO",
        "price": 15000,
        "inventory": true
      },
      {
        "sku": "004226000900",
        "label": "900 - CORREA 3,00 mts c/ MOSQUETÓN GIGANTE",
        "price": 19800,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-de-nato-economico-sin-ribete",
    "name": "Collar de Nato Económico sin Ribete",
    "description": "Seleccione el modelo/artículo correspondiente.   727 - COLLAR N° 3 CORTO 3,00 cm x 55 cm - $4850  728 - COLLAR N° 3 LARGO 3,00 cm x 68 cm - $5100  729 - COLLAR N° 4 CORTO 4,00 cm x 60 cm - $6500  730 - COLLAR N° 4 LARGO 4,00 cm x 70 cm - $6600  731 - COLLAR N° 4 LARGO XXL 4,00 cm x 80 cm - $7300  747 - COLLAR N° 5 CORTO 5,00 cm x 65 cm - $8600  748 - COLLAR N° 5 LARGO 5,00 cm x 75 cm - $8700",
    "categorySlug": "collar-de-nato-economico-sin-ribete",
    "categoryLabel": "Collar De Nato Economico Sin Ribete",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000727",
        "label": "727 - COLLAR N° 3 CORTO 3,00 cm x 55 cm",
        "price": 4850,
        "inventory": true
      },
      {
        "sku": "004226000728",
        "label": "728 - COLLAR N° 3 LARGO 3,00 cm x 68 cm",
        "price": 5100,
        "inventory": true
      },
      {
        "sku": "004226000729",
        "label": "729 - COLLAR N° 4 CORTO 4,00 cm x 60 cm",
        "price": 6500,
        "inventory": true
      },
      {
        "sku": "004226000730",
        "label": "730 - COLLAR N° 4 LARGO 4,00 cm x 70 cm",
        "price": 6600,
        "inventory": true
      },
      {
        "sku": "004226000731",
        "label": "731 - COLLAR N° 4 LARGO XXL 4,00 cm x 80 cm",
        "price": 7300,
        "inventory": true
      },
      {
        "sku": "004226000747",
        "label": "747 - COLLAR N° 5 CORTO 5,00 cm x 65 cm",
        "price": 8600,
        "inventory": true
      },
      {
        "sku": "004226000748",
        "label": "748 - COLLAR N° 5 LARGO 5,00 cm x 75 cm",
        "price": 8700,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-de-cuero-economico-x10",
    "name": "Collar de cuero económico x10",
    "description": "Seleccione el modelo/artículo correspondiente.   530 - COLLAR N° 1 DE 1,50 cm x 30 cm x 10 unidades - $38500  531 - COLLAR N° 2 DE 1,50 cm x 35 cm x 10 unidades - $42000  532 - COLLAR N° 3 DE 2,00 cm x 40 cm x 10 unidades - $44000  533 - COLLAR N° 4 DE 2,00 cm x 45 cm x 10 unidades - $46200  534 - COLLAR N° 5 DE 2,50 cm. x 50 cm x 10 unidades - $49500  535 - COLLAR N° 6 DE 2,50 cm x 55 cm x 10 unidades - $54000  536 - COLLAR N° 7 DE 2,50 cm x 60 cm x 10 unidades - $60500",
    "categorySlug": "collar-de-cuero-economico-x10",
    "categoryLabel": "Collar De Cuero Economico X10",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000530",
        "label": "530 - COLLAR N° 1 DE 1,50 cm x 30 cm x 10 unidades",
        "price": 38500,
        "inventory": true
      },
      {
        "sku": "004226000531",
        "label": "531 - COLLAR N° 2 DE 1,50 cm x 35 cm x 10 unidades",
        "price": 42000,
        "inventory": true
      },
      {
        "sku": "004226000532",
        "label": "532 - COLLAR N° 3 DE 2,00 cm x 40 cm x 10 unidades",
        "price": 44000,
        "inventory": true
      },
      {
        "sku": "004226000533",
        "label": "533 - COLLAR N° 4 DE 2,00 cm x 45 cm x 10 unidades",
        "price": 46200,
        "inventory": true
      },
      {
        "sku": "004226000534",
        "label": "534 - COLLAR N° 5 DE 2,50 cm. x 50 cm x 10 unidade",
        "price": 49500,
        "inventory": true
      },
      {
        "sku": "004226000535",
        "label": "535 - COLLAR N° 6 DE 2,50 cm x 55 cm x 10 unidades",
        "price": 54000,
        "inventory": true
      },
      {
        "sku": "004226000536",
        "label": "536 - COLLAR N° 7 DE 2,50 cm x 60 cm x 10 unidades",
        "price": 60500,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-fantasia",
    "name": "Collar fantasía",
    "description": "Seleccione el modelo/artículo correspondiente.   516 - COLLAR N° 1 DE 1,50 x 30 cm - $2400  517 - COLLAR N°2 DE 1,50 x 35 cm - $2450  518 - COLLAR N° 3 DE 2,00 x 40 cm - $2850  519 - COLLAR N° 4 DE 2,00 x 45 cm - $3150  520 - COLLAR N° 5 DE 2,50 x 50 cm - $3300  521 - COLLAR N° 6 DE 2,50 x 55 cm - $4200  522 - COLLAR N° 7 DE 3,00 x 60 cm - $4400",
    "categorySlug": "collar-fantasia",
    "categoryLabel": "Collar Fantasia",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000516",
        "label": "516 - COLLAR N° 1 DE 1,50 x 30 cm",
        "price": 2400,
        "inventory": true
      },
      {
        "sku": "004226000517",
        "label": "517 - COLLAR N°2 DE 1,50 x 35 cm",
        "price": 2450,
        "inventory": true
      },
      {
        "sku": "004226000518",
        "label": "518 - COLLAR N° 3 DE 2,00 x 40 cm",
        "price": 2850,
        "inventory": true
      },
      {
        "sku": "004226000519",
        "label": "519 - COLLAR N° 4 DE 2,00 x 45 cm",
        "price": 3150,
        "inventory": true
      },
      {
        "sku": "004226000520",
        "label": "520 - COLLAR N° 5 DE 2,50 x 50 cm",
        "price": 3300,
        "inventory": true
      },
      {
        "sku": "004226000521",
        "label": "521 - COLLAR N° 6 DE 2,50 x 55 cm",
        "price": 4200,
        "inventory": true
      },
      {
        "sku": "004226000522",
        "label": "522 - COLLAR N° 7 DE 3,00 x 60 cm",
        "price": 4400,
        "inventory": true
      }
    ]
  },
  {
    "slug": "correa-sublimada",
    "name": "Correa Sublimada",
    "description": "Seleccione el modelo/artículo correspondiente.   508 - CORREA N° 1 DE 1,50 cm x 1,30 mts - $5300  509 - CORREA N° 2 DE 2,00 cm x 1,30 mts - $5400  510 - CORREA N° 3 DE 2,50 cm x 1,30 mts - $6200  511 - CORREA N° 4 DE 3,00 cm x 1,30 mts - $7500",
    "categorySlug": "correa-sublimada",
    "categoryLabel": "Correa Sublimada",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000508",
        "label": "508 - CORREA N° 1 DE 1,50 cm x 1,30 mts",
        "price": 5300,
        "inventory": true
      },
      {
        "sku": "004226000509",
        "label": "509 - CORREA N° 2 DE 2,00 cm x 1,30 mts",
        "price": 5400,
        "inventory": true
      },
      {
        "sku": "004226000510",
        "label": "510 - CORREA N° 3 DE 2,50 cm x 1,30 mts",
        "price": 6200,
        "inventory": true
      },
      {
        "sku": "004226000511",
        "label": "511 - CORREA N° 4 DE 3,00 cm x 1,30 mts",
        "price": 7500,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-con-strass",
    "name": "Collar con strass",
    "description": "Seleccione el modelo/artículo correspondiente.   512 - COLLAR GATO DE 1,00 cm x 27 cm - $3650  513 - COLLAR DE 1,50 cm x 30 cm - $3850  514 - COLLAR DE 2,00 cm x 40 cm - $4550  515 - COLLAR DE 2,50 cm x 50 cm - $4650  523 - COLLAR DE 3,00 cm x 65 cm - $5400",
    "categorySlug": "collar-con-strass",
    "categoryLabel": "Collar Con Strass",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000512",
        "label": "512 - COLLAR GATO DE 1,00 cm x 27 cm",
        "price": 3650,
        "inventory": true
      },
      {
        "sku": "004226000513",
        "label": "513 - COLLAR DE 1,50 cm x 30 cm",
        "price": 3850,
        "inventory": true
      },
      {
        "sku": "004226000514",
        "label": "514 - COLLAR DE 2,00 cm x 40 cm",
        "price": 4550,
        "inventory": true
      },
      {
        "sku": "004226000515",
        "label": "515 - COLLAR DE 2,50 cm x 50 cm",
        "price": 4650,
        "inventory": true
      },
      {
        "sku": "004226000523",
        "label": "523 - COLLAR DE 3,00 cm x 65 cm",
        "price": 5400,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-sublimado",
    "name": "Collar sublimado",
    "description": "Seleccione el modelo/artículo correspondiente.   500 - COLLAR SUBLIMADO N° 1 DE 1,50 X 30 cm - $3300  501 - COLLAR SUBLIMADO N°2 DE 1,50 X 35 cm - $3300  502 - COLLAR SUBLIMADO N° 3 DE 2,00 X 40 cm - $3650  503 - COLLAR SUBLIMADO N° 4 DE 2,00 X 45 cm - $3650  504 - COLLAR SUBLIMADO N° 5 DE 2,5 X 50 cm - $4300  505 - COLLAR SUBLIMADO N° 6 DE 2,5 X 55 cm - $4350  506 - COLLAR SUBLIMADO N° 7 DE 3,00 X 60 cm - $4400  507 - COLLAR SUBLIMADO N° 8 DE 3,00 X 65 cm - $4650  422 - COLLAR MARTIN GALA DE GALGO DE 5,00 cm - $8250",
    "categorySlug": "collar-sublimado",
    "categoryLabel": "Collar Sublimado",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000500",
        "label": "500 - COLLAR SUBLIMADO N° 1 DE 1,50 X 30 cm",
        "price": 3300,
        "inventory": true
      },
      {
        "sku": "004226000501",
        "label": "501 - COLLAR SUBLIMADO N°2 DE 1,50 X 35 cm",
        "price": 3300,
        "inventory": true
      },
      {
        "sku": "004226000502",
        "label": "502 - COLLAR SUBLIMADO N° 3 DE 2,00 X 40 cm",
        "price": 3650,
        "inventory": true
      },
      {
        "sku": "004226000503",
        "label": "503 - COLLAR SUBLIMADO N° 4 DE 2,00 X 45 cm",
        "price": 3650,
        "inventory": true
      },
      {
        "sku": "004226000504",
        "label": "504 - COLLAR SUBLIMADO N° 5 DE 2,5 X 50 cm",
        "price": 4300,
        "inventory": true
      },
      {
        "sku": "004226000505",
        "label": "505 - COLLAR SUBLIMADO N° 6 DE 2,5 X 55 cm",
        "price": 4350,
        "inventory": true
      },
      {
        "sku": "004226000506",
        "label": "506 - COLLAR SUBLIMADO N° 7 DE 3,00 X 60 cm",
        "price": 4400,
        "inventory": true
      },
      {
        "sku": "004226000507",
        "label": "507 - COLLAR SUBLIMADO N° 8 DE 3,00 X 65 cm",
        "price": 4650,
        "inventory": true
      },
      {
        "sku": "004226000422",
        "label": "422 - COLLAR MARTIN GALA DE GALGO DE 5,00 cm",
        "price": 8250,
        "inventory": true
      }
    ]
  },
  {
    "slug": "arnes-de-cuero",
    "name": "Arnes de cuero",
    "description": "Seleccione el modelo/artículo correspondiente.   416 - ARNES DE PITT BULL Y BULL TERRIER - $35200  417 - ARNES DE DOGO Y ROTTWEILER - $35200  418 - ARNES DE LABRADOR SIN PECHERA - $35200  419 - ARNES MEDIANO SIN PECHERA - $33000  420 - ARNES DE BULL DOG FRANCES CON PECHERA DE 2,00 cm - $22000  421 - ARNES MEDIANO CON PECHERA DE 2,50 cm - $33000",
    "categorySlug": "arnes-de-cuero",
    "categoryLabel": "Arnes De Cuero",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000420",
        "label": "420 - ARNES DE BULL DOG FRANCES CON PECHERA DE 2,0",
        "price": 22000,
        "inventory": true
      },
      {
        "sku": "004226000419",
        "label": "419 - ARNES MEDIANO SIN PECHERA",
        "price": 33000,
        "inventory": true
      },
      {
        "sku": "004226000421",
        "label": "421 - ARNES MEDIANO CON PECHERA DE 2,50 cm",
        "price": 33000,
        "inventory": true
      },
      {
        "sku": "004226000416",
        "label": "416 - ARNES DE PITT BULL Y BULL TERRIER",
        "price": 35200,
        "inventory": true
      },
      {
        "sku": "004226000417",
        "label": "417 - ARNES DE DOGO Y ROTTWEILER",
        "price": 35200,
        "inventory": true
      },
      {
        "sku": "004226000418",
        "label": "418 - ARNES DE LABRADOR SIN PECHERA",
        "price": 35200,
        "inventory": true
      }
    ]
  },
  {
    "slug": "manopla-de-cuero",
    "name": "Manopla de cuero",
    "description": "Seleccione el modelo/artículo correspondiente.   414 - MANOPLA CORTA DE 30 cm - $4650  415 - MANOPLA LARGA DE 40 cm - $4850",
    "categorySlug": "manopla-de-cuero",
    "categoryLabel": "Manopla De Cuero",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000414",
        "label": "414 - MANOPLA CORTA DE 30 cm",
        "price": 4650,
        "inventory": true
      },
      {
        "sku": "004226000415",
        "label": "415 - MANOPLA LARGA DE 40 cm",
        "price": 4850,
        "inventory": true
      }
    ]
  },
  {
    "slug": "bozal-con-tira-de-seguridad",
    "name": "Bozal con tira de seguridad",
    "description": "Seleccione el modelo/artículo correspondiente.   400 - BOZAL CANASTA MINI - $5500  401 - BOZAL CANASTA CHICO - $5850  402 - BOZAL BOXER - $16000  403 - BOZAL CANASTA ROTTWEILER - $16000  404 - BOZAL AJUSTABLE X 10 UNIDADES EN 3 MEDIDAS - $55000  405 - BOZAL OVEJERO HEMBRA - $16000  406 - BOZAL DOGO - $16000  407 - BOZAL OVEJERO MACHO - $16000  408 - BOZAL COCKER - $16000  409 - BOZAL PIT BULL - $16000  411 - BOZAL MASTIN - $17100  412 - BOZAL LABRADOR - $16000  413 - BOZAL CONO 10 UNIDADES EN 6 MEDIDAS - $44000",
    "categorySlug": "bozal-con-tira-de-seguridad",
    "categoryLabel": "Bozal Con Tira De Seguridad",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000400",
        "label": "400 - BOZAL CANASTA MINI",
        "price": 5500,
        "inventory": true
      },
      {
        "sku": "004226000401",
        "label": "401 - BOZAL CANASTA CHICO",
        "price": 5850,
        "inventory": true
      },
      {
        "sku": "004226000402",
        "label": "402 - BOZAL BOXER",
        "price": 16000,
        "inventory": true
      },
      {
        "sku": "004226000403",
        "label": "403 - BOZAL CANASTA ROTTWEILER",
        "price": 16000,
        "inventory": true
      },
      {
        "sku": "004226000405",
        "label": "405 - BOZAL OVEJERO HEMBRA",
        "price": 16000,
        "inventory": true
      },
      {
        "sku": "004226000406",
        "label": "406 - BOZAL DOGO",
        "price": 16000,
        "inventory": true
      },
      {
        "sku": "004226000407",
        "label": "407 - BOZAL OVEJERO MACHO",
        "price": 16000,
        "inventory": true
      },
      {
        "sku": "004226000408",
        "label": "408 - BOZAL COCKER",
        "price": 16000,
        "inventory": true
      },
      {
        "sku": "004226000409",
        "label": "409 - BOZAL PIT BULL",
        "price": 16000,
        "inventory": true
      },
      {
        "sku": "004226000412",
        "label": "412 - BOZAL LABRADOR",
        "price": 16000,
        "inventory": true
      },
      {
        "sku": "004226000411",
        "label": "411 - BOZAL MASTIN",
        "price": 17100,
        "inventory": true
      },
      {
        "sku": "004226000413",
        "label": "413 - BOZAL CONO 10 UNIDADES EN 6 MEDIDAS",
        "price": 44000,
        "inventory": true
      },
      {
        "sku": "004226000404",
        "label": "404 - BOZAL AJUSTABLE X 10 UNIDADES EN 3 MEDIDAS",
        "price": 55000,
        "inventory": true
      }
    ]
  },
  {
    "slug": "correa-de-cuero",
    "name": "Correa de cuero",
    "description": "Seleccione el modelo/artículo correspondiente.   201 - CORREAS DE 1,50 cm X 1,20 mts - $12650  202 - CORREAS DE 2,00 cm X 1,20 mts - $14300  203 - CORREAS DE 3,00 cm X 1,20 mts - $22000  204 - CORREAS DE 2,50 cm X 1,20 mts MOSQ GIGANTE - $24200  205 - TRILLA DE ENTRENAMIENTO DE 1,00 cm X 2,00 mts - $24200",
    "categorySlug": "correa-de-cuero",
    "categoryLabel": "Correa De Cuero",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000201",
        "label": "201 - CORREAS DE 1,50 cm X 1,20 mts",
        "price": 12650,
        "inventory": true
      },
      {
        "sku": "004226000202",
        "label": "202 - CORREAS DE 2,00 cm X 1,20 mts",
        "price": 14300,
        "inventory": true
      },
      {
        "sku": "004226000203",
        "label": "203 - CORREAS DE 3,00 cm X 1,20 mts",
        "price": 22000,
        "inventory": true
      },
      {
        "sku": "004226000204",
        "label": "204 - CORREAS DE 2,50 cm X 1,20 mts MOSQ GIGANTE",
        "price": 24200,
        "inventory": true
      },
      {
        "sku": "004226000205",
        "label": "205 - TRILLA DE ENTRENAMIENTO DE 1,00 cm X 2,00 mt",
        "price": 24200,
        "inventory": true
      }
    ]
  },
  {
    "slug": "arnes-de-polipropileno-doble",
    "name": "Arnes de polipropileno doble",
    "description": "Seleccione el modelo/artículo correspondiente.   388 - ARNES DE 2,50 cm - $19800  389 - ARNES DE 3,00 cm - $22000  390 - ARNES DE 4,00 cm - $26400  739 - ARNES COCIDO CON MANIJA MEDIANO 3,00 cm - $22000  740 - ARNES COCIDO CON MANIJA GRANDE - $23700  741 - ARNES NATO RIBETEADO CON MANIJA XL - $24200",
    "categorySlug": "arnes-de-polipropileno-doble",
    "categoryLabel": "Arnes De Polipropileno Doble",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000388",
        "label": "388 - ARNES DE 2,50 cm",
        "price": 19800,
        "inventory": true
      },
      {
        "sku": "004226000389",
        "label": "389 - ARNES DE 3,00 cm",
        "price": 22000,
        "inventory": true
      },
      {
        "sku": "004226000739",
        "label": "739 - ARNES COCIDO CON MANIJA MEDIANO 3,00 cm",
        "price": 22000,
        "inventory": true
      },
      {
        "sku": "004226000740",
        "label": "740 - ARNES COCIDO CON MANIJA GRANDE",
        "price": 23700,
        "inventory": true
      },
      {
        "sku": "004226000741",
        "label": "741 - ARNES NATO RIBETEADO CON MANIJA XL",
        "price": 24200,
        "inventory": true
      },
      {
        "sku": "004226000390",
        "label": "390 - ARNES DE 4,00 cm",
        "price": 26400,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-de-cuero",
    "name": "Collar de cuero",
    "description": "Seleccione el modelo/artículo correspondiente.   105 - COLLAR MINI OJALILLADO DE 1,50 X 35 cm - $4200  104 - COLLAR CHICO OJALILLADO DE 2,00 X 45 cm - $4400  103 - COLLAR MEDIANO OJALILLADO DE 2,50 X 55 cm - $5200  134 - COLLAR OVEJERO OJALILLADO DE 3,00 cm - $7200  133 - COLLAR DOGO OJALILLADO DE 4,00 cm - $11000  151 - COLLAR PITBULL OJALILLADO DE 5,00 cm - $11000  136 - COLLAR DE 3,00 cm CORTO OJALILLADO - $7550  137 - COLLAR DE 4,00 cm CORTO OJALILLADO - $10350  131 - COLLAR DE 3,00 cm CON TACHAS - $9100  130 - COLLAR DE 4,00 cm CON TACHAS - $10900  140 - COLLAR DE 5,00 cm CON TACHAS - $11550  125 - COLLAR DE 3,00 cm CON PUAS - $11000  120 - COLLAR DE 4,00 cm CON PUAS - $13200  145 - COLLAR DE 5,00 cm CON PUAS - $13200  116 - COLLAR DE 4,00 cm CON MANIJA - $9800  117 - COLLAR FIJO Y DE AHORQUE N° 2 DE 3,00 cm - $10500  118 - COLLAR FIJO Y DE AHORQUE N° 3 DE 4,00 cm - $10900",
    "categorySlug": "collar-de-cuero",
    "categoryLabel": "Collar De Cuero",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000105",
        "label": "105 - COLLAR MINI OJALILLADO DE 1,50 X 35 cm",
        "price": 4200,
        "inventory": true
      },
      {
        "sku": "004226000104",
        "label": "104 - COLLAR CHICO OJALILLADO DE 2,00 X 45 cm",
        "price": 4400,
        "inventory": true
      },
      {
        "sku": "004226000103",
        "label": "103 - COLLAR MEDIANO OJALILLADO DE 2,50 X 55 cm",
        "price": 5200,
        "inventory": true
      },
      {
        "sku": "004226000134",
        "label": "134 - COLLAR OVEJERO OJALILLADO DE 3,00 cm",
        "price": 7200,
        "inventory": true
      },
      {
        "sku": "004226000136",
        "label": "136 - COLLAR DE 3,00 cm CORTO OJALILLADO",
        "price": 7550,
        "inventory": true
      },
      {
        "sku": "004226000131",
        "label": "131 - COLLAR DE 3,00 cm CON TACHAS",
        "price": 9100,
        "inventory": true
      },
      {
        "sku": "004226000116",
        "label": "116 - COLLAR DE 4,00 cm CON MANIJA",
        "price": 9800,
        "inventory": true
      },
      {
        "sku": "004226000137",
        "label": "137 - COLLAR DE 4,00 cm CORTO OJALILLADO",
        "price": 10350,
        "inventory": true
      },
      {
        "sku": "004226000117",
        "label": "117 - COLLAR FIJO Y DE AHORQUE N° 2 DE 3,00 cm",
        "price": 10500,
        "inventory": true
      },
      {
        "sku": "004226000130",
        "label": "130 - COLLAR DE 4,00 cm CON TACHAS",
        "price": 10900,
        "inventory": true
      },
      {
        "sku": "004226000118",
        "label": "118 - COLLAR FIJO Y DE AHORQUE N° 3 DE 4,00 cm",
        "price": 10900,
        "inventory": true
      },
      {
        "sku": "004226000133",
        "label": "133 - COLLAR DOGO OJALILLADO DE 4,00 cm",
        "price": 11000,
        "inventory": true
      },
      {
        "sku": "004226000151",
        "label": "151 - COLLAR PITBULL OJALILLADO DE 5,00 cm",
        "price": 11000,
        "inventory": true
      },
      {
        "sku": "004226000125",
        "label": "125 - COLLAR DE 3,00 cm CON PUAS",
        "price": 11000,
        "inventory": true
      },
      {
        "sku": "004226000140",
        "label": "140 - COLLAR DE 5,00 cm CON TACHAS",
        "price": 11550,
        "inventory": true
      },
      {
        "sku": "004226000120",
        "label": "120 - COLLAR DE 4,00 cm CON PUAS",
        "price": 13200,
        "inventory": true
      },
      {
        "sku": "004226000145",
        "label": "145 - COLLAR DE 5,00 cm CON PUAS",
        "price": 13200,
        "inventory": true
      }
    ]
  },
  {
    "slug": "arnes-de-nato-con-ribete",
    "name": "Arnes de Nato con ribete",
    "description": "Seleccione el modelo/artículo correspondiente.   384 - ARNES PIT-BULL DE 5,00 cm CHICO - $28600  385 - ARNES DOGO DE 5,00 cm GRANDE - $28600  386 - ARNES OVEJERO Y LABRADOR DE 4,00 cm - $27500  387 - ARNES DE 3,00 cm - $26400",
    "categorySlug": "arnes-de-nato-con-ribete",
    "categoryLabel": "Arnes De Nato Con Ribete",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000387",
        "label": "387 - ARNES DE 3,00 cm",
        "price": 26400,
        "inventory": true
      },
      {
        "sku": "004226000386",
        "label": "386 - ARNES OVEJERO Y LABRADOR DE 4,00 cm",
        "price": 27500,
        "inventory": true
      },
      {
        "sku": "004226000384",
        "label": "384 - ARNES PIT-BULL DE 5,00 cm CHICO",
        "price": 28600,
        "inventory": true
      },
      {
        "sku": "004226000385",
        "label": "385 - ARNES DOGO DE 5,00 cm GRANDE",
        "price": 28600,
        "inventory": true
      }
    ]
  },
  {
    "slug": "pretal-antitiron-con-correa",
    "name": "Pretal antitiron con correa",
    "description": "Seleccione el modelo/artículo correspondiente.   433 - PRETAL REG.ANTITIRON DE 2,00 cm CHICO C/CORREA - $21500  434 - PRETAL REG. ANTITIRON DE 2,50 cm MED. C/CORREA - $22000  435 - PRETAL REG. ANTITIRON DE 3,00 cm GDE. C/CORREA - $24200",
    "categorySlug": "pretal-antitiron-con-correa",
    "categoryLabel": "Pretal Antitiron Con Correa",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000433",
        "label": "433 - PRETAL REG.ANTITIRON DE 2,00 cm CHICO C/CORR",
        "price": 21500,
        "inventory": true
      },
      {
        "sku": "004226000434",
        "label": "434 - PRETAL REG. ANTITIRON DE 2,50 cm MED. C/CORR",
        "price": 22000,
        "inventory": true
      },
      {
        "sku": "004226000435",
        "label": "435 - PRETAL REG. ANTITIRON DE 3,00 cm GDE. C/CORR",
        "price": 24200,
        "inventory": true
      }
    ]
  },
  {
    "slug": "arnes-de-polipropileno-camuflado",
    "name": "Arnes de polipropileno camuflado",
    "description": "Seleccione el modelo/artículo correspondiente.   382 - ARNES DE 3,00 cm REGULABLE CON ENCASTRE - $17100  383 - ARNES DE 4,00 cm REGULABLE CON ENCASTRE - $19250",
    "categorySlug": "arnes-de-polipropileno-camuflado",
    "categoryLabel": "Arnes De Polipropileno Camuflado",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000382",
        "label": "382 - ARNES DE 3,00 cm REGULABLE CON ENCASTRE",
        "price": 17100,
        "inventory": true
      },
      {
        "sku": "004226000383",
        "label": "383 - ARNES DE 4,00 cm REGULABLE CON ENCASTRE",
        "price": 19250,
        "inventory": true
      }
    ]
  },
  {
    "slug": "pretal-de-gato-sublimado-con-correa",
    "name": "Pretal de gato sublimado con correa",
    "description": "Seleccione el modelo/artículo correspondiente.   371 - PRETAL DE GATO DE 1,00 cm CON CORREA - $7150  372 - PRETAL DE GATO DE 1,50 cm CON CORREA - $7500",
    "categorySlug": "pretal-de-gato-sublimado-con-correa",
    "categoryLabel": "Pretal De Gato Sublimado Con Correa",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000371",
        "label": "371 - PRETAL DE GATO DE 1,00 cm CON CORREA",
        "price": 7150,
        "inventory": true
      },
      {
        "sku": "004226000372",
        "label": "372 - PRETAL DE GATO DE 1,50 cm CON CORREA",
        "price": 7500,
        "inventory": true
      }
    ]
  },
  {
    "slug": "pretal-de-gato-de-polipropileno-con-correa",
    "name": "Pretal de gato de polipropileno con correa",
    "description": "Seleccione el modelo/artículo correspondiente.   373 - PRETAL DE NYLON DE GATO DE 1,00 cm CON CORREA - $6100  374 - PRETAL REGULABLE DE GATO DE 1,50 cm CON CORREA - $6600",
    "categorySlug": "pretal-de-gato-de-polipropileno-con-correa",
    "categoryLabel": "Pretal De Gato De Polipropileno Con Correa",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000373",
        "label": "373 - PRETAL DE NYLON DE GATO DE 1,00 cm CON CORRE",
        "price": 6100,
        "inventory": true
      },
      {
        "sku": "004226000374",
        "label": "374 - PRETAL REGULABLE DE GATO DE 1,50 cm CON CORR",
        "price": 6600,
        "inventory": true
      }
    ]
  },
  {
    "slug": "pretal-de-polipropileno-con-correa",
    "name": "Pretal de polipropileno con correa",
    "description": "Seleccione el modelo/artículo correspondiente.   375 - PRETAL REGULABLE N° 1 DE 1,50 cm CON CORREA - $7150  376 - PRETAL REGULABLE N° 2 DE 1,50 cm CON CORREA - $7300  377 - PRETAL REGULABLE N° 3 DE 2,00 cm CON CORREA - $8700  378 - PRETAL REGULABLE N° 4 DE 2,50 cm CON CORREA - $16000  379 - PRETAL REGULABLE N° 5 DE 3,00 cm CON CORREA - $20400  380 - PRETAL REGULABLE N° 6 DE 4,00 cm CON CORREA - $24200  381 - PRETAL REGULABLE N° 7 DE 2,50 cm CON CORREA H - $21500",
    "categorySlug": "pretal-de-polipropileno-con-correa",
    "categoryLabel": "Pretal De Polipropileno Con Correa",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000375",
        "label": "375 - PRETAL REGULABLE N° 1 DE 1,50 cm CON CORREA",
        "price": 7150,
        "inventory": true
      },
      {
        "sku": "004226000376",
        "label": "376 - PRETAL REGULABLE N° 2 DE 1,50 cm CON CORREA",
        "price": 7300,
        "inventory": true
      },
      {
        "sku": "004226000377",
        "label": "377 - PRETAL REGULABLE N° 3 DE 2,00 cm CON CORREA",
        "price": 8700,
        "inventory": true
      },
      {
        "sku": "004226000378",
        "label": "378 - PRETAL REGULABLE N° 4 DE 2,50 cm CON CORREA",
        "price": 16000,
        "inventory": true
      },
      {
        "sku": "004226000379",
        "label": "379 - PRETAL REGULABLE N° 5 DE 3,00 cm CON CORREA",
        "price": 20400,
        "inventory": true
      },
      {
        "sku": "004226000381",
        "label": "381 - PRETAL REGULABLE N° 7 DE 2,50 cm CON CORREA",
        "price": 21500,
        "inventory": true
      },
      {
        "sku": "004226000380",
        "label": "380 - PRETAL REGULABLE N° 6 DE 4,00 cm CON CORREA",
        "price": 24200,
        "inventory": true
      }
    ]
  },
  {
    "slug": "pretal-sublimado-con-correa",
    "name": "Pretal sublimado con correa",
    "description": "Seleccione el modelo/artículo correspondiente.   366 - PRETAL REGULABLE N° 1 DE 1,50 cm CON CORREA - $8800  367 - PRETAL REGULABLE N° 2 DE 1,50 cm CON CORREA - $9050  368 - PRETAL REGULABLE N° 3 DE 2,00 cm CON CORREA - $14300  369 - PRETAL REGULABLE N° 4 DE 2,50 cm CON CORREA - $19250  370 - PRETAL REGULABLE N° 5 DE 3,00 cm CON CORREA - $20900",
    "categorySlug": "pretal-sublimado-con-correa",
    "categoryLabel": "Pretal Sublimado Con Correa",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000366",
        "label": "366 - PRETAL REGULABLE N° 1 DE 1,50 cm CON CORREA",
        "price": 8800,
        "inventory": true
      },
      {
        "sku": "004226000367",
        "label": "367 - PRETAL REGULABLE N° 2 DE 1,50 cm CON CORREA",
        "price": 9050,
        "inventory": true
      },
      {
        "sku": "004226000368",
        "label": "368 - PRETAL REGULABLE N° 3 DE 2,00 cm CON CORREA",
        "price": 14300,
        "inventory": true
      },
      {
        "sku": "004226000369",
        "label": "369 - PRETAL REGULABLE N° 4 DE 2,50 cm CON CORREA",
        "price": 19250,
        "inventory": true
      },
      {
        "sku": "004226000370",
        "label": "370 - PRETAL REGULABLE N° 5 DE 3,00 cm CON CORREA",
        "price": 20900,
        "inventory": true
      }
    ]
  },
  {
    "slug": "pretal-de-polipropileno-sin-correa",
    "name": "Pretal de polipropileno sin correa",
    "description": "Seleccione el modelo/artículo correspondiente.   359 - PRETAL NYLON DE GATO - $5500  360 - PRETAL REGULABLE N° 1 DE 1,50 cm - $5500  361 - PRETAL REGULABLE N° 2 DE 1,50 cm - $6600  362 - PRETAL REGULABLE N° 3 DE 2,00 cm - $8250  363 - PRETAL REGULABLE N° 4 DE 2,50 cm - $13200  364 - PRETAL REGULABLE N° 5 DE 3,00 cm - $17100  365 - PRETAL REGULABLE N° 6 DE 4,00 cm - $21000",
    "categorySlug": "pretal-de-polipropileno-sin-correa",
    "categoryLabel": "Pretal De Polipropileno Sin Correa",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000359",
        "label": "359 - PRETAL NYLON DE GATO",
        "price": 5500,
        "inventory": true
      },
      {
        "sku": "004226000360",
        "label": "360 - PRETAL REGULABLE N° 1 DE 1,50 cm",
        "price": 5500,
        "inventory": true
      },
      {
        "sku": "004226000361",
        "label": "361 - PRETAL REGULABLE N° 2 DE 1,50 cm",
        "price": 6600,
        "inventory": true
      },
      {
        "sku": "004226000362",
        "label": "362 - PRETAL REGULABLE N° 3 DE 2,00 cm",
        "price": 8250,
        "inventory": true
      },
      {
        "sku": "004226000363",
        "label": "363 - PRETAL REGULABLE N° 4 DE 2,50 cm",
        "price": 13200,
        "inventory": true
      },
      {
        "sku": "004226000364",
        "label": "364 - PRETAL REGULABLE N° 5 DE 3,00 cm",
        "price": 17100,
        "inventory": true
      },
      {
        "sku": "004226000365",
        "label": "365 - PRETAL REGULABLE N° 6 DE 4,00 cm",
        "price": 21000,
        "inventory": true
      }
    ]
  },
  {
    "slug": "set-de-collar-y-correa-sublimado",
    "name": "Set de collar y correa sublimado",
    "description": "Seleccione el modelo/artículo correspondiente.   21 - COLLAR Y CORREA SUBLIMADO DE 1,50 cm - $6200  22 - COLLAR Y CORREA SUBLIMADO DE 2,00 cm - $7300",
    "categorySlug": "set-de-collar-y-correa-sublimado",
    "categoryLabel": "Set De Collar Y Correa Sublimado",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000021",
        "label": "21 - COLLAR Y CORREA SUBLIMADO DE 1,50 cm",
        "price": 6200,
        "inventory": true
      },
      {
        "sku": "004226000022",
        "label": "22 - COLLAR Y CORREA SUBLIMADO DE 2,00 cm",
        "price": 7300,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-ajustable-reforzado",
    "name": "Collar ajustable reforzado",
    "description": "Seleccione el modelo/artículo correspondiente.   23 - COLLAR AJUSTABLE REFORZADO DE 2,50 cm - $7200  24 - COLLAR AJUSTABLE REFORZADO DE 3,00 cm - $8450  25 - COLLAR AJUSTABLE REFORZADO DE 4,00 cm - $8800",
    "categorySlug": "collar-ajustable-reforzado",
    "categoryLabel": "Collar Ajustable Reforzado",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000023",
        "label": "23 - COLLAR AJUSTABLE REFORZADO DE 2,50 cm",
        "price": 7200,
        "inventory": true
      },
      {
        "sku": "004226000024",
        "label": "24 - COLLAR AJUSTABLE REFORZADO DE 3,00 cm",
        "price": 8450,
        "inventory": true
      },
      {
        "sku": "004226000025",
        "label": "25 - COLLAR AJUSTABLE REFORZADO DE 4,00 cm",
        "price": 8800,
        "inventory": true
      }
    ]
  },
  {
    "slug": "manopla-de-nato",
    "name": "Manopla de nato",
    "description": "Seleccione el modelo/artículo correspondiente.   350 - MANOPLA - $9350",
    "categorySlug": "manopla-de-nato",
    "categoryLabel": "Manopla De Nato",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000350",
        "label": "350 - MANOPLA",
        "price": 9350,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-de-polipropileno-simple",
    "name": "Collar de polipropileno simple",
    "description": "Seleccione el modelo/artículo correspondiente.   351 - COLLAR N° 1 DE 1,50 cm X 30 cm - $1450  352 - COLLAR N° 2 DE 1,50 cm X 35 cm - $1450  353 - COLLAR N° 3 DE 2,00 cm X 40 cm - $1850  354 - COLLAR N° 4 DE 2,00 cm X 45 cm - $1850  355 - COLLAR N° 5 DE 2,50 cm X 50 cm - $3000  356 - COLLAR N° 6 DE 2,50 cm X 55 cm - $3000  357 - COLLAR N° 7 DE 3,00 cm X 60 cm - $3800  358 - COLLAR N° 8 DE 3,00 cm X 65 cm - $3800",
    "categorySlug": "collar-de-polipropileno-simple",
    "categoryLabel": "Collar De Polipropileno Simple",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000351",
        "label": "351 - COLLAR N° 1 DE 1,50 cm X 30 cm",
        "price": 1450,
        "inventory": true
      },
      {
        "sku": "004226000352",
        "label": "352 - COLLAR N° 2 DE 1,50 cm X 35 cm",
        "price": 1450,
        "inventory": true
      },
      {
        "sku": "004226000353",
        "label": "353 - COLLAR N° 3 DE 2,00 cm X 40 cm",
        "price": 1850,
        "inventory": true
      },
      {
        "sku": "004226000354",
        "label": "354 - COLLAR N° 4 DE 2,00 cm X 45 cm",
        "price": 1850,
        "inventory": true
      },
      {
        "sku": "004226000355",
        "label": "355 - COLLAR N° 5 DE 2,50 cm X 50 cm",
        "price": 3000,
        "inventory": true
      },
      {
        "sku": "004226000356",
        "label": "356 - COLLAR N° 6 DE 2,50 cm X 55 cm",
        "price": 3000,
        "inventory": true
      },
      {
        "sku": "004226000357",
        "label": "357 - COLLAR N° 7 DE 3,00 cm X 60 cm",
        "price": 3800,
        "inventory": true
      },
      {
        "sku": "004226000358",
        "label": "358 - COLLAR N° 8 DE 3,00 cm X 65 cm",
        "price": 3800,
        "inventory": true
      }
    ]
  },
  {
    "slug": "correa-de-polipropileno-camuflada",
    "name": "Correa de polipropileno camuflada",
    "description": "Seleccione el modelo/artículo correspondiente.   347 - CORREA DE 3,00 cm CON MOSQUETON GIGANTE - $21500",
    "categorySlug": "correa-de-polipropileno-camuflada",
    "categoryLabel": "Correa De Polipropileno Camuflada",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000347",
        "label": "347 - CORREA DE 3,00 cm CON MOSQUETON GIGANTE",
        "price": 21500,
        "inventory": true
      }
    ]
  },
  {
    "slug": "correa-de-nato-con-ribete",
    "name": "Correa de nato con ribete",
    "description": "Seleccione el modelo/artículo correspondiente.   348 - CORREA NATO MOSQUETON GIGANTE - $21500  349 - CORREA NATO CORTA MOSQUETON GIGANTE - $20900",
    "categorySlug": "correa-de-nato-con-ribete",
    "categoryLabel": "Correa De Nato Con Ribete",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000349",
        "label": "349 - CORREA NATO CORTA MOSQUETON GIGANTE",
        "price": 20900,
        "inventory": true
      },
      {
        "sku": "004226000348",
        "label": "348 - CORREA NATO MOSQUETON GIGANTE",
        "price": 21500,
        "inventory": true
      }
    ]
  },
  {
    "slug": "cinturon-de-seguridad-para-mascotas",
    "name": "Cinturon de seguridad para mascotas",
    "description": "Seleccione el modelo/artículo correspondiente.   337 - CORREA CINTURÓN DE SEGURIDAD DE NYLON - $8600  338 - CORREA CINTURÓN DE SEGURIDAD C/SUBLIMADO - $8800  339 - CINTURÓN DE SEGURIDAD DE NYLON - $7150",
    "categorySlug": "cinturon-de-seguridad-para-mascotas",
    "categoryLabel": "Cinturon De Seguridad Para Mascotas",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000339",
        "label": "339 - CINTURÓN DE SEGURIDAD DE NYLON",
        "price": 7150,
        "inventory": true
      },
      {
        "sku": "004226000337",
        "label": "337 - CORREA CINTURÓN DE SEGURIDAD DE NYLON",
        "price": 8600,
        "inventory": true
      },
      {
        "sku": "004226000338",
        "label": "338 - CORREA CINTURÓN DE SEGURIDAD C/SUBLIMADO",
        "price": 8800,
        "inventory": true
      }
    ]
  },
  {
    "slug": "correa-de-polipropileno-doble",
    "name": "Correa de polipropileno doble",
    "description": "Seleccione el modelo/artículo correspondiente.   333 - CORREA DE 2,00 cm DOBLE - $8500  334 - CORREA DE 2,50 cm DOBLE - $8600  335 - CORREA DE 3,00 cm DOBLE - $9900",
    "categorySlug": "correa-de-polipropileno-doble",
    "categoryLabel": "Correa De Polipropileno Doble",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000333",
        "label": "333 - CORREA DE 2,00 cm DOBLE",
        "price": 8500,
        "inventory": true
      },
      {
        "sku": "004226000334",
        "label": "334 - CORREA DE 2,50 cm DOBLE",
        "price": 8600,
        "inventory": true
      },
      {
        "sku": "004226000335",
        "label": "335 - CORREA DE 3,00 cm DOBLE",
        "price": 9900,
        "inventory": true
      }
    ]
  },
  {
    "slug": "manopla-de-polipropileno",
    "name": "Manopla de polipropileno",
    "description": "Seleccione el modelo/artículo correspondiente.   336 - MANOPLA DOBLE CORTA - $6400  601 - MANOPLA DOBLE LARGA - $6600",
    "categorySlug": "manopla-de-polipropileno",
    "categoryLabel": "Manopla De Polipropileno",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000336",
        "label": "336 - MANOPLA DOBLE CORTA",
        "price": 6400,
        "inventory": true
      },
      {
        "sku": "004226000601",
        "label": "601 - MANOPLA DOBLE LARGA",
        "price": 6600,
        "inventory": true
      }
    ]
  },
  {
    "slug": "correa-de-polipropileno-extensible",
    "name": "Correa de polipropileno extensible",
    "description": "Seleccione el modelo/artículo correspondiente.   340 - CORREA DE 2,00 cm SIMPLE EXTENSIBLE A 2,00 mts - $8800  341 - CORREA DE 2,50 cm SIMPLE EXTENSIBLE A 2,00 mts - $9700  342 - CORREA DE 3,00 cm SIMPLE EXTENSIBLE A 2,00 mts - $9900",
    "categorySlug": "correa-de-polipropileno-extensible",
    "categoryLabel": "Correa De Polipropileno Extensible",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000340",
        "label": "340 - CORREA DE 2,00 cm SIMPLE EXTENSIBLE A 2,00 m",
        "price": 8800,
        "inventory": true
      },
      {
        "sku": "004226000341",
        "label": "341 - CORREA DE 2,50 cm SIMPLE EXTENSIBLE A 2,00 m",
        "price": 9700,
        "inventory": true
      },
      {
        "sku": "004226000342",
        "label": "342 - CORREA DE 3,00 cm SIMPLE EXTENSIBLE A 2,00 m",
        "price": 9900,
        "inventory": true
      }
    ]
  },
  {
    "slug": "correa-de-polipropileno-larga",
    "name": "Correa de polipropileno larga",
    "description": "Seleccione el modelo/artículo correspondiente.   742 - CORREA DE 1,50 cm x 3 mts SIMPLE - $7250  743 - CORREA DE 2,00 cm x 3 mts SIMPLE - $8000  431 - CORREA DE 2,50 cm x 2 mts SIMPLE - $8600  343 - CORREA DE 2,50 cm x 3 mts SIMPLE - $9000  344 - CORREA DE 2,50 cm x 5 mts SIMPLE - $12650  432 - CORREA DE 3,00 cm x 2 mts SIMPLE - $9250  345 - CORREA DE 3,00 cm x 3 mts SIMPLE - $10600  346 - CORREA DE 3,00 cm x 5 mts SIMPLE - $13750",
    "categorySlug": "correa-de-polipropileno-larga",
    "categoryLabel": "Correa De Polipropileno Larga",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000742",
        "label": "742 - CORREA DE 1,50 cm x 3 mts SIMPLE",
        "price": 7250,
        "inventory": true
      },
      {
        "sku": "004226000743",
        "label": "743 - CORREA DE 2,00 cm x 3 mts SIMPLE",
        "price": 8000,
        "inventory": true
      },
      {
        "sku": "004226000431",
        "label": "431 - CORREA DE 2,50 cm x 2 mts SIMPLE",
        "price": 8600,
        "inventory": true
      },
      {
        "sku": "004226000343",
        "label": "343 - CORREA DE 2,50 cm x 3 mts SIMPLE",
        "price": 9000,
        "inventory": true
      },
      {
        "sku": "004226000432",
        "label": "432 - CORREA DE 3,00 cm x 2 mts SIMPLE",
        "price": 9250,
        "inventory": true
      },
      {
        "sku": "004226000345",
        "label": "345 - CORREA DE 3,00 cm x 3 mts SIMPLE",
        "price": 10600,
        "inventory": true
      },
      {
        "sku": "004226000344",
        "label": "344 - CORREA DE 2,50 cm x 5 mts SIMPLE",
        "price": 12650,
        "inventory": true
      },
      {
        "sku": "004226000346",
        "label": "346 - CORREA DE 3,00 cm x 5 mts SIMPLE",
        "price": 13750,
        "inventory": true
      }
    ]
  },
  {
    "slug": "correa-de-polipropileno-simple",
    "name": "Correa de polipropileno simple",
    "description": "Seleccione el modelo/artículo correspondiente.   329 - CORREA SIMPLE DE 1,50 cm - $3650  330 - CORREA SIMPLE DE 2,00 cm - $4850  331 - CORREA SIMPLE DE 2,50 cm - $6600  332 - CORREA SIMPLE DE 3,00 cm - $7050",
    "categorySlug": "correa-de-polipropileno-simple",
    "categoryLabel": "Correa De Polipropileno Simple",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000329",
        "label": "329 - CORREA SIMPLE DE 1,50 cm",
        "price": 3650,
        "inventory": true
      },
      {
        "sku": "004226000330",
        "label": "330 - CORREA SIMPLE DE 2,00 cm",
        "price": 4850,
        "inventory": true
      },
      {
        "sku": "004226000331",
        "label": "331 - CORREA SIMPLE DE 2,50 cm",
        "price": 6600,
        "inventory": true
      },
      {
        "sku": "004226000332",
        "label": "332 - CORREA SIMPLE DE 3,00 cm",
        "price": 7050,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-de-polipropileno-camuflado",
    "name": "Collar de polipropileno camuflado",
    "description": "Seleccione el modelo/artículo correspondiente.   325 - COLLAR DE 3,00 cm CORTO - $7300  326 - COLLAR DE 3,00 cm LARGO - $7400  327 - COLLAR DE 4,00 cm CORTO - $8000  328 - COLLAR DE 4,00 cm LARGO - $8150",
    "categorySlug": "collar-de-polipropileno-camuflado",
    "categoryLabel": "Collar De Polipropileno Camuflado",
    "brand": "FLASH",
    "image": "/manus-storage/flash-perro-collar_8328473f.jpg",
    "variants": [
      {
        "sku": "004226000325",
        "label": "325 - COLLAR DE 3,00 cm CORTO",
        "price": 7300,
        "inventory": true
      },
      {
        "sku": "004226000326",
        "label": "326 - COLLAR DE 3,00 cm LARGO",
        "price": 7400,
        "inventory": true
      },
      {
        "sku": "004226000327",
        "label": "327 - COLLAR DE 4,00 cm CORTO",
        "price": 8000,
        "inventory": true
      },
      {
        "sku": "004226000328",
        "label": "328 - COLLAR DE 4,00 cm LARGO",
        "price": 8150,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-de-nato-con-ribete",
    "name": "Collar de nato con ribete",
    "description": "Seleccione el modelo/artículo correspondiente.   320 - COLLAR DE 3,00 cm x 0,55 OJALILLADO CORTO - $7950  311 - COLLAR DE 3,00 cm X 0,68 OJALILLADO LARGO - $8400  321 - COLLAR DE 3,00 cm x 0,55 CON TACHAS CORTO - $9900  314 - COLLAR DE 3,00 cm x 0,68 CON TACHAS - $10800  322 - COLLAR DE 3,00 cm x 0,55 C/PUAS REDONDAS CORTO - $14550  317 - COLLAR DE 3,00 cm x 0,68 CON PUAS LARGO - $11700  323 - COLLAR DE 4,00 cm x 0,60 OJALILLADO CORTO - $9250  312 - COLLAR DE 4,00 cm x 0,75 OJALILLADO - $9800  426 - COLLAR DE 4,00 cm x 0,80 OJALILLADO - $9800  324 - COLLAR DE 4,00 cm x 0,60 CON TACHAS CORTO - $11600  315 - COLLAR DE 4,00 cm x 0,75 CON TACHAS LARGO - $12000  600 - COLLAR DE 4,00 cm x 0,60 PUAS REDONDAS CORTO - $14000  318 - COLLAR DE 4,00 cm x 0,75 CON PUAS LARGO - $14650  313 - COLLAR DE 5,00 cm x 0,70 OJALILLADO - $12650  726 - COLLAR DE 5,00 cm x 0,80 OJALILLADO - $12800  427 - COLLAR DE 5,00 cm x 0,90 OJALILLADO - $13000  316 - COLLAR DE 5,00 cm x 0,70 CON TACHAS - $13000  319 - COLLAR DE 5,00 cm x 0,70 CON PUAS - $14650",
    "categorySlug": "collar-de-nato-con-ribete",
    "categoryLabel": "Collar De Nato Con Ribete",
    "brand": "FLASH",
    "image": "/manus-storage/flash-arnes_0c039262.jpg",
    "variants": [
      {
        "sku": "004226000320",
        "label": "320 - COLLAR DE 3,00 cm x 0,55 OJALILLADO CORTO",
        "price": 7950,
        "inventory": true
      },
      {
        "sku": "004226000311",
        "label": "311 - COLLAR DE 3,00 cm X 0,68 OJALILLADO LARGO",
        "price": 8400,
        "inventory": true
      },
      {
        "sku": "004226000323",
        "label": "323 - COLLAR DE 4,00 cm x 0,60 OJALILLADO CORTO",
        "price": 9250,
        "inventory": true
      },
      {
        "sku": "004226000312",
        "label": "312 - COLLAR DE 4,00 cm x 0,75 OJALILLADO",
        "price": 9800,
        "inventory": true
      },
      {
        "sku": "004226000426",
        "label": "426 - COLLAR DE 4,00 cm x 0,80 OJALILLADO",
        "price": 9800,
        "inventory": true
      },
      {
        "sku": "004226000321",
        "label": "321 - COLLAR DE 3,00 cm x 0,55 CON TACHAS CORTO",
        "price": 9900,
        "inventory": true
      },
      {
        "sku": "004226000314",
        "label": "314 - COLLAR DE 3,00 cm x 0,68 CON TACHAS",
        "price": 10800,
        "inventory": true
      },
      {
        "sku": "004226000324",
        "label": "324 - COLLAR DE 4,00 cm x 0,60 CON TACHAS CORTO",
        "price": 11600,
        "inventory": true
      },
      {
        "sku": "004226000317",
        "label": "317 - COLLAR DE 3,00 cm x 0,68 CON PUAS LARGO",
        "price": 11700,
        "inventory": true
      },
      {
        "sku": "004226000315",
        "label": "315 - COLLAR DE 4,00 cm x 0,75 CON TACHAS LARGO",
        "price": 12000,
        "inventory": true
      },
      {
        "sku": "004226000313",
        "label": "313 - COLLAR DE 5,00 cm x 0,70 OJALILLADO",
        "price": 12650,
        "inventory": true
      },
      {
        "sku": "004226000726",
        "label": "726 - COLLAR DE 5,00 cm x 0,80 OJALILLADO",
        "price": 12800,
        "inventory": true
      },
      {
        "sku": "004226000427",
        "label": "427 - COLLAR DE 5,00 cm x 0,90 OJALILLADO",
        "price": 13000,
        "inventory": true
      },
      {
        "sku": "004226000316",
        "label": "316 - COLLAR DE 5,00 cm x 0,70 CON TACHAS",
        "price": 13000,
        "inventory": true
      },
      {
        "sku": "004226000600",
        "label": "600 - COLLAR DE 4,00 cm x 0,60 PUAS REDONDAS CORTO",
        "price": 14000,
        "inventory": true
      },
      {
        "sku": "004226000322",
        "label": "322 - COLLAR DE 3,00 cm x 0,55 C/PUAS REDONDAS COR",
        "price": 14550,
        "inventory": true
      },
      {
        "sku": "004226000318",
        "label": "318 - COLLAR DE 4,00 cm x 0,75 CON PUAS LARGO",
        "price": 14650,
        "inventory": true
      },
      {
        "sku": "004226000319",
        "label": "319 - COLLAR DE 5,00 cm x 0,70 CON PUAS",
        "price": 14650,
        "inventory": true
      }
    ]
  },
  {
    "slug": "collar-de-polipropileno-doble",
    "name": "Collar de polipropileno doble",
    "description": "Seleccione el modelo/artículo correspondiente.   300 - COLLAR DE 2,00 cm x 0,40 DOBLE OJALILLADO - $3850  301 - COLLAR DE 2,50 cm x 0,50 DOBLE OJALILLADO - $5100  430 - COLLAR DE 3,00 cm x 0,55 DOBLE OJALILLADO CORTO - $7300  302 - COLLAR DE 3,00 cm x 0,68 DOBLE OJALILLADO LARGO - $7600  429 - COLLAR DE 4,00 cm x 0,60 DOBLE OJALILLADO CORTO - $8600  303 - COLLAR DE 4,00 cm x 0,75 DOBLE OJALILLADO LARGO - $9700  428 - COLLAR DE 4,00 cm x 0,60 DOBLE CON MANIJA CORTO - $9050  304 - COLLAR DE 4,00 cm x 0,75 DOBLE CON MANIJA LARGO - $7650  305 - COLLAR DE 2,00 cm x 0,40 CON TIRA SUBLIMADA - $4950  306 - COLLAR DE 2,50 cm x 0,50 CON TIRA SUBLIMADA - $6250  307 - COLLAR DE 3,00 cm x 0,68 CON TIRA SUBLIMADA - $8000  308 - COLLAR DE 4,00 cm x 0,75 CON TIRA SUBLIMADA - $9150  309 - COLLAR DE AHORQUE Y FIJO DOBLE DE 3,00 cm - $9800  310 - COLLAR DE AHORQUE Y FIJO DOBLE DE 4,00 cm - $10600",
    "categorySlug": "collar-de-polipropileno-doble",
    "categoryLabel": "Collar De Polipropileno Doble",
    "brand": "FLASH",
    "image": "/manus-storage/flash-collares_d390d3b5.jpg",
    "variants": [
      {
        "sku": "004226000300",
        "label": "300 - COLLAR DE 2,00 cm x 0,40 DOBLE OJALILLADO",
        "price": 3850,
        "inventory": true
      },
      {
        "sku": "004226000305",
        "label": "305 - COLLAR DE 2,00 cm x 0,40 CON TIRA SUBLIMADA",
        "price": 4950,
        "inventory": true
      },
      {
        "sku": "004226000301",
        "label": "301 - COLLAR DE 2,50 cm x 0,50 DOBLE OJALILLADO",
        "price": 5100,
        "inventory": true
      },
      {
        "sku": "004226000306",
        "label": "306 - COLLAR DE 2,50 cm x 0,50 CON TIRA SUBLIMADA",
        "price": 6250,
        "inventory": true
      },
      {
        "sku": "004226000430",
        "label": "430 - COLLAR DE 3,00 cm x 0,55 DOBLE OJALILLADO CO",
        "price": 7300,
        "inventory": true
      },
      {
        "sku": "004226000302",
        "label": "302 - COLLAR DE 3,00 cm x 0,68 DOBLE OJALILLADO LA",
        "price": 7600,
        "inventory": true
      },
      {
        "sku": "004226000304",
        "label": "304 - COLLAR DE 4,00 cm x 0,75 DOBLE CON MANIJA LA",
        "price": 7650,
        "inventory": true
      },
      {
        "sku": "004226000307",
        "label": "307 - COLLAR DE 3,00 cm x 0,68 CON TIRA SUBLIMADA",
        "price": 8000,
        "inventory": true
      },
      {
        "sku": "004226000429",
        "label": "429 - COLLAR DE 4,00 cm x 0,60 DOBLE OJALILLADO CO",
        "price": 8600,
        "inventory": true
      },
      {
        "sku": "004226000428",
        "label": "428 - COLLAR DE 4,00 cm x 0,60 DOBLE CON MANIJA CO",
        "price": 9050,
        "inventory": true
      },
      {
        "sku": "004226000308",
        "label": "308 - COLLAR DE 4,00 cm x 0,75 CON TIRA SUBLIMADA",
        "price": 9150,
        "inventory": true
      },
      {
        "sku": "004226000303",
        "label": "303 - COLLAR DE 4,00 cm x 0,75 DOBLE OJALILLADO LA",
        "price": 9700,
        "inventory": true
      },
      {
        "sku": "004226000309",
        "label": "309 - COLLAR DE AHORQUE Y FIJO DOBLE DE 3,00 cm",
        "price": 9800,
        "inventory": true
      },
      {
        "sku": "004226000310",
        "label": "310 - COLLAR DE AHORQUE Y FIJO DOBLE DE 4,00 cm",
        "price": 10600,
        "inventory": true
      }
    ]
  }
];
