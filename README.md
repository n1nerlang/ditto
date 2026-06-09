<div align="center">

# Ditto
**A high-performance, data-driven voxel engine**

[//]: # (Replace the link below with your actual logo)
<img src="md-assets/logo.png" width="200" alt="Ditto Logo">

<br>

**"Ditto: Duplicate your worlds, build your reality."**

<br>

[![gp2 engine. arrgh!](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![License: MIT](https://img.shields.io/badge/License-GPL-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-green.svg)]()

</div>

---

### 📖 About
**Ditto** is a lean, data-driven voxel engine built for developers who want a balance of C++ performance and Lua flexibility. 

### 🚀 Key Features
* **Data-Driven:** All block properties and engine settings are managed via `ditto.json`.
* **Performance First:** Heavy voxel meshing handled in C++, logic in LuaJIT.
* **Developer Friendly:** Auto-formatted code and standard project structure.

### 🏗 Architecture
Ditto is designed to separate the **Runtime** from the **Documentation**:
* `/assets`: Game textures, shaders, and data.
* `/md-assets`: Images and diagrams for this documentation.

### 🛠 Quick Start
```bash
# Clone the repo
git clone [https://github.com/yourusername/ditto.git](https://github.com/yourusername/ditto.git)

# Install tools and start
npm install
love .
