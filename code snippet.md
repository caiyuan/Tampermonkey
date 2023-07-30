
## 音量增益

```js
// 获取视频元素
var video = document.querySelector('video');

// 创建一个 AudioContext 实例
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 使用视频元素创建 MediaElementAudioSourceNode
var source = audioCtx.createMediaElementSource(video);

// 创建一个 GainNode 来控制音频的音量
var gainNode = audioCtx.createGain();

// 将 source 连接到 gain node
source.connect(gainNode);

// 将 gain node 连接到 audio context 的 destination
gainNode.connect(audioCtx.destination);

// 改变音量
gainNode.gain.value = 2;
```

```js
class AudioController {
    static audioContext = new (window.AudioContext || window.webkitAudioContext)();
    static gainNode = AudioController.audioContext.createGain();
    static instance = new AudioController();
    mediaElements = new Set();

    connect(mediaElement) {
        if (this.mediaElements.has(mediaElement)) {
            return AudioController.instance;
        }

        this.mediaElements.add(mediaElement);
        const sourceNode = AudioController.audioContext.createMediaElementSource(mediaElement);
        sourceNode.connect(AudioController.gainNode).connect(AudioController.audioContext.destination);
        return AudioController.instance;
    }

    setVolume(volumeLevel) {
        const validVolumeLevel = Math.max(0, Math.min(6, volumeLevel));
        AudioController.gainNode.gain.value = validVolumeLevel;
        return AudioController.instance;
    }

    static async loadVideo(video, volumeLevel) {
        try {
            const response = await fetch(video.src);
            if (response.ok) {
                const videoBlob = await response.blob();
                const videoURL = window.URL.createObjectURL(videoBlob);
                video.src = videoURL;

                AudioController.instance.connect(video).setVolume(volumeLevel);
            } else {
                throw new Error(`Failed to load video: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const video = document.querySelector('video');
AudioController.loadVideo(video, 3);
```
