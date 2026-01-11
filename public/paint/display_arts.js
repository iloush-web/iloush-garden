document.addEventListener('DOMContentLoaded', async function () {

    const artsArray = await fetchGoogleSheetCSV();
    console.log(artsArray[0]);


    const artsGrid = this.getElementById('arts-grid');

    for (row of artsArray) {
        const art = document.createElement('div');

        let siteLink = `<a href=${row[2]}>site</a>`;

        if ('<a href="no site">site</a>' == siteLink) {
            siteLink = '';
        }

        // console.log(row[3])
        art.className = 'art-container';
        art.innerHTML = `
                <p id="name-site">${row[1].slice(1, -1)}
                ${siteLink}
                </p>
                <img src=${row[3]} alt="pixel art from ${row[1].slice(1, -1)}">
                <p id="time-date">${row[0].slice(1, -1)}</p>
            `

        artsGrid.appendChild(art);
    }
});

async function fetchGoogleSheetCSV() {
    try {
        // spreadsheet
        const spreadsheetId = "1Rfd1G-5U_z8D10q3dXFEeJ3g3nGoEjkIuBSWelieLVI";
        const sheetName = "Sheet1";

        // CSV export
        const csvUrl = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/export?format=csv";
        const response = await fetch(csvUrl);


        const csvText = await response.text();

        // CSV into [[]]
        const rows = csvText.split('\n').map(row => row.split(','));
        // console.log(rows);

        let rows2 = [];

        for (r of rows) {
            // https://ru.stackoverflow.com/questions/1461810/%D0%9D%D0%B5%D0%BE%D0%B1%D1%85%D0%BE%D0%B4%D0%B8%D0%BC%D0%BE-%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D1%8C-%D1%81%D1%82%D1%80%D0%BE%D0%BA%D1%83-%D0%BD%D0%B0-3-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0
            let r2 = [r.shift(), r.shift(), r.shift(), r.join(',')];
            rows2.push(r2)
        }


        // delete table head
        rows2.shift();

        return rows2;

    } catch (error) {
        console.error("Error:", error);
    }
}

