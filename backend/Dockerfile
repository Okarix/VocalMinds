# Stage 1: Build stage
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Production stage
FROM node:18-slim

# Install Python and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built files and package.json from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy voice_analyze folder and requirements.txt
COPY /voice_analyze /app/voice_analyze
COPY /voice_analyze/requirements.txt /app/voice_analyze/requirements.txt

# Output the contents of requirements.txt
RUN cat /app/voice_analyze/requirements.txt

# Install additional system dependencies
RUN apt-get update && \
    apt-get install -y build-essential libssl-dev libffi-dev python3-dev ffmpeg

# Install Python libraries one by one for diagnostics with verbose output
RUN pip3 install --no-cache-dir librosa==0.10.2.post1 && echo "librosa installed" && \
    pip3 install --no-cache-dir numpy==1.26.0 && echo "numpy installed" && \
    pip3 install --no-cache-dir soundfile==0.12.1 && echo "soundfile installed" && \
    pip3 install --no-cache-dir matplotlib==1.5.3 && echo "matplotlib installed" && \
    pip3 install --no-cache-dir praat-parselmouth==0.4.3 && echo "praat-parselmouth installed" && \
    pip3 install --no-cache-dir pydub==0.25.1 && echo "pydub installed" && \
    pip3 install --no-cache-dir audioread==3.0.1 && echo "audioread installed" && \
    pip3 install --no-cache-dir certifi==2024.7.4 && echo "certifi installed" && \
    pip3 install --no-cache-dir cffi==1.16.0 && echo "cffi installed" && \
    pip3 install --no-cache-dir charset-normalizer==3.3.2 && echo "charset-normalizer installed" && \
    pip3 install --no-cache-dir cycler==0.10.0 && echo "cycler installed" && \
    pip3 install --no-cache-dir decorator==5.1.1 && echo "decorator installed" && \
    pip3 install --no-cache-dir idna==3.7 && echo "idna installed" && \
    pip3 install --no-cache-dir joblib==1.4.2 && echo "joblib installed" && \
    pip3 install --no-cache-dir kiwisolver==1.3.1 && echo "kiwisolver installed" && \
    pip3 install --no-cache-dir lazy_loader==0.4 && echo "lazy_loader installed" && \
    pip3 install --no-cache-dir llvmlite==0.43.0 && echo "llvmlite installed" && \
    pip3 install --no-cache-dir msgpack==1.0.8 && echo "msgpack installed" && \
    pip3 install --no-cache-dir numba==0.60.0 && echo "numba installed" && \
    pip3 install --no-cache-dir packaging==24.1 && echo "packaging installed" && \
    pip3 install --no-cache-dir pillow==8.4.0 && echo "pillow installed" && \
    pip3 install --no-cache-dir platformdirs==4.2.2 && echo "platformdirs installed" && \
    pip3 install --no-cache-dir pooch==1.8.2 && echo "pooch installed" && \
    pip3 install --no-cache-dir pycparser==2.22 && echo "pycparser installed" && \
    pip3 install --no-cache-dir pyparsing==2.4.7 && echo "pyparsing installed" && \
    pip3 install --no-cache-dir python-dateutil==2.9.0.post0 && echo "python-dateutil installed" && \
    pip3 install --no-cache-dir requests==2.32.3 && echo "requests installed" && \
    pip3 install --no-cache-dir scikit-learn==1.5.1 && echo "scikit-learn installed" && \
    pip3 install --no-cache-dir scipy==1.14.0 && echo "scipy installed" && \
    pip3 install --no-cache-dir six==1.16.0 && echo "six installed" && \
    pip3 install --no-cache-dir soxr==0.3.7 && echo "soxr installed" && \
    pip3 install --no-cache-dir threadpoolctl==3.5.0 && echo "threadpoolctl installed" && \
    pip3 install --no-cache-dir typing_extensions==4.12.2 && echo "typing_extensions installed" && \
    pip3 install --no-cache-dir urllib3==2.2.2 && echo "urllib3 installed"

# Output installed library versions
RUN pip3 freeze

# Expose port 3000 for the application
EXPOSE 3000

# Command to run the application
CMD ["node", "./dist/index.js"]
