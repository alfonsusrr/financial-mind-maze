"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Import level data directly
const level3_1 = __importDefault(require("./level3"));
const level4_1 = __importDefault(require("./level4"));
const level5_1 = __importDefault(require("./level5"));
const level6_1 = __importDefault(require("./level6"));
// Helper function to process a level's data
function processLevelData(levelData, levelName) {
    const imageData = [];
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
            }
            else {
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
        const allImageData = [];
        // Process each level's data
        allImageData.push(...processLevelData(level3_1.default, 'level3'));
        allImageData.push(...processLevelData(level4_1.default, 'level4'));
        allImageData.push(...processLevelData(level5_1.default, 'level5'));
        allImageData.push(...processLevelData(level6_1.default, 'level6'));
        // Write to JSON file
        fs.writeFileSync(path.join(__dirname, 'image_gen.json'), JSON.stringify(allImageData, null, 2));
        console.log(`Generated image_gen.json with ${allImageData.length} image entries`);
    }
    catch (error) { // Specify 'unknown' type for error
        if (error instanceof Error) {
            console.error(`Error generating image JSON:`, error.message);
        }
        else {
            console.error(`An unknown error occurred:`, error);
        }
    }
}
// Execute the function
generateImageJson();
