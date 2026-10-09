import os
import sys
from PIL import Image

root = os.path.join(os.getcwd(), "public")
exts = (".png", ".jpg", ".jpeg")
errors = []
converted = 0

for dirpath, dirnames, filenames in os.walk(root):
    for name in filenames:
        ext = os.path.splitext(name)[1].lower()
        if ext not in exts:
            continue
        src = os.path.join(dirpath, name)
        base = os.path.splitext(name)[0]
        out = os.path.join(dirpath, base + ".webp")
        try:
            im = Image.open(src)
            # Convert P-mode/alpha to RGBA so transparency is preserved
            if im.mode in ("P", "LA"):
                im = im.convert("RGBA")
            if im.mode not in ("RGB", "RGBA"):
                im = im.convert("RGB")
            # Photo-quality screenshots benefit from chroma-subsampled "lossy" webp.
            # Keep alpha where present (logos) — Pillow handles that automatically.
            im.save(out, "WEBP", quality=80, method=4, exact=True)
            converted += 1
            orig_size = os.path.getsize(src) / 1024
            new_size = os.path.getsize(out) / 1024
            print(f"OK   {os.path.relpath(src, root):65s} {orig_size:8.0f}KB -> {new_size:7.0f}KB")
        except Exception as e:
            errors.append((src, str(e)))

print(f"\nConverted: {converted}")
if errors:
    print("Errors:")
    for src, msg in errors:
        print(f"  FAIL {src}: {msg}")
    sys.exit(1)