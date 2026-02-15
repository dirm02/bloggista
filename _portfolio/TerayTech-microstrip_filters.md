---
layout: project
name: Teraytech Microstrip Filters
slug: TerayTech-microstrip_filters
image: https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/TerayTech-microstrip_filters/IMAGES/DSC03022.JPG
repo_url: https://github.com/dirm02/mystars/tree/master/starred-readmes/TerayTech-microstrip_filters
---
{% raw %}
# Microstrip Filters

This repository collects several **microstrip filters** (LPF & BPF), their **PCB Gerber fabrication files**, **measured S-parameters**, and plotting scripts.  
The goal is to provide a full reference flow from **design → fabrication → measurement**

> **This project is graciously supported by [BL-SEMI](https://space.bilibili.com/346773458).  
> All PCBs are provided with their generous backing—our deepest thanks!**  
> **For manufacturing support, please contact at: wts@jsdpcb.cn**  
Special Thanks to [Dr. Thomas Huang](https://www.linkedin.com/in/drthomashuang/)
our staff engineer at J15 building, The University Of Sydney for all the helps to my tests.
---

##  Hardware & Setup

<p align="center">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/TerayTech-microstrip_filters/IMAGES/DSC03022.JPG" alt="Fabricated boards" width="60%">
  <br>
  <em>Fabricated microstrip filter boards</em>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/TerayTech-microstrip_filters/IMAGES/DSC03051.JPG" alt="Measurement setup" width="60%">
  <br>
  <em>Keysight E5080B (VNA) measurement setup</em>
</p>

---

## Measurement Results (in MEAS_RESULT folder)

This folder contains the measured **S-parameter files (.s2p)**, exported **CSV data**, and **plotting scripts**.

### Bandpass Filter (BPF)
- **10GBPF.s2p** → 10 GHz Bandpass Filter S-parameters  
- **10GBPF_S11S21.png** → Measurement plot  
<p align="center">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/TerayTech-microstrip_filters/MEAS_RESULT/10GBPF_S11S21.png" alt="10G BPF measurement" width="65%">
</p>

### Low Pass Filter 1 - 5GHz
- **LPF1.s2p** → LPF1 S-parameters  
- **LPF1_S11S21.png** → Measurement plot  
<p align="center">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/TerayTech-microstrip_filters/MEAS_RESULT/LPF1_S11S21.png" alt="LPF1 measurement" width="65%">
</p>

### Low Pass Filter 2 - 8GHz
- **LPF2.s2p** → LPF2 S-parameters  
- **LPF2_S11S21.png** → Measurement plot  
<p align="center">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/TerayTech-microstrip_filters/MEAS_RESULT/LPF2_S11S21.png" alt="LPF2 measurement" width="65%">
</p>

---

## PCB Fabrication Files (PCB_GERBER_FAB)

This folder includes **Gerber files** ready for PCB manufacturing.

- `GERBER_5G_LPF.zip` → 5 GHz Low Pass Filter  
- `GERBER_8G_LPF.zip` → 8 GHz Low Pass Filter  
- `GERBER_10GHz_BPF.zip` → 10 GHz Bandpass Filter  
- `GERBER_22G_BPF.zip` → 22 GHz Bandpass Filter  

Detailed fabrication notes can be found here 👉 [FAB_DOC.md](PCB_GERBER_FAB/FAB_DOC.md)

---

## Usage

1. **Plotting**  
   Use `plot_sparams_ieee.m` or `plot_sparams_ieee2.m` scripts to generate IEEE-style plots of S-parameters.  
   ```matlab
   plot_sparams_ieee('MEAS_RESULT/10GBPF.s2p')
   ```

2. **Hardware Measurement**  
   - Measure S-parameters using a Vector Network Analyzer (e.g., Keysight E5080B)  
   - Save `.s2p` files into the `MEAS_RESULT/` folder  
   - Use MATLAB or Python scripts to visualize and analyze results  

---

##  License

This project is released under the [MIT License](LICENSE).

---

##  Acknowledgments

This project was organized as part of RF/Microwave learning and lab practice, for research and educational purposes.

{% endraw %}