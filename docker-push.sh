#!/bin/bash

# # Update Butler
./butler upgrade

# # Add patch version
# yarn version --patch

# # Create builds
yarn && yarn dist


# Get API Key
api=${BUTLER_API_KEY}

# Get Version Number
version=$( yarn -s ver )

# Get Linux Path

linux=$( find ./bin/linux -name "*$version*" -name "*x86_64*")
linux_32=$( find ./bin/linux -name "*$version*" -name "*i386*")
linux_arm7vl=$( find ./bin/linux -name "*$version*" -name "*armv7l*")
linux_arm64=$( find ./bin/linux -name "*$version*" -name "*arm64*")


win=$( find ./bin/win -name "*$version*" ! -name "*blockmap*" )
mac=$( find ./bin/mac -name "*$version*" )


echo $api
echo $version
echo $linux
echo $win
echo $mac


# Binary Versions
./butler push $linux baj/pomodolfo:linux --userversion $version     #--dry-run
./butler push $linux_32 baj/pomodolfo:linux_i386 --userversion $version     #--dry-run
./butler push $linux_arm7vl baj/pomodolfo:linux_arm7vl --userversion $version     #--dry-run
./butler push $linux_arm64 baj/pomodolfo:arm64 --userversion $version     #--dry-run
./butler push $win baj/pomodolfo:windows --userversion $version     #--dry-run
./butler push $mac baj/pomodolfo:mac --userversion $version         #--dry-run

# portable Versions
#./butler push ./bin/linux/linux-unpacked baj/speechr:linux_portable --userversion $version
./butler push ./bin/win/win-unpacked baj/pomodolfo:windows_portable --userversion $version
./butler push ./bin/mac/mac baj/pomodolfo:mac_portable --userversion $version
