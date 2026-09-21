from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/upload/LOGOFLASH.png')
target = Path('/home/ubuntu/webdev-static-assets/flash-paw-logo.png')
target.parent.mkdir(parents=True, exist_ok=True)
image = Image.open(source).convert('RGBA')
# The supplied logo places the paw above the wordmark; crop only that upper mark.
crop = image.crop((180, 90, 1080, 930))
pixels = crop.load()
width, height = crop.size
seen = set()
stack = [(x, y) for x in range(width) for y in (0, height - 1)] + [(x, y) for y in range(height) for x in (0, width - 1)]
while stack:
    x, y = stack.pop()
    if (x, y) in seen or not (0 <= x < width and 0 <= y < height):
        continue
    seen.add((x, y))
    r, g, b, a = pixels[x, y]
    if r > 245 and g > 245 and b > 245 and a > 0:
        pixels[x, y] = (255, 255, 255, 0)
        stack.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
# Trim transparent border while preserving the enclosed white heart.
bbox = crop.getbbox()
if bbox:
    crop = crop.crop(bbox)
crop.save(target, 'PNG', optimize=True)
print(target)
print(crop.size)
