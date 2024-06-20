document.addEventListener('DOMContentLoaded', function() {
    const names = JSON.parse(localStorage.getItem('names')) || [];

    const nameInput = document.getElementById('nameInput');
    const addButton = document.getElementById('addButton');
    const nameList = document.getElementById('nameList');

    addButton.addEventListener('click', function() {
        addName();
    });

    nameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addName();
        }
    });

    function addName() {
        const name = nameInput.value.trim();

        if (name && !names.some(n => n.toLowerCase() === name.toLowerCase())) {
            names.push(name);
            names.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
            updateNameList();
            localStorage.setItem('names', JSON.stringify(names));
        }

        nameInput.value = '';
    }

    function updateNameList() {
        nameList.innerHTML = '';
        names.forEach(name => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.textContent = name;

            const deleteIcon = document.createElement('span');
            deleteIcon.className = 'delete-icon';
            deleteIcon.innerHTML = '&times;';
            deleteIcon.addEventListener('click', function() {
                deleteName(name);
            });

            listItem.appendChild(deleteIcon);
            nameList.appendChild(listItem);
        });
    }

    function deleteName(nameToDelete) {
        const index = names.findIndex(n => n.toLowerCase() === nameToDelete.toLowerCase());
        if (index > -1) {
            names.splice(index, 1);
            updateNameList();
            localStorage.setItem('names', JSON.stringify(names));
        }
    }

    updateNameList();
});
