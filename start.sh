
#!/bin/bash

# Check if .venv directory exists
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate the virtual environment
source .venv/bin/activate

# Install required packages
echo "Installing requirements..."
pip install -r requirements.txt

# Start the application
echo "Starting the application..."
export FLASK_APP=run.py
export FLASK_ENV=development
Flask run