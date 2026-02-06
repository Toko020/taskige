from PIL import Image
import os

INPUT = "taskige_icon_preview.png"   # your big image
OUT_DIR = os.path.join("static", "icons")

os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(INPUT).convert("RGBA")

w, h = img.size
half_h = h // 2

# choose which icon to use
use_bottom = True   # set False to use top one

part = img.crop((0, half_h, w, h)) if use_bottom else img.crop((0, 0, w, half_h))

# center square crop
pw, ph = part.size
side = min(pw, ph)
left = (pw - side) // 2
top = (ph - side) // 2
square = part.crop((left, top, left + side, top + side))

# remove white background
pixels = square.load()
for y in range(square.height):
    for x in range(square.width):
        r, g, b, a = pixels[x, y]
        if r > 245 and g > 245 and b > 245:
            pixels[x, y] = (255, 255, 255, 0)

# export
square.resize((512, 512), Image.LANCZOS).save(
    os.path.join(OUT_DIR, "icon-512.png"),
    optimize=True
)
square.resize((192, 192), Image.LANCZOS).save(
    os.path.join(OUT_DIR, "icon-192.png"),
    optimize=True
)

print("✅ Transparent icons created")
