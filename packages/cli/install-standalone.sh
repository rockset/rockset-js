# The ISC License (ISC)
#
# Copyright © Heroku 2017
#
# Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
#

#!/bin/bash
{
    set -e
    SUDO=''
    if [ "$(id -u)" != "0" ]; then
      SUDO='sudo'
      echo "This script requires superuser access."
      echo "You will be prompted for your password by sudo."
      # clear any previous sudo permission
      sudo -k
    fi


    # run inside sudo
    $SUDO bash <<SCRIPT
  set -e
  set -x

  echoerr() { echo "\$@" 1>&2; }

  if [[ ! ":\$PATH:" == *":/usr/local/bin:"* ]]; then
    echoerr "Your path is missing /usr/local/bin, you need to add this to use this installer."
    exit 1
  fi

  if [ "\$(uname)" == "Darwin" ]; then
    OS=darwin
  elif [ "\$(expr substr \$(uname -s) 1 5)" == "Linux" ]; then
    OS=linux
  else
    echoerr "This installer is only supported on Linux and MacOS"
    exit 1
  fi

  ARCH="\$(uname -m)"
  if [ "\$ARCH" == "x86_64" ]; then
    ARCH=x64
  elif [[ "\$ARCH" == arm* ]]; then
    ARCH=arm64
  else
    echoerr "unsupported arch: \$ARCH"
    exit 1
  fi

  mkdir -p /usr/local/lib
  cd /usr/local/lib
  rm -rf rockset
  rm -rf ~/.local/share/rockset/client
  BASE_URL="https://rockset-cli-artifacts.s3.amazonaws.com/channels/stable/rockset-\$OS-\$ARCH"
  if [ \$(command -v xz) ]; then
    URL="\$BASE_URL.tar.xz"
    TAR_ARGS="xJ"
  else
    URL="$BASE_URL.tar.gz"
    TAR_ARGS="xz"
  fi
  echo "Installing CLI from \$URL"
  if [ \$(command -v curl) ]; then
    curl "\$URL" | tar "\$TAR_ARGS"
  else
    wget -O- "\$URL" | tar "\$TAR_ARGS"
  fi
  # delete old rockset bin if exists
  rm -f \$(command -v rockset) || true
  rm -f /usr/local/bin/rockset
  ln -s /usr/local/lib/rockset/bin/rockset /usr/local/bin/rockset

  # on alpine (and maybe others) the basic node binary does not work
  # remove our node binary and fall back to whatever node is on the PATH
  /usr/local/lib/rockset/bin/node -v || rm /usr/local/lib/rockset/bin/node

SCRIPT
  # test the CLI
  LOCATION=$(command -v rockset)
  echo "rockset installed to $LOCATION"
  rockset --version
  echo "Please restart your terminal to complete installation."
}
