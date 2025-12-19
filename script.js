let startButton = document.getElementById('startButton');
let resultText = document.getElementById('result');
let gameArea = document.getElementById('game-area');

// 名前入力用
let inputArea = document.getElementById('input-area');
let userNameInput = document.getElementById('userNameInput');
let submitNameButton = document.getElementById('submitNameButton');
let inputMessage = document.getElementById('input-message');

let isFirstClick = true;
let startTime;
let endTime;
let savedElapsedTime = 0; // 記録保持用
let retryCount = 0; // 名前拒否カウンター

// ゲームのボタン処理
startButton.addEventListener('click', function() {
    if (isFirstClick) {
        startButton.textContent = 'まだ押さない方が…';
        resultText.textContent = 'もう一回おせよ！何？ビビってんの？';
        startTime = Date.now();
        isFirstClick = false;
    } else {
        endTime = Date.now();
        let elapsedTime = (endTime - startTime) / 1000;
        let difference = Math.abs(elapsedTime - 10);
        savedElapsedTime = elapsedTime; // 秒数を保存しておく

        // ★★★ 成功判定の基準 ★★★
        // 今はテスト用に「1.0秒以内（9秒〜11秒）」なら成功としています。
        // 本番で難しくするなら、ここを 0.01 や 0.001 に書き換えてください。
        if (difference < 0.001) {
            
            // 成功したらゲーム画面を隠して、入力画面を出す
            gameArea.style.display = 'none';
            inputArea.style.display = 'block';
            userNameInput.value = ""; // 入力欄をクリア
            retryCount = 0; // カウンターリセット
            inputMessage.textContent = "【成功】ジュースを奢るから名前を入れろ！";
            inputMessage.style.color = "red";
            inputMessage.style.fontSize = "16px"; // 文字サイズを戻す

        } else {
            // 失敗時のメッセージ分岐
             if (difference < 0.01) {
                // 神レベル（成功判定に入らなかった場合の予備）
                resultText.textContent = "【神記録】" + elapsedTime.toFixed(3) + "秒！ きも！人間じゃないだろ！";
            } else if (difference < 0.1) {
                // かなり惜しい
                resultText.textContent = "記録は" + elapsedTime.toFixed(3) + "秒！あまり調子に乗るなよ！";
            } else {
                // 全然だめ
                resultText.textContent = "雑魚が！記録は" + elapsedTime.toFixed(3) + "秒！雑魚が！";
            }
            startButton.textContent = 'もうやめんの？';
            isFirstClick = true;
        }
    }
});

// 名前決定ボタンの処理（恐怖演出入り）
submitNameButton.addEventListener('click', function() {
    let userName = userNameInput.value.trim();

    // 名前が空欄の場合の処理
    if (userName === "") {
        retryCount++;

        if (retryCount === 1) {
            // 1回目の警告
            alert("【警告】名前を入れろ！\n次、空欄で決定したらデータを抹消して強制終了するぞ。");
            inputMessage.textContent = "【最終警告】ふざけるな。名前を入れろ。";
            inputMessage.style.fontSize = "24px"; // 警告を目立たせる
            inputMessage.style.fontWeight = "bold";
        } else {
            // 2回目の拒否（ホラー演出発動）
            alert("…そうか。なら、いいよ。");
            
            // --- 恐怖の破壊工作開始 ---
            
            // 1. 既存の画面をすべて消去＆背景を黒に
            document.body.innerHTML = ""; 
            document.body.style.backgroundColor = "black";
            document.body.style.overflow = "hidden"; // スクロールバーも消す
            document.title = "404 Not Found"; // タイトルも偽装

            // 2. 「なんで」で埋め尽くす要素を作成
            let horrorDiv = document.createElement("div");
            
            // スタイル設定（画面いっぱいの赤文字）
            horrorDiv.style.color = "red";
            horrorDiv.style.fontFamily = "'Yu Mincho', 'Times New Roman', serif"; // 怖い明朝体
            horrorDiv.style.fontSize = "20px";
            horrorDiv.style.lineHeight = "1.0";
            horrorDiv.style.wordBreak = "break-all"; // 改行して詰め込む
            horrorDiv.style.width = "100vw";
            horrorDiv.style.height = "100vh";
            horrorDiv.style.padding = "10px";
            horrorDiv.style.boxSizing = "border-box"; // パディングを含める
            
            // 「なんで」を大量生成（4000回繰り返す）
            let curseText = "";
            for(let i = 0; i < 4000; i++) {
                curseText += "なんで";
            }
            horrorDiv.textContent = curseText;

            // 画面に追加
            document.body.appendChild(horrorDiv);

            // 3. 一分後（60000ミリ秒後）に完全な虚無にする
            setTimeout(function() {
                document.body.innerHTML = ""; // 文字も全て消す
                // 背景は黒のまま、何も操作できなくなる
            }, 60000); 
            
            // --- 破壊完了 ---
        }
        return;
    }

    // --- 以下、名前がちゃんと入力された場合の成功処理 ---
    let now = new Date();
    let timeString = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " +
                     now.getHours().toString().padStart(2, '0') + ":" + 
                     now.getMinutes().toString().padStart(2, '0') + ":" + 
                     now.getSeconds().toString().padStart(2, '0');

    // 入力画面を隠してゲーム画面に戻す（結果表示）
    inputArea.style.display = 'none';
    gameArea.style.display = 'block';

    resultText.textContent = "10.000秒ピッタリ！とても素晴らしい！\n" +
                             "【挑戦者：" + userName + " 様】\n" +
                             "【達成時刻：" + timeString + "】\n" +
                             "この画面をスクショして上木戸凜成に見せて！ジュースを一杯奢ろう！";
    
    // ゲーム終了状態にする
    startButton.textContent = 'もうやめんの？';
    isFirstClick = true;
});