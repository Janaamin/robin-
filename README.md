# Robin

Robin is a React Native Expo app designed to record and identify bird sounds. It captures bird sounds, sends the data to a backend for processing, and identifies the bird based on the sound.

## Features

- **Record Bird Sounds**: Capture audio to detect bird sounds.
- **Bird Identification**: Send the recorded sound to the backend for identification.
- **Bird Data Retrieval**: Retrieve bird detection data, including historical and recent records.

## API Endpoints

The app integrates with the following API endpoints:

| Endpoint           | Method | Purpose                                         |
|--------------------|--------|-------------------------------------------------|
| `/birds`           | POST   | Send detected bird data to the backend          |
| `/birds`           | GET    | Retrieve all bird detection records             |
| `/birds/latest`    | GET    | Retrieve the most recent bird detection         |
| `/birds/:date`     | GET    | Retrieve bird detections for a specific date    |

## Technologies Used

- **React Native** and **Expo** for building the mobile application.
- **Backend Server** (assumed to be running on the specified base URL) for processing and identifying bird sounds.

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/) (if not already installed).
- Install [Yarn](https://classic.yarnpkg.com/en/docs/install/) for dependency management.

### Installation
 1. Unzip the folder.
 2. open in vs code and run "yarn"
 3. run : npx expo start
 4. download the expo go app from play store or ios store
 5. Scan the qr code and test the app in expo go


### Note
 In the (tab)/index file:
 All the endpoints returns a response which is currently send to console. 
 Check the console and then revise the code and set the incoming data in the birdData state.
