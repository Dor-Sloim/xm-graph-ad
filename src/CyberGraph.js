import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3';
import SearchBar from './SearchBar';
import UserInfo from './UserInfo';
import NestedMembers from './NestedMembers';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';


const CyberGraph = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeInfo, setNodeInfo] = useState(null);
  const [members, setNodeNestedMembers] = useState(null);
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const fgRef = useRef();

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsGroupMode(!isGroupMode);
      setIsButtonClicked(false);
    }, 500); // Match this with the animation duration
  };

  const GetDirectMembers = (node, type) => {
    const members = data.links
      .filter(link => link.source === node.id || (typeof link.source === 'object' && link.source.id === node.id))
      .map(link => {
        const userId = typeof link.target === 'string' ? link.target : link.target.id;
        return data.nodes.find(n => n.id === userId && n.type === type);
      })
      .filter(Boolean);
    
    return members
  }

  const ResolveGroupMembers = (node, group_path=[]) => {
    if(!node) {
      return 
    }

    const path = group_path.slice();
    const groups = GetDirectMembers(node, 'group').slice()
    const users = GetDirectMembers(node, 'user')

    for (let i = 0; groups.length > i; i++) {
      // avoid loops
      if (group_path.includes(groups[i])) {
        continue;
      }
      group_path.push(groups[i]);
      groups[i].members = ResolveGroupMembers(groups[i], group_path.slice());
    }

    const result = {users: users, groups: groups, path: path}

    return result 
  }

  const graphData = useMemo(() => {
    if (isGroupMode) {
      const groupNodes = data.nodes.filter(node => node.type === 'group');
      const groupLinks = data.links.filter(link => {
        const sourceIsGroup = groupNodes.some(n => n.id === (typeof link.source === 'object' ? link.source.id : link.source));
        const targetIsGroup = groupNodes.some(n => n.id === (typeof link.target === 'object' ? link.target.id : link.target));
        return sourceIsGroup && targetIsGroup;
      });
      return { nodes: groupNodes, links: groupLinks };
    }
    return data;
  }, [data, isGroupMode]);

  useEffect(() => {
    const fg = fgRef.current;
    fg.d3Force('link').distance(50).strength(1);
    fg.d3Force('charge').strength(-300);
    fg.d3Force('collide', d3.forceCollide(30));
    fg.d3Force('y', d3.forceY().strength(0.1));

    fg.centerAt(0, 0);
    fg.zoom(0.8);
  }, []);

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    if (node.type === "user") {
      return
    }
    if (node.type === "group") {
      setNodeNestedMembers(ResolveGroupMembers(node))
    }
  };

  const handleClear = () => {
    setSelectedNode(null);
    setNodeInfo(null);
  };

  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12/globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
  
    ctx.fillStyle = node.id === selectedNode?.id ? '#ff0000' : node.color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
    ctx.fill();
  
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
  
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, node.x, node.y);
  
    if (node.type === 'group' && node.userCount > 0) {
      const countLabel = `(${node.userCount})`;
      const countWidth = ctx.measureText(countLabel).width;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(node.x - countWidth / 2, node.y + fontSize, countWidth, fontSize);
      ctx.fillStyle = '#00ff00';
      ctx.fillText(countLabel, node.x, node.y + fontSize * 1.5);
    }
  }, [selectedNode]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10,
       zIndex: 1000,display: 'flex', 
      justifyContent: 'center'  }}>
      <button 
          className={`cyber-button ${isButtonClicked ? 'clicked' : ''}`}
          onClick={handleButtonClick}
          style={{
            padding: '6px 12px',  // Reduced padding
            fontSize: '12px',      // Smaller font
            letterSpacing: '1px'   // Slightly tighter letter spacing
          }}
        >
          {isGroupMode ? 'Show Full Graph' : 'Show Groups Only'}
        </button>
      </div>
      <SearchBar 
        items={graphData.nodes}
        onSelect={handleNodeSelect}
        onClear={handleClear}
        placeholder={isGroupMode ? "Search groups" : "Search users or groups"}
      />
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => 'replace'}
        linkColor={() => 'rgba(255, 255, 255, 0.2)'}
        linkWidth={1}
        backgroundColor="#000011"
        d3VelocityDecay={0.3}
        onNodeClick={handleNodeSelect}
      />
      {members && selectedNode &&
        <NestedMembers props={ {selectedNode, members} } />
        }
      {/*
      {nodeInfo && <UserInfo nodeInfo={nodeInfo} />}
      */}
    </div>
  );
};

export default CyberGraph;
