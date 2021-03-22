import * as PIXI from "pixi.js";

import { CanvasTxtUtils } from "./CanvasTxtUtils";
import "./style.scss";


///一、原生方式
(() => {
    let canvas = document.querySelector<HTMLCanvasElement>('#root canvas');
    canvas.width = 700;
    canvas.height = 300;

    CanvasTxtUtils
        .init(canvas.getContext('2d'), {
            x: 100,
            y: 100,
            fontSize: 50,
            fontFamily: "Simsun",
            fontColor: "red",
            textBaseline: "top",
            textAlign: "left",
        });


    let btns = document.querySelectorAll(".tools button");
    for (let i = 0, len = btns.length; i < len; i++) {
        btns[i].addEventListener('click', () => {
            if (i < 2)
                CanvasTxtUtils.updateFontSize(i === 0 ? 2 : -2);
            else if (i < 4)
                CanvasTxtUtils.fontMoveBy(10 * (i == 2 ? -1 : 1), 0);
            else
                CanvasTxtUtils.setTxt("Hello Canvas", "rgb(145, 35, 78)", "bemino");
        });
    }
})();


///2、pixijs方式
(() => {
    const app = new PIXI.Application({
        backgroundColor: 0x1099bb,
        view: document.querySelector('#canvas-b'),
        width: 400,
        height: 300
    });

    const basicText = new PIXI.Text('Basic text in pixi');
    basicText.x = 50;
    basicText.y = 100;
    app.stage.addChild(basicText);

    document.querySelector("#btn-pixi-change").addEventListener('click', () => {
        basicText.style.fontFamily = "Simsun";
        basicText.style.fontSize = 35;
        basicText.style.fill = "red";
    });
})();