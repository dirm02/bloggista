---
layout: project
name: Broskicodes Sx127x Hal
slug: broskicodes-sx127x-hal
category: EE-kicad-3D-Robotic
image: "/assets/images/portfolio-placeholder.svg"
repo_url: https://github.com/dirm02/mystars/tree/master/starred-readmes/broskicodes-sx127x-hal
indexed_content: "# SX127X ## Introduction This library implements firmware for driving
  the SX127X LoRa transceiver IC using STM32 HAL. The library was specifically designed
  around the RFM95 module, but it should work with any SX127X module with minimal
  changes. ## Functionality This library mainly serves to abstract the raw SPI calls
  needed to control the SX127X. While the IC supports both LoRa and FSK modulations,
  only LoRa is implemented in this library. All important LoRa parameters can be configured,
  including **frequency**, **bandwidth**, **spread factor**, **crc**, **preamble length**,
  **power amplification**, and **implicit/explicit header**. 4 methods of operation
  are supported, but only 2 are currently implemented: - Transmit only mode (implemented)
  - Continuous receive mode (implemented) - RX/TX mode (not implemented) - Single
  receive mode (not implemented) The library exposes 4 key functions: - **sx127x_start_rx**
  -- put the module into continuous receive mode - **sx127x_schedule_tx** -- add a
  packet to the internal ring buffer for future transmission - **sx127x_read_packet**
  -- read the latest received packet into a ring buffer for processing - **sx127x_send_packet**
  -- transmit the packet at the head of the tx ring buffer See source code for specifc
  implementation details."
---
{% raw %}
# SX127X
## Introduction
This library implements firmware for driving the SX127X LoRa transceiver IC using STM32 HAL. The library was specifically designed around the RFM95 module, but it should work with any SX127X module with minimal changes. 
## Functionality
This library mainly serves to abstract the raw SPI calls needed to control the SX127X. While the IC supports both LoRa and FSK modulations, only LoRa is implemented in this library.

All important LoRa parameters can be configured, including **frequency**, **bandwidth**, **spread factor**, **crc**, **preamble length**, **power amplification**, and **implicit/explicit header**.

4 methods of operation are supported, but only 2 are currently implemented:
- Transmit only mode (implemented)
- Continuous receive mode (implemented)
- RX/TX mode (not implemented)
- Single receive mode (not implemented)

The library exposes 4 key functions:
- **sx127x_start_rx** -- put the module into continuous receive mode
- **sx127x_schedule_tx** -- add a packet to the internal ring buffer for future transmission
- **sx127x_read_packet** -- read the latest received packet into a ring buffer for processing
- **sx127x_send_packet** -- transmit the packet at the head of the tx ring buffer

See source code for specifc implementation details.
{% endraw %}