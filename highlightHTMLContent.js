/**
 * Strips the prefix from the keys of the given key-value pairs
 * @param {string} htmlContent - HTML content which needs to be highlighted 
 * @param {string} plainText - This plain text is extracted from htmlContent
 * @param {array} plainTextPositions - Array of Objects with start and end positions of words in plainText (Not the positions in HTML)
 * @returns {string} Using the positions in plainText, find the appropriate positions in htmlContent, highlight the content and return it
 */
function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    // Modified helper function to find the corresponding position in htmlContent
    function findPositionInHTML(start, end) {
        let currentIndex = 0;
        let startIndexHTML = 0;
        let endIndexHTML = 0;

        while (currentIndex < plainText.length) {
            if (currentIndex === start) {
                startIndexHTML = htmlContent.indexOf(plainText[currentIndex], endIndexHTML);
                if (startIndexHTML === -1) {
                    startIndexHTML = 0; // Return 0 as the default value
                }
            }
            if (currentIndex === end) {
                endIndexHTML = htmlContent.indexOf(plainText[currentIndex], endIndexHTML) + plainText[currentIndex].length;
                if (endIndexHTML === -1) {
                    endIndexHTML = 0; // Return 0 as the default value
                }
            }
            currentIndex++;
        }

        return { startIndexHTML, endIndexHTML };
    }

    // Sort plainTextPositions based on the start position
    plainTextPositions.sort((a, b) => a.start - b.start);

    // Apply the highlights to htmlContent
    let highlightedHTML = htmlContent;
    let offset = 0;

    plainTextPositions.forEach(({ start, end }) => {
        const { startIndexHTML, endIndexHTML } = findPositionInHTML(start + offset, end + offset);
        highlightedHTML =
            highlightedHTML.slice(0, startIndexHTML) +
            '<mark>' +
            highlightedHTML.slice(startIndexHTML, endIndexHTML) +
            '</mark>' +
            highlightedHTML.slice(endIndexHTML);
        offset += 13; // Length of "<mark></mark>"
    });

    return highlightedHTML;
}

module.exports = highlightHTMLContent;
