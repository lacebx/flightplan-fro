#!/bin/bash

LOCAL_DIR="/home/lace/Documents/flightplan/"  # Updated to your local project path
REMOTE_USER="ubuntu"                          # Updated to your remote server user
REMOTE_SERVER="project2.eaglesoftwareteam.com"  # Updated to your remote server address
REMOTE_DIR="/var/www/html/2025/flight-plan/t8/"  # Updated to your remote directory
SSH_KEY="/home/lace/Downloads/WebServer.pem"  # Path to your SSH private key

# Use rsync to copy files, specifying the SSH key
rsync -avz --delete -e "ssh -i $SSH_KEY" "$LOCAL_DIR" "$REMOTE_USER@$REMOTE_SERVER:$REMOTE_DIR"