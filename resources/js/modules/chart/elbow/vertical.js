/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import * as d3 from "../../d3";

/**
 * Returns the path to draw the vertical connecting lines between the profile
 * boxes for Top/Bottom and Bottom/Top layout.
 *
 * @param {Object}      datum       D3 data object
 * @param {Orientation} orientation The current orientation
 *
 * @returns {String}
 */
export default function(datum, orientation)
{
    const halfXOffset = orientation.xOffset / 2;
    const halfYOffset = orientation.yOffset / 2;

    let sourceX = datum.source.x,
        sourceY = datum.source.y;

    if ((typeof datum.spouse !== "undefined") && (datum.source.data.family === 0)) {
        // For the first family, the link to the child nodes begins between
        // the individual and the first spouse.
        sourceX -= (datum.source.x - datum.spouse.x) / 2;
    } else {
        // For each additional family, the link to the child nodes begins at the additional spouse.
        sourceY += (orientation.boxHeight / 2) * orientation.direction();
    }

    // No spouse assigned to source node
    if (datum.source.data.data === null) {
        sourceX -= (orientation.boxWidth / 2) + (halfXOffset / 2);
        sourceY += (orientation.boxHeight / 2) * orientation.direction();
    }

    if (datum.target !== null) {
        let targetX = datum.target.x,
            targetY = datum.target.y - (orientation.direction() * ((orientation.boxHeight / 2) + halfYOffset));

        const path = d3.path();

        // The line from source/spouse to target
        path.moveTo(sourceX, sourceY);
        path.lineTo(sourceX, targetY);
        path.lineTo(targetX, targetY);
        path.lineTo(targetX, targetY + (orientation.direction() * halfYOffset));

        return path.toString();
    }

    return createLinksBetweenSpouses(datum, orientation);
}

/**
 * Adds the path needed to draw the lines between each spouse.
 *
 * @param {Object}      datum       D3 data object
 * @param {Orientation} orientation The current orientation
 *
 * @return {void}
 */
function createLinksBetweenSpouses(datum, orientation)
{
    const path = d3.path();

    // The distance between the connecting lines when there are multiple spouses
    const spouseLineOffset = 5;

    // The distance from the line to the node. Causes the line to stop or begin just before the node,
    // instead of going straight to the node, so that the connection to another spouse is clearer.
    const lineStartOffset = 2;

    let sourceY = datum.source.y;

    // Handle multiple spouses
    if (datum.source.data.family > 0) {
        sourceY = datum.spouse.y - (datum.source.data.family * orientation.direction() * spouseLineOffset);
    }

    // Add link between first spouse and source
    if (datum.coords === null) {
        path.moveTo(datum.spouse.x + (orientation.boxWidth / 2), sourceY);
        path.lineTo(datum.source.x - (orientation.boxWidth / 2), sourceY);
    }

    // Append lines between source and all spouses
    if (datum.coords && (datum.coords.length > 0)) {
        for (let i = 0; i < datum.coords.length; ++i) {
            let startX = datum.spouse.x + (orientation.boxWidth / 2);
            let endX   = datum.coords[i].x - (orientation.boxWidth / 2);

            if (i > 0) {
                startX = datum.coords[i - 1].x + (orientation.boxWidth / 2);
            }

            let startPosOffset = ((i > 0) ? lineStartOffset : 0);
            let endPosOffset   = (((i + 1) <= datum.coords.length) ? lineStartOffset : 0);

            path.moveTo(startX + startPosOffset, sourceY);
            path.lineTo(endX - endPosOffset, sourceY);
        }

        // Add last part from previous spouse to actual spouse
        path.moveTo(
            datum.coords[datum.coords.length - 1].x + (orientation.boxWidth / 2) + lineStartOffset,
            sourceY
        );

        path.lineTo(
            datum.source.x - (orientation.boxWidth / 2),
            sourceY
        );
    }

    return path.toString();
}
