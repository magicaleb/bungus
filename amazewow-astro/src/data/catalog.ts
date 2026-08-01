export interface Thought {
  title: string;
  category: string;
  cue: string;
}

const groups: Array<[string, string, string[]]> = [
  ['Objects', 'something made, held, or used', [
    'Anchor','Backpack','Bell','Binoculars','Bottle','Camera','Candle','Compass',
    'Envelope','Flashlight','Glasses','Hammer','Hourglass','Key','Lantern','Magnet',
    'Map','Mirror','Needle','Notebook','Padlock','Paintbrush','Pocket Watch','Scissors',
    'Suitcase','Telescope','Thermometer','Umbrella','Violin','Wallet','Whistle','Zipper'
  ]],
  ['Places', 'a location you could imagine entering', [
    'Airport','Aquarium','Attic','Bakery','Bridge','Cabin','Carnival','Castle',
    'Cave','Cinema','Desert','Forest','Garden','Harbor','Hospital','Hotel',
    'Island','Library','Lighthouse','Market','Museum','Observatory','Palace','Playground',
    'Restaurant','Stadium','Station','Temple','Theater','Tunnel','Waterfall','Workshop'
  ]],
  ['Animals', 'a living creature', [
    'Alligator','Bat','Bear','Butterfly','Camel','Cat','Chameleon','Crow',
    'Dolphin','Eagle','Elephant','Fox','Frog','Giraffe','Hedgehog','Horse',
    'Jellyfish','Kangaroo','Lion','Octopus','Owl','Panda','Parrot','Penguin',
    'Rabbit','Raven','Shark','Snake','Spider','Tiger','Turtle','Wolf'
  ]],
  ['Food', 'something with a taste or aroma', [
    'Apple','Bagel','Brownie','Burger','Cheesecake','Cherry','Chocolate','Cinnamon',
    'Coffee','Cookie','Cupcake','Donut','Garlic','Honey','Ice Cream','Lemon',
    'Mango','Marshmallow','Noodles','Orange','Pancake','Peach','Pepper','Pickle',
    'Pizza','Popcorn','Pretzel','Pumpkin','Strawberry','Sushi','Taco','Watermelon'
  ]],
  ['Nature', 'something from the natural world', [
    'Aurora','Boulder','Canyon','Cloud','Coral','Crater','Crystal','Dewdrop',
    'Earthquake','Ember','Feather','Fossil','Galaxy','Glacier','Lightning','Meteor',
    'Moon','Mountain','Ocean','Planet','Rainbow','River','Shell','Snowflake',
    'Star','Storm','Sunflower','Thunder','Tornado','Volcano','Wave','Wildfire'
  ]],
  ['People', 'a person, role, or character', [
    'Astronaut','Baker','Captain','Chef','Detective','Doctor','Explorer','Farmer',
    'Firefighter','Gardener','Inventor','Judge','Librarian','Magician','Musician','Nurse',
    'Painter','Photographer','Pilot','Pirate','Poet','Professor','Robot','Sailor',
    'Scientist','Singer','Spy','Teacher','Traveler','Vampire','Wizard','Writer'
  ]],
  ['Symbols', 'an image, sign, or idea', [
    'Arrow','Crown','Diamond','Doorway','Eye','Fingerprint','Flame','Footprint',
    'Infinity','Labyrinth','Lightning Bolt','Mask','Maze','Moon Phase','Question Mark','Ribbon',
    'Ring','Rose','Shadow','Shield','Spiral','Staircase','Starburst','Sun',
    'Sword','Target','Triangle','Waveform','Wheel','Window','Wings','Yin Yang'
  ]],
  ['Moments', 'an action, feeling, or memory', [
    'Applause','Birthday','Camping','Dancing','Déjà Vu','Dreaming','Falling','Fireworks',
    'First Kiss','Flying','Graduation','Hiding','Laughing','Lost Luggage','Midnight','Opening a Gift',
    'Rainy Day','Road Trip','Roller Coaster','Running','Secret','Singing','Snow Day','Sunrise',
    'Swimming','Thunderstorm','Treasure Hunt','Waiting','Wedding','Whisper','Winning','Wishing'
  ]]
];

export const catalog: Thought[] = groups.flatMap(([category, cue, titles]) =>
  titles.map((title) => ({ title, category, cue }))
);
