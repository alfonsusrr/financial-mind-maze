import * as fs from 'fs';
import * as path from 'path';

// Import level data directly
import level3Data from './level3';
import level4Data from './level4';
import level5Data from './level5';
import level6Data from './level6';
import { GameScene } from '../types/games'; // Assuming types are defined here

// Define the structure for the output JSON entries
interface ImageDataEntry {
  level: string;
  sceneId: string;
  sceneType: string;
  background: string;
  description: string;
  title: string;
}

// Helper function to process a level's data
function processLevelData(levelData: GameScene[], levelName: string): ImageDataEntry[] {
  const imageData: ImageDataEntry[] = [];
  
  for (const scene of levelData) {
    // Check if the scene has a background property
    if ('background' in scene && scene.background && 'description' in scene) {
       // Ensure required fields exist before pushing
       if (scene.id && scene.type && scene.description) {
         imageData.push({
           level: levelName,
           sceneId: scene.id,
           sceneType: scene.type,
           background: scene.background,
           description: scene.description,
           // Use title if it exists, otherwise default to empty string
           title: 'title' in scene ? scene.title || '' : '', 
         });
       } else {
            console.warn(`Skipping scene in ${levelName} due to missing fields:`, scene);
       }
    }
  }
  console.log(`Processed ${imageData.length} scenes with backgrounds from ${levelName}`);
  return imageData;
}


// Main function to generate image JSON
function generateImageJson() {
  try {
    const allImageData: ImageDataEntry[] = [];

    // Process each level's data
    allImageData.push(...processLevelData(level3Data, 'level3'));
    allImageData.push(...processLevelData(level4Data, 'level4'));
    allImageData.push(...processLevelData(level5Data, 'level5'));
    allImageData.push(...processLevelData(level6Data, 'level6'));

    // Write to JSON file
    fs.writeFileSync(
      path.join(__dirname, 'image_gen.json'),
      JSON.stringify(allImageData, null, 2)
    );

    console.log(`Generated image_gen.json with ${allImageData.length} image entries`);

  } catch (error: unknown) { // Specify 'unknown' type for error
      if (error instanceof Error) {
        console.error(`Error generating image JSON:`, error.message);
      } else {
        console.error(`An unknown error occurred:`, error);
      }
  }
}

// Execute the function
generateImageJson();
