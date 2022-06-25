// 定義食物 class
class Food {
    // 定義屬性表示食物對應到的元素，就是 food 裡面的那４個 div
    element: HTMLElement;

    constructor() {
        // 拿到網頁上的 food 元素並賦值給 element，加驚嘆號表示不會是空值
        this.element = document.getElementById('food')!;
    }

    // 定義獲取Ｘ軸方向的方法
    get X() {
        return this.element.offsetLeft;
    }

    // 定義獲取Ｙ軸方向的方法
    get Y() {
        return this.element.offsetTop;
    }



    // 隨機產生食物位置
    change() {

        // this.element.style.left = '80px'
        // this.element.style.top = '100px';

        // 食物大小是 10
        // 食物的位置最小是0， 最大是290
        // 蛇移動一格，一格大小為10 ，所以食物的位置必須要是 10 的倍數

        // 四捨五入：Math.round
        // 所以直接 Math.random() * 29 隨機產生介於 0～29 之間的數字再 Ｘ１０，這樣就能確定是 10 的倍數 

        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        // Math.floor(Math.random() * 30) * 10;//向下取整

        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
    }
}

// 測試食物座標是否隨機產生
// const food = new Food();

// food.change();
// console.log(food.X, food.Y);

export default Food;