import csv
import html
import json
import re
from pathlib import Path

SOURCE = Path('/home/ubuntu/projects/cat-logo-interactivo-o-algo-as-9e1e5fe5/lista actualizada y categorizada wix FINAL.csv')
TARGET = Path('/home/ubuntu/flash-catalogo-store/shared/catalog.ts')
IMAGE_PATHS = [
    '/manus-storage/flash-collares_d390d3b5.jpg',
    '/manus-storage/flash-perro-collar_8328473f.jpg',
    '/manus-storage/flash-arnes_0c039262.jpg',
]

def clean_html(value: str) -> str:
    text = re.sub(r'<[^>]+>', ' ', value or '')
    return re.sub(r'\\s+', ' ', html.unescape(text)).strip()

def label(slug: str) -> str:
    words = (slug or '').replace('-', ' ').split()
    return ' '.join(word.capitalize() for word in words)

with SOURCE.open(encoding='utf-8-sig', newline='') as fh:
    rows = list(csv.DictReader(fh))

products = []
for row in rows:
    if row.get('fieldType') != 'PRODUCT':
        continue
    handle = row.get('handle', '')
    variants = []
    for variant in rows:
        if variant.get('fieldType') != 'VARIANT' or variant.get('handle') != handle:
            continue
        choice = (variant.get('productOptionChoices1') or '').strip()
        variants.append({
            'sku': variant.get('sku', '').strip(),
            'label': choice or 'Presentación estándar',
            'price': int(float(variant.get('price') or 0)),
            'inventory': variant.get('inventory') == 'IN_STOCK',
        })
    variants.sort(key=lambda item: item['price'])
    category = row.get('primaryCategorySlug') or row.get('categorySlugs') or 'catalogo-flash'
    products.append({
        'slug': handle,
        'name': (row.get('name') or handle.replace('-', ' ').title()).strip(),
        'description': clean_html(row.get('plainDescription', '')) or 'Accesorio Flash listo para sumar a tu pedido mayorista.',
        'categorySlug': category,
        'categoryLabel': label(category),
        'brand': row.get('brand') or 'FLASH',
        'image': IMAGE_PATHS[len(products) % len(IMAGE_PATHS)],
        'variants': variants,
    })

content = """export type CatalogVariant = {\n  sku: string;\n  label: string;\n  price: number;\n  inventory: boolean;\n};\n\nexport type CatalogProduct = {\n  slug: string;\n  name: string;\n  description: string;\n  categorySlug: string;\n  categoryLabel: string;\n  brand: string;\n  image: string;\n  variants: CatalogVariant[];\n};\n\nexport const catalogProducts: CatalogProduct[] = """ + json.dumps(products, ensure_ascii=False, indent=2) + ";\n"
TARGET.parent.mkdir(parents=True, exist_ok=True)
TARGET.write_text(content, encoding='utf-8')
print(f'Generated {len(products)} products and {sum(len(p["variants"]) for p in products)} variants at {TARGET}')
