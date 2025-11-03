import { BrowserMultiFormatReader, NotFoundException } from 'https://cdn.jsdelivr.net/npm/@zxing/library@0.21.0/esm5/index.min.js';

const codeReader = new BrowserMultiFormatReader();
const videoElement = document.getElementById('video');
const resultElement = document.getElementById('result');

async function startScan() {
    try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        if (videoInputDevices.length > 0) {
            // 背面カメラを優先的に選択
            const rearCamera = videoInputDevices.find(device => device.label.toLowerCase().includes('back') || device.label.toLowerCase().includes('背面'));
            const deviceId = rearCamera ? rearCamera.deviceId : videoInputDevices[0].deviceId;

            resultElement.textContent = 'カメラを起動中...';
            console.log(`Using device: ${deviceId}`);

            codeReader.decodeFromVideoDevice(deviceId, 'video', (result, err) => {
                if (result) {
                    console.log(result);
                    resultElement.textContent = result.getText();
                } else if (err && !(err instanceof NotFoundException)) {
                    console.error('Decoding error:', err);
                    resultElement.textContent = `スキャンエラー: ${err.name}`;
                }
            });
        } else {
            console.error("利用可能なカメラが見つかりません。");
            resultElement.textContent = "利用可能なカメラが見つかりません。";
        }
    } catch (err) {
        console.error('Initialization error:', err);
        if (err.name === 'NotAllowedError') {
            resultElement.textContent = 'カメラへのアクセスが拒否されました。ブラウザの設定を確認してください。';
        } else {
            resultElement.textContent = `初期化エラー: ${err.name} - ${err.message}`;
        }
    }
}

startScan();
