// Navigasi HP agar tertutup otomatis saat diklik
const navLinks = document.querySelectorAll('.nav-item a');
const menuToggle = document.getElementById('navbarNav');
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if(menuToggle.classList.contains('show')) {
            new bootstrap.Collapse(menuToggle, {toggle: false}).hide();
        }
    });
});

// FUNGSI KALKULATOR
function hitungBiaya() {
    const jalurValue = document.getElementById('calcJalur').value;
    const peminatanValue = document.getElementById('calcPeminatan').value;
    const durasiSPPValue = document.getElementById('calcDurasiSPP').value;
    
    const seragamCheckbox = document.getElementById('calcSeragam');
    const bukuCheckbox = document.getElementById('calcBuku');
    
    if(jalurValue === "0" || peminatanValue === "0") {
        alert("Silakan pilih Jalur Pendaftaran dan Peminatan terlebih dahulu.");
        return;
    }

    const uangPangkal = parseInt(jalurValue);
    const sppPerBulan = parseInt(peminatanValue);
    const jumlahBulan = parseInt(durasiSPPValue);
    
    const totalSPP = sppPerBulan * jumlahBulan; 

    const biayaSeragam = seragamCheckbox.checked ? parseInt(seragamCheckbox.value) : 0;
    const biayaBuku = bukuCheckbox.checked ? parseInt(bukuCheckbox.value) : 0;

    const totalBiaya = uangPangkal + totalSPP + biayaSeragam + biayaBuku;

    const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    
    document.getElementById('totalBiayaText').innerText = formatter.format(totalBiaya);
    document.getElementById('rincianSPPText').innerText = `Telah mencakup SPP untuk ${jumlahBulan} Bulan (${formatter.format(totalSPP)})`;
    document.getElementById('hasilKalkulator').classList.remove('d-none');
}

// Fungsi Submit Form
function submitPendaftaran(event) {
    event.preventDefault(); 
    const form = document.getElementById('pendaftaranForm');
    
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    
    // Ambil nama untuk ditampilkan di modal sukses
    document.getElementById('resNama').innerText = document.getElementById('nama').value;
    
    // Tampilkan modal
    new bootstrap.Modal(document.getElementById('successModal')).show();
    
    // Reset form
    form.reset();
    form.classList.remove('was-validated');
}