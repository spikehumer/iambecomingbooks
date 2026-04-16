from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "client" / "public" / "images"

TARGETS = {
    "hero-dawn.jpg": [(960, "hero-dawn-960.webp"), (1600, "hero-dawn-1600.webp")],
    "book-cover-mockup.jpg": [(480, "book-cover-mockup-480.webp"), (640, "book-cover-mockup-640.webp"), (800, "book-cover-mockup-800.webp")],
    "book-3d.jpg": [(480, "book-3d-480.webp"), (800, "book-3d-800.webp")],
    "author-portrait-placeholder.jpg": [(256, "author-portrait-256.webp"), (512, "author-portrait-512.webp")],
    "texture-paper.jpg": [(128, "texture-paper-128.webp"), (256, "texture-paper-256.webp")],
}

for source_name, outputs in TARGETS.items():
    source_path = IMAGES / source_name
    with Image.open(source_path) as img:
        prepared = ImageOps.exif_transpose(img)
        if prepared.mode in {"RGBA", "LA"}:
            background = Image.new("RGB", prepared.size, (245, 242, 236))
            background.paste(prepared, mask=prepared.getchannel("A"))
            prepared = background
        else:
            prepared = prepared.convert("RGB")

        for width, output_name in outputs:
            ratio = width / prepared.width
            height = max(1, round(prepared.height * ratio))
            resized = prepared.resize((width, height), Image.Resampling.LANCZOS)
            output_path = IMAGES / output_name
            resized.save(output_path, "WEBP", quality=82, method=6)
            print(f"created {output_path.relative_to(ROOT)} {resized.size}")
