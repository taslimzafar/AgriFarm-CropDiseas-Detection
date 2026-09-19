import os
import zipfile
import sys

def extract_dataset(zip_path, target_dir, max_per_class=None):
    """
    Extracts 'plantvillage dataset/color/' from zip_path to target_dir.
    If max_per_class is set, only extracts up to max_per_class images per class
    for rapid balanced training. If None, extracts all.
    """
    os.makedirs(target_dir, exist_ok=True)
    print(f"Opening {zip_path}...")
    
    with zipfile.ZipFile(zip_path, 'r') as z:
        prefix = "plantvillage dataset/color/"
        members = [m for m in z.namelist() if m.startswith(prefix) and not m.endswith('/')]
        print(f"Total color images found in zip: {len(members)}")
        
        class_counts = {}
        extracted_count = 0
        
        for m in members:
            # path structure: plantvillage dataset/color/<class_name>/<filename>
            parts = m[len(prefix):].split('/')
            if len(parts) != 2:
                continue
            class_name, file_name = parts
            
            if max_per_class is not None:
                current_count = class_counts.get(class_name, 0)
                if current_count >= max_per_class:
                    continue
                class_counts[class_name] = current_count + 1
            else:
                class_counts[class_name] = class_counts.get(class_name, 0) + 1
                
            out_class_dir = os.path.join(target_dir, class_name)
            os.makedirs(out_class_dir, exist_ok=True)
            out_path = os.path.join(out_class_dir, file_name)
            
            if not os.path.exists(out_path):
                with z.open(m) as source, open(out_path, 'wb') as target:
                    target.write(source.read())
                    
            extracted_count += 1
            if extracted_count % 1000 == 0:
                print(f"Extracted {extracted_count} images across {len(class_counts)} classes...")

        print(f"\nExtraction complete! Total extracted: {extracted_count} images across {len(class_counts)} classes.")
        for cls, cnt in sorted(class_counts.items()):
            print(f"  {cls}: {cnt} images")

if __name__ == '__main__':
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    archive_path = os.path.join(repo_root, 'archive.zip')
    dataset_target = os.path.join(repo_root, 'ml', 'dataset', 'color')
    
    max_count = int(sys.argv[1]) if len(sys.argv) > 1 else 250
    print(f"Target directory: {dataset_target}")
    print(f"Samples per class: {max_count if max_count > 0 else 'ALL'}")
    extract_dataset(archive_path, dataset_target, max_per_class=max_count if max_count > 0 else None)
