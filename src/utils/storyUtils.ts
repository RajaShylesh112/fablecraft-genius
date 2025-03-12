
// Example story genres and themes for the generator
export const storyParameters = [
  {
    id: 'genre',
    name: 'Genre',
    options: [
      { id: 'fantasy', label: 'Fantasy' },
      { id: 'scifi', label: 'Sci-Fi' },
      { id: 'mystery', label: 'Mystery' },
      { id: 'romance', label: 'Romance' },
      { id: 'horror', label: 'Horror' },
      { id: 'adventure', label: 'Adventure' },
    ],
  },
  {
    id: 'length',
    name: 'Length',
    options: [
      { id: 'short', label: 'Short' },
      { id: 'medium', label: 'Medium' },
      { id: 'long', label: 'Long' },
    ],
  },
  {
    id: 'tone',
    name: 'Tone',
    options: [
      { id: 'lighthearted', label: 'Lighthearted' },
      { id: 'serious', label: 'Serious' },
      { id: 'dark', label: 'Dark' },
      { id: 'humorous', label: 'Humorous' },
    ],
  },
  {
    id: 'setting',
    name: 'Setting',
    options: [
      { id: 'medieval', label: 'Medieval' },
      { id: 'futuristic', label: 'Futuristic' },
      { id: 'contemporary', label: 'Contemporary' },
      { id: 'dystopian', label: 'Dystopian' },
      { id: 'historical', label: 'Historical' },
    ],
  },
];

// Example story titles to choose from
const storyTitles: Record<string, string[]> = {
  fantasy: [
    'The Crystal Shard',
    'Whispers of the Ancient Forest',
    'The Dragon\'s Promise',
    'Echoes of a Forgotten Realm',
    'The Sorcerer\'s Apprentice',
  ],
  scifi: [
    'Beyond the Event Horizon',
    'Neural Drift',
    'The Last Quantum',
    'Starship Endeavor',
    'Signals from the Void',
  ],
  mystery: [
    'The Vanishing at Blackwood Manor',
    'Secrets in the Attic',
    'The Missing Heirloom',
    'Whispers in the Dark',
    'The Detective\'s Last Case',
  ],
  romance: [
    'Love Under the Parisian Sky',
    'When Stars Align',
    'The Letter from Yesterday',
    'Autumn\'s Embrace',
    'Chance Encounters',
  ],
  horror: [
    'The Shadows Within',
    'Whispers in the Walls',
    'The Abandoned Lighthouse',
    'Midnight Visitors',
    'The Thing in the Basement',
  ],
  adventure: [
    'The Lost City of Gold',
    'Journey to the Center',
    'The Mountain\'s Secret',
    'Explorers of the Unknown',
    'The Hidden Treasure Map',
  ],
};

// Example story beginnings
const storyBeginnings: Record<string, string[]> = {
  fantasy: [
    'In a realm where magic flowed like water through the streams, there lived a young apprentice with an unusual gift.',
    'The ancient prophecy spoke of a child born under the twin moons, destined to restore balance to the fractured kingdom.',
    'The dragon\'s egg lay hidden for centuries, until a curious shepherd stumbled upon its resting place deep within the mountain cave.',
  ],
  scifi: [
    'The colony ship drifted silently through the void, its inhabitants unaware that they were no longer headed toward their intended destination.',
    'Dr. Eliza Chen stared at the readout in disbelief. The quantum fluctuations couldn\'t possibly be natural in origin.',
    'When the first signal from deep space arrived, humanity celebrated. When the second signal came with instructions, everything changed.',
  ],
  mystery: [
    'The old mansion stood at the end of the lane, its windows like vacant eyes staring out at the town that had all but forgotten it existed.',
    'Detective Morgan flipped through the case file one more time, certain there was something everyone else had missed.',
    'The package arrived on Tuesday morning, unmarked and unexpected. Inside was a single key and a note that simply read: "Remember".',
  ],
  // More beginnings for other genres...
};

// Example story middles
const storyMiddles: Record<string, string[]> = {
  fantasy: [
    'As the group ventured deeper into the enchanted forest, the trees seemed to whisper ancient secrets, their branches reaching out like gnarled fingers.',
    'The magical tome revealed its secrets slowly, each page turning on its own as if guided by an invisible hand.',
    'The council of elders debated through the night, unaware that their every word was being listened to by forces that sought to undermine the realm.',
  ],
  // More middles for other genres...
};

// Example story endings
const storyEndings: Record<string, string[]> = {
  fantasy: [
    'And so, as the first light of dawn broke over the mountains, the spell was complete, and peace returned to the land once more.',
    'Though many would tell the tale in years to come, none would ever know the true sacrifice that had been made to save them all.',
    'The magical powers faded from the world, but the memories of what had transpired would live on in legend for generations to come.',
  ],
  // More endings for other genres...
};

// Generate a random title based on genre
export const generateTitle = (genre: string): string => {
  const titles = storyTitles[genre] || storyTitles.fantasy;
  return titles[Math.floor(Math.random() * titles.length)];
};

// Mock function to generate a story (in a real app, this would call an AI API)
export const generateStory = async (
  parameters: Record<string, string>,
  prompt?: string
): Promise<{ title: string; content: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const genre = parameters.genre || 'fantasy';
  const title = generateTitle(genre);
  
  // In a real application, we'd call an AI API here
  // For demo purposes, we'll generate some static content based on parameters
  
  // Example story structure based on parameters
  let content = '';
  
  // Add beginning
  const beginnings = storyBeginnings[genre] || storyBeginnings.fantasy;
  content += beginnings[Math.floor(Math.random() * beginnings.length)] + '\n\n';
  
  // Add middle content based on length
  const length = parameters.length || 'medium';
  const middles = storyMiddles[genre] || storyMiddles.fantasy;
  const paragraphCount = length === 'short' ? 2 : length === 'medium' ? 4 : 7;
  
  for (let i = 0; i < paragraphCount; i++) {
    content += middles[Math.floor(Math.random() * middles.length)] + '\n\n';
  }
  
  // Add ending
  const endings = storyEndings[genre] || storyEndings.fantasy;
  content += endings[Math.floor(Math.random() * endings.length)];
  
  return { title, content };
};
