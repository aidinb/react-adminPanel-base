import {observable, action} from 'mobx';
import allBox from '../../containers/Box/demoBox';

const generateLayout = () => {
    let y = -2;
    const h = 2;
    const w = 48;
    allBox.map((box, index) => {
        let temp = {};
        temp.lg = {
            x: index % 2 === 0 ? 0 : 48,
            y: y + h,
            h,
            w,
            i: box.uid.toString()
        };
        temp.md = {
            x: index % 2 === 0 ? 0 : 48,
            y: y + h,
            h,
            w,
            i: box.uid.toString()
        };
        temp.sm = {
            x: index % 2 === 0 ? 0 : 48,
            y: y + h,
            h,
            w,
            i: box.uid.toString()
        };
        temp.xs = {
            x: index % 2 === 0 ? 0 : 48,
            y: y + h,
            h,
            w,
            i: box.uid.toString()
        };
        temp.xxs = {
            x: index % 2 === 0 ? 0 : 48,
            y: y + h,
            h,
            w,
            i: box.uid.toString()
        };
        allBox[index].size = temp;
        return null;
    });
    return allBox;
};


class Store  {
    @observable allBox;
    @observable reload;

    constructor() {
        this.allBox = generateLayout();
        this.reload = false;
    }

    @action.bound deleteBox(uid) {
        let tempAllBox = [];
        allBox.map(box => {
            if (box.uid.toString() !== uid.toString()) {
                tempAllBox.push(box);
            }
            return null;
        });
        this.allBox = tempAllBox;
        this.reload = true;
    }

    @action.bound saveBox(box) {
        this.reload = false;
        this.allBox = box;
    }
}
let singleton = new Store();
export default singleton;
