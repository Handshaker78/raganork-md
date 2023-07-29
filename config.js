const fs = require('fs');
const { Sequelize } = require('sequelize');
const isVPS = !(__dirname.startsWith("/rgnk") || __dirname.startsWith("/skl"));
const isHeroku = __dirname.startsWith("/skl");
const isKoyeb = __dirname.startsWith("/rgnk");
const isRailway = __dirname.startsWith("/railway");
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true', fault2 = 'on') {
  return ((text === fault) || (text === fault2));
}
const settingsMenu = [
  {title: "PM antispam block", env_var: "PM_ANTISPAM"},
  {title: "Auto read all messages", env_var: "READ_MESSAGES"},
  {title: "Auto read command messages", env_var: "READ_COMMAND"},
  {title: "Auto read status updates", env_var: "AUTO_READ_STATUS"},
  {title: "Admin sudo acces mode (group commands only)", env_var: "ADMIN_ACCESS"},
  {title: "With & without handler mode", env_var: "MULTI_HANDLERS"},
  {title: "Auto reject calls", env_var: "REJECT_CALLS"},
  {title: "Always online", env_var: "ALWAYS_ONLINE"},
  {title: "PM Auto blocker", env_var: "PMB_VAR"},
  {title: "Disable bot in PM", env_var: "DIS_PM"}
];

DATABASE_URL = process.env.DATABASE_URL === undefined ? './bot.db' : process.env.DATABASE_URL;
DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);

// Function to handle incoming status updates from bots
function handleStatusUpdate(status) {
  // Auto-read the status update with the specified speed (1 second)
  const speed = process.env.SPEED_SECONDS || 1; // Default speed is 1 second
  setTimeout(() => {
    console.log('Auto-reading status update:', status);
    // Add your logic here to read the status update or take any desired action
  }, speed * 1000); // Convert speed to milliseconds (1 second = 1000 milliseconds)
}

// Function to detect shared links (theoretical questions for this example)
function isLinkShared(message) {
  // Implement your logic here to check if the message contains any links
  // You can use regular expressions or other methods to detect links
  // For example, a simple regex to detect links could be:
  const linkRegex = /(http|https):\/\/\S+/i;
  return linkRegex.test(message);
}

// Function to handle incoming theoretical questions (treated as shared links for this example)
function handleTheoreticalQuestion(groupId, question) {
  // Treat any question as a shared link (theoretical) for this example
  handleLinkShared(groupId, question);
}

// ... Rest of the code ...

module.exports = {
  VERSION: 'v4.0.0',
  ALIVE: process.env.ALIVE || "https://i.imgur.com/KCnoMM2.jpg Hey {sender}, I'm alive \n Uptime: {uptime}",
  BLOCK_CHAT: process.env.BLOCK_CHAT || '',
  PM_ANTISPAM: convertToBool(process.env.PM_ANTISPAM) || '',
  ALWAYS_ONLINE: convertToBool(process.env.ALWAYS_ONLINE) || false,
  MANGLISH_CHATBOT: convertToBool(process.env.MANGLISH_CHATBOT) || false,
  ADMIN_ACCESS: convertToBool(process.env.ADMIN_ACCESS) || false,
  PLATFORM: isHeroku ? "Heroku" : isRailway ? "Railway" : isKoyeb ? "Koyeb" : "Other server",
  isHeroku,
  isKoyeb,
  isVPS,
  isRailway,
  AUTOMUTE_MSG: process.env.AUTOMUTE_MSG || '_Group automuted!_\n_(edit AUTOMUTE_MSG)_',
  // ... Other properties ...

  // Update AUTO_READ_STATUS property to include the SPEED option (1 second)
  AUTO_READ_STATUS: {
    enabled: convertToBool(process.env.AUTO_READ_STATUS) || false,
    SPEED: process.env.SPEED_SECONDS || 1 // Default speed is 1 second
  },

  // ... Other properties ...

  // You can add new properties for handling links and theoretical questions
  handleLinkShared,
  handleTheoreticalQuestion,

  // ... Other functions ...
};
