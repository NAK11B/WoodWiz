📱 WoodWiz — Bark-Based Wood Identification App (Proof of Concept)

WoodWiz is a mobile proof-of-concept application designed to demonstrate the technical feasibility of a bark-based wood species identification tool. The project is being developed as part of Project & Portfolio IV and serves as the foundation for a larger final application.

This repository contains the code-only academic version of the project for evaluation purposes.

🎯 Project Goal

The goal of WoodWiz is to provide a simple, fast, and field-friendly experience where a user can:

Select or capture an image of tree bark

Submit the image

Receive structured information about the identified wood species

The user experience is intentionally minimal to prioritize usability outdoors and reduce unnecessary complexity.

🧠 Technologies Used

This project currently uses the following technologies, all of which are demonstrated in the working prototype:

Expo – Cross-platform development environment

React Native – Mobile UI framework

TypeScript – Strongly typed structure for maintainability

Expo ImagePicker API – Camera and gallery image selection

JSON Dataset – Structured species data converted from research spreadsheets

State-driven UI – Dynamic rendering of results based on user input

✅ Current Features (Proof of Concept)

The current build demonstrates real functionality, not mockups.

Image selection from camera or gallery

Live image preview after selection

Submission flow for processing user input

Dynamic results screen populated from structured dataset

Expandable "Show More / Show Less" result sections

Functional state changes and UI feedback

Real dataset integrated into the app (JSON)

This confirms that all core technologies required for the final project work together meaningfully.

📂 Project Structure Overview

app/ – Main application screens and routing

components/ – Reusable UI components

data/ – JSON dataset and structured data logic

hooks/ – Custom hooks for theme/state handling

constants/ – App-wide configuration values

scripts/ – Project utility scripts

📌 Development Status

This repository represents the Proof of Concept milestone.

Planned future development includes:

Improved matching logic

Machine learning model integration

Offline caching

Performance optimizations

UI refinement

App branding and deployment builds

All development planning, documentation artifacts, and research are tracked in Trello.

📋 Project Management

Development planning, artifacts, and roadmap are maintained using Trello to demonstrate structured workflow and documentation.

Trello includes:

Feature planning

Technologies used

Research references

Prior assignment artifacts

UX decisions

Problems solved during development

📎 Notes

Large binary datasets (such as bark image libraries) are intentionally excluded from this repository to keep the project lightweight and focused on code evaluation. These assets are maintained locally for development.