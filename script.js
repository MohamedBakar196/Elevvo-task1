document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    const mainContent = document.querySelector('.main-content');
    let isCollapsed = false;

    // Toggle sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        isCollapsed = !isCollapsed;
        
        // Save state to localStorage
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }

    // Check for saved state
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
        sidebar.classList.add('collapsed');
        isCollapsed = true;
    }

    // Toggle sidebar on button click
    toggleBtn.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInside = sidebar.contains(event.target) || event.target === toggleBtn;
        
        if (window.innerWidth <= 768 && !isClickInside && !isCollapsed) {
            toggleSidebar();
        }
    });

    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            // On desktop, ensure sidebar is visible
            sidebar.style.transform = 'translateX(0)';
        } else {
            // On mobile, show/hide based on collapsed state
            if (isCollapsed) {
                sidebar.style.transform = 'translateX(0)';
            } else {
                sidebar.style.transform = 'translateX(-100%)';
            }
        }
    }

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);
});
