# pip install fastapi uvicorn pydantic google-api-python-client google-auth
import os
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from google.oauth2 import service_account
from googleapiclient.discovery import build

app = FastAPI(title="Google Play Billing Verification API")

# サービスアカウントキーファイルのパス（Google Cloudで作成）
SERVICE_ACCOUNT_FILE = "google-service-account.json"
SCOPES = ["https://www.googleapis.com/auth/androidpublisher"]

# リクエストボディの型定義
class PurchaseVerifyRequest(BaseModel):
    package_name: str
    product_id: str
    purchase_token: str
    is_subscription: bool = False

def get_android_publisher_service():
    """Google Play Developer API サービスオブジェクトを取得"""
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        raise RuntimeError("Service account JSON file not found.")
        
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    return build("androidpublisher", "v3", credentials=creds)

@app.post("/api/v1/verify-purchase")
async def verify_purchase(req: PurchaseVerifyRequest):
    try:
        service = get_android_publisher_service()
        
        if req.is_subscription:
            # 定期購入（サブスクリプション）の検証
            result = service.purchases().subscriptions().get(
                packageName=req.package_name,
                subscriptionId=req.product_id,
                token=req.purchase_token
            ).execute()
            
            # paymentState: 1 = 支払い完了
            is_valid = result.get("paymentState") == 1
        else:
            # 単発購入（アプリ内アイテム）の検証
            result = service.purchases().products().get(
                packageName=req.package_name,
                productId=req.product_id,
                token=req.purchase_token
            ).execute()
            
            # purchaseState: 0 = 購入完了
            is_valid = result.get("purchaseState") == 0

        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or unpaid purchase token."
            )

        # TODO: ここでデータベースのユーザー情報を更新 (例: user.is_pro = True)
        
        return {
            "success": True,
            "message": "Purchase verified successfully.",
            "data": {
                "orderId": result.get("orderId"),
                "purchaseTimeMillis": result.get("purchaseTimeMillis")
            }
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Verification failed: {str(e)}"
        )