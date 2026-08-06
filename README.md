# Smart RFID Attendance System

**IoT-Based Real-Time Student Attendance Tracking with Live Web Dashboard**

A fully automated attendance system built with an ESP32 microcontroller, an RC522 RFID reader, and a Next.js web dashboard hosted on Vercel. Students tap their RFID card, get instant LED/buzzer feedback, and their attendance appears on a live dashboard within seconds — no manual roll call, no proxy attendance.

🔗 **Live Dashboard:** https://rfid-gules.vercel.app
📦 **Source Code:** https://github.com/zaid-mian/rfid-attendance-system

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Hardware Components](#hardware-components)
- [Software Stack](#software-stack)
- [Circuit / Wiring](#circuit--wiring)
- [How It Works](#how-it-works)
- [Registered Students](#registered-students)
- [Screenshots](#screenshots)
- [Applications](#applications)
- [Future Improvements](#future-improvements)
- [Team](#team)
- [References](#references)

---

## Overview

Traditional paper-based attendance wastes 10–15 minutes of class time per session, is prone to human error, and enables proxy (buddy) punching. This project replaces that process with an RFID-based system: when a student taps their card near the RC522 reader, the ESP32 identifies them from an onboard database, gives immediate visual/audio feedback, and pushes the attendance record over WiFi to a cloud-hosted dashboard that auto-refreshes every 3 seconds.

The system currently supports 6 registered students for demonstration but is architected to scale to hundreds with minimal code changes.

## Features

- ✅ Fully automated RFID-based attendance (no manual entry)
- ✅ Proxy-proof — a physical card must be present
- ✅ Green LED + short beep for authorized cards
- ✅ Red LED + long beep for unknown/unregistered cards
- ✅ Wireless data transmission via WiFi (HTTP POST)
- ✅ Live web dashboard, auto-refreshing every 3 seconds
- ✅ Works on mobile, tablet, and desktop browsers
- ✅ One-click "Reset Attendance" button for fresh sessions
- ✅ Recent Scans feed with timestamps

## Hardware Components

| Component | Description | Qty |
|---|---|---|
| ESP32 Dev Module | Main microcontroller, WiFi + Bluetooth, 240 MHz dual-core | 1 |
| RFID-RC522 Module | 13.56 MHz RFID reader/writer, SPI interface, 3.3V | 1 |
| RFID Cards/Tags | MIFARE cards with unique 4-byte UIDs | 6+ |
| Green LED | Authorized card indicator | 1 |
| Red LED | Unauthorized/unknown card indicator | 1 |
| Active Buzzer | Audio feedback for scans | 1 |
| Resistors (220Ω) | Current limiting for LEDs | 2 |
| Breadboard (830pt) | Prototyping | 1 |
| Jumper Wires | Male-to-female / male-to-male | 20+ |
| Micro USB Cable | Programming & power | 1 |

## Software Stack

| Tool | Purpose | Version |
|---|---|---|
| Arduino IDE | ESP32 firmware development | 2.x |
| MFRC522 Library | RFID module driver | Latest |
| WiFi Library | ESP32 WiFi connectivity | Built-in |
| HTTPClient Library | HTTP requests from ESP32 to server | Built-in |
| Next.js | Full-stack web framework for dashboard | 14.0 |
| React.js | Frontend UI | 18.x |
| Vercel | Serverless hosting & CI/CD | Cloud |
| GitHub | Version control | Cloud |
| ESP32 Board Package | Espressif core for Arduino IDE | 3.3.8 |

## Circuit / Wiring

### RC522 → ESP32

| RC522 Pin | ESP32 Pin | Function |
|---|---|---|
| SDA (SS) | GPIO 5 | SPI Chip Select |
| SCK | GPIO 18 | SPI Clock |
| MOSI | GPIO 23 | SPI Data Out |
| MISO | GPIO 19 | SPI Data In |
| IRQ | Not Connected | — |
| GND | GND | Common Ground |
| RST | GPIO 4 | Reset |
| 3.3V | 3V3 | Power (**3.3V only**) |

### LEDs & Buzzer

| Component | ESP32 Pin | Notes |
|---|---|---|
| Green LED (+) | GPIO 26 | 220Ω resistor, 1s flash on known card |
| Red LED (+) | GPIO 27 | 220Ω resistor, 1s flash on unknown card |
| Buzzer (+) | GPIO 14 | Short beep (known) / long beep (unknown) |
| All (−) | GND | Shared ground |

> ⚠️ **Warning:** The RC522 module operates on 3.3V only. Connecting it to 5V will permanently damage the IC.

## How It Works

1. Student presents RFID card within 5–10 cm of the RC522 scanner.
2. RC522 reads the card's UID via 13.56 MHz electromagnetic induction.
3. ESP32 receives the UID over SPI and converts it to a hex string.
4. ESP32 checks the UID against its onboard student database.
   - **Known card:** Green LED (1s) + short beep (200ms) → HTTP POST sent to the Vercel API
   - **Unknown card:** Red LED (1s) + long beep (800ms) → no server call
5. The dashboard polls the API every 3 seconds and updates attendance status, timestamps, and recent scans live.
6. A 1-second cooldown prevents duplicate reads between scans.

### Web App Architecture

**Frontend (React/Next.js)**
- Dark-themed, responsive UI
- Live stat cards: Total / Present / Absent
- Attendance table with name, roll number, scan time, status
- Recent Scans feed (last 5 events)
- Reset Attendance button with confirmation

**Backend (Next.js Serverless API)**
- `POST /api/attendance` — records a new scan
- `GET /api/attendance` — returns current stats and records
- `DELETE /api/attendance` — resets attendance for a new session
- CORS enabled for requests from the ESP32 device

## Registered Students

| # | Name | Roll Number | RFID UID |
|---|---|---|---|
| 1 | M. Zaid Tahir | 2023-AG-10127 | A87F25D5 |
| 2 | M. Huzaifa Khalid | 2023-AG-10112 | 38C91DD5 |
| 3 | Ali Hammad Subhnai | 2023-AG-10035 | 7AB443B4 |
| 4 | Fatima Shahzad | 2023-AG-10057 | B8953AD5 |
| 5 | Shahreen Shahid | 2023-AG-10144 | 3A0A72B4 |
| 6 | Nimra Iman | 2023-AG-10131 | B490F804 |

## Screenshots

- Complete hardware setup (ESP32 + RC522 + LEDs + buzzer on breadboard)
- Dashboard — all students absent (default/after reset)
- Dashboard — all students present (after scanning), with individual scan times

*(See full report PDF for images.)*

## Applications

- University / school classroom attendance
- Office employee time tracking
- Hospital patient/ward tracking
- Library access and borrowing control
- Lab / restricted-area access control
- Conference and event check-in
- Parking lot access management
- Factory shift attendance

## Future Improvements

- Persistent database (MongoDB Atlas / PostgreSQL) instead of in-memory storage
- Automated daily/weekly/monthly PDF attendance reports
- SMS/email alerts to parents for absentees
- Face recognition as a secondary biometric factor
- Dedicated mobile app for teachers
- Multi-classroom support (multiple ESP32 units → one dashboard)
- Battery backup for power outages
- Fingerprint scanner as an alternative auth method
- ML-based attendance pattern analytics
- OLED display to show student name on scan

## Team

**BSCS 6th – E1, Department of Computer Science, University of Agriculture, Faisalabad**
Subject: Internet of Things · Resource Person: Ms. Rimla

- M. Zaid Tahir — 2023-AG-10127
- M. Huzaifa Khalid — 2023-AG-10112
- Ali Hammad Subhnai — 2023-AG-10035
- Fatima Shahzad — 2023-AG-10057
- Shahreen Shahid — 2023-AG-10144
- Nimra Iman — 2023-AG-10131

## References

1. Espressif Systems — ESP32 Technical Reference Manual — https://docs.espressif.com
2. MFRC522 Arduino Library — https://github.com/miguelbalboa/rfid
3. NXP Semiconductors — MFRC522 Datasheet
4. Vercel Inc. — Next.js 14 Documentation — https://nextjs.org/docs
5. Arduino LLC — Arduino IDE 2.x Documentation — https://docs.arduino.cc
6. Espressif Systems — Arduino ESP32 Board Support Package v3.3.8 — https://github.com/espressif/arduino-esp32
