from PIL import Image, ImageOps
import os

INPUT = "taskige_icon_preview.png"  # big image with 2 designs
OUT_ICONS = os.path.join("static", "icons")
OUT_IOS = os.path.join("static", "icons", "ios")

os.makedirs(OUT_ICONS, exist_ok=True)
os.makedirs(OUT_IOS, exist_ok=True)

# Pick which icon design to use from the big image:
# True = bottom icon (clipboard), False = top icon (text only)
USE_BOTTOM = True

def remove_white_to_transparent(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if r > 245 and g > 245 and b > 245:
                px[x, y] = (255, 255, 255, 0)
    return im

def center_square(im: Image.Image) -> Image.Image:
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return im.crop((left, top, left + side, top + side))

def resize(im: Image.Image, size: int) -> Image.Image:
    return im.resize((size, size), Image.LANCZOS)

def pad_to_safe_area(im: Image.Image, pad_ratio: float) -> Image.Image:
    """
    Adds transparent padding around the icon.
    pad_ratio = how much padding relative to size (0.12 = 12%)
    """
    size = im.size[0]
    pad = int(size * pad_ratio)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    inner = im.crop((0, 0, size, size))
    inner = inner.resize((size - 2*pad, size - 2*pad), Image.LANCZOS)
    canvas.paste(inner, (pad, pad), inner)
    return canvas

def save_png(im: Image.Image, path: str):
    im.save(path, format="PNG", optimize=True)

# Load and split big preview into halves
big = Image.open(INPUT).convert("RGBA")
W, H = big.size
half = H // 2
top_half = big.crop((0, 0, W, half))
bot_half = big.crop((0, half, W, H))

chosen = bot_half if USE_BOTTOM else top_half
sq = center_square(chosen)

# 1) Remove white background -> transparent
sq = remove_white_to_transparent(sq)

# Export base icons
icon512 = resize(sq, 512)
icon192 = resize(sq, 192)

save_png(icon512, os.path.join(OUT_ICONS, "icon-512.png"))
save_png(icon192, os.path.join(OUT_ICONS, "icon-192.png"))

# 2) Android maskable:
# maskable icons should have extra safe area (padding) so launcher can crop/shape it.
# ~20% padding is a good default.
mask512 = pad_to_safe_area(icon512, 0.20)
mask192 = pad_to_safe_area(icon192, 0.20)

save_png(mask512, os.path.join(OUT_ICONS, "maskable-512.png"))
save_png(mask192, os.path.join(OUT_ICONS, "maskable-192.png"))

# 3) iOS touch icons:
# iOS likes a bit of padding so it doesn't look too tight.
# We'll make 180x180 and 167x167 common sizes.
ios_base = pad_to_safe_area(resize(sq, 512), 0.12)

save_png(resize(ios_base, 180), os.path.join(OUT_IOS, "apple-touch-icon-180.png"))
save_png(resize(ios_base, 167), os.path.join(OUT_IOS, "apple-touch-icon-167.png"))
save_png(resize(ios_base, 152), os.path.join(OUT_IOS, "apple-touch-icon-152.png"))
save_png(resize(ios_base, 120), os.path.join(OUT_IOS, "apple-touch-icon-120.png"))

print("✅ Done. Created:")
print("  static/icons/icon-192.png")
print("  static/icons/icon-512.png")
print("  static/icons/maskable-192.png")
print("  static/icons/maskable-512.png")
print("  static/icons/ios/apple-touch-icon-180.png (and others)")
