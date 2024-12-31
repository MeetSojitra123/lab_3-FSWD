const os = require('os');
const fs = require('fs');
const path = require('path');

// Function to get system information
function getSystemInfo() {
  return {
    OS: os.type(),
    TotalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
    FreeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
    CPU: os.cpus().map((cpu, index) => ({
      Core: index + 1,
      Model: cpu.model,
      Speed: `${cpu.speed} MHz`
    }))
  };
}

// Function to save system information to a log file
function saveSystemInfoToFile(systemInfo) {
  const logDir = path.join(__dirname, 'logs');
  const logFilePath = path.join(logDir, 'system-info.txt');

  // Ensure the logs directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Format the system information
  const formattedInfo = `
System Information:
====================
Operating System: ${systemInfo.OS}
Total Memory: ${systemInfo.TotalMemory}
Free Memory: ${systemInfo.FreeMemory}
CPU Details:
${systemInfo.CPU.map(cpu => `Core ${cpu.Core}: ${cpu.Model} @ ${cpu.Speed}`).join('\n')}
  `;

  // Write the information to the file
  fs.writeFileSync(logFilePath, formattedInfo.trim());

  console.log(`System information saved to: ${logFilePath}`);
}

// Main execution
const systemInfo = getSystemInfo();
console.log(systemInfo);
saveSystemInfoToFile(systemInfo);
