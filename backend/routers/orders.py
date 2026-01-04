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
    
    # SIMULATE BLOCKCHAIN TRANSACTION
    import hashlib
    import time
    
    # Create a deterministic but unique-looking hash
    raw_str = f"{buyer.id}-{order.project_id}-{time.time()}"
    tx_hash = "0x" + hashlib.sha256(raw_str.encode()).hexdigest()

    db_order = models.Order(
        buyer_id=buyer.id,
        project_id=order.project_id,
        quantity=order.quantity,
        total_price=total_price,
        status=models.OrderStatus.COMPLETED, # Auto-complete for transparency demo
        tx_hash=tx_hash
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.put("/retire/{tx_hash}")
def retire_credits(tx_hash: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.tx_hash == tx_hash).first()
    if not order:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    if order.status == models.OrderStatus.RETIRED:
        raise HTTPException(status_code=400, detail="Credits already retired")
        
    order.status = models.OrderStatus.RETIRED
    db.commit()
    db.refresh(order)
    return {"message": "Credits successfully retired", "tx_hash": tx_hash, "status": "RETIRED"}

@router.get("/explorer/{tx_hash}")
def get_transaction_details(tx_hash: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.tx_hash == tx_hash).first()
    if not order:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    # Mock Blockchain Data
    return {
        "tx_hash": order.tx_hash,
        "block_number": 12345678 + int(order.quantity), # Fake block number
        "timestamp": "2024-03-15T10:30:00Z", # Mock timestamp (could be real DB time if we added created_at)
        "from_address": order.buyer.wallet_address or "0xUserWallet...",
        "to_address": "0xCarbonRegistryContract",
        "quantity": order.quantity,
        "project_name": order.project.name,
        "status": order.status,
        "gas_used": 21000,
        "network": "Polygon PoS"
    }
