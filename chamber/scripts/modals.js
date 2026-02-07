document.querySelectorAll('[data-modal]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const modalId = link.dataset.modal;
        document.getElementById(modalId).showModal();
    });
});

document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', event => {
        const dialog = event.target.closest('dialog');
        dialog.close();
    });
});

document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});
