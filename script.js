class Table {
    constructor(root) {
        this.root = root;
    }
    update(data, Columnshead = []) {
        this.clear();
        this.setHeader(Columnshead);
        this.setBody(data);
    }
    clear() {
        this.root.innerHTML = "";
    }
    setHeader(Columnshead) {
        this.root.insertAdjacentHTML(
            "afterbegin",
            `
            <thead>
                <tr>
                    ${Columnshead.map((text) => `<th>${text}</th>`).join("")}
                </tr>
            </thead>
        `
        );
    }
    setBody(data) {
        const rowsH = data.map((row) => {
            return `
                <tr>
                    ${row.map((text) => `<td>${text}</td>`).join("")}
                </tr>
            `;
        });

        this.root.insertAdjacentHTML(
            "beforeend",
            `
            <tbody>
                ${rowsH.join("")}
            </tbody>
        `
        );
    }
}

const tableR = document.querySelector("#filer");
const InputFile = document.querySelector("#InputFile");
const table = new Table(tableR);

InputFile.addEventListener("change", (e) => {
    Papa.parse(InputFile.files[0], {
        delimiter: ",",
        skipEmptyLines: true,
        complete: (results) => {
            table.update(results.data.slice(1), results.data[0]);
        }
    });
});
