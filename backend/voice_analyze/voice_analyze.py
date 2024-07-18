import sys
import os
import librosa
import matplotlib.pyplot as plt
import numpy as np
import parselmouth
from parselmouth.praat import call
from pydub import AudioSegment

def convert_to_wav(file_path):
    audio = AudioSegment.from_file(file_path)
    wav_path = file_path.rsplit('.', 1)[0] + '.wav'
    audio.export(wav_path, format='wav')
    return wav_path

def load_audio(file_path):
    y, sr = librosa.load(file_path, sr=None)
    return y, sr

def analyze_pitch_with_librosa(y, sr):
    pitches, magnitudes = librosa.core.piptrack(y=y, sr=sr)
    pitch = [pitches[magnitudes[:, i].argmax(), i] for i in range(magnitudes.shape[1])]
    return pitch

def analyze_timbre(y, sr):
    spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
    return spectral_centroid

def analyze_dynamics(y):
    rms = librosa.feature.rms(y=y)
    return rms

def analyze_articulation(file_path):
    try:
        snd = parselmouth.Sound(file_path)
        intensity = call(snd, "To Intensity", 75, 0.0, "yes")
        intensity_values = intensity.values.T
        return intensity_values
    except parselmouth.PraatError as e:
        print(f"Error analyzing articulation: {e}", file=sys.stderr)
        return np.array([])

def analyze_rhythm(y, sr):
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
    return tempo, beats

def analyze_breath_control(y, sr):
    rms = librosa.feature.rms(y=y)
    return rms

def analyze_vibrato(y, sr):
    pitches, magnitudes = librosa.core.piptrack(y=y, sr=sr)
    pitch = [pitches[magnitudes[:, i].argmax(), i] for i in range(magnitudes.shape[1])]
    pitch = np.array(pitch)
    pitch = pitch[pitch > 0]
    return pitch

def plot_analysis_results(results, output_path):
    num_plots = len(results)
    fig, axs = plt.subplots(num_plots, 1, figsize=(10, 2 * num_plots))
    plt.subplots_adjust(hspace=0.8)
    
    for i, (title, data) in enumerate(results.items()):
        if isinstance(data, list) and len(data) > 0:
            axs[i].plot(data)
        elif isinstance(data, np.ndarray) and data.size > 0:
            axs[i].plot(data)
        else:
            axs[i].text(0.5, 0.5, 'No data available', horizontalalignment='center', verticalalignment='center')
        axs[i].set_title(title, fontsize=8, loc='left', x=0.51)
        axs[i].tick_params(axis='both', which='major', labelsize=6)
        axs[i].title.set_fontsize(10)
        axs[i].title.set_size(8)
        axs[i].xaxis.label.set_size(6)
        axs[i].yaxis.label.set_size(6)

    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()

def main(file_path):
    # Convert file to .wav if it's not already in .wav format
    if not file_path.endswith('.wav'):
        file_path = convert_to_wav(file_path)

    y, sr = load_audio(file_path)

    pitch_librosa = analyze_pitch_with_librosa(y, sr)
    timbre = analyze_timbre(y, sr)
    dynamics = analyze_dynamics(y)
    articulation = analyze_articulation(file_path)
    rhythm_tempo, rhythm_beats = analyze_rhythm(y, sr)
    breath_control = analyze_breath_control(y, sr)
    vibrato = analyze_vibrato(y, sr)

    results = {
        "Pitch (Librosa)": pitch_librosa,
        "Timbre (Spectral Centroid)": timbre[0],
        "Dynamics (RMS)": dynamics[0],
        "Articulation (Intensity)": articulation,
        "Rhythm (Tempo)": [rhythm_tempo] * len(rhythm_beats),
        "Breath Control (RMS)": breath_control[0],
        "Vibrato (Pitch)": vibrato
    }

    if not os.path.exists('results'):
        os.makedirs('results')

    result_files = os.listdir('results')
    next_index = len(result_files) + 1
    output_path = f"results/analysis_results_{next_index}.png"

    plot_analysis_results(results, output_path)

    # Extract the first value from rhythm_tempo for formatting
    rhythm_tempo_value = rhythm_tempo if np.isscalar(rhythm_tempo) else rhythm_tempo[0]

    analysis_text = (
        f"Pitch Analysis: {np.mean(pitch_librosa):.2f} Hz\n"
        f"Timbre Analysis (Spectral Centroid): {np.mean(timbre):.2f}\n"
        f"Dynamics Analysis (RMS): {np.mean(dynamics):.2f}\n"
        f"Articulation Analysis (Intensity): {np.mean(articulation):.2f}\n"
        f"Rhythm Analysis (Tempo): {rhythm_tempo_value:.2f} BPM\n"
        f"Breath Control (RMS): {np.mean(breath_control):.2f}\n"
        f"Vibrato Analysis (Pitch): {np.mean(vibrato):.2f} Hz"
    )

    return output_path, analysis_text

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_audio.py <file_path>")
    else:
        file_path = sys.argv[1]
        output_path, analysis_text = main(file_path)
        print(output_path)
        print(analysis_text)
