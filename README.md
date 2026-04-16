
# CSV Analyzer (Full Stack Test Task)

## Overview
This project is a simple full-stack application that allows users to upload CSV files, process them, and visualize basic statistics.

## Tech Stack
- Frontend: Next.js (React)
- Backend: Django + DRF
- Data processing: pandas

## Features
- CSV upload
- Validation of file structure
- Statistical analysis (mean, median, min, max)
- Error handling
- Basic UI feedback

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

## API Contract
POST /api/upload/

Response:
{
  "stats": {...},
  "data": [...]
}

## Notes
- Designed with simplicity and clarity in mind
- Focus on clean architecture and separation of concerns
