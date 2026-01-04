from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
import uuid

router = APIRouter(prefix="/orders", tags=["orders"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.OrderResponse)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    # simplified: getting first user as buyer for demo
    buyer = db.query(models.User).filter(models.User.role == models.UserRole.BUYER).first()
    if not buyer:
        buyer = models.User(email="buyer@example.com", role=models.UserRole.BUYER)
        db.add(buyer)
        db.commit()

    project = db.query(models.Project).filter(models.Project.id == order.project_id).first()
    if not project:
         raise HTTPException(status_code=404, detail="Project not found")

    total_price = project.price_per_credit * order.quantity
    
    db_order = models.Order(
        buyer_id=buyer.id,
        project_id=order.project_id,
        quantity=order.quantity,
        total_price=total_price,
        status=models.OrderStatus.PENDING
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order
