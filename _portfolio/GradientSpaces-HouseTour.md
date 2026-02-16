---
layout: project
name: Gradientspaces Housetour
slug: GradientSpaces-HouseTour
category: Video-audio-Imae-manga-TTS-Voice
image: https://img.shields.io/badge/arXiv-blue?logo=arxiv&color=%23B31B1B
repo_url: https://github.com/GradientSpaces/HouseTour.git
indexed_content: "HouseTour: A Virtual Real Estate A(I)gent Ata Çelen 1,2 · Marc Pollefeys
  1,3 · Dániel Béla Baráth 1,4 · Iro Armeni 2 International Conference on Computer
  Vision (ICCV) 2025 1 ETH Zürich     2 Stanford University     3 Microsoft Spatial
  AI Lab     4 HUN-REN SZTAKI [](https://arxiv.org/pdf/2510.18054) [](https://house-tour.github.io/)
  [](https://huggingface.co/gradient-spaces/HouseTour) [](https://sdss.redivis.com/datasets/dr72-b8s89wx7h)
  [](https://opensource.org/licenses/MIT) ## Abstract We introduce **HouseTour**,
  a method for spatially-aware 3D camera trajectory and natural language summary generation
  from a collection of images depicting an existing 3D space. Unlike existing vision-language
  models (VLMs), which struggle with geometric reasoning, our approach generates smooth
  video trajectories via a diffusion process constrained by known camera poses and
  integrates this information into the VLM for 3D-grounded descriptions. We synthesize
  the final video using 3D Gaussian splatting to render novel views along the trajectory.
  To support this task, we present the HouseTour dataset, which includes over 1,200
  house-tour videos with camera poses, 3D reconstructions, and real estate descriptions.
  Experiments demonstrate that incorporating 3D camera trajectories into the text
  generation process improves performance over methods handling each task independently.
  We evaluate both individual and end-to-end performance, introducing a new joint
  metric. Our work enables automated, professional-quality video creation for real
  estate and touristic applications without requiring specialized expertise or equipment.
  ## ✨ Key Features - **Residual Diffuser** – diffusion-based planner that refines
  sparse poses into smooth, human-like camera paths. - **Qwen2-VL-3D** – VLM adapter
  that fuses vision + language + 3D tokens for real-estate-style scene summaries.
  - **HouseTour Dataset** – >1 200 professionally filmed house-tour videos with 3D
  reconstructions & expert descriptions. ## Table of Contents ⚙️ System and Hardware
  \U0001F3E0 HouseTour Dataset \U0001F5A5️ Setup \U0001F3CB️ Training & Inference
  \U0001F64F Acknowledgements \U0001F4C4 Citation ## ⚙️ System and Hardware The code
  has been tested on: ```yaml Ubuntu: 22.04 LTS Python: 3.12.1 CUDA: 12.4 GPU: NVIDIA
  A100 SXM4 80GB ``` ## \U0001F3E0 HouseTour Dataset A gallery of reconstructed 3D
  scenes from the HouseTour dataset A side-by-side comparison of RGB images, point
  cloud renderings and depth maps ### \U0001F4E6 Overview The data is sourced from
  **professional real-estate agencies**, and all rights for **sharing and research
  use** have been secured. Our dataset offers a comprehensive resource for learning
  cross-modal representations of real-world indoor environments. --- ### \U0001F4CA
  Dataset Composition - **1,639** real-estate tour videos *(apartments, condos, multi-storey
  houses)* - **1,298** transcribed videos with **real-estate–oriented textual descriptions**
  - **878** reconstructed **3D scenes** *(dense point clouds + camera trajectories)*
  - **Professionally captured** smooth camera trajectories emulating natural **human
  navigation** - **Rich textual descriptions** emphasizing *layout, architectural
  features, materials, and ambiance* - **Privacy-filtered**: all **personally identifiable
  or sensitive information** removed ## \U0001F5A5️ Setup ### Environment Setup ```bash
  $ git clone https://github.com/GradientSpaces/HouseTour.git $ cd HouseTour # Create
  an environment $ conda create -n housetour python=3.12 -y $ conda activate housetour
  # Dependencies $ pip install torch==2.6.0 torchvision==0.21.0 --index-url https://download.pytorch.org/whl/cu124
  $ pip install -U pip setuptools wheel $ pip install git+https://github.com/facebookresearch/pytorch3d.git@75ebeeaea0908c5527e7b1e305fbc7681382db47
  $ pip install -r requirements.txt # Install the local package 'diffuser' $ pip install
  -e . ``` ### Downloading the Pretrained Models You can download the pretrained models
  from the following link: **[gradient-spaces/HouseTour](https://huggingface.co/gradient-spaces/HouseTour)**
  You can use the Hugging Face `huggingface_hub` library to automatically download
  the weights into `./checkpoints/`: ```python from huggingface_hub import snapshot_download
  model_name = \"gradient-spaces/HouseTour\" local_dir = \"./checkpoints/\" snapshot_download(repo_id=model_name,
  local_dir=local_dir) ``` ## \U0001F3CB️ Training & Inference ### Residual Diffuser
  To train the Residual Diffuser, you can use the following command: ```bash python
  -m scripts.train_residual_diffuser ``` The configuration file for the Residual Diffuser
  is located at `config/residual_diffuser.py`. You can modify the training parameters
  in this file. To run inference with the Residual Diffuser, use the following command:
  ```bash python -m scripts.test_residual_diffuser ``` ### Qwen2-VL-3D 1) To train
  the LoRA adapter on Qwen2-VL, you can use the following command: ```bash python
  train_qwen2_vl.py \\ --data_dir \"path/to/dataset\" \\ --output-dir \"training_checkpoints/lora_adapter\"
  ``` 2) To train the Qwen2-VL-3D model, you "
---
{% raw %}
<p align="center">
  <h2 align="center"> HouseTour: A Virtual Real Estate A(I)gent </h2>
  <p align="center">
    <a>Ata Çelen</a><sup>1,2</sup>
    ·
    <a href="https://people.inf.ethz.ch/marc.pollefeys/">Marc Pollefeys</a><sup>1,3</sup>
    ·
    <a href="https://www.linkedin.com/in/d%C3%A1niel-bar%C3%A1th-3a489092/">Dániel Béla Baráth</a><sup>1,4</sup>
    ·
    <a href="https://ir0.github.io/">Iro Armeni</a><sup>2</sup>
  </p>
  <p align="center"> <strong>International Conference on Computer Vision (ICCV) 2025</strong></p>
  <p align="center">
    <sup>1</sup>ETH Zürich    <sup>2</sup>Stanford University    <sup>3</sup>Microsoft Spatial AI Lab    <sup>4</sup>HUN-REN SZTAKI
  </p>
  <h3 align="center">

 [![arXiv](https://img.shields.io/badge/arXiv-blue?logo=arxiv&color=%23B31B1B)](https://arxiv.org/pdf/2510.18054) 
 [![ProjectPage](https://img.shields.io/badge/Project_Page-HouseTour-blue)](https://house-tour.github.io/)
 [![Hugging Face (LCM) Space](https://img.shields.io/badge/HuggingFace-Model-orange?logo=huggingface)](https://huggingface.co/gradient-spaces/HouseTour)
 [![HouseTour Dataset](https://img.shields.io/badge/HouseTour-Dataset-orange)](https://sdss.redivis.com/datasets/dr72-b8s89wx7h)
 [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
 <div align="center"></div>
</p>


<p align="center">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/GradientSpaces-HouseTour/assets/architecture.png" alt="HouseTour Teaser" width="800">
</p>

## Abstract
We introduce **HouseTour**, a method for spatially-aware 3D camera trajectory and natural language summary generation from a collection of images depicting an existing 3D space. Unlike existing vision-language models (VLMs), which struggle with geometric reasoning, our approach generates smooth video trajectories via a diffusion process constrained by known camera poses and integrates this information into the VLM for 3D-grounded descriptions. We synthesize the final video using 3D Gaussian splatting to render novel views along the trajectory. To support this task, we present the HouseTour dataset, which includes over 1,200 house-tour videos with camera poses, 3D reconstructions, and real estate descriptions. Experiments demonstrate that incorporating 3D camera trajectories into the text generation process improves performance over methods handling each task independently. We evaluate both individual and end-to-end performance, introducing a new joint metric. Our work enables automated, professional-quality video creation for real estate and touristic applications without requiring specialized expertise or equipment.

## ✨ Key Features
- **Residual Diffuser** – diffusion-based planner that refines sparse poses into smooth, human-like camera paths. 
- **Qwen2-VL-3D** – VLM adapter that fuses vision + language + 3D tokens for real-estate-style scene summaries.
- **HouseTour Dataset** – >1 200 professionally filmed house-tour videos with 3D reconstructions & expert descriptions.

## Table of Contents
<ol>
  <li><a href="#⚙️-system-and-hardware">⚙️ System and Hardware</a></li>
  <li><a href="#🏠-housetour-dataset">🏠 HouseTour Dataset</a></li>
  <li><a href="#🖥️-setup">🖥️ Setup</a></li>
  <li><a href="#🏋️-training--inference">🏋️ Training & Inference</a></li>
  <li><a href="#🙏-acknowledgements">🙏 Acknowledgements</a></li>
  <li><a href="#📄-citation">📄 Citation</a></li>
</ol>


## ⚙️ System and Hardware
The code has been tested on:
```yaml
Ubuntu: 22.04 LTS
Python: 3.12.1
CUDA: 12.4
GPU: NVIDIA A100 SXM4 80GB
```

## 🏠 HouseTour Dataset
<p align="middle">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/GradientSpaces-HouseTour/assets/recon_gallery.gif" alt="HouseTour Demo" width="600">
  <br>
    <em> A gallery of reconstructed 3D scenes from the HouseTour dataset</em>
</p>
<p align="middle">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/GradientSpaces-HouseTour/assets/rgb_pcd_depth.gif" alt="HouseTour Demo" width="1200" style="animation: loop infinite;">
  <br>
    <em> A side-by-side comparison of RGB images, point cloud renderings and depth maps</em>
</p>

### 📦 Overview

The data is sourced from **professional real-estate agencies**, and all rights for **sharing and research use** have been secured.  
Our dataset offers a comprehensive resource for learning cross-modal representations of real-world indoor environments.

---

### 📊 Dataset Composition

- **1,639** real-estate tour videos  
  *(apartments, condos, multi-storey houses)*  
- **1,298** transcribed videos  
  with **real-estate–oriented textual descriptions**  
- **878** reconstructed **3D scenes**  
  *(dense point clouds + camera trajectories)*  
- **Professionally captured** smooth camera trajectories  
  emulating natural **human navigation**  
- **Rich textual descriptions** emphasizing  
  *layout, architectural features, materials, and ambiance* 
- **Privacy-filtered**: all **personally identifiable or sensitive information** removed  


## 🖥️ Setup

### Environment Setup
```bash
$ git clone https://github.com/GradientSpaces/HouseTour.git
$ cd HouseTour

# Create an environment
$ conda create -n housetour python=3.12 -y
$ conda activate housetour

# Dependencies
$ pip install torch==2.6.0 torchvision==0.21.0 --index-url https://download.pytorch.org/whl/cu124
$ pip install -U pip setuptools wheel
$ pip install git+https://github.com/facebookresearch/pytorch3d.git@75ebeeaea0908c5527e7b1e305fbc7681382db47
$ pip install -r requirements.txt

# Install the local package 'diffuser'
$ pip install -e .
```

### Downloading the Pretrained Models
You can download the pretrained models from the following link:  
**[gradient-spaces/HouseTour](https://huggingface.co/gradient-spaces/HouseTour)**

You can use the Hugging Face `huggingface_hub` library to automatically download the weights into `./checkpoints/`:

```python
from huggingface_hub import snapshot_download

model_name = "gradient-spaces/HouseTour"
local_dir = "./checkpoints/"

snapshot_download(repo_id=model_name, local_dir=local_dir)
```


## 🏋️ Training & Inference
### Residual Diffuser

To train the Residual Diffuser, you can use the following command:
```bash
python -m scripts.train_residual_diffuser
```
The configuration file for the Residual Diffuser is located at `config/residual_diffuser.py`. You can modify the training parameters in this file.

To run inference with the Residual Diffuser, use the following command:
```bash
python -m scripts.test_residual_diffuser
```

### Qwen2-VL-3D

1) To train the LoRA adapter on Qwen2-VL, you can use the following command:
```bash
python train_qwen2_vl.py \
    --data_dir "path/to/dataset" \
    --output-dir "training_checkpoints/lora_adapter"
```
2) To train the Qwen2-VL-3D model, you can use the following command:
```bash
python train_qwen2_vl_3d.py \
    --lora_adapter_dir "path/to/lora_adapter" \
    --data_dir "path/to/dataset" \
    --diffuser_dir "./checkpoints/residual-diffuser" \
    --traj_data "path/to/trajectories.jsonl"
```

To run inference with the Qwen2-VL-3D model on the evaluation set, use the following command:
```bash
python eval_qwen2_vl_3d.py \
    --model-path "./checkpoints/qwen2-vl-3d" \
    --traj-path "./checkpoints/residual-diffuser" \
    --traj-data "path/to/trajectories.jsonl"
```

## Contact
For any questions or issues, please open an issue on the GitHub repository or contact us via email: 

📧 [ata.celen@inf.ethz.ch](mailto:ata.celen@inf.ethz.ch)

## 🙏 Acknowledgements
We thank the authors from [Diffuser](https://github.com/jannerm/diffuser) and [Qwen2-VL](https://huggingface.co/Qwen/Qwen2-VL-7B-Instruct) for open-sourcing their codebases.

## 📄 Citation
If you use this code or the dataset in your research, please cite our paper:
```bibtex
@inproceedings{çelen2025housetour,
  title     = {HouseTour: A Virtual Real Estate A(I)gent},
  author    = {Çelen, Ata and Pollefeys, Marc and Baráth, Dániel Béla and Armeni, Iro},
  booktitle = {Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)},
  year      = {2025}
}
```

{% endraw %}