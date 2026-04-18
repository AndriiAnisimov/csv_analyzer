
# CSV Analyzer (Full Stack Test Task)

## Overview
This project is a simple full-stack application that allows users to upload CSV files, process them, and visualize basic statistics.

## Tech Stack
- Frontend: Next.js
- Backend: Django (REST) API
- Data: pandas (CSV Processing Service)

## Architecture
Frontend:
- Handles file upload
- Displays processing states
- Renders chart (Recharts)

Backend:
- Validates CSV
- Computes statistics
- Returns structured data

Flow:
Client → Upload CSV → Backend → Process → Return stats + data → Render chart

## Trade-offs
- Used synchronous processing instead of Celery for simplicity
- Used pandas for fast aggregation
- Simulated async flow on frontend

## Features
- CSV upload
- Validation of file structure
- Statistical analysis (mean, median, min, max)
- Error handling
- Basic UI feedback

## Edge Cases
- Empty CSV
- Missing columns
- Non-numeric values
- Large files

## Setup

### Backend
```bash
 cd backend
 pip install django djangorestframework pandas django-cors-headers
 python manage.py runserver
```

### Frontend
```bash
 cd frontend
 npm install
 npm run dev
```

## Notes
- Designed with simplicity and clarity in mind
- Focus on clean architecture and separation of concerns

## Figma
https://www.figma.com/design/t1cgjs85RdlZcFjkPKGjBO/CSV-Analyzer?node-id=0-1&t=pqS6XZLCtEMhYKhK-1
