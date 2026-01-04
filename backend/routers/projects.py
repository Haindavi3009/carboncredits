from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
import uuid

router = APIRouter(prefix="/projects", tags=["projects"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    # simplified: getting first user as owner for demo
    owner = db.query(models.User).first()
    if not owner:
        # Create a dummy user if none exists
        owner = models.User(email="demo@example.com", role=models.UserRole.PROJECT_OWNER)
        db.add(owner)
        db.commit()
    
    db_project = models.Project(**project.model_dump(), owner_id=owner.id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/", response_model=List[schemas.ProjectResponse])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects

@router.get("/{project_id}", response_model=schemas.ProjectResponse)
def read_project(project_id: uuid.UUID, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
