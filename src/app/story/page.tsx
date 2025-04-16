"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import * as dagre from 'dagre'; // Import dagre
import level1Data from '../../data/level1';
import level2Data from '../../data/level2';
import level3Data from '../../data/level3';
import level4Data from '../../data/level4';
import level5Data from '../../data/level5';
import level6Data from '../../data/level6';
import { GameScene } from '../../types/games';

// Define node dimensions (can be adjusted)
const NODE_WIDTH = 260;
const NODE_HEIGHT = 80;

export default function StoryFlowchart() {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [levelData, setLevelData] = useState<GameScene[]>([]);
  
  useEffect(() => {
    let data: GameScene[] = [];
    switch (selectedLevel) {
      case 1:
        data = level1Data;
        break;
      case 2:
        data = level2Data;
        break;
      case 3:
        data = level3Data;
        break;
      case 4:
        data = level4Data;
        break;
      case 5:
        data = level5Data;
        break;
      case 6:
        data = level6Data;
        break;
      default:
        data = level1Data;
    }
    setLevelData(data);
  }, [selectedLevel]);

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(parseInt(e.target.value));
  };

  return (
    <div className="container min-w-full p-6 bg-gray-950 text-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold text-white">Game Scenario Flowchart</h1>
      
      <div className="mb-2">
        <label htmlFor="level-select" className="block text-sm font-medium mb-2 text-gray-300">
          Select Level:
        </label>
        <select
          id="level-select"
          value={selectedLevel}
          onChange={handleLevelChange}
          className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 w-full max-w-xs text-white"
        >
          <option value={1}>Level 1: The First Fork</option>
          <option value={2}>Level 2: The 401(k) & Insurance Choices</option>
          <option value={3}>Level 3: Long-Term Investment Strategy</option>
          <option value={4}>Level 4: The Hot IPO Decision</option>
          <option value={5}>Level 5: The Crypto Frontier</option>
          <option value={6}>Level 6: Investor in Market Turbulence</option>
        </select>
      </div>
      
      {/* Updated container div for full screen */}
      <div className="bg-gray-950 rounded-lg shadow-lg overflow-hidden flex-grow flex flex-col">
        {/* Moved legend inside ScenarioFlowchart */}
        <ScenarioFlowchart data={levelData} />
      </div>
    </div>
  );
}

type SceneNode = {
  id: string;
  title: string;
  type: string;
  nextScenes: string[];
  choices?: { text: string; nextSceneId: string }[];
};

function ScenarioFlowchart({ data }: { data: GameScene[] }) {
  const [nodes, setNodes] = useState<SceneNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(0.8);
  const [pan, setPan] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPan, setStartPan] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [nodePositions, setNodePositions] = useState<Record<string, {x: number, y: number}>>({});
  const [graphDimensions, setGraphDimensions] = useState<{width: number, height: number}>({width: 0, height: 0});
  
  // Add ref for the container
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const processedNodes: SceneNode[] = data.map(scene => {
      const nextScenes: string[] = [];
      let choices = undefined;
      
      if ('choices' in scene) {
        // Decision scene
        choices = scene.choices.map(choice => ({
          text: choice.text,
          nextSceneId: choice.nextSceneId
        }));
        
        scene.choices.forEach(choice => {
          nextScenes.push(choice.nextSceneId);
        });
      } else if ('nextSceneId' in scene) {
        // Outcome, Event, or Insight scene
        nextScenes.push(scene.nextSceneId);
      }
      
      return {
        id: scene.id,
        title: scene.title,
        type: scene.type,
        nextScenes,
        choices
      };
    });
    
    setNodes(processedNodes);
    
    // Use dagre for layout calculation
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'TB', nodesep: 60, ranksep: 80 }); // Configure layout: Top-to-Bottom, node separation, rank separation
    g.setDefaultEdgeLabel(() => ({}));

    // Add nodes to the graph
    processedNodes.forEach(node => {
      g.setNode(node.id, { label: node.title, width: NODE_WIDTH, height: NODE_HEIGHT });
    });

    // Add edges to the graph
    processedNodes.forEach(node => {
      node.nextScenes.forEach(nextId => {
        // Ensure target node exists before adding edge
        if (processedNodes.some(n => n.id === nextId)) {
          g.setEdge(node.id, nextId);
        } else {
          console.warn(`Target node ${nextId} for edge from ${node.id} not found.`);
        }
      });
    });

    // Calculate layout
    dagre.layout(g);

    // Extract node positions and graph dimensions
    const positions: Record<string, {x: number, y: number}> = {};
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    g.nodes().forEach(nodeId => {
      const node = g.node(nodeId);
      if (node) {
        positions[nodeId] = { x: node.x, y: node.y };
        minX = Math.min(minX, node.x - node.width / 2);
        minY = Math.min(minY, node.y - node.height / 2);
        maxX = Math.max(maxX, node.x + node.width / 2);
        maxY = Math.max(maxY, node.y + node.height / 2);
      }
    });
    
    const graphWidth = maxX - minX + 100; // Add padding
    const graphHeight = maxY - minY + 100; // Add padding

    setNodePositions(positions);
    setGraphDimensions({ width: graphWidth, height: graphHeight });

    // Center the initial view (optional)
    // You might need to adjust this based on container size
    const initialPanX = (graphWidth - (containerRef.current?.clientWidth || 0) / zoom) / 2;
    const initialPanY = (graphHeight - (containerRef.current?.clientHeight || 0) / zoom) / 2;
    // setPan({ x: initialPanX > 0 ? initialPanX : 0, y: initialPanY > 0 ? initialPanY : 0 });
    // Reset pan to 0,0 for consistency, let user pan initially
    setPan({ x: 0, y: 0 });
  }, [data]);
  
  // Add useEffect for handling wheel events with passive: false
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Debounce pan updates for performance
    let panTimeout: NodeJS.Timeout;
    const debouncedSetPan = (newPanFunc: (prev: {x: number, y: number}) => {x: number, y: number}) => {
      clearTimeout(panTimeout);
      panTimeout = setTimeout(() => {
        setPan(newPanFunc);
      }, 10); // Adjust debounce time as needed
    };
    
    // This function will handle all wheel events
    const handleContainerWheel = (e: WheelEvent) => {
      // First check if the event target is within our container
      if (!container.contains(e.target as Node)) return;
      
      // Prevent the default browser behavior
      e.preventDefault(); // Keep this to prevent page scroll
      e.stopPropagation();
      
      // Zooming logic
      if (e.ctrlKey || e.metaKey) {
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        
        // Get cursor position relative to the container
        const containerRect = container.getBoundingClientRect();
        const cursorX = e.clientX - containerRect.left;
        const cursorY = e.clientY - containerRect.top;
        
        // Use current pan state directly for calculations
        const currentPan = pan; 
        const svgX = cursorX / zoom + currentPan.x;
        const svgY = cursorY / zoom + currentPan.y;
        
        setZoom(prevZoom => {
          const newZoom = prevZoom * zoomFactor;
          const constrainedZoom = Math.min(Math.max(newZoom, 0.2), 5); // Constrain between 0.2 and 5
          
          // Adjust pan to zoom towards cursor
          if (constrainedZoom !== prevZoom && constrainedZoom > 0) {
            // Calculate new pan position to zoom toward/from the cursor
            const newPanX = svgX - cursorX / constrainedZoom;
            const newPanY = svgY - cursorY / constrainedZoom;
            
            setPan({ x: newPanX, y: newPanY });
          }
          
          return constrainedZoom;
        });
      } else if (e.altKey) {
        // Alt+Scroll for horizontal scrolling
        const scrollSpeed = 1; // Adjust scroll sensitivity if needed
        const dx = e.deltaY / zoom * scrollSpeed;
        
        // Use debounced pan update for horizontal movement
        debouncedSetPan(prev => ({
          x: prev.x + dx,
          y: prev.y
        }));
      } else {
        // Normal panning logic (vertical)
        const scrollSpeed = 1; // Adjust scroll sensitivity if needed
        // Get the scrolling amounts for horizontal and vertical directions
        const dx = e.deltaX / zoom * scrollSpeed;
        const dy = e.deltaY / zoom * scrollSpeed;

        // Use debounced pan update
        debouncedSetPan(prev => ({
           x: prev.x + dx,
           y: prev.y + dy
         }));
      }
    };
    
    // Add event listener with passive: false to allow preventDefault
    container.addEventListener('wheel', handleContainerWheel, { passive: false });
    
    // Cleanup function to remove the event listener
    return () => {
      container.removeEventListener('wheel', handleContainerWheel);
      clearTimeout(panTimeout); // Clear timeout on cleanup
    };
  }, [zoom, pan]); // Depend on zoom and pan to recalculate SVG coordinates correctly
  
  // Additional useEffect to prevent zoom gestures on the document
  useEffect(() => {
    const handleDocumentGesture = (e: TouchEvent) => {
      // Prevent pinch-to-zoom and other gestures if the target is within our container
      if (containerRef.current?.contains(e.target as Node)) {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }
    };
    
    document.addEventListener('touchstart', handleDocumentGesture, { passive: false });
    document.addEventListener('touchmove', handleDocumentGesture, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', handleDocumentGesture);
      document.removeEventListener('touchmove', handleDocumentGesture);
    };
  }, []);
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 5));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.2));
  };
  
  const handleReset = () => {
    setZoom(0.8);
    setPan({ x: 0, y: 0 });
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only initiate dragging with middle or left mouse button
    if (e.button === 0 || e.button === 1) {
      setIsDragging(true);
      setStartPan({ x: e.clientX, y: e.clientY });
      
      // Prevent text selection during drag
      e.preventDefault();
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = (e.clientX - startPan.x) / zoom;
    const dy = (e.clientY - startPan.y) / zoom;
    
    setPan(prev => ({ 
      x: prev.x - dx, 
      y: prev.y - dy 
    }));
    
    setStartPan({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Prevent context menu from appearing on right-click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };
  
  const handleNodeClick = (nodeId: string, e: React.MouseEvent) => {
    // Prevent click from triggering drag
    e.stopPropagation();
    setSelectedNode(nodeId === selectedNode ? null : nodeId);
  };
  
  const selectedSceneData = selectedNode 
    ? data.find(scene => scene.id === selectedNode) 
    : null;
  
  if (nodes.length === 0) {
    return <div className="text-gray-200">Loading flowchart data...</div>;
  }
  
  // Use useCallback for event handlers passed to SVG/DOM elements to prevent unnecessary re-renders
  return (
    <div className="flowchart">
      <div className="controls mb-4 flex gap-2">
        <button 
          onClick={handleZoomIn}
          className="px-3 py-1 bg-gray-800 rounded border border-gray-600 hover:bg-gray-800 text-white"
        >
          +
        </button>
        <button 
          onClick={handleZoomOut}
          className="px-3 py-1 bg-gray-800 rounded border border-gray-600 hover:bg-gray-800 text-white"
        >
          -
        </button>
        <button 
          onClick={handleReset}
          className="px-3 py-1 bg-gray-800 rounded border border-gray-600 hover:bg-gray-800 text-white"
        >
          Reset
        </button>
        <span className="ml-4 text-sm text-gray-400">
          Zoom: {(zoom * 100).toFixed(0)}% | Pan: Drag with mouse | Scroll: Use mouse wheel | Zoom: Ctrl+Wheel
        </span>
      </div>
      
      {/* Legend moved here */}
      <div className="mb-4 flex flex-wrap gap-4 px-6">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-sm bg-blue-900 border-2 border-blue-500"></div>
          <span className="text-sm text-gray-300">Decision</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-sm bg-green-900 border-2 border-green-500"></div>
          <span className="text-sm text-gray-300">Outcome</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-sm bg-red-900 border-2 border-red-500"></div>
          <span className="text-sm text-gray-300">Ending</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-sm bg-yellow-900 border-2 border-yellow-500"></div>
          <span className="text-sm text-gray-300">Insight</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-sm bg-purple-900 border-2 border-purple-500"></div>
          <span className="text-sm text-gray-300">Event</span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div 
          ref={containerRef}
          className="svg-container md:w-2/3" 
          style={{ 
            width: '100%', 
            height: 'calc(100vh - 250px)', // Adjust height based on other elements
            overflow: 'hidden',
            border: '1px solid #374151',
            borderRadius: '4px',
            cursor: isDragging ? 'grabbing' : 'grab',
            backgroundColor: '#1f2937',
            backgroundImage: `
              radial-gradient(circle, #374151 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            position: 'relative',
            touchAction: 'none' // Disable browser handling of touch gestures
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onContextMenu={handleContextMenu}
        >
          <svg 
            width="100%" 
            height="100%" 
            className="flowchart-svg"
            viewBox={`${pan.x} ${pan.y} ${graphDimensions.width / zoom} ${graphDimensions.height / zoom}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection lines first (behind nodes) */}
            <g>
              {nodes.map((node) => {
                const startPos = nodePositions[node.id];
                if (!startPos) return null;

                return node.nextScenes.map((nextId) => {
                  const endPos = nodePositions[nextId];
                  if (!endPos) return null;

                  // Calculate path using midpoints for smoother curves (optional refinement)
                  // For simplicity, direct line from bottom of source to top of target
                  const startX = startPos.x;
                  const startY = startPos.y + NODE_HEIGHT / 2; // Exit from bottom center
                  const endX = endPos.x;
                  const endY = endPos.y - NODE_HEIGHT / 2; // Enter from top center

                  // Simple straight line path for now, dagre handles layout
                  const pathData = `M ${startX},${startY} L ${endX},${endY}`;

                  return (
                    <path 
                      key={`${node.id}-${nextId}`} 
                      d={pathData}
                      stroke="rgba(96, 165, 250, 0.6)"
                      strokeWidth={selectedNode === node.id || selectedNode === nextId ? "4" : "2.5"} // Highlight connected edges
                      fill="none"
                      markerEnd="url(#arrowhead)"
                      style={{ transition: 'stroke-width 0.2s ease' }}
                    />
                  );
                });
              })}
            </g>
            
            {/* Nodes on top of connections */}
            {nodes.map((node) => {
              if (!nodePositions[node.id]) return null;
              
              // Get node positions
              const x = nodePositions[node.id].x;
              const y = nodePositions[node.id].y;
              
              // Box color based on node type
              let boxColor = "rgb(31, 41, 55)"; // Default dark gray
              let borderColor = "rgb(75, 85, 99)"; // Default gray border
              let glowColor = "rgba(75, 85, 99, 0.4)"; // Default glow
              
              switch (node.type) {
                case 'decision':
                  boxColor = "rgb(26, 32, 81)"; // Dark blue
                  borderColor = "rgb(59, 130, 246)";
                  glowColor = "rgba(59, 130, 246, 0.3)";
                  break;
                case 'outcome':
                  boxColor = "rgb(27, 54, 37)"; // Dark green
                  borderColor = "rgb(34, 197, 94)";
                  glowColor = "rgba(34, 197, 94, 0.3)";
                  break;
                case 'ending':
                  boxColor = "rgb(69, 10, 10)"; // Dark red
                  borderColor = "rgb(220, 38, 38)";
                  glowColor = "rgba(220, 38, 38, 0.3)";
                  break;
                case 'insight':
                  boxColor = "rgb(66, 52, 0)"; // Dark yellow
                  borderColor = "rgb(234, 179, 8)";
                  glowColor = "rgba(234, 179, 8, 0.3)";
                  break;
                case 'event':
                  boxColor = "rgb(48, 35, 64)"; // Dark purple
                  borderColor = "rgb(168, 85, 247)";
                  glowColor = "rgba(168, 85, 247, 0.3)";
                  break;
              }
              
              const isSelected = selectedNode === node.id;
              const isHovered = hoveredNode === node.id;
              
              // Define node dimensions (slightly more compact)
              const nodeWidth = NODE_WIDTH; // Use constant
              const nodeHeight = NODE_HEIGHT; // Use constant
              
              return (
                <g key={node.id} className="node-group">
                  {/* Glow effect */}
                  <rect 
                    x={x - nodeWidth/2 - 10} 
                    y={y - nodeHeight/2 - 10} 
                    width={nodeWidth + 20} 
                    height={nodeHeight + 20} 
                    rx="10" 
                    ry="10"
                    fill={glowColor}
                    style={{ 
                      display: isSelected || isHovered ? 'block' : 'none',
                      filter: 'blur(15px)'
                    }}
                  />
                  
                  {/* Node box */}
                  <rect 
                    x={x - nodeWidth/2} 
                    y={y - nodeHeight/2} 
                    width={nodeWidth} 
                    height={nodeHeight} 
                    rx="8" 
                    ry="8"
                    fill={boxColor}
                    stroke={borderColor}
                    strokeWidth={isSelected ? "4" : isHovered ? "3" : "2"}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={(e) => handleNodeClick(node.id, e)}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'stroke-width 0.2s ease',
                      filter: isSelected ? 'brightness(1.2)' : 'none'
                    }}
                  />
                  
                  {/* Node content using foreignObject for text wrapping */}
                  <foreignObject 
                    x={x - nodeWidth/2 + 10} // Recenter after removing icon
                    y={y - nodeHeight/2 + 10} // Add padding top
                    width={nodeWidth - 20} // Use more width now icon is gone
                    height={nodeHeight - 20} // Adjust height for padding
                  >
                    <div 
                      className="flex flex-col h-full justify-center text-center"
                      style={{ lineHeight: '1.2' }} // Improve line spacing
                    >
                      <div 
                        className="text-white font-semibold text-base leading-tight overflow-hidden text-ellipsis"
                        style={{ wordWrap: 'break-word', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }} // Allow max 2 lines
                      >
                        {node.title}
                      </div>
                      <div className="text-gray-300 text-xs uppercase font-medium mt-1">
                        {node.type} {/* Capitalize type */}
                      </div>
                    </div>
                  </foreignObject>
                  
                  {/* Choices popup on hover */}
                  {hoveredNode === node.id && node.choices && (
                    <foreignObject x={x + nodeWidth/2 + 15} y={y - nodeHeight/2} width="250" height="auto">
                      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700 text-xs text-gray-200">
                        <h4 className="font-bold mb-2 text-blue-300">Choices:</h4>
                        <ul className="list-none pl-0 space-y-1">
                          {node.choices.map((choice, idx) => (
                            <li key={idx} className="mb-1">
                              {choice.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}
            
            {/* Arrow marker definition */}
            <defs>
              <marker 
                id="arrowhead" 
                markerWidth="10" 
                markerHeight="7" 
                refX="9" 
                refY="3.5" 
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(96, 165, 250, 0.8)" />
              </marker>
              
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
            
          {/* Mini-map */}
          <div 
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '150px',
              height: '100px',
              background: 'rgba(17, 24, 39, 0.7)',
              border: '1px solid #4B5563',
              borderRadius: '4px',
              overflow: 'hidden',
              display: graphDimensions.width > 0 ? 'block' : 'none' // Show minimap if graph has dimensions
            }}
          >
            <div style={{
              position: 'absolute',
              top: '3px',
              left: '3px',
              right: '3px',
              bottom: '3px',
              border: '1px solid #6B7280',
              borderRadius: '2px',
              pointerEvents: 'none'
            }}>
              <div 
                style={{
                  position: 'absolute',
                  border: '1px solid #60A5FA',
                  borderRadius: '2px',
                  width: `${Math.min(100, 100 * (graphDimensions.width / zoom) / graphDimensions.width)}%`,
                  height: `${Math.min(100, 100 * (graphDimensions.height / zoom) / graphDimensions.height)}%`,
                  left: `${Math.max(0, Math.min(100, 100 * pan.x / graphDimensions.width))}%`,
                  top: `${Math.max(0, Math.min(100, 100 * pan.y / graphDimensions.height))}%`,
                  backgroundColor: 'rgba(96, 165, 250, 0.1)',
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          {selectedSceneData ? (
            <div className="bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-700 text-gray-200 h-full overflow-y-auto">
              <h3 className="text-xl font-bold mb-3 text-white">{selectedSceneData.title}</h3>
              <div className="text-sm mb-4 py-1 px-3 inline-block rounded-full bg-gray-800">
                {selectedSceneData.type.charAt(0).toUpperCase() + selectedSceneData.type.slice(1)} Scene
              </div>
              <p className="mb-4 text-sm leading-relaxed">{selectedSceneData.description}</p>
              
              {'choices' in selectedSceneData && (
                <div className="mb-5 bg-gray-900 p-4 rounded-md">
                  <h4 className="font-bold mb-3 text-blue-300 flex items-center">
                    <span className="mr-2">🔄</span> Choices:
                  </h4>
                  <ul className="list-disc pl-5 space-y-3">
                    {selectedSceneData.choices.map((choice, idx) => (
                      <li key={idx} className="text-sm">
                        <div className="font-medium">{choice.text}</div>
                        {choice.score !== undefined && (
                          <div className="text-xs text-gray-400 mt-1 flex items-center">
                            <span className="mr-1">Score:</span>
                            <div className="w-full max-w-[100px] bg-gray-700 h-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full bg-blue-500" 
                                style={{width: `${choice.score}%`}}
                              ></div>
                            </div>
                            <span className="ml-2">{choice.score}/100</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {'outcome' in selectedSceneData && selectedSceneData.outcome && (
                <div className="mb-5 bg-gray-900 p-4 rounded-md">
                  <h4 className="font-bold mb-3 text-green-300 flex items-center">
                    <span className="mr-2">📈</span> Outcomes:
                  </h4>
                  <ul className="list-disc pl-5 text-sm space-y-2">
                    {selectedSceneData.outcome.cashChange !== undefined && (
                      <li className="flex items-center">
                        <span className="mr-2">💰</span>
                        Cash: {typeof selectedSceneData.outcome.cashChange === 'number' 
                          ? `${selectedSceneData.outcome.cashChange > 0 ? '+' : ''}$${selectedSceneData.outcome.cashChange}` 
                          : selectedSceneData.outcome.cashChange}
                      </li>
                    )}
                    {selectedSceneData.outcome.debtChange !== undefined && (
                      <li className="flex items-center">
                        <span className="mr-2">💳</span>
                        Debt: {typeof selectedSceneData.outcome.debtChange === 'number' 
                          ? `${selectedSceneData.outcome.debtChange > 0 ? '+' : ''}$${selectedSceneData.outcome.debtChange}` 
                          : selectedSceneData.outcome.debtChange}
                      </li>
                    )}
                    {selectedSceneData.outcome.incomeChange !== undefined && (
                      <li className="flex items-center">
                        <span className="mr-2">💵</span>
                        Income: {typeof selectedSceneData.outcome.incomeChange === 'number' 
                          ? `${selectedSceneData.outcome.incomeChange > 0 ? '+' : ''}$${selectedSceneData.outcome.incomeChange}` 
                          : selectedSceneData.outcome.incomeChange}
                      </li>
                    )}
                    {selectedSceneData.outcome.wellBeingChange !== undefined && (
                      <li className="flex items-center">
                        <span className="mr-2">😊</span>
                        Well-being: {selectedSceneData.outcome.wellBeingChange > 0 ? '+' : ''}{selectedSceneData.outcome.wellBeingChange}
                      </li>
                    )}
                    {selectedSceneData.outcome.ageChange !== undefined && (
                      <li className="flex items-center">
                        <span className="mr-2">🕰️</span>
                        Age: +{selectedSceneData.outcome.ageChange} {selectedSceneData.outcome.ageChange === 1 ? 'year' : 'years'}
                      </li>
                    )}
                    {selectedSceneData.outcome.qualitativeNote && (
                      <li className="mt-3 italic border-l-2 border-green-500 pl-3 py-1">
                        {selectedSceneData.outcome.qualitativeNote}
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {'realWorldExample' in selectedSceneData && selectedSceneData.realWorldExample && (
                <div className="mb-4 p-4 bg-blue-900/30 rounded-md text-sm border-l-4 border-blue-500">
                  <h4 className="font-bold mb-2 text-blue-300 flex items-center">
                    <span className="mr-2">🌎</span> Real World Example:
                  </h4>
                  <p className="italic">{selectedSceneData.realWorldExample}</p>
                </div>
              )}
              
              <button 
                className="text-sm bg-gray-800 px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-800 mt-3 text-white transition-colors"
                onClick={() => setSelectedNode(null)}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-700 text-center text-gray-400 h-full flex flex-col justify-center items-center">
              <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="mt-2">Click on a node to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 