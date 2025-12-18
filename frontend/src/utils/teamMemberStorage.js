// IndexedDB wrapper for persistent team member image storage
const DB_NAME = 'GreetinsDB';
const STORE_NAME = 'teamMembers';
const DB_VERSION = 1;

let db = null;

// Initialize IndexedDB
export const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB open error:', request.error);
        reject(request.error);
      };
      
      request.onsuccess = () => {
        db = request.result;
        console.log('IndexedDB initialized successfully');
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        try {
          const idb = event.target.result;
          if (!idb.objectStoreNames.contains(STORE_NAME)) {
            idb.createObjectStore(STORE_NAME, { keyPath: 'id' });
            console.log('Object store created:', STORE_NAME);
          }
        } catch (error) {
          console.error('Error in onupgradeneeded:', error);
          reject(error);
        }
      };
    } catch (error) {
      console.error('Error opening IndexedDB:', error);
      reject(error);
    }
  });
};

// Save team member with image to IndexedDB
export const saveTeamMemberImage = async (id, imageData) => {
  try {
    if (!id || !imageData) {
      throw new Error('Missing required parameters: id and imageData');
    }

    // Check image data size
    const imageSizeInMB = new Blob([imageData]).size / (1024 * 1024);
    console.log(`Image size for ${id}: ${imageSizeInMB.toFixed(2)} MB`);
    
    if (imageSizeInMB > 10) {
      throw new Error(`Image too large: ${imageSizeInMB.toFixed(2)} MB (max 10 MB)`);
    }

    const database = await initDB();
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = database.transaction([STORE_NAME], 'readwrite');
        
        transaction.onerror = () => {
          console.error('Transaction error:', transaction.error);
          reject(new Error(`Transaction failed: ${transaction.error}`));
        };
        
        transaction.onabort = () => {
          console.error('Transaction aborted');
          reject(new Error('Transaction was aborted'));
        };

        const store = transaction.objectStore(STORE_NAME);
        const request = store.put({
          id: id,
          imageData: imageData,
          timestamp: new Date().getTime(),
        });

        request.onerror = () => {
          console.error('Put request error:', request.error);
          reject(new Error(`Failed to save image: ${request.error}`));
        };
        
        request.onsuccess = () => {
          console.log('Image saved successfully for id:', id);
          resolve(request.result);
        };
      } catch (error) {
        console.error('Error in transaction:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error saving team member image:', error);
    throw error;
  }
};

// Get team member image from IndexedDB
export const getTeamMemberImage = async (id) => {
  try {
    const database = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onerror = () => {
        console.error(`Failed to retrieve image for ${id}:`, request.error);
        reject(request.error);
      };
      request.onsuccess = () => {
        if (request.result && request.result.imageData) {
          // Validate that the image data is a valid data URL or URL
          if (typeof request.result.imageData === 'string' && 
              (request.result.imageData.startsWith('data:') || request.result.imageData.startsWith('http'))) {
            resolve(request.result.imageData);
          } else {
            console.warn(`Invalid image data format for ${id}`);
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };
    });
  } catch (error) {
    console.error(`Error getting image for ${id}:`, error);
    return null;
  }
};

// Delete team member image from IndexedDB
export const deleteTeamMemberImage = async (id) => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Get all team member images
export const getAllTeamMemberImages = async () => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = {};
      request.result.forEach((item) => {
        result[item.id] = item.imageData;
      });
      resolve(result);
    };
  });
};

// Save team members data to localStorage (without images)
export const saveTeamMembersData = (members) => {
  const dataToSave = members.map((member) => ({
    id: member.id || `member_${Date.now()}_${Math.random()}`,
    name: member.name,
    role: member.role,
    description: member.description,
    color: member.color,
  }));
  localStorage.setItem('teamMembers', JSON.stringify(dataToSave));
  return dataToSave;
};

// Load team members data from localStorage
export const loadTeamMembersData = () => {
  const saved = localStorage.getItem('teamMembers');
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
};

// Delete all data (both localStorage and IndexedDB)
export const clearAllTeamData = async () => {
  localStorage.removeItem('teamMembers');
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};
