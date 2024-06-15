# MapareatexturePersistentLevel.json parser

## Using

### Requirements

-   Docker
    -   vscode recommended to use devcontainer support

### Setup

1. Checkout locally
1. Load in devcontainer-supporting IDE
    - devcontainer setup should automatically run `make install`
    - `NODE_OPTIONS` env var may require opening a fresh terminal if you
      receieve an error along the lines of
      `TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"`
1. Put a copy of `MapareatexturePersistentLevel.json` into the `data` folder

## Acknowledgements

-   Th3Fanbus - helped identify the file in FModel exports & discussed the approaches to use
