
import os
from PIL import Image

# -----------------------------------
# CONFIG
# -----------------------------------
# Point to the folder that currently contains your loose JPGs
# (From your screenshot they were under public/images)
SOURCE_DIR = r"C:\shopcart-rag\shopcart-frontend\public\images"
TARGET_ROOT = r"C:\shopcart-rag\shopcart-frontend\public\images"

# Mapping: LEFT = exact JPG filename you currently have (rename or adjust to match)
#          RIGHT = (category folder, target .webp filename as used in products.js)
mapping = {
    # ====================== MEN (6) ======================
    "wireless headphones.jpg":      ("men",    "wireless-headphones-pro.webp"),
    "gaming mouse.jpg":             ("men",    "rgb-gaming-mouse-7200dpi.webp"),
    "mechanical keyboard.jpg":      ("men",    "mech-keyboard-blue.webp"),
    "laptop backpack.jpg":          ("men",    "casual-backpack-28l.webp"),
    "running shoes.jpg":         ("men",    "running-sneakers.webp"),
    "fitness tracker.jpg":          ("men",    "fitness-band-spo2.webp"),

    # ====================== WOMEN (6) ======================
    "smart watch.jpg":              ("women",  "smart-watch-slim.webp"),
    "hair dryer.jpg":               ("women",  "ionic-hair-dryer-1400w.webp"),
    "hair straightener.jpg":        ("women",  "ceramic-hair-straightener.webp"),
    "handbag.jpg":                  ("women",  "classic-tote-handbag.webp"),
    "light weight trainers.jpg":           ("women",  "lightweight-trainers.webp"),
    "wireless earbuds.jpg":         ("women",  "noise-canceling-earbuds.webp"),

    # ====================== HOME (6) ======================
    "led table lamp.jpg":           ("home",   "led-table-lamp.webp"),
    "cushion.jpg":                  ("home",   "memory-foam-cushion.webp"),
    "bedsheet.jpg":                 ("home",   "cotton-bedsheet-queen.webp"),
    "wall clock.jpg":               ("home",   "minimal-wall-clock.webp"),
    "Humidifier.jpg":               ("home",   "cool-mist-humidifier-3l.webp"),
    "storage rack.jpg":             ("home",   "5-tier-storage-rack.webp"),

    # ====================== KITCHEN (6) ======================
    "frying pan.jpg":               ("kitchen","nonstick-frying-pan-28cm.webp"),
    "vegetable chopper.jpg":        ("kitchen","manual-veg-chopper.webp"),
    "Knife Set.jpg":                ("kitchen","chef-knife-set-3pc.webp"),
    "pressure cooker.jpg":          ("kitchen","pressure-cooker-5l.webp"),
    "mixer grinder.jpg":            ("kitchen","mixer-grinder-500w.webp"),
    "steel water bottle.jpg":       ("kitchen","insulated-steel-bottle-1l.webp"),

    # ====================== BEAUTY (6) ======================
    "vitamin c serum.jpg":          ("beauty", "vitamin-c-serum-20.webp"),
    "sunscreen.jpg":                ("beauty", "spf50-gel-sunscreen.webp"),
    "face wash.jpg":                ("beauty", "gentle-face-wash.webp"),
    "moisturizer.jpg":              ("beauty", "hydrating-moisturizer.webp"),
    "lipstick.jpg":                 ("beauty", "matte-lipstick-set-3.webp"),
    "anti dandruff shampoo.jpg":    ("beauty", "anti-dandruff-shampoo.webp"),
}

# -----------------------------------
# Ensure target folders exist
# -----------------------------------
for cat, _name in mapping.values():
    os.makedirs(os.path.join(TARGET_ROOT, cat), exist_ok=True)

# -----------------------------------
# Diagnostics: list what we can see
# -----------------------------------
print("Looking for JPG files in:", SOURCE_DIR)
try:
    listed = [n for n in sorted(os.listdir(SOURCE_DIR)) if n.lower().endswith((".jpg", ".jpeg"))]
    for n in listed:
        print(" -", n)
except FileNotFoundError:
    raise SystemExit(f"Folder does not exist: {SOURCE_DIR}")

# -----------------------------------
# Convert + Move
# -----------------------------------
for src_name, (category, target_name) in mapping.items():
    src_path = os.path.join(SOURCE_DIR, src_name)
    if not os.path.exists(src_path):
        print(f"❌ Missing: {src_path}")
        continue

    # Convert to WebP and write to target category folder
    img = Image.open(src_path).convert("RGB")
    out_path = os.path.join(TARGET_ROOT, category, target_name)
    img.save(out_path, "WEBP", quality=90)
    print(f"✅ Converted and moved: {src_name} → {out_path}")

print("🎉 Done. Now restart your dev server: npm run dev -- --force")
