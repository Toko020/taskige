from PIL import Image
import os

INPUT = "taskige_icon_preview.png"   # rename your big image to this (or change path here)
OUT_DIR = os.path.join("static", "icons")

os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(INPUT).convert("RGBA")

# This script auto-splits the image into TOP and BOTTOM halves,
# then takes the centered square from each half and saves both sizes.

w, h = img.size
half_h = h // 2

def center_square(im):
    ww, hh = im.size
    side = min(ww, hh)
    left = (ww - side) // 2
    top = (hh - side) // 2
    return im.crop((left, top, left + side, top + side))

# Choose which design to export:
# TOP icon = first half, BOTTOM icon = second half
top_half = img.crop((0, 0, w, half_h))
bottom_half = img.crop((0, half_h, w, h))

# ✅ Pick one:
chosen = bottom_half  # change to top_half if you prefer the top design

square = center_square(chosen)

icon512 = square.resize((512, 512), Image.LANCZOS)
icon192 = square.resize((192, 192), Image.LANCZOS)

icon512.save(os.path.join(OUT_DIR, "icon-512.png"), optimize=True)
icon192.save(os.path.join(OUT_DIR, "icon-192.png"), optimize=True)

print("✅ Saved static/icons/icon-512.png and static/icons/icon-192.png")
