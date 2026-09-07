#!/usr/bin/env bash
echo "Starting local web server for Matthias Groetsch Studio Website..."
if command -v npx &> /dev/null; then
    npx -y serve -p 3000 .
elif command -v python3 &> /dev/null; then
    python3 -m http.server 3000
else
    python -m http.server 3000
fi
