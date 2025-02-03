const generateMockData = () => {
  const users = [
    { id: 'u1', name: 'John Smith', type: 'user' },
    { id: 'u2', name: 'Emma Johnson', type: 'user' },
    { id: 'u3', name: 'Michael Brown', type: 'user' },
    { id: 'u4', name: 'Olivia Davis', type: 'user' },
    { id: 'u5', name: 'William Wilson', type: 'user' },
    { id: 'u6', name: 'Sophia Martinez', type: 'user' },
    { id: 'u7', name: 'James Anderson', type: 'user' },
    { id: 'u8', name: 'Isabella Taylor', type: 'user' },
    { id: 'u9', name: 'Robert Thomas', type: 'user' },
    { id: 'u10', name: 'Ava Garcia', type: 'user' },
    { id: 'u11', name: 'David Rodriguez', type: 'user' },
    { id: 'u12', name: 'Mia Lopez', type: 'user' },
    { id: 'u13', name: 'Joseph Lee', type: 'user' },
    { id: 'u14', name: 'Charlotte Clark', type: 'user' },
    { id: 'u15', name: 'Daniel Walker', type: 'user' },
  ];

  const groups = [
    { id: 'g1', name: 'Executive', type: 'group' },
    { id: 'g2', name: 'HR', type: 'group' },
    { id: 'g3', name: 'IT', type: 'group' },
    { id: 'g4', name: 'Marketing', type: 'group' },
    { id: 'g5', name: 'Sales', type: 'group' },
    { id: 'g6', name: 'Finance', type: 'group' },
    { id: 'g7', name: 'Operations', type: 'group' },
    { id: 'g8', name: 'R&D', type: 'group' },
    { id: 'g9', name: 'Customer Support', type: 'group' },
    { id: 'g10', name: 'Legal', type: 'group' },
    // empty group
    { id: 'g11', name: 'noOne', type: 'group' },
  ];

  const links = [
    { source: 'g1', target: 'g2' },
    { source: 'g1', target: 'g3' },
    { source: 'g1', target: 'g4' },
    { source: 'g1', target: 'g5' },
    { source: 'g1', target: 'g11' },
    { source: 'g2', target: 'u1' },
    { source: 'g2', target: 'u2' },
    { source: 'g3', target: 'u3' },
    { source: 'g3', target: 'u4' },
    { source: 'g3', target: 'u5' },
    { source: 'g4', target: 'u6' },
    { source: 'g4', target: 'u7' },
    { source: 'g5', target: 'u8' },
    { source: 'g5', target: 'u9' },
    { source: 'g5', target: 'u10' },
    { source: 'g6', target: 'u11' },
    { source: 'g7', target: 'u12' },
    { source: 'g8', target: 'u13' },
    { source: 'g9', target: 'u14' },
    { source: 'g10', target: 'u15' },
    // Users in multiple groups
    { source: 'g1', target: 'u1' },
    { source: 'g3', target: 'u1' },
    { source: 'g4', target: 'u2' },
    { source: 'g5', target: 'u2' },
    { source: 'g6', target: 'u3' },
    { source: 'g7', target: 'u3' },
    { source: 'g8', target: 'u4' },
    { source: 'g9', target: 'u4' },
    { source: 'g10', target: 'u5' },
    { source: 'g1', target: 'u5' },
    // L3 nested
    { source: 'g5', target: 'g4' },
    // With loop
    { source: 'g4', target: 'g5' },
  ];

  // Calculate user counts for each group
  const userCounts = links.reduce((counts, link) => {
    if (link.source.startsWith('g') && link.target.startsWith('u')) {
      counts[link.source] = (counts[link.source] || 0) + 1;
    }
    return counts;
  }, {});

  const nodes = [...groups, ...users].map(node => ({
    ...node,
    color: node.type === 'user' ? '#00ffff' : '#ff00ff',
    userCount: node.type === 'group' ? (userCounts[node.id] || 0) : 0
  }));

  return { nodes, links };
};

export default generateMockData;
