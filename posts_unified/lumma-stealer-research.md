---
title: "LummaStealer: A Proliferating Threat in the Cybercrime Landscape"
category: research
date: 2025-01-15
author: Husam Gameel (Oppenheim3r)
tags: malware analysis, sandbox evasion, LLVM obfuscation, trigonometry, mouse tracking
excerpt: "An in-depth analysis of LummaStealer's advanced evasion techniques, including LLVM obfuscation and trigonometric mouse movement tracking for sandbox detection."
---

# LummaStealer: A Proliferating Threat in the Cybercrime Landscape

*Published on January 15, 2025*

This report is an analysis of the information mentioned in this blog post [https://medium.com/@raghavtiresearch/lumma-stealer-a-proliferating-threat-in-the-cybercrime-landscape-b5cdc3de44a4](https://medium.com/@raghavtiresearch/lumma-stealer-a-proliferating-threat-in-the-cybercrime-landscape-b5cdc3de44a4) discussing LummaStealer Tactics, Techniques, and Procedures.

## Execution & Evasion Techniques

I will start with **Execution & Evasion Techniques:** I have picked the methods that I found interesting the most. Starting with obfuscation it uses Low-Level Virtual Machine (LLVM), **trigonometry to track mouse movements**.

### 1. Low Level Virtual Machine (LLVM)

**Low level virtual machine or LLVM** is an infrastructure that was created to optimize code at compile time. Its main use is to make different programming languages allowing them to share tools before they are converted to machine code.

This process can be done in three steps, the compiler has three parts:

1. **Frontend** that parsed the source code and converts it into Intermediate Representation(IR) its a form of syntax that is closest to hardware
2. **Middle end** it analyze this IR and optimize it
3. **Backend** it converts the IR into machine code

![LLVM Compilation Process](images/Pastedimage20250731163244.png)

LLVM makes writing new programming languages easier.

Malware authors can abuse this functionality by reconstructing the program control flow. They can make an If-else statement to look like a loop or switch statement, reconstructing instructions into mathematical equivalents forms, injecting useless code or dead code that does not affect or add anything to the program but making it complex.

### 2. Trigonometry to Track Mouse Movements

In the blog it's mentioned that it's using this technique for sandbox evasion. It utilizes **trigonometry to track mouse movements** to escape sandbox. It would not execute the payload unless human activity was detected.

I have done my own research to figure this method and test it myself.

## Windows API Functions Used

### A. Mouse Tracking Functions

| Function                                | Library      | Purpose                                                    |
| --------------------------------------- | ------------ | ---------------------------------------------------------- |
| **`GetCursorPos()`**                    | `user32.dll` | Retrieves the current mouse cursor position (x, y).        |
| **`GetSystemMetrics(SM_MOUSEPRESENT)`** | `user32.dll` | Checks if a physical mouse is connected (anti-VM check).   |
| **`GetAsyncKeyState(VK_ESCAPE)`**       | `user32.dll` | Detects if the **ESC key** is pressed (for graceful exit). |

### B. Timing Functions

| Function                   | Library           | Purpose                                           |
| -------------------------- | ----------------- | ------------------------------------------------- |
| **`Sleep()`**              | `kernel32.dll`    | Pauses execution to control sampling rate.       |
| **`std::chrono` (C++)**    | Standard Library  | High-precision timing for movement analysis.     |

## Mathematical Logic Behind It

### A. Calculating Movement Angle

The program computes the **angle** between two consecutive mouse positions using **`atan2`** (arctangent of `dy/dx`):

```cpp
double calculateMovementAngle(POINT from, POINT to) {
    double dx = to.x - from.x;
    double dy = to.y - from.y;
    return radiansToDegrees(atan2(dy, dx)); // converts to degrees (0-360)
}

// dx and dy Differences in x and y coordinates.
// atan2(dy, dx) Computes the angle in radians.
// radiansToDegrees() Converts to degrees for easier interpretation.
```

### B. Normalizing Angle Differences

Since angles wrap around (0 = 360), we normalize them to ensure correct comparisons:

```cpp
double normalizeAngle(double angle) {
    angle = fmod(angle, 360.0); // ensures angle is within 0-360
    if (angle < 0) angle += 360.0;
    return angle;
}
```

### C. Determining Human vs. Bot Movement

The program checks if angle changes exceed a threshold (45 by default):

```cpp
double angleDifference(double a, double b) {
    double diff = fabs(normalizeAngle(a) - normalizeAngle(b));
    return fmin(diff, 360.0 - diff); // get smallest difference (accounts for wrap-around)
}
```

- **Human movements**: Large angle variations (>45°)
- **Bot/sandbox movements**: Small angle variations (straight lines, repetitive patterns)

## Program Flow

1. **Check Mouse Presence**: Using `GetSystemMetrics(SM_MOUSEPRESENT)` to see whether the mouse is connected
2. **Sample Mouse Positions**: Every **100ms**, it records the cursor position using `GetCursorPos()`
3. **Store and Analyze Angles**: Maintains a **sliding window of the last 10 angles**
4. **Determine Human vs. Bot**: 
   - If average angle change > 45° → **Human detected**
   - If average angle change ≤ 45° → **Bot**

## Code Sample

```cpp
#define _USE_MATH_DEFINES
#include <Windows.h>
#include <cmath>
#include <iostream>
#include <vector>
#include <chrono>

// Constants
constexpr int SAMPLE_INTERVAL_MS = 100;  // Time between mouse position samples
constexpr double ANGLE_THRESHOLD = 45.0; // Degrees difference to consider human-like
constexpr int MIN_SAMPLES = 5;           // Minimum samples before making determination
constexpr int DETECTION_WINDOW = 10;     // Number of recent samples to consider

// Converts radians to degrees
inline double radiansToDegrees(double radians) {
    return radians * (180.0 / M_PI);
}

double calculateMovementAngle(POINT from, POINT to) {
    double dx = to.x - from.x;
    double dy = to.y - from.y;
    return radiansToDegrees(atan2(dy, dx));
}

double normalizeAngle(double angle) {
    angle = fmod(angle, 360.0);
    if (angle < 0) angle += 360.0;
    return angle;
}

double angleDifference(double a, double b) {
    double diff = fabs(normalizeAngle(a) - normalizeAngle(b));
    return fmin(diff, 360.0 - diff);
}

int main() {
    std::vector<double> angleHistory;
    POINT prevPos, currentPos;
    bool mousePresent = GetSystemMetrics(SM_MOUSEPRESENT);

    if (!mousePresent) {
        std::cout << "[!] No mouse detected - likely a virtual machine or sandbox\n";
        return 1;
    }

    std::cout << "Mouse movement analysis started. Move your mouse naturally...\n";
    std::cout << "Waiting for " << MIN_SAMPLES << " samples before analysis...\n";

    // Get the mouse position
    GetCursorPos(&prevPos);
    auto lastSampleTime = std::chrono::steady_clock::now();

    while (true) {
        auto now = std::chrono::steady_clock::now();
        auto elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(now - lastSampleTime).count();

        if (elapsed >= SAMPLE_INTERVAL_MS) {
            GetCursorPos(&currentPos);

            // Only process if mouse has moved and keep only mouse recent samples
            if (currentPos.x != prevPos.x || currentPos.y != prevPos.y) {
                double angle = calculateMovementAngle(prevPos, currentPos);
                angleHistory.push_back(angle);

                if (angleHistory.size() > DETECTION_WINDOW) {
                    angleHistory.erase(angleHistory.begin());
                }

                if (angleHistory.size() >= MIN_SAMPLES) {
                    double totalDiff = 0.0;
                    int comparisons = 0;

                    for (size_t i = 1; i < angleHistory.size(); i++) {
                        double diff = angleDifference(angleHistory[i], angleHistory[i-1]);
                        totalDiff += diff;
                        comparisons++;
                    }

                    double avgDiff = totalDiff / comparisons;
                    bool isHuman = avgDiff > ANGLE_THRESHOLD;

                    system("cls"); 
                    std::cout << "Mouse Movement Analysis\n";
                    std::cout << "-----------------------\n";
                    std::cout << "Samples collected: " << angleHistory.size() << "\n";
                    std::cout << "Average angle change: " << avgDiff << " degrees\n";
                    std::cout << "Detection threshold: " << ANGLE_THRESHOLD << " degrees\n";
                    std::cout << "Conclusion: " << (isHuman ? "HUMAN" : "BOT/AUTOMATED") << "\n";
                    std::cout << "\nKeep moving mouse to update analysis...\n";
                }

                prevPos = currentPos;
            }

            lastSampleTime = now;
        }

        // Check for ESC key to exit
        if (GetAsyncKeyState(VK_ESCAPE) & 0x8000) {
            break;
        }

        Sleep(10); 
    }

    return 0;
}
```

## Compilation and Testing

I have compiled this using Visual Studio command line:

```bash
cl MouseAnalysis.cpp /EHsc /Fe:MouseAnalysis.exe /link user32.lib
```

## Test Results

### Human Movement Detection
![Human Movement Analysis](images/huma.jpg)

### Bot Movement Detection
![Bot Movement Analysis](images/BOT.jpg)

## Conclusion

The program is missing a lot of mathematical and execution logic but I am demonstrating this as a Proof of Concept (PoC). An enhanced version of this can be used to detect human activity and BOT activity with high accuracy to escape sandbox environments.

This technique represents a sophisticated approach to sandbox evasion that goes beyond traditional methods, utilizing mathematical analysis of user behavior patterns to determine the authenticity of the execution environment.

## References

- [Low-Level Virtual Machine Under the Compiler Hood](https://medium.com/@ramdorak/low-level-virtual-machine-under-the-compiler-hood-064c8c8893fd)
- [LummaStealer: A Proliferating Threat in the Cybercrime Landscape](https://medium.com/@raghavtiresearch/lumma-stealer-a-proliferating-threat-in-the-cybercrime-landscape-b5cdc3de44a4)
- [Microsoft Documentation: GetCursorPos](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcursorpos)
- [Microsoft Documentation: SetWindowsHookEx](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowshookexa)
- [Microsoft Documentation: GetAsyncKeyState](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getasynckeystate)
- [Microsoft Documentation: GetSystemMetrics](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getsystemmetrics)
- [Microsoft Documentation: GetTickCount](https://learn.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-gettickcount)
- [Microsoft Documentation: QueryPerformanceCounter](https://learn.microsoft.com/en-us/windows/win32/api/profileapi/nf-profileapi-queryperformancecounter)

