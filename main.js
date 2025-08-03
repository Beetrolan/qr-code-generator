const img = document.querySelector('img');
const ssid = document.querySelector('.ssid');
const password = document.querySelector('.password');
const button = document.querySelector('button');


function validateSSID(value) {
    // SSID: 1-32 ASCII chars, no leading/trailing/multiple spaces
    if (typeof value !== 'string') return 'SSID must be a string';
    if (value.trim().length === 0) return 'SSID is required';
    if (value.length > 32) return 'SSID must be at most 32 characters';
    if (value !== value.trim()) return 'No spaces at the start or end';
    if (/  +/.test(value)) return 'No consecutive spaces allowed';
    return '';
}



function validatePassword(value) {
    // WPA2: 8-63 ASCII chars
    if (typeof value !== 'string') return 'Password must be a string';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (value.length > 63) return 'Password must be at most 63 characters';
    return '';
}



function update() {
    const ssidError = validateSSID(ssid.value);
    const passwordError = validatePassword(password.value);

    ssid.style.borderColor = ssidError ? 'red' : '#d1d5db';
    password.style.borderColor = passwordError ? 'red' : '#d1d5db';

    document.querySelector('.error-ssid').textContent = ssidError;
    document.querySelector('.error-password').textContent = passwordError;

    button.disabled = !!(ssidError || passwordError);

    if (!ssidError && !passwordError) {
        const wifi = `WIFI:T:WPA;S:${ssid.value};P:${password.value};;`;
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=164x164&data=${encodeURIComponent(wifi)}`;
    }
}

ssid.addEventListener('keyup', update);
password.addEventListener('keyup', update);

button.addEventListener('click', () => {
    if (button.disabled) return;
    window.print();
});

// Початкова перевірка
update();