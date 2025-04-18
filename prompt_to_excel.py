import json
import pandas as pd
import os
import re

# Path to the JSON file
json_file_path = 'prompt_gen.json'

# Read the JSON file
with open(json_file_path, 'r') as file:
    data = json.load(file)

# Create a list to store the processed data
processed_data = []

# Process each item in the data
for i, item in enumerate(data, 1):
    # Extract level from the background path (e.g., level3, level4, etc.)
    level_match = re.search(r'level(\d+)', item['background'])
    level = f"Level {level_match.group(1)}" if level_match else "Unknown"
    
    # Extract background file name without the path
    background_name = os.path.basename(item['background'])
    
    # Add the processed item to our list
    processed_data.append({
        'Number': i,
        'Level': level,
        'Background Name': background_name,
        'Prompt': item['prompt']
    })

# Create a DataFrame from the processed data
df = pd.DataFrame(processed_data)

# Create an Excel writer using pandas
output_path = 'prompt_inventory.xlsx'
with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
    df.to_excel(writer, index=False, sheet_name='Prompts')

print(f"Excel file created successfully at {output_path}") 