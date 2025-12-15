"use client";

import {
  useState,
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";
import Button from "../../../components/UI/Button";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authAPI } from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";

const OTP_LENGTH = 6;
const TIMER_DURATION = 120; // 2 minutes
const STORAGE_KEY = "otp_timer_start";

export default function OTPPage() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timeRemaining, setTimeRemaining] = useState<number>(TIMER_DURATION);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  // Initialize timer from localStorage
  useEffect(() => {
    const storedStart = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (storedStart) {
      const elapsed = Math.floor((now - parseInt(storedStart)) / 1000);
      const remaining = Math.max(0, TIMER_DURATION - elapsed);
      setTimeRemaining(remaining);
      setCanResend(remaining === 0);
      if (remaining === 0) localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, now.toString());
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (canResend) return; // Stop if resend available

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [canResend]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1)
      inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pasted)) return;

    setOtp(pasted.split("").map((c) => c));
    const focusIndex =
      pasted.length >= OTP_LENGTH ? OTP_LENGTH - 1 : pasted.length;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = async () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimeRemaining(TIMER_DURATION);
    setCanResend(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());

    try {
      await authAPI.resentOtp(email);
      toast.success("OTP resent successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to send OTP");
      }
    }

    inputRefs.current[0]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    try {
      const user = await authAPI.verifyOtp(otpValue, email);
      dispatch(setCredentials(user));
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to verify OTP.");
      }
    }
  };

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
  const isOtpComplete = otp.every((d) => d !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Verify Your Account
          </h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
          <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-semibold border-2 border-input rounded-lg bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            disabled={!isOtpComplete}
            className="w-full mb-4"
            title="Verify OTP"
          />

          <div className="text-center">
            {!canResend ? (
              <p className="text-sm text-muted-foreground">
                Resend available in {formatTime(timeRemaining)}
              </p>
            ) : (
              <Button
                onClick={handleResend}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                title="Resend OTP"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
