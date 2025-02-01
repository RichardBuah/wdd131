const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function() {
    if (input.value.trim() !== '') {
        // List item
        const li = document.createElement('li');
        li.textContent = input.value;

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        li.appendChild(deleteButton);
        list.appendChild(li);
        input.value = '';
        input.focus();
        deleteButton.addEventListener('click', function() {
            list.removeChild(li);
            input.focus();
        });
    } else {
        alert("Please enter a value.");
    }
});
