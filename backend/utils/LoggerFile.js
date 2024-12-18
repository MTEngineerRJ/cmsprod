const fs = require('fs');
const path = require('path');
const util = require('util');

// Function to get current timestamp
const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toISOString();
};

// Function to format log message
const formatLogMessage = ({ timestamp, level, Function,message, username = 'N/A', leadId = 'N/A',consoleInfo="", info = '' }) => {
    const consoleString = `${timestamp} ${Function}[${username},${leadId}] : ${level.toUpperCase()} : {message : "${message}" , info : "${consoleInfo}"}`;
    const writeString =   `${timestamp} ${Function}[${username},${leadId}] : ${level.toUpperCase()} : {message : "${message}" , info : "${info}"}`;

    return {consoleString,writeString}
};

// Function to write log message to file
const writeToLogFile = (logFilePath, logMessage) => {
    fs.appendFile(logFilePath, logMessage + '\n', (err) => {
        if (err) {
            console.error('Failed to write log message to file:', err);
        }
    });
};

// Function to log message with specified level
const logMessage = async ({ type,Function, message, username = 'N/A', leadId = 'N/A',consoleInfo="", info = '' }) => {
    const timestamp = getCurrentTimestamp();
    const {consoleString,writeString} = formatLogMessage({ timestamp, level: type,Function, message, username, leadId,consoleInfo, info });

    // Write to console with colors
    switch (type) {
        case 'info':
            console.log('\x1b[32m%s\x1b[0m', consoleString); // Green color for info
            break;
        case 'warn':
            console.log('\x1b[33m%s\x1b[0m', consoleString); // Yellow color for warn
            break;
        case 'error':
            console.log('\x1b[31m%s\x1b[0m', consoleString); // Red color for error
            break;
        case 'debug':
            console.log('\x1b[34m%s\x1b[0m', consoleString); // Blue color for debug
            break;
        default:
            console.log(consoleString);
    }

    // Write to log file
    const logFilePath = path.resolve(__dirname, '..', 'logging', `${type}.log`);
    writeToLogFile(logFilePath, writeString);
};

module.exports = {
    logMessage
};
