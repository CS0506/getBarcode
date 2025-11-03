import { BrowserMultiFormatReader } from 'https://cdn.jsdelivr.net/npm/@zxing/library@0.21.0/esm5/index.min.js';

const codeReader = new BrowserMultiFormatReader();
const videoElement = document.getElementById('video');
const resultElement = document.getElementById('result');

// デバイスのカメラを一覧取得
codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
            // カメラが見つかった場合、スキャンを開始
            // 最初のカメラを使用
            codeReader.decodeFromVideoDevice(videoInputDevices[0].deviceId, 'video', (result, err) => {
                if (result) {
                    // バーコードが検出された場合
                    console.log(result);
                    resultElement.textContent = result.getText();
                } else if (err && !(err instanceof ZXing.NotFoundException)) {
                    // エラーが発生した場合 (NotFoundExceptionは無視)
                    console.error(err);
                    resultElement.textContent = 'エラーが発生しました: ' + err;
                }
            });
            console.log(`使用中のカメラ: ${videoInputDevices[0].label}`);
        } else {
            console.error("カメラが見つかりません。");
            resultElement.textContent = "カメラが見つかりません。";
        }
    })
    .catch((err) => {
        console.error(err);
        resultElement.textContent = 'カメラへのアクセスに失敗しました: ' + err;
    });
