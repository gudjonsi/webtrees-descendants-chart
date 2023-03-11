/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import OrientationLeftRight from "../orientation/orientation-leftRight";
import OrientationRightLeft from "../orientation/orientation-rightLeft";
import {LAYOUT_HORIZONTAL_NODE_HEIGHT} from "../../constants.js";

/**
 * The person image box container.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class Image
{
    /**
     * Constructor.
     *
     * @param {Orientation} orientation  The current orientation
     * @param {Number}      cornerRadius The corner radius of the box
     */
    constructor(orientation, cornerRadius)
    {
        this._orientation   = orientation;
        this._cornerRadius  = cornerRadius;
        this._imagePaddingX = 5;
        this._imagePaddingY = 10;

        if ((this._orientation instanceof OrientationLeftRight)
            || (this._orientation instanceof OrientationRightLeft)
        ) {
            this._imagePaddingX = 5;
            this._imagePaddingY = 5;
        }

        this._imageRadius   = (LAYOUT_HORIZONTAL_NODE_HEIGHT - (this._imagePaddingX * 2)) / 2;

        // Calculate values
        this._x      = this.calculateX();
        this._y      = this.calculateY();
        this._width  = this.calculateImageWidth();
        this._height = this.calculateImageHeight();
        this._rx     = this._cornerRadius - this._imagePaddingX; //this.calculateCornerRadius();
        this._ry     = this._cornerRadius - this._imagePaddingX; //this.calculateCornerRadius();
    }

    /**
     * Returns the calculated X-coordinate.
     *
     * @returns {Number}
     */
    calculateX()
    {
        if ((this._orientation instanceof OrientationLeftRight)
            || (this._orientation instanceof OrientationRightLeft)
        ) {
            return -((this._orientation.boxWidth / 2) - this._imagePaddingX);
        }

        return -((this._orientation.boxWidth / 2) - this._imageRadius + this._imagePaddingX);
    }

    /**
     * Returns the calculated Y-coordinate.
     *
     * @returns {Number}
     */
    calculateY()
    {
        return -(this._orientation.boxHeight / 2) + this._imagePaddingY;
    }

    /**
     * Returns the calculated image width.
     *
     * @returns {Number}
     */
    calculateImageWidth()
    {
        return this._imageRadius * 2;
    }

    /**
     * Returns the calculated image height.
     *
     * @returns {Number}
     */
    calculateImageHeight()
    {
        return this._imageRadius * 2;
    }

    /**
     * Returns the calculated corner radius.
     *
     * @returns {Number}
     */
    calculateCornerRadius()
    {
        return this._cornerRadius - this._imagePadding;
    }

    /**
     * Returns the X-coordinate of the center of the image.
     *
     * @returns {Number}
     */
    get x()
    {
        return this._x;
    }

    /**
     * Returns the Y-coordinate of the center of the image.
     *
     * @returns {Number}
     */
    get y()
    {
        return this._y;
    }

    /**
     * Returns the horizontal corner radius of the image.
     *
     * @returns {Number}
     */
    get rx()
    {
        return this._rx;
    }

    /**
     * Returns the vertical corner radius of the image.
     *
     * @returns {Number}
     */
    get ry()
    {
        return this._ry;
    }

    /**
     * Returns the width of the image.
     *
     * @returns {Number}
     */
    get width()
    {
        return this._width;
    }

    /**
     * Returns the height of the image.
     *
     * @returns {Number}
     */
    get height()
    {
        return this._height;
    }
}
