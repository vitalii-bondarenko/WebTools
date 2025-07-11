## ArduPilot Web Tools

This repository contains a number of web based tools for targeted ArduPilot log review and insight. These tools are live on [ardupilot.org](https://firmware.ardupilot.org/Tools/WebTools). For general review see [UAVLogViewer](https://github.com/ArduPilot/UAVLogViewer).

## Development setup

These steps allow hosting of the tools locally for development purposes or for use without a internet connection.

Clone this repository (or your fork) and update the submodules:

```console
git clone --recurse-submodules https://github.com/ArduPilot/WebTools.git
```

Host locally using python by running the following command in the root of the repo:

```
python3 -m http.server --bind 127.0.0.1
```

The landing page can then be found at http://127.0.0.1:8000/

You need to keep your submodules update. When you rebase, or switch branches, update them like so:
```console
git submodule update --init --recursive
```

If deploying via CI (for example using the provided GitHub Actions workflows),
ensure the checkout step fetches submodules:

```yaml
- uses: actions/checkout@v4
  with:
    submodules: recursive
```

## VSCode

This repository contains VSCode launch configurations for debugging with Chrome and Edge. WebTools are either hosted with python as above or using the [LiveServer extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) which enables auto-reload. More information on debugging with VSCode [here](https://code.visualstudio.com/docs/editor/debugging).

<p align="center">
<img src="images/VSCode%20debug.png" width="80%">
</p>
