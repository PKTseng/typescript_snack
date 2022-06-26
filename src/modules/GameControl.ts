// 引入並整合其他的 class
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 控制遊戲跟其他的 class ，
class GameControl {

    // 定義三個屬性：蛇、食物、分數
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    direction: string = ''; // 建立屬性來儲存蛇的移動方向（按鍵方向），預設為空值
    playGameStatus = true;  // 建立屬性來記錄遊戲是否結束

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 2);

        this.init();
    }

    //調用此方法後會初始化並開始遊戲
    init() {
        // 綁定監聽 keydown 事件
        // bind 創建一個新函數，然後將 this 綁定成 this.keydownHandler 函式的 this
        document.addEventListener('keydown', this.keydownHandler.bind(this));

        this.run(); //讓蛇移動，但是這樣要按一下才會移動，要讓蛇可以一直移動的話要加計時器
    }

    // 按鍵鍵盤後會執行
    keydownHandler(event: KeyboardEvent) {

        // 如果不知道方向鍵在鍵盤上的 value 值可以用 event.key 查看
        // chrome 方向鍵為： ArrowUp、ArrowDown、 ArrowRight、ArrowLeft
        // IE 方向鍵為： Up、Down、 Right、Left
        // console.log(event.key);

        // 將按鍵的 value 賦值到 direction 變數
        this.direction = event.key
    }

    // 控制蛇移動的方向
    run() {

        // 依照 this.direction 的方向來改變蛇的位置
        // 向上 top 減少
        // 向下 top 增加
        // 向左 left 減少
        // 向右 left 增加 

        // 拿到蛇目前的座標
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 依照方向鍵方向修改Ｘ跟Ｙ值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10; // 向上移動 top 減少
                break;
            case "ArrowDown":
            case "Down":
                Y += 10; // 向下移動 top 增加
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10; // 向左移動 left 減少
                break;
            case "ArrowRight":
            case "Right":
                X += 10; // 向右移動 left 增加
                break;
        }

        // 檢查蛇是否有吃到食物
        this.checkSnackEatFood(X, Y);

        // 修改蛇的 X 和 Y 值，直到發生錯誤時直接停止遊戲
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            alert(e.message + '遊戲結束'); // 發現錯誤時會進入到 catch ，只要出現錯誤遊戲就會結束
            this.playGameStatus = false; //將遊戲停止
        }

        // 讓蛇可以持續移動的計時器

        // 這樣會蛇確實會移動但是這樣會是無窮迴圈，只要時間結束就會重新呼叫 run 函式
        // setTimeout(this.run.bind(this),300)

        // 隨著等級增加蛇移動的速度也會越來越快，但是等級最高只有 10 所以最快速度只有到 30 ms
        // (this.scorePanel.level - 1) * 30 

        // 當 this.playGameStatus 為 true 時才執行 setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
        clearTimeout();
        this.playGameStatus && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    checkSnackEatFood(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            console.log('已吃到食物');

            this.food.change();  // 重置食物位置
            this.scorePanel.addScore(); // 增加分數
            this.snake.addBody();  // 增加蛇的身體
        }
    }
}

export default GameControl;



