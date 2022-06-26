// 定義分數計算
class ScorePanel {
    // 紀錄分數跟等級
    score = 0;
    level = 1;

    // 分數跟等級的元素在構造函數中初始化
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    // 宣告 maxLevel 變數來限制等級
    maxLevel: number;

    // 宣告 upScore 變數，來
    upScore: number;

    // maxLevel: number = 10 代表預設值為 10
    constructor(maxLevel: number = 10, upScore: number = 10) {

        // 加驚嘆號表示不會是空值
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;

        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 增加分數
    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';

        // 判斷整除後的餘數是否等於０，是就升級
        if (this.score % this.upScore === 0) this.levelUp();
    }


    // 提升等级
    levelUp() {
        // 設定等級上限，例如超過多少後就不要再升級了
        if (this.level < this.maxLevel) this.levelEle.innerHTML = ++this.level + '';
    }
}


const scorePanel = new ScorePanel();

// 確認分數數字
// scorePanel.addScore();


// for (let i = 0; i < 200; i++) {
//     scorePanel.addScore();
// }

export default ScorePanel;