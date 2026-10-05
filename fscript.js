// Grab references to all interactive DOM elements
const triggerFillBtn = document.getElementById('triggerFillBtn');
const addCustomBtn = document.getElementById('addCustomBtn');
const copyClipboardBtn = document.getElementById('copyClipboardBtn');

const fullNameField = document.getElementById('fullName');
const emailField = document.getElementById('email');
const collegeField = document.getElementById('college');
const addressField = document.getElementById('address');

const formNameField = document.getElementById('formName');
const formEmailField = document.getElementById('formEmail');
const formCollegeField = document.getElementById('formCollege');
const formAddressField = document.getElementById('formAddress');

const dynamicSourceContainer = document.getElementById('dynamicSourceContainer');
const dynamicTargetContainer = document.getElementById('dynamicTargetContainer');
const clipboardOutput = document.getElementById('clipboardOutput');

let customFieldCounter = 0;

// Feature: Dynamically inject custom fields on the fly
addCustomBtn.addEventListener('click', () => {
    customFieldCounter++;
    const uniqueId = `item_${customFieldCounter}`;

    const sourceGroup = document.createElement('div');
    sourceGroup.className = 'field-wrapper';
    sourceGroup.innerHTML = `
        <label>Custom Field ${customFieldCounter}</label>
        <input type="text" id="label_${uniqueId}" placeholder="Field Name (e.g. Phone)" value="Phone">
        <input type="text" id="val_${uniqueId}" placeholder="Field Value" style="margin-top: 0.4rem;">
    `;
    dynamicSourceContainer.appendChild(sourceGroup);

    const targetGroup = document.createElement('div');
    targetGroup.className = 'field-wrapper';
    targetGroup.innerHTML = `
        <label id="target_label_${uniqueId}">Custom Field (Auto-Filled)</label>
        <input type="text" id="target_val_${uniqueId}" placeholder="Will be filled...">
    `;
    dynamicTargetContainer.appendChild(targetGroup);
});

// Feature: Auto-fill form and build universal clipboard string
triggerFillBtn.addEventListener('click', () => {
    // Basic validation check
    if (fullNameField.value === '' || emailField.value === '') {
        alert('Please fill out your master profile details first!');
        return;
    }

    // Map main fields over
    formNameField.value = fullNameField.value;
    formEmailField.value = emailField.value;
    formCollegeField.value = collegeField.value;
    formAddressField.value = addressField.value;

    let compiledSummary = `Name: ${fullNameField.value}\nEmail: ${emailField.value}\nCollege: ${collegeField.value}\nAddress: ${addressField.value}\n`;

    // Loop through dynamic custom fields if any exist
    for (let i = 1; i <= customFieldCounter; i++) {
        const uniqueId = `item_${i}`;
        const labelElem = document.getElementById(`label_${uniqueId}`);
        const valElem = document.getElementById(`val_${uniqueId}`);
        const targetLabelElem = document.getElementById(`target_label_${uniqueId}`);
        const targetValElem = document.getElementById(`target_val_${uniqueId}`);

        if (labelElem && valElem && targetValElem) {
            const labelName = labelElem.value || `Field ${i}`;
            targetLabelElem.textContent = `${labelName} (Auto-Filled)`;
            targetValElem.value = valElem.value;
            compiledSummary += `${labelName}: ${valElem.value}\n`;
        }
    }

    // Output formatted string to clipboard text area
    clipboardOutput.value = compiledSummary.trim();

    // Visual button feedback animation
    triggerFillBtn.textContent = 'Auto-Filled & Formatted!';
    setTimeout(() => {
        triggerFillBtn.textContent = 'Auto-Fill Form';
    }, 2000);
});

// Feature: Copy data to system clipboard
copyClipboardBtn.addEventListener('click', () => {
    if (!clipboardOutput.value) {
        alert('Please click Auto-Fill first to generate text!');
        return;
    }
    navigator.clipboard.writeText(clipboardOutput.value);
    copyClipboardBtn.textContent = '✅ Copied to Clipboard!';
    setTimeout(() => {
        copyClipboardBtn.textContent = '📋 Copy to Clipboard';
    }, 2000);
});