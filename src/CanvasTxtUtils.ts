export class CanvasTxtUtils {
    private static text: string = "Hello World";
    private static ctx: CanvasRenderingContext2D;
    private static txtOptions: ITextOptions;

    static init(ctx: CanvasRenderingContext2D, options: ITextOptions) {
        this.ctx = ctx;
        this.txtOptions = options;

        requestAnimationFrame(() => this.render());

        return this;
    }

    private static render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.update(this.text);
        requestAnimationFrame(() => this.render());
    }

    ///绘制文本
    private static update(txt: string, options?: ITextOptions) {
        Object.assign(this.txtOptions, options);
        this.text = txt;

        let {
            x,
            y,
            fontSize, 
            fontFamily, 
            fontColor,
            textAlign, 
            textBaseline,
        } =  this.txtOptions;

        let ctx = this.ctx;
        ctx.font = `${Math.max(fontSize, 12)}px ${fontFamily}`;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = fontColor;
        ctx.fillText(txt, x, y);
    }

    ///字体变大变小, 
    public static updateFontSize(diff: number = 2) {
        let fontSize = this.txtOptions.fontSize + diff;
        this.txtOptions.fontSize = Math.max(fontSize, 12); //强制最小字体12px吧
    }

    ///移动
    public static fontMoveBy(x: number, y: number) {
        this.txtOptions.x += x;
        this.txtOptions.y += y;
    }

    ///设置文本和文本颜色
    public static setTxt(txt: string, color: string, fontFamily: string) {
        this.text = txt;
        this.txtOptions.fontColor = color;
        this.txtOptions.fontFamily = fontFamily;
    }
}

export interface ITextOptions {
    x: number;
    y: number;
    fontSize: number;
    fontFamily?: string;
    fontColor?: string;
    textAlign?: any;
    textBaseline?: any;
}