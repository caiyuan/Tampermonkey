
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
gainNode.gain.value = 2; // Half volume
```
