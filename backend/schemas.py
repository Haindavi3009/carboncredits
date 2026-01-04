from pydantic import BaseModel, UUID4
from typing import List, Optional
from models import UserRole, OrderStatus

# User Schemas
class UserBase(BaseModel):
    email: str
    wallet_address: Optional[str] = None
    role: UserRole = UserRole.BUYER

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: UUID4

    class Config:
        from_attributes = True

# Project Schemas
class ProjectBase(BaseModel):
    name: str
    description: str
    category: str
    location: str
    price_per_credit: float
    available_quantity: int
    verra_id: Optional[str] = None
    smart_contract_token_id: Optional[int] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: UUID4
    owner_id: UUID4
    
    class Config:
        from_attributes = True

# Order Schemas
class OrderBase(BaseModel):
    project_id: UUID4
    quantity: int

class OrderCreate(OrderBase):
    pass

class OrderResponse(OrderBase):
    id: UUID4
    buyer_id: UUID4
    total_price: float
    status: OrderStatus
    tx_hash: Optional[str] = None

    class Config:
        from_attributes = True
