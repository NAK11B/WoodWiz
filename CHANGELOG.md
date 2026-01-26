# WoodWiz Changelog

All notable changes to this project are documented in this file.

---

## v1.0 – Missouri Dataset Prototype (January 2026)

### Added
- Fully functional bark-based identification workflow
- Camera capture and gallery image selection
- Live image preview and submit flow
- Dynamic results card populated from structured dataset
- Expandable "Show More / Show Less" details section
- Alternate match display with confidence visualization
- Custom typography integration (Cinzel for headers, Montserrat for body)
- Dataset transparency displayed in UI (Missouri v1.0 – 54 species, 260 images)
- Invalid image detection with user-friendly feedback

### Dataset
- Scope intentionally reduced to Missouri tree species
- Approximately 54 species included
- Personally curated dataset for higher real-world accuracy
- Bark images collected and indexed locally
- Dataset maintained in Excel → converted to JSON for app use

### Technical
- Expo + React Native + TypeScript architecture
- Custom bark feature extraction and matcher logic
- JSON-based dataset integration
- Utility scripts for image indexing and dataset building
- GitHub version control with multi-day commit history
- Trello board used for planning and documentation artifacts

### Notes
This version represents a functional proof-of-concept built for academic evaluation (Project & Portfolio IV).  
The focus of this milestone is usability, feasibility, and real working functionality rather than feature completeness.

---

Future versions will expand on:
- Image quality validation (blur/brightness scoring)
- Improved matching accuracy
- Dataset expansion
- Performance improvements
- Offline optimizations
- Portfolio-ready builds
