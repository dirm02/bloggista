---
layout: project
name: Pollen Robotics Reachy Mini
slug: pollen-robotics-reachy_mini
category: Uncategorized
image: https://img.shields.io/badge/Read_the-Documentation-yellow?logo=huggingface&logoColor=yellow
repo_url: https://github.com/pollen-robotics/reachy_mini
indexed_content: "# Reachy Mini \U0001F916 [](https://huggingface.co/docs/reachy_mini/)
  [](https://discord.gg/Y7FgMqHsub) **Reachy Mini is an open-source, expressive robot
  made for hackers and AI builders.** \U0001F6D2 [**Buy Reachy Mini**](https://www.hf.co/reachy-mini/)
  [](https://www.pollen-robotics.com/reachy-mini/) ## ⚡️ Build and start your own
  robot **Choose your platform to access the specific guide:** | **\U0001F916 Reachy
  Mini (Wireless)** | **\U0001F50C Reachy Mini Lite** | **\U0001F4BB Simulation**
  | | :---: | :---: | :---: | | The full autonomous experience. Raspberry Pi 4 + Battery
  + WiFi. | The developer version. USB connection to your computer. | No hardware
  required. Prototype in MuJoCo. | | \U0001F449 [**Go to Wireless Guide**](https://huggingface.co/docs/reachy_mini/platforms/reachy_mini/get_started)
  | \U0001F449 [**Go to Lite Guide**](https://huggingface.co/docs/reachy_mini/platforms/reachy_mini_lite/get_started)
  | \U0001F449 [**Go to Simulation**](https://huggingface.co/docs/reachy_mini/platforms/simulation/get_started)
  | > ⚡ **Pro tip:** Install [uv](https://docs.astral.sh/uv/getting-started/installation/)
  for 10-100x faster app installations (auto-detected, falls back to `pip`). ## \U0001F4F1
  Apps & Ecosystem Reachy Mini comes with an app store powered by Hugging Face Spaces.
  You can install these apps directly from your robot's dashboard with one click!
  * **\U0001F5E3️ [Conversation App](https://huggingface.co/spaces/pollen-robotics/reachy_mini_conversation_app):**
  Talk naturally with Reachy Mini (powered by LLMs). * **\U0001F4FB [Radio](https://huggingface.co/spaces/pollen-robotics/reachy_mini_radio):**
  Listen to the radio with Reachy Mini! * **\U0001F44B [Hand Tracker](https://huggingface.co/spaces/pollen-robotics/hand_tracker_v2):**
  The robot follows your hand movements in real-time. \U0001F449 [**Browse all apps
  on Hugging Face**](https://hf.co/reachy-mini/#/apps) ## \U0001F680 Getting Started
  with Reachy Mini SDK ### User guides * **[Installation](https://huggingface.co/docs/reachy_mini/SDK/installation)**:
  5 minutes to set up your computer * **[Quickstart Guide](https://huggingface.co/docs/reachy_mini/SDK/quickstart)**:
  Run your first behavior on Reachy Mini * **[Python SDK](https://huggingface.co/docs/reachy_mini/SDK/python-sdk)**:
  Learn to move, see, speak, and hear. * **[AI Integrations](https://huggingface.co/docs/reachy_mini/SDK/integration)**:
  Connect LLMs, build Apps, and publish to Hugging Face. * **[Core Concepts](https://huggingface.co/docs/reachy_mini/SDK/core-concept)**:
  Architecture, coordinate systems, and safety limits. * \U0001F917[**Share your app
  with the community**](https://huggingface.co/blog/pollen-robotics/make-and-publish-your-reachy-mini-apps)
  * \U0001F4C2 [**Browse the Examples Folder**](examples) ### \U0001F916 AI-Assisted
  Development Using an AI coding agent (Claude Code, Codex, Copilot, etc.)? You can
  start building apps right away. Paste this prompt to your agent: > *I'd like to
  create a Reachy Mini app. Start by reading https://github.com/pollen-robotics/reachy_mini/blob/develop/agents.md*
  This [**agents.md**](agents.md) guide gives AI agents everything they need: SDK
  patterns, best practices, example apps, and step-by-step skills. ### Quick Look
  After [installing the SDK](https://huggingface.co/docs/reachy_mini/SDK/installation),
  once your robot is awake, you can control it in just **a few lines of code**: ```python
  from reachy_mini import ReachyMini from reachy_mini.utils import create_head_pose
  with ReachyMini() as mini: # Look up and tilt head mini.goto_target( head=create_head_pose(z=10,
  roll=15, degrees=True, mm=True), duration=1.0 ) ``` ## \U0001F6E0 Hardware Overview
  Reachy Mini robots are sold as kits and generally take **2 to 3 hours** to assemble.
  Detailed step-by-step guides are available in the platform-specific folders linked
  above. * **Reachy Mini (Wireless):** Runs onboard (RPi 4), autonomous, includes
  IMU. [See specs](https://huggingface.co/docs/reachy_mini/platforms/reachy_mini/hardware).
  * **Reachy Mini Lite:** Runs on your PC, powered via wall outlet. [See specs](https://huggingface.co/docs/reachy_mini/platforms/reachy_mini_lite/hardware).
  ## ❓ Troubleshooting Encountering an issue? \U0001F449 **[Check the Troubleshooting
  & FAQ Guide](https://huggingface.co/docs/reachy_mini/troubleshooting)** ## \U0001F91D
  Community & Contributing * **Join the Community:** Join [Discord](https://discord.gg/2bAhWfXme9)
  to share your moments with Reachy, build apps together, and get help. * **Found
  a bug?** Open an issue on this repository. ## License This project is licensed under
  the Apache 2.0 License. See the [LICENSE](LICENSE) file for details. Hardware design
  files are licensed under Creative Commons BY-SA-NC."
---
{% raw %}
# Reachy Mini 🤖

[![Ask on HuggingChat](https://img.shields.io/badge/Read_the-Documentation-yellow?logo=huggingface&logoColor=yellow)](https://huggingface.co/docs/reachy_mini/)
[![Discord](https://img.shields.io/badge/Discord-Join_the_Community-7289DA?logo=discord&logoColor=white)](https://discord.gg/Y7FgMqHsub)

**Reachy Mini is an open-source, expressive robot made for hackers and AI builders.**

🛒 [**Buy Reachy Mini**](https://www.hf.co/reachy-mini/)

[![Reachy Mini Hello](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/pollen-robotics-reachy_mini/docs/assets/reachy_mini_hello.gif)](https://www.pollen-robotics.com/reachy-mini/)

## ⚡️ Build and start your own robot

**Choose your platform to access the specific guide:**

| **🤖 Reachy Mini (Wireless)** | **🔌 Reachy Mini Lite** | **💻 Simulation** |
| :---: | :---: | :---: |
| The full autonomous experience.<br>Raspberry Pi 4 + Battery + WiFi. | The developer version.<br>USB connection to your computer. | No hardware required.<br>Prototype in MuJoCo. |
| 👉 [**Go to Wireless Guide**](https://huggingface.co/docs/reachy_mini/platforms/reachy_mini/get_started) | 👉 [**Go to Lite Guide**](https://huggingface.co/docs/reachy_mini/platforms/reachy_mini_lite/get_started) | 👉 [**Go to Simulation**](https://huggingface.co/docs/reachy_mini/platforms/simulation/get_started) |



> ⚡ **Pro tip:** Install [uv](https://docs.astral.sh/uv/getting-started/installation/) for 10-100x faster app installations (auto-detected, falls back to `pip`).

<br>

## 📱 Apps & Ecosystem

Reachy Mini comes with an app store powered by Hugging Face Spaces. You can install these apps directly from your robot's dashboard with one click!

* **🗣️ [Conversation App](https://huggingface.co/spaces/pollen-robotics/reachy_mini_conversation_app):** Talk naturally with Reachy Mini (powered by LLMs).
* **📻 [Radio](https://huggingface.co/spaces/pollen-robotics/reachy_mini_radio):** Listen to the radio with Reachy Mini!
* **👋 [Hand Tracker](https://huggingface.co/spaces/pollen-robotics/hand_tracker_v2):** The robot follows your hand movements in real-time.

👉 [**Browse all apps on Hugging Face**](https://hf.co/reachy-mini/#/apps)

<br>

## 🚀 Getting Started with Reachy Mini SDK

### User guides
* **[Installation](https://huggingface.co/docs/reachy_mini/SDK/installation)**: 5 minutes to set up your computer
* **[Quickstart Guide](https://huggingface.co/docs/reachy_mini/SDK/quickstart)**: Run your first behavior on Reachy Mini
* **[Python SDK](https://huggingface.co/docs/reachy_mini/SDK/python-sdk)**: Learn to move, see, speak, and hear.
* **[AI Integrations](https://huggingface.co/docs/reachy_mini/SDK/integration)**: Connect LLMs, build Apps, and publish to Hugging Face.
* **[Core Concepts](https://huggingface.co/docs/reachy_mini/SDK/core-concept)**: Architecture, coordinate systems, and safety limits.
* 🤗[**Share your app with the community**](https://huggingface.co/blog/pollen-robotics/make-and-publish-your-reachy-mini-apps)
* 📂 [**Browse the Examples Folder**](examples)

### 🤖 AI-Assisted Development

Using an AI coding agent (Claude Code, Codex, Copilot, etc.)? You can start building apps right away. Paste this prompt to your agent:

> *I'd like to create a Reachy Mini app. Start by reading https://github.com/pollen-robotics/reachy_mini/blob/develop/agents.md*

This [**agents.md**](agents.md) guide gives AI agents everything they need: SDK patterns, best practices, example apps, and step-by-step skills.

### Quick Look
After [installing the SDK](https://huggingface.co/docs/reachy_mini/SDK/installation), once your robot is awake, you can control it in just **a few lines of code**:

```python
from reachy_mini import ReachyMini
from reachy_mini.utils import create_head_pose

with ReachyMini() as mini:
    # Look up and tilt head
    mini.goto_target(
        head=create_head_pose(z=10, roll=15, degrees=True, mm=True),
        duration=1.0
    )
```

<br>

## 🛠 Hardware Overview

Reachy Mini robots are sold as kits and generally take **2 to 3 hours** to assemble. Detailed step-by-step guides are available in the platform-specific folders linked above.

* **Reachy Mini (Wireless):** Runs onboard (RPi 4), autonomous, includes IMU. [See specs](https://huggingface.co/docs/reachy_mini/platforms/reachy_mini/hardware).
* **Reachy Mini Lite:** Runs on your PC, powered via wall outlet. [See specs](https://huggingface.co/docs/reachy_mini/platforms/reachy_mini_lite/hardware).

<br>

## ❓ Troubleshooting

Encountering an issue? 👉 **[Check the Troubleshooting & FAQ Guide](https://huggingface.co/docs/reachy_mini/troubleshooting)**

<br>

## 🤝 Community & Contributing

* **Join the Community:** Join [Discord](https://discord.gg/2bAhWfXme9) to share your moments with Reachy, build apps together, and get help.
* **Found a bug?** Open an issue on this repository.


## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.
Hardware design files are licensed under Creative Commons BY-SA-NC.

{% endraw %}