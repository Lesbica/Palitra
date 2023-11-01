document.querySelectorAll('.nav-item').forEach(navItem => {
    navItem.addEventListener('mouseenter', () => {
        const select = navItem.querySelector('select');
        select.style.display = 'none';
    });
});
