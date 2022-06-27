class Snake {
  // 定義蛇頭
  head: HTMLElement;

  // 定義蛇身，包括蛇頭
  bodies: HTMLCollection;

  // 获取蛇的容器
  element: HTMLElement;

  constructor() {
    //拿到 snack 裡面的所有 div，並且讓 this.head 型別為 HTMLElement
    this.head = document.querySelector('#snake > div') as HTMLElement;

    // 拿到 snake 裡面的 div
    this.element = document.getElementById('snake')!;
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 定義 獲取蛇頭的Ｘ座標
  get X() {
    return this.head.offsetLeft;
  }

  // 定義 獲取蛇頭的Ｙ座標
  get Y() {
    return this.head.offsetTop
  }

  // 定義 設定蛇頭的座標
  set X(value: number) {

    // 當 new value 跟 old value 一樣的話，不做任何動作
    if (this.X === value) return;

    // X value 的範圍必須在 0~290 之間（框框裡面），超出範圍就代表蛇撞牆了
    if (value < 0 || value > 290) throw new Error("蛇撞牆了");

    // 修改Ｘ時，是在修改水瓶座標，當蛇向左移動時不能掉頭，同理反方向也是
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // console.log('水平方向掉頭了');

      // 發生掉頭後，讓蛇方向繼續移動
      if (value > this.X) {
        // 如果新值 value 大於 舊值Ｘ，則直接說明蛇在向右走，此時發生掉頭應該讓蛇繼續向左走
        value = this.X - 10;
      } else {
        // 向左走
        value = this.X + 10;
      }
    }

    this.moveBody(); //移動蛇身體
    this.head.style.left = value + 'px';
    this.checkHeadBody();// 檢查有沒有撞到自己
  }

  set Y(value: number) {
    // 當 new value 跟 old value 一樣的話，不做任何動作
    if (this.Y === value) return;

    // X value 的範圍必須在 0~290 之間（框框裡面），超出範圍就代表蛇撞牆了
    if (value < 0 || value > 290) throw new Error("蛇撞牆了");


    // 修改Ｙ時，是在修改垂直座標，當蛇向下移動時不能掉頭，同理反方向也是
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // console.log('垂直方向掉頭了');

      // 發生掉頭後，讓蛇方向繼續移動
      if (value > this.Y) {
        // 如果新值 value 大於舊值Ｙ，則直接說明蛇在向下走，此時發生掉頭應該讓蛇繼續向上走
        value = this.Y - 10;
      } else {
        // 向下走
        value = this.Y + 10;
      }
    }

    this.moveBody(); // 移動蛇身體
    this.head.style.top = value + 'px';
    this.checkHeadBody(); // 檢查有沒有撞自己
  }

  // 吃到食物後身體增加
  addBody() {
    // 在  element 加入 div，並且加到结束標籤前
    this.element.insertAdjacentHTML("beforeend", "<div></div>")
  }

  // 增加蛇身體移動方法
  moveBody() {
    // 從後面往前改，將後面的身體位置設定到前面的身體位置
    // 第４個 ＝第３個位置
    // 第３個 ＝第２個位置
    // 第２個 ＝第１個位置

    //取得所有身體位置， 因為０是舌頭的位置，所以不能等於０
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 取得前面身體的位置，並且用類型斷言
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      console.log(X, Y);

      // 把這個值設定到當前身體上，並且用類型斷言
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';

    }
  }

  // 確認蛇使否有撞到自己的身體
  checkHeadBody() {
    // 獲取所有的身體，檢查是否和蛇頭的座標發生重疊
    for (let i = 1; i < this.bodies.length; i++) {
      let snackBody = this.bodies[i] as HTMLElement;

      // 判斷蛇頭撞到了自己，遊戲結束
      if (this.X === snackBody.offsetLeft && this.Y === snackBody.offsetTop) throw new Error("蛇撞到自己了");
    }
  }
}

export default Snake;