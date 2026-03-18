// In-memory OTP store — replace with Redis/DB in production
const otpMap = new Map();

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
}

function storeOtp(phone, otp) {
  otpMap.set(phone, { otp, expiresAt: Date.now() + OTP_EXPIRY_MS });
}

function verifyOtp(phone, otp) {
  const entry = otpMap.get(phone);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otpMap.delete(phone);
    return false;
  }
  if (entry.otp !== otp) return false;
  otpMap.delete(phone);
  return true;
}

module.exports = { generateOtp, storeOtp, verifyOtp };
