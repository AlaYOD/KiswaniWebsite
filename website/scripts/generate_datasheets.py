from pathlib import Path
from io import BytesIO
from PIL import Image as PillowImage
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf"
PUBLIC = ROOT / "public" / "downloads"

PRODUCTS = [
    ("Halo Chandelier", "KL-HC-120", "Decorative", "kiswani-decorative-2026.webp", [("Power", "96W"), ("Color temperature", "3000K"), ("Diameter", "1200mm"), ("Dimming", "Triac / DALI")]),
    ("Luma Tier", "KL-LT-860", "Decorative", "kiswani-decorative-2026.webp", [("Light source", "Integrated LED"), ("Color temperature", "3000K"), ("Finish", "Smoke glass"), ("Dimming", "Optional")]),
    ("Prism Cluster", "KL-PC-450", "Decorative", "kiswani-decorative-2026.webp", [("Light source", "LED"), ("Color temperature", "3000K"), ("Canopy", "Black"), ("Installation", "Suspended")]),
    ("Flow Linear", "KL-FL-240", "Interior", "kiswani-hero-2026.webp", [("Power", "48W"), ("Color temperature", "3000K"), ("CRI", "90+"), ("Finish", "Black")]),
    ("Orbit Floor", "KL-OF-180", "Interior", "kiswani-hero-2026.webp", [("Light source", "LED"), ("Color temperature", "3000K"), ("Control", "Foot dimmer"), ("Finish", "Graphite")]),
    ("Cove Wall", "KL-CW-320", "Interior", "kiswani-hero-2026.webp", [("Power", "12W"), ("Color temperature", "3000K"), ("Beam", "Indirect"), ("Finish", "Warm black")]),
    ("Axis Seven", "KL-AS-700", "Technical", "kiswani-technical-2026.webp", [("Power", "7 x 8W"), ("Color temperature", "2700K-4000K"), ("CRI", "95"), ("Control", "DALI optional")]),
    ("Beam Track", "KL-BT-035", "Technical", "kiswani-technical-2026.webp", [("Power", "35W"), ("Color temperature", "3000K"), ("CRI", "90+"), ("Beam angle", "24 deg")]),
    ("Recess Pro", "KL-RP-018", "Technical", "kiswani-technical-2026.webp", [("Power", "18W"), ("Color temperature", "3000K"), ("CRI", "90+"), ("Cutout", "95mm")]),
    ("Aura Pendant", "KL-AP-140", "Accent", "kiswani-accent-2026.webp", [("Power", "12W"), ("Color temperature", "2700K"), ("Material", "Translucent stone"), ("Finish", "Black")]),
    ("Line Wall", "KL-LW-600", "Accent", "kiswani-accent-2026.webp", [("Power", "18W"), ("Color temperature", "3000K"), ("Length", "600mm"), ("Light", "Indirect")]),
    ("Mini Focus", "KL-MF-009", "Accent", "kiswani-accent-2026.webp", [("Power", "9W"), ("Color temperature", "3000K"), ("CRI", "95"), ("Beam angle", "18 deg")]),
]

INK = colors.HexColor("#0F1822")
YELLOW = colors.HexColor("#FFDA01")
GRAY = colors.HexColor("#73787C")
PALE = colors.HexColor("#F4F2ED")
LINE = colors.HexColor("#CCCFCE")


def draw_cover_image(pdf, path, x, y, width, height):
    buffer = BytesIO()
    with PillowImage.open(path) as source:
        source = source.convert("RGB")
        source.thumbnail((1600, 1200), PillowImage.Resampling.LANCZOS)
        source.save(buffer, format="JPEG", quality=80, optimize=True)
    buffer.seek(0)
    image = ImageReader(buffer)
    source_width, source_height = image.getSize()
    source_ratio = source_width / source_height
    target_ratio = width / height
    if source_ratio > target_ratio:
        drawn_height = height
        drawn_width = height * source_ratio
        drawn_x = x - (drawn_width - width) / 2
        drawn_y = y
    else:
        drawn_width = width
        drawn_height = width / source_ratio
        drawn_x = x
        drawn_y = y - (drawn_height - height) / 2
    pdf.saveState()
    clip = pdf.beginPath()
    clip.rect(x, y, width, height)
    pdf.clipPath(clip, stroke=0, fill=0)
    pdf.drawImage(image, drawn_x, drawn_y, drawn_width, drawn_height, mask="auto")
    pdf.restoreState()


def create_datasheet(name, code, category, image_name, specs, destination):
    width, height = A4
    pdf = canvas.Canvas(str(destination), pagesize=A4)
    pdf.setTitle(f"{name} - {code} | Kiswani Lights")
    pdf.setAuthor("Kiswani Lights")

    pdf.setFillColor(INK)
    pdf.rect(0, height - 124, width, 124, fill=1, stroke=0)
    pdf.setFillColor(YELLOW)
    pdf.rect(0, height - 128, width, 4, fill=1, stroke=0)

    logo = ROOT / "public" / "images" / "kiswani-logo-original-white.png"
    pdf.drawImage(str(logo), 42, height - 103, width=176, height=64, preserveAspectRatio=True, anchor="w", mask="auto")
    pdf.setFont("Helvetica-Bold", 8)
    pdf.setFillColor(YELLOW)
    pdf.drawRightString(width - 42, height - 68, "PRODUCT DATASHEET / 2026")
    pdf.setFont("Helvetica", 7)
    pdf.setFillColor(colors.HexColor("#A3A7AA"))
    pdf.drawRightString(width - 42, height - 85, "DECORATIVE - TECHNICAL - ARCHITECTURAL")

    image_y = height - 408
    draw_cover_image(pdf, ROOT / "public" / "images" / image_name, 42, image_y, width - 84, 238)
    pdf.setStrokeColor(colors.Color(1, 1, 1, alpha=0.35))
    pdf.rect(54, image_y + 12, width - 108, 214, fill=0, stroke=1)

    pdf.setFillColor(YELLOW)
    pdf.rect(42, image_y - 30, 76, 30, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawCentredString(80, image_y - 19, code)

    title_y = image_y - 76
    pdf.setFillColor(GRAY)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(42, title_y + 29, category.upper() + " LIGHTING")
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 28)
    pdf.drawString(42, title_y, name)
    pdf.setFillColor(YELLOW)
    pdf.rect(42, title_y - 20, 62, 3, fill=1, stroke=0)

    table_top = title_y - 60
    row_height = 39
    pdf.setFillColor(PALE)
    pdf.rect(42, table_top - row_height * len(specs), width - 84, row_height * len(specs), fill=1, stroke=0)
    for index, (label, value) in enumerate(specs):
        row_y = table_top - row_height * (index + 1)
        if index:
            pdf.setStrokeColor(LINE)
            pdf.line(42, row_y + row_height, width - 42, row_y + row_height)
        pdf.setFillColor(colors.HexColor("#A3A7AA"))
        pdf.setFont("Helvetica-Bold", 7)
        pdf.drawString(58, row_y + 15, f"0{index + 1}")
        pdf.setFillColor(GRAY)
        pdf.setFont("Helvetica", 9)
        pdf.drawString(92, row_y + 14, label)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 10)
        pdf.drawRightString(width - 58, row_y + 14, value)

    footer_y = 49
    pdf.setStrokeColor(LINE)
    pdf.line(42, footer_y + 24, width - 42, footer_y + 24)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(42, footer_y, "KISWANI LIGHTS")
    pdf.setFillColor(GRAY)
    pdf.setFont("Helvetica", 7.5)
    pdf.drawString(132, footer_y, "Ramallah, Palestine")
    pdf.drawRightString(width - 42, footer_y, "+970 599 67 12 09  |  info@kiswanilights.com")

    pdf.save()


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    for product in PRODUCTS:
        filename = f"{product[1]}.pdf"
        output_path = OUTPUT / filename
        create_datasheet(*product, output_path)
        (PUBLIC / filename).write_bytes(output_path.read_bytes())
    print(f"Generated {len(PRODUCTS)} Kiswani product datasheets")


if __name__ == "__main__":
    main()
