---
layout: project
name: Mikewang000000 Fakehttp
slug: MikeWang000000-FakeHTTP
category: File manager -Network-nmap
image: "/assets/images/portfolio-placeholder.svg"
repo_url: https://github.com/MikeWang000000/FakeHTTP
indexed_content: "# FakeHTTP Obfuscate all your TCP connections into HTTP protocol,
  using Netfilter Queue (NFQUEUE). [[ 中文文档 ]](https://github.com/MikeWang000000/FakeHTTP/wiki)
  ## Quick Start ``` fakehttp -h www.example.com -i eth0 ``` ## Usage ``` Usage: fakehttp
  [options] Interface Options: -a work on all network interfaces (ignores -i) -i work
  on specified network interface Payload Options: -b use TCP payload from binary file
  -e hostname for HTTPS obfuscation -h hostname for HTTP obfuscation General Options:
  -0 process inbound connections -1 process outbound connections -4 process IPv4 connections
  -6 process IPv6 connections -d run as a daemon -k kill the running process -s enable
  silent mode -w write log to instead of stderr Advanced Options: -f skip firewall
  rules -g disable hop count estimation -m fwmark for bypassing the queue -n netfilter
  queue number -r duplicate generated packets for times -t TTL for generated packets
  -x set the mask for fwmark -y raise TTL dynamically to % of estimated hops -z use
  iptables commands instead of nft ``` ## License GNU General Public License v3.0"
---
{% raw %}
# FakeHTTP

Obfuscate all your TCP connections into HTTP protocol, using Netfilter Queue (NFQUEUE).

[[ 中文文档 ]](https://github.com/MikeWang000000/FakeHTTP/wiki)


## Quick Start

```
fakehttp -h www.example.com -i eth0
```


## Usage

```
Usage: fakehttp [options]

Interface Options:
  -a                 work on all network interfaces (ignores -i)
  -i <interface>     work on specified network interface

Payload Options:
  -b <file>          use TCP payload from binary file
  -e <hostname>      hostname for HTTPS obfuscation
  -h <hostname>      hostname for HTTP obfuscation

General Options:
  -0                 process inbound connections
  -1                 process outbound connections
  -4                 process IPv4 connections
  -6                 process IPv6 connections
  -d                 run as a daemon
  -k                 kill the running process
  -s                 enable silent mode
  -w <file>          write log to <file> instead of stderr

Advanced Options:
  -f                 skip firewall rules
  -g                 disable hop count estimation
  -m <mark>          fwmark for bypassing the queue
  -n <number>        netfilter queue number
  -r <repeat>        duplicate generated packets for <repeat> times
  -t <ttl>           TTL for generated packets
  -x <mask>          set the mask for fwmark
  -y <pct>           raise TTL dynamically to <pct>% of estimated hops
  -z                 use iptables commands instead of nft

```


## License

GNU General Public License v3.0

{% endraw %}