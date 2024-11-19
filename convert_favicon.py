import cairosvg
import os

def convert_svg_to_favicon(svg_path, output_dir):
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Convert to PNG (multiple sizes)
    sizes = [16, 32, 48, 128, 256]
    for size in sizes:
        output_png = os.path.join(output_dir, f"favicon-{size}x{size}.png")
        cairosvg.svg2png(url=svg_path, write_to=output_png, output_width=size, output_height=size)
    
    # Convert to ICO (includes multiple sizes)
    output_ico = os.path.join(output_dir, "favicon.ico")
    cairosvg.svg2png(url=svg_path, write_to=output_ico, output_width=128, output_height=128)

if __name__ == "__main__":
    svg_path = "/Volumes/LaCie/compactus_care/logo-green-square.svg"
    output_dir = "/Volumes/LaCie/compactus_care/favicon"
    convert_svg_to_favicon(svg_path, output_dir)
    print("Favicon conversion complete.")
