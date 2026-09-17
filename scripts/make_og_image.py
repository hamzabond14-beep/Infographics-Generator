from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new("RGB", (W, H), "#12131c")
draw = ImageDraw.Draw(img)

# Diagonal brand gradient background
for y in range(H):
    t = y / H
    for band in range(0, W, 4):
        tx = band / W
        r = int((0x4f + (0xf2 - 0x4f) * ((tx + t) / 2)))
        g = int((0x4f + (0xa5 - 0x4f) * ((tx + t) / 2)))
        b = int((0xe8 + (0x3a - 0xe8) * ((tx + t) / 2)))
        draw.rectangle([band, y, band + 4, y + 1], fill=(r, g, b))

overlay = Image.new("RGBA", (W, H), (18, 19, 28, 130))
img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
draw = ImageDraw.Draw(img)

def load_font(size, bold=True):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()

title_font = load_font(72)
sub_font = load_font(34, bold=False)
brand_font = load_font(30)

# Logo mark
draw.rounded_rectangle([80, 80, 150, 150], radius=20, fill="#ffffff")
draw.ellipse([100, 96, 130, 126], outline="#4f4fe8", width=6)
draw.text((186, 96), "WordConfusion", font=brand_font, fill="#ffffff")

draw.text((80, 220), "Confused by a Word?", font=title_font, fill="#ffffff")
draw.text((80, 310), "Find Your Answer.", font=title_font, fill="#ffffff")

draw.text(
    (80, 420),
    "Clear, friendly answers for the words English speakers mix up most.",
    font=sub_font,
    fill="#f1f1fb",
)

img.save("/home/user/Infographics-Generator/assets/og-image.png", "PNG", optimize=True)
print("saved")
