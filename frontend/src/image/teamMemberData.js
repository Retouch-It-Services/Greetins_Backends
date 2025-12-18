// Team Member Data Storage and Management

export const defaultTeamMembers = [
  {
    id: 1,
    name: 'Team Member 1',
    role: 'Your Role',
    image: 'https://via.placeholder.com/400x400?text=Upload+Image',
    description: 'Add your description here'
  },
  {
    id: 2,
    name: 'Team Member 2',
    role: 'Your Role',
    image: 'https://via.placeholder.com/400x400?text=Upload+Image',
    description: 'Add your description here'
  },
  {
    id: 3,
    name: 'Team Member 3',
    role: 'Your Role',
    image: 'https://via.placeholder.com/400x400?text=Upload+Image',
    description: 'Add your description here'
  }
];

/**
 * Load team members from localStorage
 */
export const loadTeamMembers = () => {
  try {
    const stored = localStorage.getItem('teamMembers');
    return stored ? JSON.parse(stored) : defaultTeamMembers;
  } catch (error) {
    console.error('Error loading team members:', error);
    return defaultTeamMembers;
  }
};

/**
 * Save team members to localStorage
 */
export const saveTeamMembers = (members) => {
  try {
    localStorage.setItem('teamMembers', JSON.stringify(members));
    return true;
  } catch (error) {
    console.error('Error saving team members:', error);
    return false;
  }
};

/**
 * Add new team member
 */
export const addTeamMember = (member) => {
  const members = loadTeamMembers();
  const newMember = {
    id: Math.max(...members.map(m => m.id), 0) + 1,
    ...member
  };
  members.push(newMember);
  saveTeamMembers(members);
  return newMember;
};

/**
 * Update team member
 */
export const updateTeamMember = (id, updates) => {
  const members = loadTeamMembers();
  const index = members.findIndex(m => m.id === id);
  if (index !== -1) {
    members[index] = { ...members[index], ...updates };
    saveTeamMembers(members);
    return members[index];
  }
  return null;
};

/**
 * Delete team member
 */
export const deleteTeamMember = (id) => {
  const members = loadTeamMembers();
  const filtered = members.filter(m => m.id !== id);
  saveTeamMembers(filtered);
  return filtered;
};

/**
 * Reset to default team members
 */
export const resetTeamMembers = () => {
  saveTeamMembers(defaultTeamMembers);
  return defaultTeamMembers;
};
