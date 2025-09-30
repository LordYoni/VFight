import os
import re

# Récupère le dossier où se trouve le script
folder = os.path.dirname(os.path.abspath(__file__))

def normalize_filename(filename: str) -> str:
    # Sépare le nom et l'extension
    name, ext = os.path.splitext(filename)
    
    # Étape 1 : enlever "Chibi1"
    name = name.replace("Chibi1", "")
    
    # Étape 2 : ajouter "_" avant chaque majuscule (sauf la première)
    # Exemple : MonImageTest -> Mon_Image_Test
    name = re.sub(r'(?<!^)(?=[A-Z])', '_', name)
    
    return name + ext

for filename in os.listdir(folder):
    old_path = os.path.join(folder, filename)
    if os.path.isfile(old_path):
        new_filename = normalize_filename(filename)
        new_path = os.path.join(folder, new_filename)
        
        # Évite de renommer si c'est déjà correct
        if new_filename != filename:
            os.rename(old_path, new_path)
            print(f'Renommé : {filename} -> {new_filename}')

print("Terminé ✅")
