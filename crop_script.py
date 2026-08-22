from PIL import Image
import os
import json

images = ['board.png']
results = {}

for img_name in images:
    path = os.path.join('public', 'pictures', img_name)
    if not os.path.exists(path):
        continue
    img = Image.open(path)
    img = img.convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        # bbox is (left, upper, right, lower)
        cropped = img.crop(bbox)
        # overwrite the original image with cropped image
        cropped.save(path)
        
        orig_width, orig_height = img.size
        new_width = bbox[2] - bbox[0]
        new_height = bbox[3] - bbox[1]
        
        left_pct = (bbox[0] / orig_width) * 100
        top_pct = (bbox[1] / orig_height) * 100
        width_pct = (new_width / orig_width) * 100
        height_pct = (new_height / orig_height) * 100
        
        results[img_name] = {
            'left': left_pct,
            'top': top_pct,
            'width': width_pct,
            'height': height_pct
        }

print(json.dumps(results, indent=2))
