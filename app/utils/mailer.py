# app/utils/mailer.py
import requests
from app.utils.config import settings

GAS_URL = settings.GAS_URL  # pastikan sudah di .env

def send_verification_email(email: str, token: str):
    verification_link = f"{settings.BACKEND_URL}/auth/verify-email?token={token}"

    body = f"""
    <p>Hai Sobat Velvi Chews!</p>

    <p>Terima kasih sudah bergabung! Untuk mengaktifkan akunmu dan mulai 
     menikmati pengalaman seru di Velvi Chews, klik link berikut:</p>

    <p><a href="{verification_link}">{verification_link}</a></p>

    <p>Kalau link tidak bisa diklik, cukup salin dan tempel di browser.</p>

    <p>Selamat bersenang-senang,<br>
    Tim Velvi Chews</p>
    """


    payload = {
        "email": email,
        "subject": "Verifikasi Akun Kamu",
        "body": body  
    }
    try:
        response = requests.post(GAS_URL, json=payload, timeout=10)
        if response.status_code == 200:
            return True
        else:
            return False
    except requests.exceptions.RequestException as e:
        print("🚨 Error saat kirim ke GAS:", str(e))
        return False
