document.addEventListener('DOMContentLoaded', function() {
    const names = [];

    const nameInput = document.getElementById('nameInput');
    const addButton = document.getElementById('addButton');
    const nameList = document.getElementById('nameList');

    addButton.addEventListener('click', function() {
        const name = nameInput.value.trim();

        if (name && !names.some(n => n.toLowerCase() === name.toLowerCase())) {
            names.push(name);
            names.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
            updateNameList();
        }

        nameInput.value = '';
    });

    function updateNameList() {
        nameList.innerHTML = '';
        names.forEach(name => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = name;
            nameList.appendChild(listItem);
        });
    }
});