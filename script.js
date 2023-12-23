window.onload = function () {
    loadStoredContent();
};


function saveText() {
    var inputText = document.getElementById('inputText').value;
    var outputDiv = document.getElementById('output');

    if (inputText.trim() !== '') {//removes tailing spaces
        // Save to localStorage
        saveToLocalStorage(inputText);

        // Display stored content on the page
        loadStoredContent();

        // Clear the input textarea
        document.getElementById('inputText').value = '';
    } else {
        alert('Please enter some text before saving.');
    }
}
document.addEventListener('keydown', function(event) {

    if (event.keyCode ===13) {
      saveText();
    }
  });
function saveToLocalStorage(text) {
    var storedContent = localStorage.getItem('savedContent') || '[]';
    storedContent = JSON.parse(storedContent);
    storedContent.push(text);
    localStorage.setItem('savedContent', JSON.stringify(storedContent));
}

function loadStoredContent() {
    var storedContent = localStorage.getItem('savedContent');

    if (storedContent) {
        storedContent = JSON.parse(storedContent);

        var outputDiv = document.getElementById('output');
        outputDiv.innerHTML = ''; // Clear the previous content

        storedContent.forEach(function (text, index) {
            var savedEntry = document.createElement('div');
            savedEntry.className = 'saved-entry';

            // Create a pre element to preserve formatting
            var newText = document.createElement('pre');
            newText.classList.add('code'); 
            newText.textContent = text;

            // Create copy and delete buttons
            var copyButton = document.createElement('button');
            copyButton.classList.add('copy');
            copyButton.textContent = 'Copy';
            copyButton.onclick = function () {
                copyToClipboard(text);
            };

            var deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteEntry(index);
            };
            var horizontalLine=document.createElement('hr')
            // Append elements to the saved entry div
            savedEntry.appendChild(newText);
            savedEntry.appendChild(horizontalLine);
            savedEntry.appendChild(copyButton);
            savedEntry.appendChild(deleteButton);
            

            // Append the saved entry div to the output div
            outputDiv.appendChild(savedEntry);
        });
    }
}

function copyToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Text copied to clipboard!');
}

function deleteEntry(index) {
    var storedContent = localStorage.getItem('savedContent') || '[]';
    storedContent = JSON.parse(storedContent);

    // Remove the entry at the specified index
    storedContent.splice(index, 1);

    // Save the updated array back to localStorage
    localStorage.setItem('savedContent', JSON.stringify(storedContent));

    // Reload the stored content on the page
    loadStoredContent();
}
