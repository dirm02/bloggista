---
layout: project
name: Ziyang Xie Worldgen
slug: ZiYang-xie-WorldGen
category: Uncategorized
image: "https://img.shields.io/badge/\U0001F4C4-Project_Page-orange"
repo_url: https://github.com/ZiYang-xie/WorldGen
indexed_content: "# WorldGen: Generate Any 3D Scene in Seconds [](https://worldgen.github.io/)
  [](https://huggingface.co/LeoXie/WorldGen) [](https://github.com/ZiYang-xie/WorldGen/stargazers/)
  > Author \U0001F468‍\U0001F4BB: [Ziyang Xie](https://ziyangxie.site/) > Contact
  Email \U0001F4E7: [ziyangxie01@gmail.com](mailto:ziyangxie01@gmail.com) > Feel free
  to contact me for any questions or collaborations! ## \U0001F31F Introduction \U0001F30F
  **WorldGen** can generate 3D scenes in seconds from text prompts and images. It
  is a powerful tool for creating 3D environments and scenes for games, simulations,
  robotics, and virtual reality applications. - **Instant 3D Generation** ⚡️ : Create
  full 3D scenes from input data in seconds - **360° Free Exploration** \U0001F9ED
  : WorldGen supports free 360° consistent exploration of the generated 3D scene with
  loop closure. - **Diverse Scenes Support** \U0001F308 : WorldGen supports both indoor
  and outdoor scenes, both realistic and unrealistic scenes in any style. - **Flexible
  Rendering** \U0001F4F8 : WorldGen supports rendering at any resolution with any
  camera setting and trajectory in real-time. Two lines of code to generate a 3D scene
  in seconds ```python # Use our API to generate a 3D scene worldgen = WorldGen()
  worldgen.generate_world(\" \") ``` ## Text-to-Scene Generation ## Image-to-Scene
  Generation &nbsp; &nbsp; --- ## News and TODOs - [x] `01.10.2026` \U0001F525 **[New
  feature]** Add support for ml-sharp (modified to work on 360 images) for better
  GS generation (Currently in experimental mode) - [x] `05.10.2025` \U0001F916 Add
  support for low-vram generation (Only use ~10GB VRAM for generation). - [x] `04.26.2025`
  \U0001F4C4 **New** Relase a project page for WorldGen - [x] `04.22.2025` \U0001F3E1
  Add support for mesh scene generation (Should give better results than splat) -
  [x] `04.21.2025` \U0001F389 Opensource the WorldGen codebase - [x] `04.19.2025`
  \U0001F5BC️ Add support for image-to-scene generation - [x] `04.17.2025` \U0001F4DD
  Add support for text-to-scene generation - [ ] Release technical report and video
  - [ ] Support better background inpainting (Invisible region inpainting) ## \U0001F4E6
  Installation Getting started with WorldGen is simple! ```bash # Clone the repository
  git clone --recursive https://github.com/ZiYang-xie/WorldGen.git cd WorldGen # Create
  a new conda environment conda create -n worldgen python=3.11 conda activate worldgen
  # Install torch and torchvision (with GPU support) pip3 install torch torchvision
  --index-url https://download.pytorch.org/whl/cu128 # Install worldgen pip install
  . # Install pytorch3d dependencies pip install git+https://github.com/facebookresearch/pytorch3d.git
  --no-build-isolation # \U0001F525 [New feature]: If you want to use the ml-sharp
  experimental feature, you need to install the ml-sharp dependencies pip install
  -e submodules/ml-sharp # You should also accept the license of the gated model (FLUX.1-dev).
  # https://huggingface.co/black-forest-labs/FLUX.1-dev # Login to Hugging Face and
  accept the license. # huggingface-cli login ``` ## \U0001F579️ Quick Start / Demos
  We provide a demo script to help you quickly get started and visualize the 3D scene
  in a web browser. The script is powered by [Viser](https://github.com/nerfstudio-project/viser).
  ```bash # Generate a 3D scene from a text prompt python demo.py -p \"A beautiful
  landscape with a river and mountains\" # \U0001F525 New feature: Generate a 3D scene
  using the ml-sharp experimental feature (It may produce better results than the
  default mode) python demo.py -p \"A well-designed cozy bedroom\" --use_sharp # Generate
  a 3D scene from an image python demo.py -i \"path/to/your/image.jpg\" -p \" \" --use_sharp
  # Generate a 3D scene in mesh mode # Make sure you installed my customized viser
  to correctly visualize the mesh without backface culling # pip install git+https://github.com/ZiYang-xie/viser.git
  python demo.py -p \"A beautiful landscape with a river and mountains\" --return_mesh
  ``` After running the demo script, A local viser server will be launched at `http://localhost:8080`,
  where you can explore the generated 3D scene in real-time. ## \U0001F3AE Advanced
  Usage ### WorldGen API Quick start with WorldGen (mode in `t2s` or `i2s`) and generate
  your first 3D scene in seconds: - \U0001F4DD **Text to Scene:** Generate a 3D scene
  from a text prompt ```python # Example using the Python API from worldgen import
  WorldGen device = torch.device(\"cuda\" if torch.cuda.is_available() else \"cpu\")
  worldgen = WorldGen(mode=\"t2s\", device=device, low_vram=False) # Set low_vram
  to True if your GPU VRAM is less than 24GB. splat = worldgen.generate_world(\" \")
  splat.save(\"path/to/your/output.ply\") # Save splat file as a .ply file, which
  can be loaded and visualized using a standard gaussian splatting viewer ``` - \U0001F5BC️
  **Image to Scene:** Generate a 3D scene from an image ```python worldgen = WorldGen(mode=\"i2s\",
  device=device, low_vram=False) # Set low_vram to True if your GPU VRAM is less than
  24GB. image = Image.open(\"path/to/your/image.jpg\") splat = worldgen.generate_world(
  image=image, prompt=\" \", ) ``` - \U0001F3E1 Generate a 3D scene in mesh mode ```python
  mesh = worldgen.generate_world(\""
---
{% raw %}
# WorldGen: Generate Any 3D Scene in Seconds 
<div align="center">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/ZiYang-xie-WorldGen/assets/logo.png" alt="logo" width="300" style="margin-bottom: 210px;"/>  
</div>


<div align="center">

[![📄 Project Page](https://img.shields.io/badge/📄-Project_Page-orange)](https://worldgen.github.io/)
[![Hugging Face Model](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-blue?style=flat)](https://huggingface.co/LeoXie/WorldGen)
![Badge](https://img.shields.io/badge/version-v0.2.0-green)
[![GitHub Stars](https://img.shields.io/github/stars/ZiYang-xie/WorldGen)](https://github.com/ZiYang-xie/WorldGen/stargazers/)

</div>

> Author 👨‍💻: [Ziyang Xie](https://ziyangxie.site/)
> Contact Email 📧: [ziyangxie01@gmail.com](mailto:ziyangxie01@gmail.com)  
> Feel free to contact me for any questions or collaborations!

## 🌟 Introduction
🌏 **WorldGen** can generate 3D scenes in seconds from text prompts and images.  It is a powerful tool for creating 3D environments and scenes for games, simulations, robotics, and virtual reality applications.  
- **Instant 3D Generation** ⚡️ : Create full 3D scenes from input data in seconds
- **360° Free Exploration** 🧭 : WorldGen supports free 360° consistent exploration of the generated 3D scene with loop closure.
- **Diverse Scenes Support** 🌈 : WorldGen supports both indoor and outdoor scenes, both realistic and unrealistic scenes in any style.
- **Flexible Rendering** 📸 : WorldGen supports rendering at any resolution with any camera setting and trajectory in real-time.

Two lines of code to generate a 3D scene in seconds
```python
# Use our API to generate a 3D scene
worldgen = WorldGen()
worldgen.generate_world("<TEXT PROMPT to describe the scene>")
```

## Text-to-Scene Generation
<div align="center">
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/text2scene/indoor1.gif" alt="demo" width="400"/>  
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/text2scene/outdoor1.gif" alt="demo" width="400"/>  
  <br>
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/text2scene/indoor2.gif" alt="demo" width="400"/>  
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/text2scene/outdoor2.gif" alt="demo" width="400"/>  
</div>

## Image-to-Scene Generation
<div align="center">
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/img2scene/painting.png" alt="demo" width=300 height=200 /> &nbsp;
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/img2scene/painting.gif" alt="demo" width=350 height=200/>  
  <br>
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/img2scene/street.png" alt="demo" width="300" height=200 /> &nbsp;
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/img2scene/street.gif" alt="demo" width=350 height=200/>  
</div>

---

## News and TODOs
- [x] `01.10.2026` 🔥 **[New feature]** Add support for ml-sharp (modified to work on 360 images) for better GS generation (Currently in experimental mode)
- [x] `05.10.2025` 🤖 Add support for low-vram generation (Only use ~10GB VRAM for generation).
- [x] `04.26.2025` 📄 **New** Relase a project page for WorldGen
- [x] `04.22.2025` 🏡 Add support for mesh scene generation (Should give better results than splat)
- [x] `04.21.2025` 🎉 Opensource the WorldGen codebase 
- [x] `04.19.2025` 🖼️ Add support for image-to-scene generation
- [x] `04.17.2025` 📝 Add support for text-to-scene generation
- [ ] Release technical report and video
- [ ] Support better background inpainting (Invisible region inpainting)

## 📦 Installation

Getting started with WorldGen is simple!

```bash
# Clone the repository 
git clone --recursive https://github.com/ZiYang-xie/WorldGen.git 
cd WorldGen

# Create a new conda environment
conda create -n worldgen python=3.11
conda activate worldgen

# Install torch and torchvision (with GPU support)
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu128

# Install worldgen
pip install .

# Install pytorch3d dependencies
pip install git+https://github.com/facebookresearch/pytorch3d.git --no-build-isolation

# 🔥 [New feature]: If you want to use the ml-sharp experimental feature, you need to install the ml-sharp dependencies
pip install -e submodules/ml-sharp

# You should also accept the license of the gated model (FLUX.1-dev).
# https://huggingface.co/black-forest-labs/FLUX.1-dev
# Login to Hugging Face and accept the license.
# huggingface-cli login
```

## 🕹️ Quick Start / Demos
We provide a demo script to help you quickly get started and visualize the 3D scene in a web browser. The script is powered by [Viser](https://github.com/nerfstudio-project/viser).
```bash
# Generate a 3D scene from a text prompt
python demo.py -p "A beautiful landscape with a river and mountains"

# 🔥 New feature: Generate a 3D scene using the ml-sharp experimental feature (It may produce better results than the default mode)
python demo.py -p "A well-designed cozy bedroom" --use_sharp

# Generate a 3D scene from an image
python demo.py -i "path/to/your/image.jpg" -p "<Optional: TEXT PROMPT to describe the scene>" --use_sharp

# Generate a 3D scene in mesh mode
# Make sure you installed my customized viser to correctly visualize the mesh without backface culling
# pip install git+https://github.com/ZiYang-xie/viser.git

python demo.py -p "A beautiful landscape with a river and mountains" --return_mesh
```

After running the demo script, A local viser server will be launched at `http://localhost:8080`, where you can explore the generated 3D scene in real-time.


## 🎮 Advanced Usage

### WorldGen API
Quick start with WorldGen (mode in `t2s` or `i2s`) and generate your first 3D scene in seconds:  
- 📝 **Text to Scene:** Generate a 3D scene from a text prompt
```python
# Example using the Python API
from worldgen import WorldGen
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

worldgen = WorldGen(mode="t2s", device=device, low_vram=False) # Set low_vram to True if your GPU VRAM is less than 24GB.
splat = worldgen.generate_world("<TEXT PROMPT to describe the scene>")
splat.save("path/to/your/output.ply") # Save splat file as a .ply file, which can be loaded and visualized using a standard gaussian splatting viewer
```

- 🖼️ **Image to Scene:** Generate a 3D scene from an image
```python
worldgen = WorldGen(mode="i2s", device=device, low_vram=False) # Set low_vram to True if your GPU VRAM is less than 24GB.
image = Image.open("path/to/your/image.jpg")
splat = worldgen.generate_world(
    image=image,
    prompt="<Optional: TEXT PROMPT to describe the image and the scene>",
)
```

- 🏡 Generate a 3D scene in mesh mode
```python
mesh = worldgen.generate_world("<TEXT PROMPT to describe the scene>", return_mesh=True)
o3d.io.write_triangle_mesh("path/to/your/output.ply", mesh) # Save mesh as a .ply file
```

> [!Tip]
> We also support background inpainting for better scene generation, but it's currently an experimental feature, which may not work for all scenes.  
> It can be enabled by setting `WorldGen(inpaint_bg=True)`.
```bash
# If want to use background inpainting feature, install iopaint
pip install iopaint --no-dependencies
```

### Free-viewpoint Exploration in 3D Scene
<div align="center" style="margin-bottom: 15px;">
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/free_explore/beach-converted.gif" alt="demo" width="400"/>  
  <img src="https://github.com/ZiYang-xie/WorldGen/blob/demos/assets/free_explore/indoor-converted.gif" alt="demo" width="400"/>  
  <br>
</div>

---

> [!Note]
> **WorldGen** internally support generating a 3D scene from a 360° panorama image 📸, which related to how WorldGen works:
> You can try it out if you happen to have a 360° panorama (equirectangular) image. Aspect ratio of the panorama image should be 2:1.
```python
 pano_image = Image.open("path/to/your/pano_image.jpg")
 splat = worldgen._generate_world(pano_image=pano_image)
```

## ⭐️ Star History
Give a star to WorldGen if you like it!
[![Star History Chart](https://api.star-history.com/svg?repos=ZiYang-xie/WorldGen&type=Date)](https://www.star-history.com/#ZiYang-xie/WorldGen&Date)

## 📚 Citation
If you find this project useful, please consider citing it as follows:
```bibtex
@misc{worldgen2025ziyangxie,
  author = {Ziyang Xie},
  title = {WorldGen: Generate Any 3D Scene in Seconds},
  year = {2025},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/ZiYang-xie/WorldGen}},
}
```

---

## 🤝 Acknowledgements
This project is built on top of the follows, please consider citing them if you find them useful:
- [Unik3D](https://github.com/lpiccinelli-eth/UniK3D)
- [Layerpano3D](https://github.com/3DTopia/LayerPano3D)
- [Viser](https://github.com/nerfstudio-project/viser)
- [FLUX.1](https://huggingface.co/black-forest-labs/FLUX.1-dev)
- [OneFormer](https://github.com/SHI-Labs/OneFormer)
- [LaMa](https://github.com/saic-mdal/lama)
- [ml-sharp](https://github.com/apple/ml-sharp)

Some of the core methods and ideas in this project are inspired by the following projects, special thanks to them:
- [WonderWorld](https://kovenyu.com/wonderworld/) [RGBD to GS conversion]
- [WorldSheet](https://worldsheet.github.io/) [Mesh Generation]

{% endraw %}